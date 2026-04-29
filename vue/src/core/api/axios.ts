import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { TOKEN_KEY } from '@/constants/app.constants'

// Shared axios instance used by every API call in the app.
// baseURL comes from the VITE_API_BASE_URL env variable so it can differ
// between dev, staging, and production without code changes.
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Attach the stored JWT to every outgoing request so the server can
// identify the caller without requiring credentials on each call site.
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Global response error handler:
// • 401 means the token is expired or invalid — clear storage and redirect
//   to the login page so the user can re-authenticate.
// • For all other errors, normalise the message to a plain string so call
//   sites never have to inspect raw Axios error shapes.
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const status = error.response?.status

    if (status === 401) {
      localStorage.removeItem(TOKEN_KEY)
      // Avoid circular dependency by using window.location instead of router import
      window.location.href = '/login'
    }

    const message: string =
      error.response?.data?.message ?? error.message ?? 'An unexpected error occurred'

    return Promise.reject(new Error(message))
  },
)

export default apiClient
