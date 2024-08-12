import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import { setupPlugins } from './plugins'

async function main() {
  const app = createApp(App)
  setupPlugins(app)
  app.use(router)
  //   setupRouter(app)

  await router.isReady()
  app.mount('#app')
}
main()
