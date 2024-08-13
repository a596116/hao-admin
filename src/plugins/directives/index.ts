import type { App } from 'vue'
import { vTextLine } from './textLine'
import { vNumber } from './number'

export function setupDirective(app: App) {
  app.directive('textline', vTextLine)
  app.directive('number', vNumber)
}
