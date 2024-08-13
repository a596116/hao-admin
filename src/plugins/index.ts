import type { App } from 'vue'
import { setupPinia } from '../plugins/pinia'
import { setupSvgIcon } from './svgIcon'
import './tailwindcss/tailwindcss.css'
import 'animate.css'
import { setupDirective } from './directives'
import { setupLottie } from './lottie'

export const setupPlugins = (app: App) => {
  setupPinia(app)
  setupSvgIcon(app)
  setupDirective(app)
  setupLottie(app)
}
