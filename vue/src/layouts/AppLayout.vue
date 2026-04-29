<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="sidebar-logo">
        <span class="logo-text">{{ appName }}</span>
      </div>
      <nav class="sidebar-nav">
        <RouterLink :to="{ name: ROUTE_NAMES.DASHBOARD }" class="nav-item">
          Dashboard
        </RouterLink>
      </nav>
      <div class="sidebar-footer">
        <span class="user-name">{{ authStore.fullName }}</span>
        <button class="logout-btn" @click="handleLogout">Sign out</button>
      </div>
    </aside>

    <div class="main-wrapper">
      <header class="top-bar">
        <slot name="header" />
      </header>
      <main class="main-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth/store/authStore'
import { APP_NAME, ROUTE_NAMES } from '@/constants/app.constants'

const appName = APP_NAME
const authStore = useAuthStore()
const router = useRouter()

async function handleLogout() {
  await authStore.logout()
  router.push({ name: ROUTE_NAMES.LOGIN })
}
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 240px;
  display: flex;
  flex-direction: column;
  background: var(--color-surface-elevated);
  border-right: 1px solid var(--color-border);
  padding: 1.5rem 1rem;
  flex-shrink: 0;
}
.sidebar-logo {
  margin-bottom: 2rem;
}
.logo-text {
  font-size: 1.125rem;
  font-weight: 700;
}
.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.nav-item {
  padding: 0.625rem 0.75rem;
  border-radius: var(--radius-sm);
  text-decoration: none;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  transition: background 0.15s;
}
.nav-item:hover,
.nav-item.router-link-active {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}
.sidebar-footer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}
.user-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-primary);
}
.logout-btn {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: 0;
}
.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.top-bar {
  height: 56px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
}
.main-content {
  flex: 1;
  overflow-y: auto;
}
</style>
