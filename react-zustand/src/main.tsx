import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './core/router'
import './assets/styles/main.css'

// Mount the app into the #root div defined in index.html.
// Zustand stores are module-level singletons, so no Provider wrapper is needed —
// any component can import and use a store directly.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
