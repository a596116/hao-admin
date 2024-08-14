import type { RouteRecordRaw } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'admin',
    redirect: '/home',
    component: () => import('@/layouts/index.vue'),
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
