import { useState, useCallback } from 'react'

export function useLoading() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const withLoading = useCallback(async <T>(fn: () => Promise<T>): Promise<T | null> => {
    setIsLoading(true)
    setError(null)
    try {
      return await fn()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unexpected error occurred')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { isLoading, error, withLoading }
}
