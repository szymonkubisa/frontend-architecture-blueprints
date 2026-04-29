import { ref } from 'vue'

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
      return null
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, error, withLoading }
}
