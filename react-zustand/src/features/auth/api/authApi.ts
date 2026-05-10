import { useState } from 'react'
import apiClient from '@/core/api/axios'
import { API_PATHS } from '@/constants/app.constants'
import { useAuthStore } from '@/core/store/authStore'
import type { LoginPayload, TokenResponse, AuthUser } from '../types/auth.types'
import type { ApiResponse } from '@/core/api/types'

// Login hook: posts credentials, fetches the user profile, then persists both
// in the Zustand auth store — mirroring the RTK Query onQueryStarted flow.
export function useLoginMutation() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { setCredentials } = useAuthStore()

  async function login(payload: LoginPayload): Promise<void> {
    setIsLoading(true)
    setError(null)
    try {
      const { data: tokenResponse } = await apiClient.post<ApiResponse<TokenResponse>>(
        API_PATHS.AUTH.LOGIN,
        payload,
      )
      const { data: meResponse } = await apiClient.get<ApiResponse<AuthUser>>(API_PATHS.AUTH.ME)
      setCredentials(tokenResponse.data, meResponse.data)
    } catch (e) {
      const err = e instanceof Error ? e : new Error('Login failed')
      setError(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return [login, { isLoading, error }] as const
}

// Logout hook: tells the server to invalidate the session, then clears
// local auth state regardless of whether the server call succeeds.
export function useLogoutMutation() {
  const [isLoading, setIsLoading] = useState(false)
  const { logout } = useAuthStore()

  async function logoutFn(): Promise<void> {
    setIsLoading(true)
    try {
      await apiClient.post(API_PATHS.AUTH.LOGOUT)
    } catch {
      // Server error during logout is ignored — the user is still signed out locally.
    } finally {
      logout()
      setIsLoading(false)
    }
  }

  return [logoutFn, { isLoading }] as const
}
