import crypto from 'crypto';
import Razorpay from 'razorpay';
import env from '../config/env.js';
import AppError from './AppError.js';

let razorpayInstance;

export const getRazorpayClient = () => {
  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    throw new AppError('Razorpay is not configured. Add key id and secret in backend .env.', 500);
  }

  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: env.RAZORPAY_KEY_ID,
      key_secret: env.RAZORPAY_KEY_SECRET,
    });
  }

  return razorpayInstance;
};

export const verifyRazorpayPaymentSignature = ({ orderId, paymentId, signature }) => {
  if (!env.RAZORPAY_KEY_SECRET) {
    throw new AppError('Razorpay secret is missing in backend .env.', 500);
  }

  const generatedSignature = crypto
    .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
};

export const verifyRazorpayWebhookSignature = ({ payload, signature }) => {
  if (!env.RAZORPAY_WEBHOOK_SECRET) {
    throw new AppError('Razorpay webhook secret is missing in backend .env.', 500);
  }

  const generatedSignature = crypto
    .createHmac('sha256', env.RAZORPAY_WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');

  return generatedSignature === signature;
};
