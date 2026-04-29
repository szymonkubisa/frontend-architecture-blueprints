import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAMES } from '@/constants/app.constants'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: ROUTE_NAMES.LOGIN,
    component: () => import('./views/LoginView.vue'),
    meta: { guestOnly: true },
  },
]
