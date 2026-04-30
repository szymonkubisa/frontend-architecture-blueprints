import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/slices/authSlice'
import { authApi } from '@/features/auth/api/authApi'

// Central Redux store.
// authApi.middleware must be added so RTK Query can manage caching,
// invalidation, and polling for every generated endpoint automatically.
export const store = configureStore({
  reducer: {
    // auth slice holds the current user and session token.
    auth: authReducer,
    // RTK Query stores its own cache under the authApi.reducerPath key.
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

// Derive types from the store itself so they stay in sync with the reducer map.
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
