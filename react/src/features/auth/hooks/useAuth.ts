import { useAppSelector } from '@/shared/hooks/useAppSelector'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { selectCurrentUser, selectIsAuthenticated, logout } from '../slices/authSlice'

// Convenience hook that exposes the current auth state and a sign-out helper.
// Components should use this instead of selecting from the store directly so
// the access pattern stays consistent and easy to mock in tests.
export function useAuth() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  // Pre-compose the display name so every consumer gets the same format.
  const fullName = user ? `${user.firstName} ${user.lastName}` : ''

  // Dispatches only the local logout action — use useLogoutMutation() when
  // you also need to invalidate the session on the server.
  function signOut() {
    dispatch(logout())
  }

  return { user, isAuthenticated, fullName, signOut }
}
