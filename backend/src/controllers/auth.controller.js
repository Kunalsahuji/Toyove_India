import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Order from '../models/Order.js';
import RefreshToken from '../models/RefreshToken.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/apiResponse.js';
import { generateTokens, hashToken } from '../utils/jwt.js';
import { setAuthCookies, clearAuthCookies } from '../utils/cookies.js';
import { sendPasswordResetOtpEmail } from '../services/email.service.js';
import logger from '../utils/logger.js';

export const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, phone } = req.body;
  logger.info('Auth register attempt', {
    email,
    hasPassword: Boolean(password),
    ip: req.ip,
    origin: req.headers.origin
  });

  // Check if email already exists
  const existingEmail = await User.findOne({ email: email.toLowerCase() });
  if (existingEmail) {
    logger.warn('Auth register blocked: email already registered', { email, ip: req.ip });
    return next(new AppError('This email is already registered. Please log in or use a different email.', 400));
  }

  // Check if phone already exists (if provided)
  if (phone && phone.trim() !== '') {
    const existingPhone = await User.findOne({ phone: phone.trim() });
    if (existingPhone) {
      logger.warn('Auth register blocked: phone already registered', { phone, ip: req.ip });
      return next(new AppError('This mobile number is already registered. Please use a different number or log in.', 400));
    }
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    phone: (phone && phone.trim() !== '') ? phone.trim() : undefined,
    passwordHash,
  });

  await Order.updateMany(
    { user: null, 'customer.email': newUser.email.toLowerCase() },
    { $set: { user: newUser._id } }
  );
  
  logger.info('Auth register success', {
    userId: newUser._id,
    email: newUser.email,
    ip: req.ip
  });

  return successResponse(res, 201, 'Registration successful. Please log in to continue.', newUser.toJSON());
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  logger.info('Auth login attempt', {
    email,
    hasPassword: Boolean(password),
    ip: req.ip,
    origin: req.headers.origin,
    cookieNames: Object.keys(req.cookies || {})
  });

  const user = await User.findOne({ email }).select('+passwordHash');
  if (!user) {
    logger.warn('Auth login failed: user not found', {
      email,
      ip: req.ip
    });
    return next(new AppError('Invalid email or password', 401));
  }

  const isPasswordValid = await user.comparePassword(password);
  logger.info('Auth login password check completed', {
    email,
    userId: user._id,
    isPasswordValid,
    status: user.status
  });

  if (!isPasswordValid) {
    logger.warn('Auth login failed: invalid password', {
      email,
      userId: user._id,
      ip: req.ip
    });
    return next(new AppError('Invalid email or password', 401));
  }

  if (user.status !== 'Active') {
    logger.warn('Auth login blocked: inactive user', {
      email,
      userId: user._id,
      status: user.status
    });
    return next(new AppError(`Account is ${user.status.toLowerCase()}. Please contact support.`, 403));
  }

  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  const { accessToken, refreshTokenPlain, refreshTokenHash } = generateTokens(user._id);

  await RefreshToken.createTokenRecord(user._id, refreshTokenHash, req);
  await Order.updateMany(
    { user: null, 'customer.email': user.email.toLowerCase() },
    { $set: { user: user._id } }
  );

  setAuthCookies(res, accessToken, refreshTokenPlain);
  logger.info('Auth login success', {
    email,
    userId: user._id,
    role: user.role,
    ip: req.ip
  });

  return successResponse(res, 200, 'Login successful', {
    ...user.toJSON(),
    accessToken,
  });
});

