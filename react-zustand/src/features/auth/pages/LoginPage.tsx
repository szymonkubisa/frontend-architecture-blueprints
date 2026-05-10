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
    await login(payload)
    navigate(from, { replace: true })
  }

  const errorMessage = error?.message

  return (
    <AuthLayout heading="Sign in to your account" subheading="Enter your credentials to access the dashboard">
      <LoginForm onSubmit={handleLogin} error={errorMessage} />
    </AuthLayout>
  )
}
