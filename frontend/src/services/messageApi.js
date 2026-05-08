import { apiRequest } from './api'

const normalizeMessage = (message) => ({
  ...message,
  id: message._id || message.id,
  typeLabel: message.type === 'newsletter'
    ? 'Newsletter'
    : message.type === 'support'
      ? 'Support'
      : 'Contact',
})

export const submitContactMessage = async (data) => {
  const payload = await apiRequest('/messages/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return normalizeMessage(payload.data)
}

export const getAdminMessages = async () => {
  const payload = await apiRequest('/admin/messages')
  return (payload.data || []).map(normalizeMessage)
}

export const updateAdminMessageStatus = async (id, status) => {
  const payload = await apiRequest(`/admin/messages/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
  return normalizeMessage(payload.data)
}
