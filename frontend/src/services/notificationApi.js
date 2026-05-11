import { apiRequest } from './api';

export const saveFcmToken = async (token, platform = 'web') => {
  const payload = await apiRequest('/users/me/fcm-token', {
    method: 'POST',
    body: JSON.stringify({ token, platform }),
  });
  return payload.data;
};

export const removeFcmToken = async (token) => {
  const payload = await apiRequest('/users/me/fcm-token', {
    method: 'DELETE',
    body: JSON.stringify({ token }),
  });
  return payload.data;
};
