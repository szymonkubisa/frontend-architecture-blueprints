<template>
  <AppLayout>
    <div class="dashboard">
      <header class="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {{ authStore.fullName }}</p>
      </header>

      <section v-if="isLoading" class="loading-state">
        <span>Loading stats…</span>
      </section>

      <section v-else-if="error" class="error-state" role="alert">
        <p>Failed to load dashboard data: {{ error }}</p>
        <BaseButton variant="secondary" @click="loadStats">Retry</BaseButton>
      </section>

      <DashboardStats v-else :stats="stats" />
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import DashboardStats from '../components/DashboardStats.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import { useAuthStore } from '@/features/auth/store/authStore'
import { useLoading } from '@/shared/composables/useLoading'
import apiClient from '@/core/api/axios'
import { API_PATHS } from '@/constants/app.constants'

const authStore = useAuthStore()
const { isLoading, error, withLoading } = useLoading()

const stats = ref<Array<{ label: string; value: string | number; change: number }>>([])

async function loadStats() {
  await withLoading(async () => {
    const { data } = await apiClient.get(API_PATHS.DASHBOARD.STATS)
    stats.value = data.data
  })
}

onMounted(loadStats)
</script>

<script lang="ts">
import { ref } from 'vue'
</script>

<style scoped>
.dashboard {
  padding: 2rem;
}
.dashboard-header {
  margin-bottom: 2rem;
}
.dashboard-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}
.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem;
  color: var(--color-text-secondary);
}
</style>
