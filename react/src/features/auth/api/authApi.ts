import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@/core/api/baseQuery'
import { API_PATHS } from '@/constants/app.constants'
import { setCredentials, logout } from '../slices/authSlice'
import type { LoginPayload, TokenResponse, AuthUser } from '../types/auth.types'
import type { ApiResponse } from '@/core/api/types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    // Login mutation: posts credentials, then immediately fetches the user
    // profile (/auth/me) so the store has full user data in a single flow.
    login: builder.mutation<ApiResponse<TokenResponse>, LoginPayload>({
      query: (credentials) => ({
        url: API_PATHS.AUTH.LOGIN,
        method: 'POST',
        data: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data: tokenResponse } = await queryFulfilled
        // Fetch the user profile right after receiving tokens so the app
        // can display user info without a separate navigation or re-render.
        const meResult = await dispatch(authApi.endpoints.getMe.initiate(undefined))
        if ('data' in meResult) {
          dispatch(
            setCredentials({
              tokens: tokenResponse.data,
              user: (meResult.data as ApiResponse<AuthUser>).data,
            }),
          )
        }
      },
    }),

    // Logout mutation: tells the server to invalidate the session, then clears
    // local auth state regardless of whether the server call succeeds — so a
    // network error during logout still signs the user out locally.
    logout: builder.mutation<void, void>({
      query: () => ({ url: API_PATHS.AUTH.LOGOUT, method: 'POST' }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await queryFulfilled.catch(() => undefined)
        dispatch(logout())
      },
    }),

    // Used internally after login to populate the user profile in the store.
    getMe: builder.query<ApiResponse<AuthUser>, undefined>({
      query: () => ({ url: API_PATHS.AUTH.ME }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation } = authApi
