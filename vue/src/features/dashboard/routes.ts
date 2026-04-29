import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAMES } from '@/constants/app.constants'

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: ROUTE_NAMES.DASHBOARD,
    // Lazy-load the view so its bundle is only fetched when the user navigates here.
    component: () => import('./views/DashboardView.vue'),
    // requiresAuth: the global navigation guard redirects unauthenticated users to /login.
    meta: { requiresAuth: true },
  },
]
