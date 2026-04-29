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
    login: builder.mutation<ApiResponse<TokenResponse>, LoginPayload>({
      query: (credentials) => ({
        url: API_PATHS.AUTH.LOGIN,
        method: 'POST',
        data: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data: tokenResponse } = await queryFulfilled
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

    logout: builder.mutation<void, void>({
      query: () => ({ url: API_PATHS.AUTH.LOGOUT, method: 'POST' }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await queryFulfilled.catch(() => undefined)
        dispatch(logout())
      },
    }),

    getMe: builder.query<ApiResponse<AuthUser>, undefined>({
      query: () => ({ url: API_PATHS.AUTH.ME }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation } = authApi
