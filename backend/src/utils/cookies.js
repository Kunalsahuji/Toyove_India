import env from '../config/env.js';
import { parseDurationToMs } from './duration.js';
import logger from './logger.js';

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
  const accessOptions = getCookieOptions('access');
  const refreshOptions = getCookieOptions('refresh');
  res.cookie('accessToken', accessToken, accessOptions);
  res.cookie('refreshToken', refreshToken, refreshOptions);
  logger.info('Auth cookies set', {
    secure: accessOptions.secure,
    sameSite: accessOptions.sameSite,
    hasDomain: Boolean(accessOptions.domain),
    accessMaxAge: accessOptions.maxAge,
    refreshMaxAge: refreshOptions.maxAge
  });
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
  logger.info('Auth cookies cleared', {
    secure: options.secure,
    sameSite: options.sameSite,
    hasDomain: Boolean(options.domain)
  });
};