export const refresh = asyncHandler(async (req, res, next) => {
  const incomingRefreshToken = req.cookies.refreshToken;
  logger.info('Auth refresh attempt', {
    hasRefreshToken: Boolean(incomingRefreshToken),
    ip: req.ip,
    origin: req.headers.origin,
    cookieNames: Object.keys(req.cookies || {})
  });

  if (!incomingRefreshToken) {
    logger.warn('Auth refresh failed: no refresh token provided', {
      ip: req.ip
    });
    return next(new AppError('No refresh token provided', 401));
  }

  const tokenHash = hashToken(incomingRefreshToken);
  const existingToken = await RefreshToken.findOne({ tokenHash }).populate('user');

  if (!existingToken) {
    logger.warn('Auth refresh failed: token not found', {
      ip: req.ip
    });
    clearAuthCookies(res);
    return next(new AppError('Invalid or expired refresh token', 401));
  }

  if (existingToken.revokedAt || existingToken.expiresAt < new Date()) {
    logger.warn('Auth refresh failed: token revoked or expired', {
      tokenId: existingToken._id,
      userId: existingToken.user?._id,
      revokedAt: existingToken.revokedAt,
      expiresAt: existingToken.expiresAt
    });
    await RefreshToken.updateMany({ familyId: existingToken.familyId }, { revokedAt: new Date() });
    clearAuthCookies(res);
    return next(new AppError('Token has been revoked or expired. Please log in again.', 401));
  }

  const user = existingToken.user;
  if (!user || user.status !== 'Active') {
    logger.warn('Auth refresh failed: inactive or missing user', {
      tokenId: existingToken._id,
      userId: user?._id,
      status: user?.status
    });
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
  logger.info('Auth refresh success', {
    userId: user._id,
    email: user.email,
    tokenFamilyId: existingToken.familyId,
    ip: req.ip
  });

  return successResponse(res, 200, 'Token refreshed successfully', {
    ...user.toJSON(),
    accessToken,
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  const incomingRefreshToken = req.cookies.refreshToken;
  logger.info('Auth logout attempt', {
    hasRefreshToken: Boolean(incomingRefreshToken),
    ip: req.ip
  });
  
  if (incomingRefreshToken) {
    const tokenHash = hashToken(incomingRefreshToken);
    await RefreshToken.findOneAndUpdate({ tokenHash }, { revokedAt: new Date() });
  }

  clearAuthCookies(res);
  logger.info('Auth logout success', {
    ip: req.ip
  });
  return successResponse(res, 200, 'Logged out successfully');
});

export const getMe = asyncHandler(async (req, res, next) => {
  logger.info('Auth getMe success', {
    userId: req.user?._id,
    email: req.user?.email,
    role: req.user?.role,
    ip: req.ip
  });
  return successResponse(res, 200, 'Current user profile', req.user.toJSON());
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new AppError('Please provide an email address', 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    // For security reasons, don't reveal if user exists or not, 
    // but in development we can be more specific or just send success.
    return successResponse(res, 200, 'If an account exists with this email, you will receive an OTP.');
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  user.resetPasswordOTP = otp;
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save({ validateBeforeSave: false });

  try {
    await sendPasswordResetOtpEmail(user, otp);
    return successResponse(res, 200, 'Password reset OTP sent to your email.');
  } catch (error) {
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError('Error sending email. Please try again later.', 500));
  }
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, otp, password } = req.body;
  if (!email || !otp || !password) {
    return next(new AppError('Please provide email, OTP and new password', 400));
  }

  const user = await User.findOne({ 
    email: email.toLowerCase(),
    resetPasswordOTP: otp,
    resetPasswordExpires: { $gt: Date.now() }
  }).select('+resetPasswordOTP +resetPasswordExpires');

  if (!user) {
    return next(new AppError('Invalid or expired OTP', 400));
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  user.passwordHash = await bcrypt.hash(password, salt);
  
  // Clear OTP fields
  user.resetPasswordOTP = undefined;
  user.resetPasswordExpires = undefined;
  user.passwordChangedAt = Date.now();
  
  await user.save();

  // Optionally generate new tokens and log them in immediately
  const { accessToken, refreshTokenPlain, refreshTokenHash } = generateTokens(user._id);
  await RefreshToken.createTokenRecord(user._id, refreshTokenHash, req);
  setAuthCookies(res, accessToken, refreshTokenPlain);

  return successResponse(res, 200, 'Password reset successful. You are now logged in.', {
    ...user.toJSON(),
    accessToken,
  });
});
