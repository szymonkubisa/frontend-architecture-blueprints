import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './core/router'
import { setupStore } from './core/store'
import './assets/styles/main.css'

// Wrap app creation in an async function so future work (e.g. fetching remote
// config before the first render) can be awaited cleanly without top-level await.
async function bootstrap() {
  const app = createApp(App)

  // Install Pinia before the router so stores are available inside navigation
  // guards (e.g. the auth check in beforeEach reads from the auth store).
  setupStore(app)
  setupRouter(app)

  app.mount('#app')
}

bootstrap()
