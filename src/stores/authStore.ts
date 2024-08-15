import { appConfig } from '@/app.config'
import { CacheEnum } from '@/enum/cacheEnum'
import router from '@/router'
import { autoloadModuleRoutes, resetRouter } from '@/router/utils'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'

export interface ILoginUser {
  account: string
  password: string
  captcha?: string
  key?: string
  rememberMe?: boolean
}

export const useAuthStore = defineStore(
  'auth-store',
  () => {
    const user = ref({})
    const user_funcs = ref<RouteRecordRaw[]>()
    const rememberUser = ref<{ account: string; password: string; rememberMe: boolean }>({
      account: '',
      password: '',
      rememberMe: false,
    })

    /**
     * @description: 獲取用戶資訊
     */
    const getUserInfo = async () => {
      return new Promise(async (resolve) => {
        // 模擬獲取用戶信息
        user.value = {
          name: 'admin',
        }
        /** 是否自動加載module路由模快 */
        if (appConfig.autoImportRouter) {
          autoloadModuleRoutes()
        } else {
          // 從後端獲取用戶權限路由
          // generateRoutes(router)
        }
        resolve(user.value)
      })
    }

    /**
     * @description: 登入
     */
    const loginAuth = async (loginForm: ILoginUser) => {
      const form = {
        account: loginForm.account,
        password: loginForm.password,
      } as ILoginUser
      if (appConfig.login.captchaType == 'image') {
        form.captcha = loginForm.captcha
      }

      // 模擬登入
      storage.set(CacheEnum.TOKEN_NAME, 'admin-token')
      await getUserInfo()
      console.log(router.getRoutes())
      const redirect_router =
        storage.get(CacheEnum.REDIRECT_ROUTE_NAME) !== 'notFound'
          ? storage.get(CacheEnum.REDIRECT_ROUTE_NAME) || '/'
          : '/'
      router.push(redirect_router)
      notification.success({
        title: `歡迎 admin 回來`,
      })
      storage.set(CacheEnum.REDIRECT_ROUTE_NAME, '/')
      return Promise.resolve()
    }

    /**
     * @description: 登出
     */
    const logoutAuth = () => {
      resetRouter()
      storage.remove(CacheEnum.TOKEN_NAME, CacheEnum.REDIRECT_ROUTE_NAME)
      router.push('/login')
      notification.success({
        title: '退出登入',
      })
    }

    return { user, rememberUser, user_funcs, getUserInfo, loginAuth, logoutAuth }
  },
  {
    persist: {
      paths: ['user', 'rememberUser'],
    },
  },
)
