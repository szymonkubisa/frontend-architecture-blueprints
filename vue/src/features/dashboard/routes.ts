import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAMES } from '@/constants/app.constants'

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: ROUTE_NAMES.DASHBOARD,
    component: () => import('./views/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
]
