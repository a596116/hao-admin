import type { IRouteModule } from 'types/router'

export default {
  page: {
    component: 'Home',
    menu: {
      defaultPath: '/home',
      title: '首頁',
      icon: 'home',
    },
    name: '/home',
  },
  children: [
    {
      name: '/home/index',
      path: '/home',
      component: 'Dashboard',
      meta: {
        code: 'index',
        menu: { title: '首頁' },
        number: 1,
      },
    },
  ],
} as IRouteModule
