import { useEffect, useState } from 'react'
import AppLayout from '@/layouts/AppLayout'
import DashboardStats from '../components/DashboardStats'
import Button from '@/shared/components/Button/Button'
import { useAuth } from '@/features/auth/hooks/useAuth'
import apiClient from '@/core/api/axios'
import { API_PATHS } from '@/constants/app.constants'

interface Stat {
  label: string
  value: string | number
  change: number
}

export default function DashboardPage() {
  const { fullName } = useAuth()
  const [stats, setStats] = useState<Stat[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadStats() {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await apiClient.get(API_PATHS.DASHBOARD.STATS)
      // The API wraps the payload in a `data` envelope — unwrap one level.
      setStats(data.data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load stats')
    } finally {
      setIsLoading(false)
    }
  }

  // Load stats once on mount. loadStats is also wired to the Retry button
  // so it's defined outside useEffect to keep it accessible in the JSX below.
  useEffect(() => {
    loadStats()
  }, [])

  return (
    <AppLayout>
      <div style={{ padding: '2rem' }}>
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Dashboard</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
            Welcome back, {fullName}
          </p>
        </header>

        {isLoading && <p>Loading stats…</p>}

        {error && !isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
            <p role="alert" style={{ color: 'var(--color-error)' }}>
              {error}
            </p>
            <Button variant="secondary" onClick={loadStats}>
              Retry
            </Button>
          </div>
        )}

        {!isLoading && !error && <DashboardStats stats={stats} />}
      </div>
    </AppLayout>
  )
}
