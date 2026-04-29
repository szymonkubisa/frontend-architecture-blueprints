<template>
  <form class="login-form" novalidate @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="email">Email</label>
      <BaseInput
        id="email"
        v-model="form.email"
        type="email"
        placeholder="you@example.com"
        autocomplete="email"
        :error="errors.email"
        required
      />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <BaseInput
        id="password"
        v-model="form.password"
        type="password"
        placeholder="••••••••"
        autocomplete="current-password"
        :error="errors.password"
        required
      />
    </div>

    <p v-if="submitError" class="error-message" role="alert">{{ submitError }}</p>

    <BaseButton type="submit" variant="primary" :loading="isLoading" class="w-full">
      Sign in
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseInput from '@/shared/components/BaseInput.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import type { LoginPayload } from '../types/auth.types'

// Emit the validated payload to the parent view rather than calling the API
// directly, keeping this component unaware of the network layer and testable in isolation.
const emit = defineEmits<{
  submit: [payload: LoginPayload]
}>()

const form = reactive<LoginPayload>({ email: '', password: '' })
const errors = reactive({ email: '', password: '' })
const submitError = ref('')
const isLoading = ref(false)

// Client-side validation runs before the network request to give instant
// feedback without a round-trip. Returns true only when both fields pass.
function validate(): boolean {
  errors.email = ''
  errors.password = ''

  if (!form.email) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address'
  }

  if (!form.password) {
    errors.password = 'Password is required'
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  }

  return !errors.email && !errors.password
}

async function handleSubmit() {
  submitError.value = ''
  if (!validate()) return

  isLoading.value = true
  try {
    // Spread form to emit a plain object — avoids passing the reactive proxy
    // to the parent, which could lead to unexpected reactivity side effects.
    emit('submit', { ...form })
  } finally {
    // Always re-enable the button even if the parent's handler throws, so
    // the user can correct their credentials and try again.
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}
.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
}
.error-message {
  font-size: 0.875rem;
  color: var(--color-error);
}
</style>
