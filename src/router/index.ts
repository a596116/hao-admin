import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import guard from './guard'
import type { App } from 'vue'
import { getToken } from '@/utils/auth'
import { useAuthStore } from '@/stores/authStore'

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
  const token = getToken()
  if (token) {
    await useAuthStore().getUserInfo()
  }

  guard(router)
  app.use(router)
}

export default router
