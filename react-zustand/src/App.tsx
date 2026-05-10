import { Outlet } from 'react-router-dom'

// Root component — just renders whichever child route is currently active.
// All layout and guard logic lives in the router config (core/router/index.tsx).
export default function App() {
  return <Outlet />
}
