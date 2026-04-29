import { type ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useLogoutMutation } from '@/features/auth/api/authApi'
import { APP_NAME, ROUTE_PATHS } from '@/constants/app.constants'
import styles from './AppLayout.module.css'

interface Props {
  children: ReactNode
}

export default function AppLayout({ children }: Props) {
  const { fullName } = useAuth()
  const [logoutMutation] = useLogoutMutation()
  const navigate = useNavigate()

  // Call the server-side logout mutation first (invalidates the refresh token),
  // then redirect to /login regardless of whether the server call succeeds.
  async function handleLogout() {
    await logoutMutation()
    navigate(ROUTE_PATHS.LOGIN)
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>{APP_NAME}</div>
        <nav className={styles.nav}>
          <NavLink to={ROUTE_PATHS.DASHBOARD} className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
          }>
            Dashboard
          </NavLink>
        </nav>
        <div className={styles.sidebarFooter}>
          <span className={styles.userName}>{fullName}</span>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </aside>

      <div className={styles.mainWrapper}>
        <header className={styles.topBar} />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  )
}
