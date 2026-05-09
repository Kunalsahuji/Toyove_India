import { apiRequest } from './api'

export const updateMyProfile = async (data) => {
  const payload = await apiRequest('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
  return payload.data
}
