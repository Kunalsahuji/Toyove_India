import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import RefreshToken from '../models/RefreshToken.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/apiResponse.js';
import { generateTokens, hashToken } from '../utils/jwt.js';
import { setAuthCookies, clearAuthCookies } from '../utils/cookies.js';

export const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('Email is already registered. Please log in instead.', 400));
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    passwordHash,
  });

  const { accessToken, refreshTokenPlain, refreshTokenHash } = generateTokens(newUser._id);

  await RefreshToken.createTokenRecord(newUser._id, refreshTokenHash, req);

  setAuthCookies(res, accessToken, refreshTokenPlain);

  return successResponse(res, 201, 'Registration successful', newUser.toJSON());
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+passwordHash');
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  if (user.status !== 'Active') {
    return next(new AppError(`Account is ${user.status.toLowerCase()}. Please contact support.`, 403));
  }

  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  const { accessToken, refreshTokenPlain, refreshTokenHash } = generateTokens(user._id);

  await RefreshToken.createTokenRecord(user._id, refreshTokenHash, req);

  setAuthCookies(res, accessToken, refreshTokenPlain);

  return successResponse(res, 200, 'Login successful', user.toJSON());
});

export const refresh = asyncHandler(async (req, res, next) => {
  const incomingRefreshToken = req.cookies.refreshToken;

  if (!incomingRefreshToken) {
    return next(new AppError('No refresh token provided', 401));
  }

  const tokenHash = hashToken(incomingRefreshToken);
  const existingToken = await RefreshToken.findOne({ tokenHash }).populate('user');

  if (!existingToken) {
    clearAuthCookies(res);
    return next(new AppError('Invalid or expired refresh token', 401));
  }

  if (existingToken.revokedAt || existingToken.expiresAt < new Date()) {
    await RefreshToken.updateMany({ familyId: existingToken.familyId }, { revokedAt: new Date() });
    clearAuthCookies(res);
    return next(new AppError('Token has been revoked or expired. Please log in again.', 401));
  }

  const user = existingToken.user;
  if (!user || user.status !== 'Active') {
    clearAuthCookies(res);
    return next(new AppError('User is inactive or no longer exists', 401));
  }

  // Rotate token safely:
  // 1. Generate new tokens
  const { accessToken, refreshTokenPlain, refreshTokenHash } = generateTokens(user._id);
  
  // 2. Mark old token as revoked and replaced
  existingToken.revokedAt = new Date();
  existingToken.replacedByTokenHash = refreshTokenHash;
  await existingToken.save();

  // 3. Create the new token in the same family
  await RefreshToken.createTokenRecord(user._id, refreshTokenHash, req, existingToken.familyId);

  setAuthCookies(res, accessToken, refreshTokenPlain);

  return successResponse(res, 200, 'Token refreshed successfully', user.toJSON());
});

export const logout = asyncHandler(async (req, res, next) => {
  const incomingRefreshToken = req.cookies.refreshToken;
  
  if (incomingRefreshToken) {
    const tokenHash = hashToken(incomingRefreshToken);
    await RefreshToken.findOneAndUpdate({ tokenHash }, { revokedAt: new Date() });
  }

  clearAuthCookies(res);
  return successResponse(res, 200, 'Logged out successfully');
});

export const getMe = asyncHandler(async (req, res, next) => {
  return successResponse(res, 200, 'Current user profile', req.user.toJSON());
});
