import { useState, useCallback } from 'react'

// Generic hook for tracking async operation state.
// Wrapping a call in `withLoading` handles the isLoading flag and error
// message automatically, so callers don't have to repeat that boilerplate.
export function useLoading() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // useCallback keeps the function reference stable across renders so it can
  // safely be listed as a dependency in a parent's useEffect without causing
  // an infinite loop.
  const withLoading = useCallback(async <T>(fn: () => Promise<T>): Promise<T | null> => {
    setIsLoading(true)
    setError(null)
    try {
      return await fn()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unexpected error occurred')
      // Return null instead of re-throwing so callers can check the `error`
      // state rather than wrapping every call in its own try/catch.
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { isLoading, error, withLoading }
}
