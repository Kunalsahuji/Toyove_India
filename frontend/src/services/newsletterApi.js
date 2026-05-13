import { apiRequest } from './api';

export const subscribeToNewsletter = async (email) => {
  return await apiRequest('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

export const unsubscribeFromNewsletter = async (email) => {
  return await apiRequest('/newsletter/unsubscribe', {
    method: 'PATCH',
    body: JSON.stringify({ email }),
  });
};

// Admin Functions
export const getAllSubscribers = async () => {
  return await apiRequest('/newsletter', {
    method: 'GET',
  });
};

export const deleteSubscriber = async (id) => {
  return await apiRequest(`/newsletter/${id}`, {
    method: 'DELETE',
  });
};
