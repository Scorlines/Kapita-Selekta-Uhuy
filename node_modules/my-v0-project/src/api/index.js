const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  // Add auth token if available
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new ApiError(data.message || 'API request failed', response.status)
    }

    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError('Network error', 0)
  }
}

export const api = {
  // Report History
  saveReport: (report) => apiRequest('/history', {
    method: 'POST',
    body: JSON.stringify(report),
  }),

  getReports: () => apiRequest('/history'),

  getReport: (id) => apiRequest(`/history/${id}`),

  updateReport: (id, data) => apiRequest(`/history/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  deleteReport: (id) => apiRequest(`/history/${id}`, {
    method: 'DELETE',
  }),
}

export default api