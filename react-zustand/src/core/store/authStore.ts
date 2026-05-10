import { create } from 'zustand'
import { TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from '@/constants/app.constants'
import type { AuthUser, TokenResponse } from '@/features/auth/types/auth.types'

interface AuthStore {
  token: string | null
  user: AuthUser | null
  setCredentials: (tokens: TokenResponse, user: AuthUser) => void
  logout: () => void
}

// Rehydrate auth state from localStorage on page load so the user stays
// logged in across refreshes without a round-trip to the server.
const storedToken = localStorage.getItem(TOKEN_KEY)
const storedUser = localStorage.getItem(USER_KEY)

export const useAuthStore = create<AuthStore>((set) => ({
  token: storedToken,
  user: storedUser ? (JSON.parse(storedUser) as AuthUser) : null,

  // Called after a successful login: stores tokens and user profile both in
  // Zustand (for reactive UI updates) and in localStorage (for persistence).
  setCredentials: (tokens, user) => {
    localStorage.setItem(TOKEN_KEY, tokens.accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    set({ token: tokens.accessToken, user })
  },

  // Clears the session from both Zustand state and localStorage so subsequent
  // page loads start unauthenticated.
  logout: () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    set({ token: null, user: null })
  },
}))
