import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import guard from './guard'
import type { App } from 'vue'
import autoImport from './autoImport'
import { appConfig } from '@/app.config'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        selector: to.hash,
      }
    }
    return { top: 0 }
  },
})

export const setupRouter = async (app: App) => {
  /** 是否自動加載module路由模快 */
  if (appConfig.autoImportRouter) autoImport()
  guard(router)
  app.use(router)
}

export default router
