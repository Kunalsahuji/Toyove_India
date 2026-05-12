import { apiRequest } from './api'

export const getPageContent = async (slug) => {
  const payload = await apiRequest(`/pages/${slug}`)
  return payload.data
}

export const getAdminPages = async () => {
  const payload = await apiRequest('/admin/pages')
  return payload.data || []
}

export const updateAdminPage = async (data) => {
  const payload = await apiRequest('/admin/pages', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return payload.data
}
