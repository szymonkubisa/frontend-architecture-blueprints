<template>
  <div class="stats-grid">
    <div v-for="stat in stats" :key="stat.label" class="stat-card">
      <span class="stat-label">{{ stat.label }}</span>
      <span class="stat-value">{{ stat.value }}</span>
      <span
        class="stat-change"
        :class="stat.change >= 0 ? 'positive' : 'negative'"
      >
        {{ stat.change >= 0 ? '+' : '' }}{{ stat.change }}%
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Stat {
  label: string
  value: string | number
  change: number
}

defineProps<{
  stats: Stat[]
}>()
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.stat-card {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1.25rem;
  background: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}
.stat-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
}
.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text-primary);
}
.stat-change {
  font-size: 0.875rem;
  font-weight: 500;
}
.positive { color: var(--color-success); }
.negative { color: var(--color-error); }
</style>
