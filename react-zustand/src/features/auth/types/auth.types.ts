export interface LoginPayload {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  avatarUrl?: string
}

export type UserRole = 'admin' | 'manager' | 'viewer'

export interface TokenResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface AuthState {
  user: AuthUser | null
  token: string | null
}
