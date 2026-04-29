<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="['btn', `btn--${variant}`, `btn--${size}`, { 'btn--loading': loading }]"
    v-bind="$attrs"
  >
    <span v-if="loading" class="btn-spinner" aria-hidden="true" />
    <slot />
  </button>
</template>

<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
  },
)
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: var(--radius-sm);
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;
  white-space: nowrap;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
/* Sizes */
.btn--sm { padding: 0.375rem 0.75rem; font-size: 0.8125rem; }
.btn--md { padding: 0.5rem 1rem;      font-size: 0.875rem; }
.btn--lg { padding: 0.75rem 1.5rem;   font-size: 1rem; }
/* Variants */
.btn--primary  { background: var(--color-primary); color: #fff; }
.btn--primary:hover:not(:disabled) { background: var(--color-primary-dark); }
.btn--secondary { background: var(--color-surface-elevated); color: var(--color-text-primary); border: 1px solid var(--color-border); }
.btn--secondary:hover:not(:disabled) { background: var(--color-border); }
.btn--danger   { background: var(--color-error); color: #fff; }
.btn--danger:hover:not(:disabled) { opacity: 0.85; }
.btn--ghost    { background: transparent; color: var(--color-primary); }
.btn--ghost:hover:not(:disabled) { background: var(--color-primary-soft); }
/* Spinner */
.btn-spinner {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
