<template>
  <div class="auth-layout">
    <div class="auth-card">
      <div class="auth-card-header">
        <h1 class="auth-heading">
          <slot name="heading" />
        </h1>
        <p class="auth-subheading">
          <slot name="subheading" />
        </p>
      </div>

      <div class="auth-card-body">
        <slot />
      </div>

      <div v-if="$slots.footer" class="auth-card-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  padding: 1.5rem;
}
.auth-card {
  width: 100%;
  max-width: 420px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-md);
}
.auth-card-header {
  margin-bottom: 1.75rem;
  text-align: center;
}
.auth-heading {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: var(--color-text-primary);
}
.auth-subheading {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}
.auth-card-footer {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  text-align: center;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}
</style>
