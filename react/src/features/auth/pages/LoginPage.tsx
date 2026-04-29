import { useNavigate, useLocation } from 'react-router-dom'
import AuthLayout from '@/layouts/AuthLayout'
import LoginForm from '../components/LoginForm'
import { useLoginMutation } from '../api/authApi'
import { ROUTE_PATHS } from '@/constants/app.constants'
import type { LoginPayload } from '../types/auth.types'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [login, { error }] = useLoginMutation()

  // After a successful login, go back to wherever the user was trying to reach
  // before the router guard redirected them here. Fall back to the dashboard
  // if there's no saved location (e.g. direct navigation to /login).
  const from = (location.state as { from?: Location })?.from?.pathname ?? ROUTE_PATHS.DASHBOARD

  async function handleLogin(payload: LoginPayload) {
    // unwrap() re-throws on error so the LoginForm's finally block still runs
    // and the error propagates up to the RTK Query error state below.
    await login(payload).unwrap()
    navigate(from, { replace: true })
  }

  // RTK Query errors can have various shapes; normalise to a plain string
  // so LoginForm only has to deal with an optional message prop.
  const errorMessage =
    error && 'message' in error ? (error as { message: string }).message : undefined

  return (
    <AuthLayout heading="Sign in to your account" subheading="Enter your credentials to access the dashboard">
      <LoginForm onSubmit={handleLogin} error={errorMessage} />
    </AuthLayout>
  )
}
