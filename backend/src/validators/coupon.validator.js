import { z } from 'zod';

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid id');
const optionalString = z.string().trim().optional().or(z.literal(''));

const couponPayload = {
  code: z.string().trim().min(3).max(40).transform((value) => value.toUpperCase()),
  title: z.string().trim().min(3).max(160),
  description: optionalString,
  type: z.enum(['percentage', 'fixed', 'shipping']),
  scope: z.enum(['storewide', 'category', 'shipping']).optional(),
  value: z.number().min(0),
  minOrderValue: z.number().min(0).optional(),
  maxDiscountAmount: z.number().min(0).optional(),
  applicableCategories: z.array(objectId).optional(),
  usageLimit: z.number().int().min(0).optional(),
  status: z.enum(['active', 'paused']).optional(),
  startsAt: z.string().datetime().optional().or(z.literal('')),
  expiresAt: z.string().datetime().optional().or(z.literal('')),
};

export const listCouponsSchema = z.object({
  query: z.object({
    search: optionalString,
    status: z.enum(['active', 'paused']).optional().or(z.literal('')),
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).optional(),
  }),
});

export const createCouponSchema = z.object({
  body: z.object(couponPayload),
});

export const updateCouponSchema = z.object({
  params: z.object({ id: objectId }),
  body: z.object(couponPayload).partial(),
});

export const updateCouponStatusSchema = z.object({
  params: z.object({ id: objectId }),
  body: z.object({
    status: z.enum(['active', 'paused']),
  }),
});

export const couponIdParamSchema = z.object({
  params: z.object({ id: objectId }),
});

export const validateCouponSchema = z.object({
  body: z.object({
    code: z.string().trim().min(3).max(40),
    subtotal: z.number().min(0),
    shippingAmount: z.number().min(0).optional(),
    categorySlugs: z.array(z.string().trim()).optional(),
  }),
});
