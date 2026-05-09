import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/apiResponse.js';
import User from '../models/User.js';
import RefreshToken from '../models/RefreshToken.js';
import bcrypt from 'bcryptjs';
import { generateTokens } from '../utils/jwt.js';
import { setAuthCookies } from '../utils/cookies.js';

export const getMe = asyncHandler(async (req, res, next) => {
  return successResponse(res, 200, 'Current user profile', req.user.toJSON());
});

const normalizePreferenceItems = (value) => {
  if (!Array.isArray(value)) return [];
  return value.filter(Boolean);
};

export const getMyPreferences = asyncHandler(async (req, res) => {
  return successResponse(res, 200, 'User preferences fetched successfully', {
    cart: normalizePreferenceItems(req.user.preferences?.cart),
    wishlist: normalizePreferenceItems(req.user.preferences?.wishlist),
    compare: normalizePreferenceItems(req.user.preferences?.compare),
  });
});

export const updateMyPreferences = asyncHandler(async (req, res) => {
  const nextPreferences = {
    cart: req.body.cart !== undefined ? normalizePreferenceItems(req.body.cart) : normalizePreferenceItems(req.user.preferences?.cart),
    wishlist: req.body.wishlist !== undefined ? normalizePreferenceItems(req.body.wishlist) : normalizePreferenceItems(req.user.preferences?.wishlist),
    compare: req.body.compare !== undefined ? normalizePreferenceItems(req.body.compare) : normalizePreferenceItems(req.user.preferences?.compare),
  };

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { preferences: nextPreferences },
    { new: true }
  );

  return successResponse(res, 200, 'User preferences updated successfully', {
    cart: normalizePreferenceItems(updatedUser.preferences?.cart),
    wishlist: normalizePreferenceItems(updatedUser.preferences?.wishlist),
    compare: normalizePreferenceItems(updatedUser.preferences?.compare),
  });
});

export const updateMe = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, phone } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(phone !== undefined && { phone }),
    },
    { new: true, runValidators: true }
  );

  return successResponse(res, 200, 'Profile updated successfully', updatedUser.toJSON());
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+passwordHash');

  if (!(await user.comparePassword(currentPassword))) {
    return next(new AppError('Your current password is wrong', 401));
  }

  const salt = await bcrypt.genSalt(10);
  user.passwordHash = await bcrypt.hash(newPassword, salt);
  // Subtract 1 second from now to prevent race conditions with newly issued JWT's iat
  user.passwordChangedAt = new Date(Date.now() - 1000);
  
  await user.save();

  // Revoke all existing refresh tokens for this user
  await RefreshToken.updateMany(
    { user: user._id, revokedAt: { $exists: false } },
    { revokedAt: new Date() }
  );

  // Issue fresh tokens
  const { accessToken, refreshTokenPlain, refreshTokenHash } = generateTokens(user._id);

  // Utilize the schema static helper
  await RefreshToken.createTokenRecord(user._id, refreshTokenHash, req);

  setAuthCookies(res, accessToken, refreshTokenPlain);

  return successResponse(res, 200, 'Password updated successfully');
});

const adminSortMap = {
  recent: { createdAt: -1 },
  oldest: { createdAt: 1 },
  name: { firstName: 1, lastName: 1 },
  email: { email: 1 },
};

export const adminListUsers = asyncHandler(async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Math.min(Number(req.query.limit || 10), 100);
  const skip = (page - 1) * limit;
  const filter = {};

  if (req.query.status) filter.status = req.query.status;
  if (req.query.role) filter.role = req.query.role;
  if (req.query.search) {
    filter.$or = [
      { firstName: new RegExp(req.query.search, 'i') },
      { lastName: new RegExp(req.query.search, 'i') },
      { email: new RegExp(req.query.search, 'i') },
      { phone: new RegExp(req.query.search, 'i') },
    ];
  }

  const [users, total] = await Promise.all([
    User.find(filter)
      .sort(adminSortMap[req.query.sort || 'recent'] || adminSortMap.recent)
      .skip(skip)
      .limit(limit),
    User.countDocuments(filter),
  ]);

  return successResponse(res, 200, 'Admin users fetched successfully', users, {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
});

export const adminGetUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  return successResponse(res, 200, 'Admin user details', user);
});

export const adminCreateUser = asyncHandler(async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return next(new AppError('Email is already registered', 400));
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(req.body.password, salt);

  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    passwordHash,
    phone: req.body.phone || '',
    role: req.body.role || 'customer',
    status: req.body.status || 'Active',
    emailVerified: true,
  });

  return successResponse(res, 201, 'User created successfully', user);
});

export const adminUpdateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (req.body.email && req.body.email !== user.email) {
    const existingUser = await User.findOne({ email: req.body.email, _id: { $ne: req.params.id } });
    if (existingUser) {
      return next(new AppError('Email is already registered', 400));
    }
  }

  Object.assign(user, {
    ...(req.body.firstName !== undefined && { firstName: req.body.firstName }),
    ...(req.body.lastName !== undefined && { lastName: req.body.lastName }),
    ...(req.body.email !== undefined && { email: req.body.email }),
    ...(req.body.phone !== undefined && { phone: req.body.phone }),
    ...(req.body.role !== undefined && { role: req.body.role }),
    ...(req.body.status !== undefined && { status: req.body.status }),
  });

  await user.save();

  return successResponse(res, 200, 'User updated successfully', user);
});

export const adminUpdateUserStatus = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  user.status = req.body.status;
  await user.save();

  return successResponse(res, 200, 'User status updated successfully', user);
});
