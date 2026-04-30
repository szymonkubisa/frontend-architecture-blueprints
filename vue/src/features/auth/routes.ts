import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAMES } from '@/constants/app.constants'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: ROUTE_NAMES.LOGIN,
    // Lazy-load the view so its bundle is only fetched when a user navigates to /login.
    component: () => import('./views/LoginView.vue'),
    // guestOnly: the global navigation guard redirects authenticated users away.
    meta: { guestOnly: true },
  },
]
