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
    {
      name: '/home/test',
      path: '/test',
      component: 'test',
      meta: {
        code: 'index',
        menu: { title: 'test' },
        number: 2,
      },
    },
  ],
} as IRouteModule
