import { defineStore } from 'pinia'
import type { IMenu } from 'types/menu'
import type { RouteLocationNormalized, RouteMeta } from 'vue-router'
import { useAuthStore } from './authStore'

export const useMenuStore = defineStore(
  'menu',
  () => {
    const menus = ref<IMenu[]>([])
    const permissions = ref<string[]>([])
    const historyMenus = ref<IMenu[]>([])
    const route = ref<RouteMeta | null>(null)
    const isMenuCollapse = ref<boolean>(false)
    const isHistoryCollapse = ref<boolean>(false)
    const isBreadCrumb = ref<boolean>(true)
    const authStore = useAuthStore()

    const init = (page: string) => {
      getMenuByRoute(page)
      historyMenus.value = getHistoryMenu() || []
    }

    /**
     * @description: 根據路由獲取菜單
     */
    const getMenuByRoute = async (_page: string) => {
      if (!authStore.user_funcs) return
      menus.value = authStore.user_funcs
        .map((c) => c.children)
        .flat()
        .filter((route) => route?.path !== '/' && !route?.meta?.menu?.hiddenMenu)
        .sort((a, b) => {
          if (!a?.meta?.number) return -1
          if (!b?.meta?.number) return 1
          return a?.meta?.number - b?.meta?.number
        })
        .reduce((p: IMenu[], c) => {
          const cmeun = <IMenu>c?.meta?.page?.menu

          if (!~p.findIndex((t) => t?.title == cmeun?.title)) {
            // 去除重複的父路由菜單
            p.push({ ...cmeun, children: [] })
          }
          // 添加子路由菜單到對應的父路由
          p[p.findIndex((m) => m?.title == cmeun?.title)].children?.push({
            ...c?.meta?.menu,
            route: c?.name as string,
          })
          return p
        }, [])!
    }

    const getHistoryMenu = () => {
      if (!authStore.user_funcs) return
      const routes = authStore.user_funcs
        .map((c) => c.children)
        .flat()
        .filter((route) => route?.path !== '/' && !route?.meta?.menu?.hiddenMenu)
      const menus = historyMenus.value ?? []
      // 返回routes中有的菜單
      return menus.filter((menu) => {
        return routes?.some((route) => route?.path === menu.route)
      })
    }

    const addHistoryMenu = (r: RouteLocationNormalized) => {
      if (!r.meta?.menu) return
      if (r.meta?.menu.hiddenHistory) return
      route.value = r.meta
      const menu: IMenu = { ...r.meta?.menu, route: r.name as string }
      const index = Object.entries(historyMenus.value!).findIndex(
        ([_key, value]: any) => value.route === r.name,
      )
      if (index == -1) historyMenus.value.unshift(menu)
      if (historyMenus.value.length > 10) historyMenus.value.pop()
      historyMenus.value = [...historyMenus.value]
    }

    const removeHistoryMenu = (menu: IMenu) => {
      const index = historyMenus.value.indexOf(menu)
      historyMenus.value.splice(index, 1)
      historyMenus.value = [...historyMenus.value]
    }

    /**
     * @description: 操作權限
     */
    const permissionHandler = (route: RouteLocationNormalized) => {
      let currentRoute = ''
      const isEdit = /edit/.test(String(route.name))
      const isCreate = /create/.test(String(route.name))
      if (isEdit) {
        currentRoute = route.path.split('?')[0].replace(/\/edit\/\d+/, '')
      } else if (isCreate) {
        currentRoute = route.path.split('?')[0].replace(/\/create/, '')
      } else {
        currentRoute = route.path.split('?')[0].replace(/\/\d+/, '')
      }

      // currentRoute 最後為/結尾的話，去掉/
      if (currentRoute.endsWith('/')) {
        currentRoute = currentRoute.substring(0, currentRoute.length - 1)
      }
      const routes = route.matched[0].children.filter(
        (route) => route.path.includes(currentRoute) && route.meta?.permissions,
      )
      permissions.value = routes[0]?.meta?.permissions ?? []
    }

    /**
     * @description: 當前路由的子菜單
     */
    const getChildrenMenus = computed(() => {
      return menus.value?.find((menu) => menu?.title === route.value?.page?.menu?.title)?.children
    })

    const toggleMenu = () => {
      isMenuCollapse.value = !isMenuCollapse.value
    }

    /**
     * @description: 開關歷史菜單
     */
    const toggleHistoryLink = () => {
      isHistoryCollapse.value = isHistoryCollapse.value
    }

    /**
     * @description: 開關麵包屑
     */
    const toggleBreadCrumb = () => {
      isBreadCrumb.value = isBreadCrumb.value
    }

    /**
     * @description: 判斷是否有權限
     */
    const hasPermission = (permission: string, path?: string) => {
      if (path) {
        const routes = authStore.user_funcs
          ?.map((c) => c.children)
          .flat()
          .filter((route) => route?.path !== '/' && !route?.meta?.menu?.hiddenMenu)
          .filter((route) => route?.path === path)
        const permissions = routes?.[0]?.meta?.permissions
        return permissions?.includes(permission)
      }
      return permissions.value.includes(permission)
    }

    return {
      menus,
      historyMenus,
      route,
      isMenuCollapse,
      isHistoryCollapse,
      isBreadCrumb,
      init,
      toggleMenu,
      toggleHistoryLink,
      toggleBreadCrumb,
      addHistoryMenu,
      removeHistoryMenu,
      getChildrenMenus,
      permissionHandler,
      permissions,
      hasPermission,
    }
  },
  {
    persist: {
      paths: ['isMenuCollapse', 'route', 'isHistoryCollapse', 'historyMenus', 'isBreadCrumb'],
    },
  },
)
