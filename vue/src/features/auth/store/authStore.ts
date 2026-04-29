import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '../api/authApi'
import type { AuthUser, LoginPayload } from '../types/auth.types'
import { TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from '@/constants/app.constants'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(JSON.parse(localStorage.getItem(USER_KEY) ?? 'null'))
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))
  const refreshToken = ref<string | null>(localStorage.getItem(REFRESH_TOKEN_KEY))

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const fullName = computed(() =>
    user.value ? `${user.value.firstName} ${user.value.lastName}` : '',
  )

  async function login(payload: LoginPayload) {
    const { data: tokens } = await authApi.login(payload)

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
      $reset()
    }
  }

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
