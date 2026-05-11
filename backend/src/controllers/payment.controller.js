import Order from '../models/Order.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/apiResponse.js';
import { buildOrderDraftFromCheckout, applyFulfilledOrderSideEffects } from '../services/order.service.js';
import { sendOrderConfirmationEmail } from '../services/email.service.js';
import { getRazorpayClient, verifyRazorpayPaymentSignature, verifyRazorpayWebhookSignature } from '../utils/razorpay.js';
import { notifyPaymentSuccess, notifyPaymentFailed, notifyRefundProcessed } from '../services/notification.service.js';
import env from '../config/env.js';
import logger from '../utils/logger.js';

const toPaise = (value) => Math.round(Number(value) * 100);

export const createRazorpayOrder = asyncHandler(async (req, res) => {
  const draft = await buildOrderDraftFromCheckout(req.body);
  const razorpay = getRazorpayClient();
  logger.info('Razorpay order creation requested', {
    email: req.body?.customer?.email,
    shippingMethod: req.body?.shippingMethod,
    itemCount: req.body?.items?.length || 0,
    totalAmount: draft.totalAmount,
  });

  const razorpayOrder = await razorpay.orders.create({
    amount: toPaise(draft.totalAmount),
    currency: 'INR',
    receipt: `toyovo_${Date.now()}`,
    notes: {
      email: req.body.customer.email,
      shippingMethod: req.body.shippingMethod,
      paymentSource: 'toyovo_web_checkout',
    },
  });

  return successResponse(res, 201, 'Razorpay order created successfully', {
    razorpayOrderId: razorpayOrder.id,
    amount: draft.totalAmount,
    amountInPaise: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    keyId: env.RAZORPAY_KEY_ID,
    breakdown: {
      subtotal: draft.subtotal,
      shipping: draft.shippingAmount,
      discount: draft.discountAmount,
      total: draft.totalAmount,
    },
  });
});

export const verifyRazorpayPayment = asyncHandler(async (req, res, next) => {
  logger.info('Razorpay payment verification requested', {
    razorpayOrderId: req.body.razorpayOrderId,
    razorpayPaymentId: req.body.razorpayPaymentId,
    email: req.body?.checkoutData?.customer?.email,
  });
  const isValidSignature = verifyRazorpayPaymentSignature({
    orderId: req.body.razorpayOrderId,
    paymentId: req.body.razorpayPaymentId,
    signature: req.body.razorpaySignature,
  });

  if (!isValidSignature) {
    logger.warn('Razorpay payment verification failed: signature mismatch', {
      razorpayOrderId: req.body.razorpayOrderId,
      razorpayPaymentId: req.body.razorpayPaymentId,
    });
    return next(new AppError('Payment verification failed. Signature mismatch.', 400));
  }

  const existingOrder = await Order.findOne({ 'paymentGateway.razorpayPaymentId': req.body.razorpayPaymentId });
  if (existingOrder) {
    return successResponse(res, 200, 'Payment already verified', existingOrder.toObject ? existingOrder.toObject() : existingOrder);
  }

  const draft = await buildOrderDraftFromCheckout(req.body.checkoutData);
  logger.info('Razorpay payment verification draft prepared', {
    razorpayOrderId: req.body.razorpayOrderId,
    razorpayPaymentId: req.body.razorpayPaymentId,
    totalAmount: draft.totalAmount,
    itemCount: draft.items.length,
  });

  const order = await Order.create({
    user: req.user?._id || null,
    customer: {
      ...req.body.checkoutData.customer,
      email: req.body.checkoutData.customer.email.toLowerCase(),
    },
    shippingAddress: req.body.checkoutData.shippingAddress,
    items: draft.items,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'razorpay',
    shippingMethod: req.body.checkoutData.shippingMethod,
    subtotal: draft.subtotal,
    shippingAmount: draft.shippingAmount,
    discountAmount: draft.discountAmount,
    totalAmount: draft.totalAmount,
    coupon: draft.couponData,
    notes: req.body.checkoutData.notes || undefined,
    paymentGateway: {
      provider: 'razorpay',
      razorpayOrderId: req.body.razorpayOrderId,
      razorpayPaymentId: req.body.razorpayPaymentId,
      razorpaySignature: req.body.razorpaySignature,
      paymentMethodLabel: req.body.paymentMethodLabel || undefined,
      verifiedAt: new Date(),
    },
  });

  await applyFulfilledOrderSideEffects({
    resolvedItems: draft.resolvedItems,
    couponData: draft.couponData,
  });

  Promise.resolve(sendOrderConfirmationEmail(order)).catch((error) => {
    logger.warn(`Order confirmation email failed for ${order.orderNumber}: ${error.message}`);
  });

  // Push notification
  Promise.resolve(notifyPaymentSuccess(order)).catch(() => {});

  logger.info('Razorpay payment verification success', {
    orderNumber: order.orderNumber,
    razorpayOrderId: req.body.razorpayOrderId,
    razorpayPaymentId: req.body.razorpayPaymentId,
  });

  return successResponse(res, 201, 'Payment verified and order placed successfully', order);
});

export const handleRazorpayWebhook = asyncHandler(async (req, res, next) => {
  const signature = req.headers['x-razorpay-signature'];
  const payload = req.rawBody;

  if (!signature || !payload) {
    return next(new AppError('Invalid Razorpay webhook request', 400));
  }

  const isValid = verifyRazorpayWebhookSignature({
    payload,
    signature,
  });

  if (!isValid) {
    return next(new AppError('Invalid Razorpay webhook signature', 400));
  }

  const event = req.body.event;
  const paymentEntity = req.body.payload?.payment?.entity;
  const refundEntity = req.body.payload?.refund?.entity;

  if (paymentEntity?.id) {
    const order = await Order.findOne({ 'paymentGateway.razorpayPaymentId': paymentEntity.id });
    if (order) {
      order.paymentGateway = {
        ...order.paymentGateway,
        lastWebhookEvent: event,
        lastWebhookAt: new Date(),
      };

      if (event === 'payment.captured') {
        order.paymentStatus = 'paid';
        Promise.resolve(notifyPaymentSuccess(order)).catch(() => {});
      }

      if (event === 'payment.failed') {
        order.paymentStatus = 'failed';
        Promise.resolve(notifyPaymentFailed(order)).catch(() => {});
      }

      await order.save();
    }
  }

  if (refundEntity?.payment_id) {
    const order = await Order.findOne({ 'paymentGateway.razorpayPaymentId': refundEntity.payment_id });
    if (order) {
      order.paymentStatus = 'refunded';
      order.paymentGateway = {
        ...order.paymentGateway,
        lastWebhookEvent: event,
        lastWebhookAt: new Date(),
      };
      await order.save();
      Promise.resolve(notifyRefundProcessed(order)).catch(() => {});
    }
  }

  return successResponse(res, 200, 'Webhook received successfully', { received: true });
});
