import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/shared/hooks/useAppSelector'
import { selectIsAuthenticated } from '@/features/auth/slices/authSlice'
import { ROUTE_PATHS } from '@/constants/app.constants'

// Lazy-load page-level components so their bundles are only fetched when the
// user actually navigates to that route, keeping the initial bundle small.
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'))
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'))

// Wrapper for routes that require authentication.
// Unauthenticated visitors are redirected to /login; the current location is
// passed as `state.from` so LoginPage can send them back after a successful login.
function ProtectedRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.LOGIN} state={{ from: location }} replace />
  }

  return (
    <Suspense fallback={<div>Loading…</div>}>
      <Outlet />
    </Suspense>
  )
}

// Wrapper for routes that should only be accessible when NOT logged in (e.g. /login).
// Authenticated users are bounced straight to the dashboard.
function GuestRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.DASHBOARD} replace />
  }

  return (
    <Suspense fallback={<div>Loading…</div>}>
      <Outlet />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  // Redirect the bare root path to the dashboard.
  {
    path: ROUTE_PATHS.HOME,
    element: <Navigate to={ROUTE_PATHS.DASHBOARD} replace />,
  },
  // Guest-only section: accessible only when the user is NOT authenticated.
  {
    element: <GuestRoute />,
    children: [
      { path: ROUTE_PATHS.LOGIN, element: <LoginPage /> },
    ],
  },
  // Protected section: accessible only when the user IS authenticated.
  {
    element: <ProtectedRoute />,
    children: [
      { path: ROUTE_PATHS.DASHBOARD, element: <DashboardPage /> },
    ],
  },
  {
    path: '*',
    element: <div>404 – Page not found</div>,
  },
])
