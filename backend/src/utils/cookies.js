import env from '../config/env.js';
import { parseDurationToMs } from './duration.js';

const getCookieOptions = (type) => {
  const maxAgeAccess = parseDurationToMs(env.JWT_ACCESS_EXPIRES_IN || '15m');
  const maxAgeRefresh = parseDurationToMs(env.JWT_REFRESH_EXPIRES_IN || '7d');

  return {
    httpOnly: true,
    secure: env.COOKIE_SECURE || env.NODE_ENV === 'production',
    sameSite: env.COOKIE_SECURE || env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: type === 'access' ? maxAgeAccess : maxAgeRefresh,
    ...(env.COOKIE_DOMAIN && { domain: env.COOKIE_DOMAIN })
  };
};

export const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie('accessToken', accessToken, getCookieOptions('access'));
  res.cookie('refreshToken', refreshToken, getCookieOptions('refresh'));
};

export const clearAuthCookies = (res) => {
  const options = {
    httpOnly: true,
    secure: env.COOKIE_SECURE || env.NODE_ENV === 'production',
    sameSite: env.COOKIE_SECURE || env.NODE_ENV === 'production' ? 'none' : 'lax',
    ...(env.COOKIE_DOMAIN && { domain: env.COOKIE_DOMAIN })
  };
  res.clearCookie('accessToken', options);
  res.clearCookie('refreshToken', options);
};
