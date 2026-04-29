import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './core/router'
import { setupStore } from './core/store'
import './assets/styles/main.css'

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)
  setupRouter(app)

  app.mount('#app')
}

bootstrap()
