const API_BASE_URL = 'http://localhost:5000/api' // Adjust this to your backend URL

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
  // Authentication
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  // Dashboard
  getDashboardStats: () => apiRequest('/dashboard/stats'),

  // Students
  getStudents: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/students?${queryString}`)
  },

  getStudent: (id) => apiRequest(`/students/${id}`),

  createStudent: (studentData) => apiRequest('/students', {
    method: 'POST',
    body: JSON.stringify(studentData),
  }),

  updateStudent: (id, studentData) => apiRequest(`/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify(studentData),
  }),

  deleteStudent: (id) => apiRequest(`/students/${id}`, {
    method: 'DELETE',
  }),

  // Incidents
  getIncidents: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiRequest(`/incidents?${queryString}`)
  },

  createIncident: (incidentData) => apiRequest('/incidents', {
    method: 'POST',
    body: JSON.stringify(incidentData),
  }),

  updateIncident: (id, incidentData) => apiRequest(`/incidents/${id}`, {
    method: 'PUT',
    body: JSON.stringify(incidentData),
  }),

  // Reports
  generateReport: (reportData) => apiRequest('/reports/generate', {
    method: 'POST',
    body: JSON.stringify(reportData),
  }),
}

export default api
