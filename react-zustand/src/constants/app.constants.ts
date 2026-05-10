export const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'MyApp'

// localStorage keys — centralised here so a rename only needs one change.
export const TOKEN_KEY = 'auth_token'
export const REFRESH_TOKEN_KEY = 'auth_refresh_token'
export const USER_KEY = 'auth_user'

// `as const` makes each value a narrow string literal type, which lets the
// router accept these constants without widening them to `string`.
export const ROUTE_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
} as const

// API endpoint paths relative to the baseURL defined in the axios instance.
export const API_PATHS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
  },
} as const
