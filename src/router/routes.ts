import type { RouteRecordRaw } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'admin',
    redirect: '/home_custom/1',
    component: () => import('@/layouts/index.vue'),
  },

  {
    name: 'home_custom/id',
    path: '/home_custom/:id',
    component: () => import('@/views/HomeCustom/HomeCustomManage.vue'),
    meta: { menu: { title: '首頁裝飾', hiddenMenu: true } },
  },

  {
    path: '/auth',
    name: 'auth',
    redirect: '/auth/login',
    component: () => import('@/layouts/auth.vue'),
    children: [
      {
        path: '/auth/login',
        name: 'login',
        component: () => import('@/views/Auth/Login.vue'),
        meta: { guest: true, menu: { title: '登入', hiddenMenu: true, hiddenHistory: true } },
      },
      {
        path: '/auth/forget-password',
        name: 'forget-password',
        component: () => import('@/views/Auth/ForgetPassword.vue'),
        meta: { guest: true, menu: { title: '忘記密碼', hiddenMenu: true, hiddenHistory: true } },
      },
    ],
  },
  {
    path: '/:any(.*)',
    name: 'notFound',
    component: () => import('@/views/error/404.vue'),
    meta: { menu: { title: 'notFound', hiddenMenu: true, hiddenHistory: true } },
  },
] as RouteRecordRaw[]
