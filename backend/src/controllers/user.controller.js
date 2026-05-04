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
