import { useState, type FormEvent } from 'react'
import Button from '@/shared/components/Button/Button'
import Input from '@/shared/components/Input/Input'
import type { LoginPayload } from '../types/auth.types'
import styles from './LoginForm.module.css'

interface Props {
  onSubmit: (payload: LoginPayload) => Promise<void>
  error?: string
}

export default function LoginForm({ onSubmit, error }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)

  function validate(): boolean {
    const next = { email: '', password: '' }
    if (!email) {
      next.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Enter a valid email address'
    }
    if (!password) {
      next.password = 'Password is required'
    } else if (password.length < 8) {
      next.password = 'Password must be at least 8 characters'
    }
    setFieldErrors(next)
    return !next.email && !next.password
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    try {
      await onSubmit({ email, password })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          error={fieldErrors.email}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          error={fieldErrors.password}
        />
      </div>

      {error && (
        <p className={styles.submitError} role="alert">
          {error}
        </p>
      )}

      <Button type="submit" variant="primary" loading={isLoading} fullWidth>
        Sign in
      </Button>
    </form>
  )
}
