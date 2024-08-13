import type { App } from 'vue'
import Vue3Lottie from 'vue3-lottie'

export function setupLottie(app: App) {
  app.use(Vue3Lottie, { name: 'Vue3Lottie' })
}
