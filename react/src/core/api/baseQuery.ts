import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import apiClient from './axios'

/**
 * RTK Query base query built on top of the shared axios instance.
 * This means all interceptors (auth headers, 401 redirect, error
 * normalisation) apply automatically to every RTK Query endpoint.
 */
export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig['method']
      data?: unknown
      params?: unknown
    },
    unknown,
    { message: string; status?: number }
  > =>
  async ({ url, method = 'GET', data, params }) => {
    try {
      const result = await apiClient({ url, method, data, params })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError<{ message?: string }>
      return {
        error: {
          status: err.response?.status,
          message: err.response?.data?.message ?? err.message,
        },
      }
    }
  }
