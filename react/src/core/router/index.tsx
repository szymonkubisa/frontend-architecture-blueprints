import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/shared/hooks/useAppSelector'
import { selectIsAuthenticated } from '@/features/auth/slices/authSlice'
import { ROUTE_PATHS } from '@/constants/app.constants'

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'))
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'))

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
  {
    path: ROUTE_PATHS.HOME,
    element: <Navigate to={ROUTE_PATHS.DASHBOARD} replace />,
  },
  {
    element: <GuestRoute />,
    children: [
      { path: ROUTE_PATHS.LOGIN, element: <LoginPage /> },
    ],
  },
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
