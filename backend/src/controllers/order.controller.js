import Coupon from '../models/Coupon.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/apiResponse.js';
import { getValidatedCouponResult, mapCouponForApi } from '../services/coupon.service.js';

const SHIPPING_RATES = {
  standard: 15,
  express: 45,
};

const STATUS_LABELS = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const PAYMENT_STATUS_LABELS = {
  pending: 'Pending',
  paid: 'Paid',
  failed: 'Failed',
  refunded: 'Refunded',
};

const PAYMENT_METHOD_LABELS = {
  card: 'Card',
  upi: 'UPI',
  netbanking: 'Net Banking',
  cod: 'Cash on Delivery',
  razorpay: 'Razorpay',
};

const formatOrderDate = (value) => new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}).format(new Date(value));

const getDeliveryDate = (createdAt, shippingMethod) => {
  const days = shippingMethod === 'express' ? 2 : 5;
  const date = new Date(createdAt);
  date.setDate(date.getDate() + days);
  return formatOrderDate(date);
};

const mapOrderItem = (item) => ({
  id: item.product?._id?.toString() || item.product?.toString(),
  title: item.productName,
  slug: item.productSlug || '',
  sku: item.sku || '',
  img: item.image || '',
  qty: item.quantity,
  price: item.unitPrice,
  total: item.totalPrice,
});

const mapOrder = (order) => ({
  ...order.toObject(),
  id: order._id.toString(),
  orderNumber: order.orderNumber,
  date: formatOrderDate(order.createdAt),
  statusLabel: STATUS_LABELS[order.status] || order.status,
  paymentStatusLabel: PAYMENT_STATUS_LABELS[order.paymentStatus] || order.paymentStatus,
  paymentMethodLabel: PAYMENT_METHOD_LABELS[order.paymentMethod] || order.paymentMethod,
  deliveryDate: getDeliveryDate(order.createdAt, order.shippingMethod),
  subtotal: order.subtotal,
  shipping: order.shippingAmount,
  discount: order.discountAmount,
  total: order.totalAmount,
  customerEmail: order.customer.email,
  items: order.items.map(mapOrderItem),
  customerName: `${order.customer.firstName} ${order.customer.lastName}`.trim(),
  destination: `${order.shippingAddress.city === 'Other' ? order.shippingAddress.district : order.shippingAddress.city}, ${order.shippingAddress.state}`,
});

const mapOrderSummary = (order) => ({
  id: order._id.toString(),
  orderNumber: order.orderNumber,
  date: formatOrderDate(order.createdAt),
  status: order.status,
  statusLabel: STATUS_LABELS[order.status] || order.status,
  total: order.totalAmount,
  itemsCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
  paymentStatus: order.paymentStatus,
  paymentStatusLabel: PAYMENT_STATUS_LABELS[order.paymentStatus] || order.paymentStatus,
  paymentMethodLabel: PAYMENT_METHOD_LABELS[order.paymentMethod] || order.paymentMethod,
  customerName: `${order.customer.firstName} ${order.customer.lastName}`.trim(),
  destination: `${order.shippingAddress.city === 'Other' ? order.shippingAddress.district : order.shippingAddress.city}, ${order.shippingAddress.state}`,
  createdAt: order.createdAt,
});

const appendStatusHistory = (order, status, actorRole, note) => {
  order.statusHistory.push({
    status,
    actorRole,
    note,
    createdAt: new Date(),
  });
};

const resolveOrderProduct = async (item) => {
  if (item.productId) {
    return Product.findOne({ _id: item.productId, status: 'active' }).populate('category', 'slug');
  }
  return Product.findOne({ slug: item.slug, status: 'active' }).populate('category', 'slug');
};

