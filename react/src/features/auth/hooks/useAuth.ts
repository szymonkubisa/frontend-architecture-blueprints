import { useAppSelector } from '@/shared/hooks/useAppSelector'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { selectCurrentUser, selectIsAuthenticated, logout } from '../slices/authSlice'

export function useAuth() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const fullName = user ? `${user.firstName} ${user.lastName}` : ''

  function signOut() {
    dispatch(logout())
  }

  return { user, isAuthenticated, fullName, signOut }
}
