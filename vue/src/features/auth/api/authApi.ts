import apiClient from '@/core/api/axios'
import type { ApiResponse } from '@/core/api/types'
import { API_PATHS } from '@/constants/app.constants'
import type { LoginPayload, TokenResponse, AuthUser } from '../types/auth.types'

export const authApi = {
  login(payload: LoginPayload): Promise<ApiResponse<TokenResponse>> {
    return apiClient.post(API_PATHS.AUTH.LOGIN, payload).then((r) => r.data)
  },

  logout(): Promise<void> {
    return apiClient.post(API_PATHS.AUTH.LOGOUT).then(() => undefined)
  },

  refresh(refreshToken: string): Promise<ApiResponse<TokenResponse>> {
    return apiClient.post(API_PATHS.AUTH.REFRESH, { refreshToken }).then((r) => r.data)
  },

  getMe(): Promise<ApiResponse<AuthUser>> {
    return apiClient.get(API_PATHS.AUTH.ME).then((r) => r.data)
  },
}
