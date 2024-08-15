import type { IRouteModule } from 'types/router'
import type { RouteRecordRaw } from 'vue-router'
import router from '.'

/**
 * @description: 產生完整路由配置
 * @param {IRouteModule} routes
 */
export const generateRoutes = (routes: IRouteModule[]) => {
  const res = [] as RouteRecordRaw[]
  let modules = import.meta.glob('../views/**/*.vue')
  routes.forEach((route) => {
    const r = {} as any
    const { children, page } = route
    r.path = `${page.name.toLocaleLowerCase()}`
    r.name = page.name
    r.page = page
    r.component = import.meta.glob('@/layouts/index.vue')['/src/layouts/index.vue']
    r.redirect = `${page.menu?.defaultPath}`
    r.children = children.map((child) => {
      const component = `../views/${page.component}/${child.component}.vue`
      child.component = modules[component]
      child.meta!.page = page
      child.path = `${child.path}`
      return child
    })
    router.addRoute(r)
    res.push(r)
  })
  return res
}

/**
 * @description: 自動從module文件夾中導入路由
 */
export const autoloadModuleRoutes = () => {
  const modules: Record<
    string,
    {
      [key: string]: any
    }
  > = import.meta.glob('./module/**/*.ts', { eager: true })
  const routes = [] as IRouteModule[]
  Object.keys(modules).forEach((key) => {
    routes.push(modules[key].default)
  })
  return generateRoutes(routes)
}

export const resetRouter = () => {
  const resetWhiteNameList = ['/auth/login', '/auth/forget-password', '/auth/reset-password']
  router.getRoutes().forEach((route) => {
    const { path } = route
    if (resetWhiteNameList.includes(path as string)) {
      if (route.name) {
        router.removeRoute(route.name)
      }
    }
  })
}
