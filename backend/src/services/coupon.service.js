import Coupon from '../models/Coupon.js';
import AppError from '../utils/AppError.js';

export const mapCouponForApi = (coupon) => ({
  ...coupon.toObject(),
  code: coupon.code.toUpperCase(),
});

export const checkCouponAvailability = (coupon) => {
  const now = new Date();

  if (coupon.status !== 'active') {
    throw new AppError('This coupon is currently paused', 400);
  }
  if (coupon.startsAt && coupon.startsAt > now) {
    throw new AppError('This coupon is not active yet', 400);
  }
  if (coupon.expiresAt && coupon.expiresAt < now) {
    throw new AppError('This coupon has expired', 400);
  }
  if (coupon.usageLimit !== undefined && coupon.usedCount >= coupon.usageLimit) {
    throw new AppError('This coupon usage limit has been reached', 400);
  }
};

export const getValidatedCouponResult = async ({ code, subtotal, shippingAmount = 0, categorySlugs = [] }) => {
  const coupon = await Coupon.findOne({ code: code.toUpperCase() }).populate('applicableCategories', 'slug');
  if (!coupon) {
    throw new AppError('Coupon code not found', 404);
  }

  checkCouponAvailability(coupon);

  if (subtotal < coupon.minOrderValue) {
    throw new AppError(`Minimum order value for this coupon is Rs ${coupon.minOrderValue}`, 400);
  }

  if (coupon.scope === 'category' && coupon.applicableCategories.length > 0) {
    const allowedSlugs = coupon.applicableCategories.map((category) => category.slug);
    const hasMatch = categorySlugs.some((slug) => allowedSlugs.includes(slug));
    if (!hasMatch) {
      throw new AppError('This coupon is not valid for items in your cart', 400);
    }
  }

  let discountAmount = 0;

  if (coupon.type === 'shipping') {
    discountAmount = shippingAmount;
  } else if (coupon.type === 'percentage') {
    discountAmount = (subtotal * coupon.value) / 100;
    if (coupon.maxDiscountAmount) {
      discountAmount = Math.min(discountAmount, coupon.maxDiscountAmount);
    }
  } else {
    discountAmount = Math.min(coupon.value, subtotal);
  }

  return {
    coupon,
    discountAmount: Number(discountAmount.toFixed(2)),
    finalSubtotal: Number((subtotal - discountAmount).toFixed(2)),
  };
};
