const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const buildHeaders = (options = {}) => {
  const headers = new Headers(options.headers || {})
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  return headers
}

const shouldTryRefresh = (path) => !path.startsWith('/auth/') || path === '/auth/me'

export async function apiRequest(path, options = {}, meta = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    headers: buildHeaders(options),
    ...options,
  })

  const payload = await response.json().catch(() => ({}))

  if (response.status === 401 && shouldTryRefresh(path) && !meta.skipRefresh) {
    const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })

    if (refreshResponse.ok) {
      return apiRequest(path, options, { skipRefresh: true })
    }
  }

  if (!response.ok) {
    throw new Error(payload.message || 'Request failed')
  }

  return payload
}

export { API_BASE_URL }
