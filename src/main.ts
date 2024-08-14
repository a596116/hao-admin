import { createApp } from 'vue'
import App from './App.vue'

import router, { setupRouter } from './router'
import { setupPlugins } from './plugins'

import { MotionPlugin } from '@vueuse/motion'

async function main() {
  const app = createApp(App)
  setupPlugins(app)
  app.use(MotionPlugin)
  setupRouter(app)

  await router.isReady()
  app.mount('#app')
}
main()
