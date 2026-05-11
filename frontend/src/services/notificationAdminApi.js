import { apiRequest } from './api';

export const getAdminNotifications = async ({ page = 1, limit = 30, unreadOnly = false } = {}) => {
  const params = new URLSearchParams({ page, limit, unreadOnly });
  const payload = await apiRequest(`/notifications/admin?${params}`);
  return payload;
};

export const getAdminUnreadCount = async () => {
  const payload = await apiRequest('/notifications/admin/unread-count');
  return payload.data?.unread || 0;
};

export const markAdminNotificationsRead = async (ids = null) => {
  const payload = await apiRequest('/notifications/admin/mark-read', {
    method: 'PATCH',
    body: JSON.stringify(ids ? { ids } : {}),
  });
  return payload;
};
