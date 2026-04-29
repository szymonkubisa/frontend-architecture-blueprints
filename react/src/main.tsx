import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { store } from './core/store'
import { router } from './core/router'
import './assets/styles/main.css'

// Mount the app into the #root div defined in index.html.
// Provider makes the Redux store available to every component in the tree.
// RouterProvider hands control of rendering over to the data router.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