export const createOrder = asyncHandler(async (req, res, next) => {
  const resolvedItems = await Promise.all(req.body.items.map(async (item) => {
    const product = await resolveOrderProduct(item);
    if (!product) {
      throw new AppError('One or more products in your cart are unavailable', 400);
    }
    if (product.stock < item.quantity) {
      throw new AppError(`${product.name} is low on stock. Please reduce quantity and try again.`, 400);
    }

    return {
      product,
      quantity: item.quantity,
    };
  }));

  const items = resolvedItems.map(({ product, quantity }) => ({
    product: product._id,
    productName: product.name,
    productSlug: product.slug,
    sku: product.sku,
    image: product.thumbnail?.url || product.images?.[0]?.url || '',
    categorySlug: product.category?.slug || '',
    quantity,
    unitPrice: product.price,
    totalPrice: Number((product.price * quantity).toFixed(2)),
  }));

  const subtotal = Number(items.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2));
  const shippingAmount = SHIPPING_RATES[req.body.shippingMethod] ?? SHIPPING_RATES.standard;

  let discountAmount = 0;
  let couponData;

  if (req.body.couponCode) {
    const couponResult = await getValidatedCouponResult({
      code: req.body.couponCode,
      subtotal,
      shippingAmount,
      categorySlugs: [...new Set(items.map((item) => item.categorySlug).filter(Boolean))],
    });
    discountAmount = couponResult.discountAmount;
    couponData = {
      code: couponResult.coupon.code,
      couponId: couponResult.coupon._id,
      title: couponResult.coupon.title,
      type: couponResult.coupon.type,
    };
  }

  const totalAmount = Number(Math.max(subtotal + shippingAmount - discountAmount, 0).toFixed(2));

  const order = await Order.create({
    user: req.user?._id || null,
    customer: {
      ...req.body.customer,
      email: req.body.customer.email.toLowerCase(),
    },
    shippingAddress: req.body.shippingAddress,
    items,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: req.body.paymentMethod,
    shippingMethod: req.body.shippingMethod,
    subtotal,
    shippingAmount,
    discountAmount,
    totalAmount,
    coupon: couponData,
    notes: req.body.notes || undefined,
  });

  await Promise.all(resolvedItems.map(({ product, quantity }) => Product.updateOne(
    { _id: product._id },
    {
      $inc: {
        stock: -quantity,
        soldCount: quantity,
      },
    }
  )));

  if (couponData?.couponId) {
    await Coupon.updateOne({ _id: couponData.couponId }, { $inc: { usedCount: 1 } });
  }

  return successResponse(res, 201, 'Order placed successfully', mapOrder(order));
});

export const listMyOrders = asyncHandler(async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Math.min(Number(req.query.limit || 10), 50);
  const skip = (page - 1) * limit;

  const filter = { user: req.user._id };

  const [orders, total] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(filter),
  ]);

  return successResponse(
    res,
    200,
    'Orders fetched successfully',
    orders.map(mapOrder),
    { page, limit, total, totalPages: Math.ceil(total / limit) }
  );
});

export const getMyOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  return successResponse(res, 200, 'Order details fetched successfully', mapOrder(order));
});

export const getOrderSummary = asyncHandler(async (req, res, next) => {
  const order = await Order.findOne({ orderNumber: req.params.orderNumber });
  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  const canAccess = (
    req.user?.role === 'admin' ||
    req.user?.role === 'super_admin' ||
    (req.user && order.user && order.user.toString() === req.user._id.toString()) ||
    (req.query.email && order.customer.email === req.query.email.toLowerCase())
  );

  if (!canAccess) {
    return next(new AppError('You are not allowed to view this order summary', 403));
  }

  return successResponse(res, 200, 'Order summary fetched successfully', mapOrder(order));
});

export const adminListOrders = asyncHandler(async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Math.min(Number(req.query.limit || 20), 100);
  const skip = (page - 1) * limit;
  const filter = {};

  if (req.query.status) {
    filter.status = req.query.status;
  }
  if (req.query.paymentStatus) {
    filter.paymentStatus = req.query.paymentStatus;
  }
  if (req.query.search) {
    filter.$or = [
      { orderNumber: new RegExp(req.query.search, 'i') },
      { 'customer.firstName': new RegExp(req.query.search, 'i') },
      { 'customer.lastName': new RegExp(req.query.search, 'i') },
      { 'customer.email': new RegExp(req.query.search, 'i') },
    ];
  }

  const [orders, total] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(filter),
  ]);

  return successResponse(
    res,
    200,
    'Admin orders fetched successfully',
    orders.map(mapOrderSummary),
    { page, limit, total, totalPages: Math.ceil(total / limit) }
  );
});

export const adminGetOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user', 'firstName lastName email');
  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  return successResponse(res, 200, 'Admin order details fetched successfully', mapOrder(order));
});

export const adminUpdateOrderStatus = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  const previousStatus = order.status;
  order.status = req.body.status;

  if (req.body.paymentStatus) {
    order.paymentStatus = req.body.paymentStatus;
  }
  if (req.body.trackingNumber !== undefined) {
    order.trackingNumber = req.body.trackingNumber || undefined;
  }
  if (req.body.status === 'delivered') {
    order.deliveredAt = new Date();
  }
  if (req.body.status === 'cancelled') {
    order.cancelledAt = new Date();
  }
  if (previousStatus !== req.body.status || req.body.note) {
    appendStatusHistory(
      order,
      req.body.status,
      req.user.role,
      req.body.note || `Status updated from ${previousStatus} to ${req.body.status}`
    );
  }

  await order.save();

  return successResponse(res, 200, 'Order status updated successfully', mapOrder(order));
});
