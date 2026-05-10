import { useAuthStore } from '@/core/store/authStore'

// Convenience hook that exposes the current auth state and a sign-out helper.
// Components should use this instead of reading the store directly so the
// access pattern stays consistent and easy to mock in tests.
export function useAuth() {
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)
  const logout = useAuthStore((s) => s.logout)

  // Require both a token AND a populated user object to be considered authenticated,
  // guarding against partially-written state from an interrupted login flow.
  const isAuthenticated = !!token && !!user

  // Pre-compose the display name so every consumer gets the same format.
  const fullName = user ? `${user.firstName} ${user.lastName}` : ''

  // Dispatches only the local logout action — use useLogoutMutation() when
  // you also need to invalidate the session on the server.
  function signOut() {
    logout()
  }

  return { user, isAuthenticated, fullName, signOut }
}
