import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '../api/authApi'
import type { AuthUser, LoginPayload } from '../types/auth.types'
import { TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from '@/constants/app.constants'

export const useAuthStore = defineStore('auth', () => {
  // Rehydrate from localStorage on page load so the user remains logged in
  // across browser refreshes without a server round-trip.
  const user = ref<AuthUser | null>(JSON.parse(localStorage.getItem(USER_KEY) ?? 'null'))
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))
  const refreshToken = ref<string | null>(localStorage.getItem(REFRESH_TOKEN_KEY))

  // Require both a token AND a populated user to be considered authenticated,
  // guarding against partially-written state from an interrupted login flow.
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const fullName = computed(() =>
    user.value ? `${user.value.firstName} ${user.value.lastName}` : '',
  )

  async function login(payload: LoginPayload) {
    const { data: tokens } = await authApi.login(payload)

    // Persist tokens in localStorage first so the axios interceptor can attach
    // the Authorization header on the immediately following /auth/me request.
    token.value = tokens.accessToken
    refreshToken.value = tokens.refreshToken
    localStorage.setItem(TOKEN_KEY, tokens.accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)

    const { data: me } = await authApi.getMe()
    user.value = me
    localStorage.setItem(USER_KEY, JSON.stringify(me))
  }

  async function logout() {
    try {
      await authApi.logout()
    } finally {
      // Always clear local state even if the server call fails, so the user
      // is never stuck in a logged-in state with an invalid/expired token.
      $reset()
    }
  }

  // Centralised cleanup called by logout and any future token-expiry handler.
  function $reset() {
    user.value = null
    token.value = null
    refreshToken.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  return { user, token, isAuthenticated, fullName, login, logout, $reset }
})
