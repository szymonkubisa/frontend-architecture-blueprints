import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { useAuthStore } from '@/features/auth/store/authStore'
import { authRoutes } from '@/features/auth/routes'
import { dashboardRoutes } from '@/features/dashboard/routes'
import { ROUTE_NAMES } from '@/constants/app.constants'

const routes: RouteRecordRaw[] = [
  // Redirect the root path to the dashboard so there is no blank landing page.
  {
    path: '/',
    redirect: { name: ROUTE_NAMES.DASHBOARD },
  },
  // Feature-owned route arrays are spread here to keep the router definition
  // thin while letting each feature manage its own routes independently.
  ...authRoutes,
  ...dashboardRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/shared/components/BaseNotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Always scroll to the top of the page on every navigation.
  scrollBehavior: () => ({ top: 0 }),
})

// Global navigation guard that enforces access control based on route meta flags:
// • requiresAuth — redirect unauthenticated users to /login and preserve the
//   intended path so they can be sent back after a successful login.
// • guestOnly — redirect already-authenticated users away from pages like /login.
router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: ROUTE_NAMES.LOGIN, query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { name: ROUTE_NAMES.DASHBOARD }
  }
})

export function setupRouter(app: App) {
  app.use(router)
}

export { router }
