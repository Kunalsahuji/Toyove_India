import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import env from '../config/env.js';
import logger from '../utils/logger.js';

const isProduction = env.NODE_ENV === 'production';
const buildScopedKey = (req) => `${ipKeyGenerator(req.ip)}:${req.path}`;

export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 200, // Limit each IP to 200 requests per `window`
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      message: 'Too many requests from this IP, please try again after 1 minutes',
      requestId: req.id
    });
  }
});

export const authLimiter = rateLimit({
  // Keep direct login/register attempts protected, but make local development less brittle.
  windowMs: isProduction ? 15 * 60 * 1000 : 5 * 60 * 1000,
  limit: isProduction ? 10 : 50,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  keyGenerator: buildScopedKey,
  handler: (req, res, next, options) => {
    logger.warn(`Auth rate limit hit`, {
      path: req.path,
      method: req.method,
      ip: req.ip,
      forwardedFor: req.headers['x-forwarded-for'],
      origin: req.headers.origin,
      userAgent: req.headers['user-agent'],
      windowMs: options.windowMs,
      limit: options.limit
    });
    res.status(options.statusCode).json({
      success: false,
      message: `Too many authentication attempts, please try again after ${Math.ceil(options.windowMs / 60000)} minutes`,
      requestId: req.id
    });
  }
});

export const refreshLimiter = rateLimit({
  // Token refresh can happen in the background, so it needs a looser limit than login/register.
  windowMs: 1 * 60 * 1000,
  limit: isProduction ? 30 : 120,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  keyGenerator: buildScopedKey,
  handler: (req, res, next, options) => {
    logger.warn(`Refresh rate limit hit`, {
      path: req.path,
      method: req.method,
      ip: req.ip,
      forwardedFor: req.headers['x-forwarded-for'],
      origin: req.headers.origin,
      userAgent: req.headers['user-agent'],
      windowMs: options.windowMs,
      limit: options.limit
    });
    res.status(options.statusCode).json({
      success: false,
      message: `Too many session refresh attempts, please try again after ${Math.ceil(options.windowMs / 60000)} minute`,
      requestId: req.id
    });
  }
});
