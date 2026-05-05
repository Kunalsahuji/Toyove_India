import { apiRequest } from './api'

const normalizeUser = (user) => ({
  ...user,
  id: user._id || user.id,
  name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
  joinedDate: user.createdAt ? new Date(user.createdAt).toISOString().slice(0, 10) : '',
})

export const getAdminUsers = async (params = {}) => {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, value)
    }
  })

  const payload = await apiRequest(`/admin/users${query.toString() ? `?${query}` : ''}`)
  return {
    users: (payload.data || []).map(normalizeUser),
    meta: payload.meta || {},
  }
}

export const getAdminUser = async (id) => {
  const payload = await apiRequest(`/admin/users/${id}`)
  return normalizeUser(payload.data)
}

export const createAdminUser = async (data) => {
  const payload = await apiRequest('/admin/users', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return normalizeUser(payload.data)
}

export const updateAdminUser = async (id, data) => {
  const payload = await apiRequest(`/admin/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
  return normalizeUser(payload.data)
}

export const updateAdminUserStatus = async (id, status) => {
  const payload = await apiRequest(`/admin/users/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
  return normalizeUser(payload.data)
}
