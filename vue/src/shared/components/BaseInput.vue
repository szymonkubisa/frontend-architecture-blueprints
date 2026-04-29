<template>
  <div class="input-wrapper">
    <input
      :id="id"
      v-bind="$attrs"
      :type="type"
      :value="modelValue"
      :class="['input', { 'input--error': !!error }]"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="error" class="input-error" role="alert">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
// inheritAttrs: false lets us forward $attrs (class, placeholder, autocomplete,
// etc.) directly onto the <input> via v-bind="$attrs" rather than the wrapper div.
defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{
    modelValue?: string
    type?: string
    id?: string
    error?: string
  }>(),
  { type: 'text', modelValue: '', error: '' },
)

// Follows Vue's v-model convention so the parent can use v-model on this component.
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  color: var(--color-text-primary);
  background: var(--color-surface);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;
}
.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-soft);
}
.input--error {
  border-color: var(--color-error);
}
.input--error:focus {
  box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.15);
}
.input-error {
  font-size: 0.75rem;
  color: var(--color-error);
  margin: 0;
}
</style>
