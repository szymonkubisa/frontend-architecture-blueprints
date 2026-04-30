import { createPinia } from 'pinia'
import type { App } from 'vue'

// Create a single Pinia instance and install it on the Vue app.
// A dedicated setup function (instead of calling app.use inline in main.ts)
// makes it easy to add plugins (e.g. pinia-plugin-persistedstate) in one place.
export function setupStore(app: App) {
  const pinia = createPinia()
  app.use(pinia)
}
