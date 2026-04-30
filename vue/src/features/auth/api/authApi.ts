import apiClient from '@/core/api/axios'
import type { ApiResponse } from '@/core/api/types'
import { API_PATHS } from '@/constants/app.constants'
import type { LoginPayload, TokenResponse, AuthUser } from '../types/auth.types'

// Plain object (not a class or Pinia store) — keeps HTTP concerns separate from
// state management. The auth store calls these methods and owns the resulting data.
export const authApi = {
  login(payload: LoginPayload): Promise<ApiResponse<TokenResponse>> {
    return apiClient.post(API_PATHS.AUTH.LOGIN, payload).then((r) => r.data)
  },

  logout(): Promise<void> {
    return apiClient.post(API_PATHS.AUTH.LOGOUT).then(() => undefined)
  },

  // Exchanges a refresh token for a new access token when the current one expires.
  refresh(refreshToken: string): Promise<ApiResponse<TokenResponse>> {
    return apiClient.post(API_PATHS.AUTH.REFRESH, { refreshToken }).then((r) => r.data)
  },

  // Fetches the currently authenticated user's profile using the token that is
  // attached automatically by the axios request interceptor.
  getMe(): Promise<ApiResponse<AuthUser>> {
    return apiClient.get(API_PATHS.AUTH.ME).then((r) => r.data)
  },
}
