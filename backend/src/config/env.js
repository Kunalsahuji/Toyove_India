import dotenv from 'dotenv';
dotenv.config();

const normalizeOrigin = (url) => url.trim().replace(/\/+$/, '');

const defaultDevOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:3000',
];

const configuredOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map(normalizeOrigin)
  .filter(Boolean);

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  ALLOWED_ORIGINS: [
    ...new Set([
      ...configuredOrigins,
      ...((process.env.NODE_ENV || 'development') === 'development' ? defaultDevOrigins : []),
    ]),
  ],
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  COOKIE_SECURE: process.env.COOKIE_SECURE === 'true',
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

const validateEnv = () => {
  if (env.NODE_ENV !== 'test') {
    if (!env.MONGO_URI) {
      throw new Error('MONGO_URI is required in non-test environment');
    }
    if (!env.JWT_ACCESS_SECRET || !env.JWT_REFRESH_SECRET) {
      throw new Error('JWT_ACCESS_SECRET and JWT_REFRESH_SECRET are required in non-test environment');
    }
  }
};

// Validate variables and throw if missing required ones
validateEnv();

export default env;
