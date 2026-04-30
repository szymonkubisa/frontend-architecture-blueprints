import { ref } from 'vue'

// Composable for tracking async operation state.
// Wrapping a call in `withLoading` handles the isLoading flag and error
// message automatically, so callers don't have to repeat that boilerplate.
export function useLoading() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function withLoading<T>(fn: () => Promise<T>): Promise<T | null> {
    isLoading.value = true
    error.value = null
    try {
      return await fn()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An unexpected error occurred'
      // Return null instead of re-throwing so callers can check the reactive
      // `error` ref rather than wrapping every call in its own try/catch.
      return null
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, error, withLoading }
}
