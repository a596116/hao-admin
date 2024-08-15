import { CacheEnum } from '@/enum/cacheEnum'
import { useErrorStore } from '@/stores/errorStore'
import { getPageTitle } from '@/utils'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { RouteLocationNormalized, Router } from 'vue-router'

NProgress.configure({ showSpinner: false })

class Guard {
  constructor(private router: Router) {}
  public run() {
    this.router.beforeEach(this.beforeEach.bind(this))
    this.router.afterEach(this.afterEach.bind(this))
    this.router.onError(this.onError.bind(this))
  }

  /**
   * @description: 過濾白名單，不需要驗證有權限的路由
   */
  private whiteList = ['/auth/login', '/auth/forget-password', '/auth/reset-password']

  private async beforeEach(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    NProgress.start()
    document.title = getPageTitle(to.meta.menu?.title)
    /** 不再白名單內且沒有token，設置redirect路由並跳去登入頁 */
    if (!this.whiteList.includes(to.path) && !this.token()) {
      storage.set(CacheEnum.REDIRECT_ROUTE_NAME, to.path)
      return { name: 'login' }
    }

    if (to.meta.guest && this.token()) return from

    useErrorStore().resetError()
    // useMenuStore().permissionHandler(to)
  }

  private afterEach() {
    NProgress.done()
  }

  private onError() {
    NProgress.done()
  }

  private token(): string | null {
    return storage.get(CacheEnum.TOKEN_NAME)
  }
}

export default (router: Router) => {
  new Guard(router).run()
}
