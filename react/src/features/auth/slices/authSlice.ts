import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/core/store'
import type { AuthState, AuthUser, TokenResponse } from '../types/auth.types'
import { TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from '@/constants/app.constants'

const storedToken = localStorage.getItem(TOKEN_KEY)
const storedUser = localStorage.getItem(USER_KEY)

const initialState: AuthState = {
  token: storedToken,
  user: storedUser ? (JSON.parse(storedUser) as AuthUser) : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ tokens: TokenResponse; user: AuthUser }>) {
      const { tokens, user } = action.payload
      state.token = tokens.accessToken
      state.user = user
      localStorage.setItem(TOKEN_KEY, tokens.accessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    },
    logout(state) {
      state.token = null
      state.user = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export const selectIsAuthenticated = (state: RootState) =>
  !!state.auth.token && !!state.auth.user

export const selectCurrentUser = (state: RootState) => state.auth.user

export default authSlice.reducer
