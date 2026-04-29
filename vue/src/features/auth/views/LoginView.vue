<template>
  <AuthLayout>
    <template #heading>Sign in to your account</template>
    <template #subheading>
      Enter your credentials to access the dashboard
    </template>

    <LoginForm @submit="handleLogin" />

    <template #footer>
      <p>
        Forgot your password?
        <RouterLink :to="{ name: 'forgot-password' }">Reset it here</RouterLink>
      </p>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import LoginForm from '../components/LoginForm.vue'
import { useAuthStore } from '../store/authStore'
import { ROUTE_NAMES } from '@/constants/app.constants'
import type { LoginPayload } from '../types/auth.types'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

async function handleLogin(payload: LoginPayload) {
  await authStore.login(payload)
  // After a successful login, go back to wherever the user was trying to reach
  // before the router guard redirected them here. Fall back to the dashboard
  // if there is no saved redirect path (e.g. direct navigation to /login).
  const redirect = (route.query.redirect as string) ?? { name: ROUTE_NAMES.DASHBOARD }
  router.push(redirect)
}
</script>
