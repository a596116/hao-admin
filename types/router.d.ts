import 'vue-router'
import type { IMenu } from './menu'
import { RouteRecordRaw } from 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    code?: string

    menu?: IMenu
    number?: number // 用來排序

    permissions: string[]
    page?: {
      auth: boolean
      name: string
      menu: {
        title: String
        icon: String
        defaultPath?: String //有兩層子路由在設定預設路由時會用到
      }
    }
  }
}

export interface IRouteModule {
  page: {
    auth: boolean
    name: string
    component: string
    menu: {
      title: String
      icon: String
      defaultPath?: String //有兩層子路由在設定預設路由時會用到
    }
  }
  children: RouteRecordRaw[]
}
