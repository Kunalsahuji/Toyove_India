import { createRazorpayOrder, handleRazorpayWebhook, verifyRazorpayPayment } from '../controllers/payment.controller.js';
import { optionalAuth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createRazorpayOrderSchema, verifyRazorpayPaymentSchema } from '../validators/payment.validator.js';

import express from 'express';
const router = express.Router();

router.post('/razorpay/order', optionalAuth, validate(createRazorpayOrderSchema), createRazorpayOrder);
router.post('/razorpay/verify', optionalAuth, validate(verifyRazorpayPaymentSchema), verifyRazorpayPayment);
router.post('/razorpay/webhook', handleRazorpayWebhook);

export default router;
