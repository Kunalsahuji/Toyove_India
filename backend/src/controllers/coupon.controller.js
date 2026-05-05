import Coupon from '../models/Coupon.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/apiResponse.js';

const mapCoupon = (coupon) => ({
  ...coupon.toObject(),
  code: coupon.code.toUpperCase(),
}); 

const checkCouponAvailability = (coupon) => {
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

export const adminListCoupons = asyncHandler(async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Math.min(Number(req.query.limit || 20), 100);
  const skip = (page - 1) * limit;
  const filter = {};

  if (req.query.status) filter.status = req.query.status;
  if (req.query.search) {
    filter.$or = [
      { code: new RegExp(req.query.search, 'i') },
      { title: new RegExp(req.query.search, 'i') },
    ];
  }

  const [coupons, total] = await Promise.all([
    Coupon.find(filter)
      .populate('applicableCategories', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Coupon.countDocuments(filter),
  ]);

  return successResponse(
    res,
    200,
    'Coupons fetched successfully',
    coupons.map(mapCoupon),
    { page, limit, total, totalPages: Math.ceil(total / limit) }
  );
});

export const adminCreateCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.create({
    ...req.body,
    code: req.body.code.toUpperCase(),
    startsAt: req.body.startsAt || undefined,
    expiresAt: req.body.expiresAt || undefined,
  });

  const populatedCoupon = await Coupon.findById(coupon._id).populate('applicableCategories', 'name slug');
  return successResponse(res, 201, 'Coupon created successfully', mapCoupon(populatedCoupon));
});

export const adminUpdateCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      ...(req.body.code && { code: req.body.code.toUpperCase() }),
      ...(req.body.startsAt === '' && { startsAt: undefined }),
      ...(req.body.expiresAt === '' && { expiresAt: undefined }),
    },
    { new: true, runValidators: true }
  ).populate('applicableCategories', 'name slug');

  if (!coupon) {
    return next(new AppError('Coupon not found', 404));
  }

  return successResponse(res, 200, 'Coupon updated successfully', mapCoupon(coupon));
});

export const adminUpdateCouponStatus = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  ).populate('applicableCategories', 'name slug');

  if (!coupon) {
    return next(new AppError('Coupon not found', 404));
  }

  return successResponse(res, 200, 'Coupon status updated successfully', mapCoupon(coupon));
});

export const validateCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findOne({ code: req.body.code.toUpperCase() }).populate('applicableCategories', 'slug');
  if (!coupon) {
    return next(new AppError('Coupon code not found', 404));
  }

  checkCouponAvailability(coupon);

  if (req.body.subtotal < coupon.minOrderValue) {
    return next(new AppError(`Minimum order value for this coupon is Rs ${coupon.minOrderValue}`, 400));
  }

  if (coupon.scope === 'category' && coupon.applicableCategories.length > 0) {
    const allowedSlugs = coupon.applicableCategories.map((category) => category.slug);
    const hasMatch = (req.body.categorySlugs || []).some((slug) => allowedSlugs.includes(slug));
    if (!hasMatch) {
      return next(new AppError('This coupon is not valid for items in your cart', 400));
    }
  }

  const shippingAmount = Number(req.body.shippingAmount || 0);
  let discountAmount = 0;

  if (coupon.type === 'shipping') {
    discountAmount = shippingAmount;
  } else if (coupon.type === 'percentage') {
    discountAmount = (req.body.subtotal * coupon.value) / 100;
    if (coupon.maxDiscountAmount) {
      discountAmount = Math.min(discountAmount, coupon.maxDiscountAmount);
    }
  } else {
    discountAmount = Math.min(coupon.value, req.body.subtotal);
  }

  return successResponse(res, 200, 'Coupon is valid', {
    coupon: mapCoupon(coupon),
    discountAmount: Number(discountAmount.toFixed(2)),
    finalSubtotal: Number((req.body.subtotal - discountAmount).toFixed(2)),
  });
});
