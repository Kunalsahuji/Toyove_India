import { apiRequest } from './api'

export const getMyPreferences = async () => {
  const payload = await apiRequest('/users/me/preferences')
  return payload.data || { cart: [], wishlist: [], compare: [] }
}

export const updateMyPreferences = async (preferences) => {
  const payload = await apiRequest('/users/me/preferences', {
    method: 'PATCH',
    body: JSON.stringify(preferences),
  })
  return payload.data || { cart: [], wishlist: [], compare: [] }
}
