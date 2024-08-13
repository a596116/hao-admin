import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'

export const useAuthStore = defineStore(
  'auth-store',
  () => {
    const user = ref(null)
    const user_funcs = ref<RouteRecordRaw[]>()
    const rememberUser = ref<{ account: string; password: string; rememberMe: boolean }>({
      account: '',
      password: '',
      rememberMe: false,
    })

    return { user, rememberUser, user_funcs }
  },
  {
    persist: {
      paths: ['user', 'rememberUser'],
    },
  },
)
