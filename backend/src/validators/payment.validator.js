import { z } from 'zod';
import { createOrderSchema } from './order.validator.js';

const optionalString = z.string().trim().optional().or(z.literal(''));

export const createRazorpayOrderSchema = createOrderSchema;

export const verifyRazorpayPaymentSchema = z.object({
  body: z.object({
    razorpayOrderId: z.string().trim().min(6),
    razorpayPaymentId: z.string().trim().min(6),
    razorpaySignature: z.string().trim().min(10),
    checkoutData: createOrderSchema.shape.body,
    paymentMethodLabel: optionalString,
  }),
});
