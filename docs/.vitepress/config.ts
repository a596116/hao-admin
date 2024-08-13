import type { DefaultTheme, HeadConfig } from 'vitepress'

import { resolve } from 'node:path'

import { type PwaOptions, withPwa } from '@vite-pwa/vitepress'
import { defineConfigWithTheme } from 'vitepress'

import { version } from '../../package.json'

export default withPwa(
  defineConfigWithTheme({
    description: 'Hao Admin',
    head: head(),
    lang: 'zh',
    pwa: pwa(),
    srcDir: 'src',
    themeConfig: {
      darkModeSwitchLabel: '主題',
      darkModeSwitchTitle: '切換到深色模式',
      docFooter: {
        next: '下一頁',
        prev: '上一頁',
      },
      footer: {
        copyright: `Copyright © 2024-Hao`,
        // message: '基于 MIT 许可发布.',
      },
      i18nRouting: true,
      langMenuLabel: '多语言',
      lastUpdated: {
        formatOptions: {
          dateStyle: 'short',
          timeStyle: 'medium',
        },
        text: '最後更新於',
      },
      lightModeSwitchTitle: '切換到淺色模式',
      logo: 'https://i.imgur.com/0B5zmhp.png',
      nav: nav(),
      outline: {
        label: '頁面導航',
      },
      returnToTopLabel: '回到頂部',
      search: {
        options: {
          locales: {
            zh: {
              translations: {
                button: {
                  buttonAriaLabel: '搜索文檔',
                  buttonText: '搜索文檔',
                },
                modal: {
                  footer: {
                    navigateText: '切換',
                    selectText: '選擇',
                  },
                  noResultsText: '無法找到相關結果',
                  resetButtonTitle: '清除查詢條件',
                },
              },
            },
          },
        },
        provider: 'local',
      },
      sidebar: {
        '/guide/': { base: '/guide/', items: sidebarGuide() },
      },
      sidebarMenuLabel: '菜單',
      siteTitle: 'Vben Admin',
      socialLinks: [{ icon: 'github', link: 'https://github.com/a596116?tab=repositories' }],
    },
    title: 'HaoAdmin',
    vite: {
      build: {
        chunkSizeWarningLimit: Infinity,
        minify: 'terser',
      },
      json: {
        stringify: true,
      },
      server: {
        fs: {
          allow: ['../..'],
        },
        host: true,
        port: 6173,
      },
      ssr: {
        external: ['@vue/repl'],
      },
    },
  }),
)

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '文档',
      items: [
        {
          link: '/guide/introduction/vben',
          text: '指南',
        },
      ],
    },
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      collapsed: false,
      text: '简介',
      items: [
        {
          link: 'introduction/vben',
          text: '关于 Vben Admin',
        },
        {
          link: 'introduction/why',
          text: '为什么选择我们?',
        },
        { link: 'introduction/quick-start', text: '快速开始' },
        { link: 'introduction/thin', text: '精简版本' },
      ],
    },
    {
      text: '基础',
      items: [
        { link: 'essentials/concept', text: '基础概念' },
        { link: 'essentials/development', text: '本地开发' },
        { link: 'essentials/route', text: '路由和菜单' },
        { link: 'essentials/settings', text: '配置' },
        { link: 'essentials/icons', text: '图标' },
        { link: 'essentials/styles', text: '样式' },
        { link: 'essentials/external-module', text: '外部模块' },
        { link: 'essentials/build', text: '构建与部署' },
        { link: 'essentials/server', text: '服务端交互与数据Mock' },
      ],
    },
    {
      text: '深入',
      items: [
        // { link: 'in-depth/layout', text: '布局' },
        { link: 'in-depth/theme', text: '主题' },
        { link: 'in-depth/access', text: '权限' },
        { link: 'in-depth/locale', text: '国际化' },
        { link: 'in-depth/features', text: '常用功能' },
        { link: 'in-depth/check-updates', text: '检查更新' },
        { link: 'in-depth/loading', text: '全局loading' },
        { link: 'in-depth/ui-framework', text: '组件库切换' },
      ],
    },
    {
      text: '工程',
      items: [
        { link: 'project/standard', text: '规范' },
        { link: 'project/cli', text: 'CLI' },
        { link: 'project/dir', text: '目录说明' },
        { link: 'project/test', text: '单元测试' },
        { link: 'project/tailwindcss', text: 'Tailwind CSS' },
        { link: 'project/changeset', text: 'Changeset' },
        { link: 'project/vite', text: 'Vite Config' },
      ],
    },
    {
      text: '其他',
      items: [
        { link: 'other/project-update', text: '项目更新' },
        { link: 'other/remove-code', text: '移除代码' },
        { link: 'other/faq', text: '常见问题' },
      ],
    },
  ]
}

function head(): HeadConfig[] {
  return [
    ['meta', { content: 'hao Team', name: 'author' }],
    [
      'meta',
      {
        content: 'hao, vitejs, vite, vue',
        name: 'keywords',
      },
    ],
    ['link', { href: '/favicon.ico', rel: 'icon', type: 'image/svg+xml' }],
    [
      'meta',
      {
        content:
          'width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no',
        name: 'viewport',
      },
    ],
    ['meta', { content: 'hao admin docs', name: 'keywords' }],
    ['link', { href: '/favicon.ico', rel: 'icon' }],
    // [
    //   'script',
    //   {
    //     src: 'https://cdn.tailwindcss.com',
    //   },
    // ],
  ]
}

function pwa(): PwaOptions {
  return {
    includeManifestIcons: false,
    manifest: {
      description: 'Vben Admin is a modern admin dashboard template based on Vue 3. ',
      icons: [
        {
          sizes: '192x192',
          src: 'https://i.imgur.com/0B5zmhp.png',
          type: 'image/png',
        },
        {
          sizes: '512x512',
          src: 'https://i.imgur.com/0B5zmhp.png',
          type: 'image/png',
        },
      ],
      id: '/',
      name: 'Hao Admin Doc',
      short_name: 'hao_admin_doc',
      theme_color: '#ffffff',
    },
    outDir: resolve(process.cwd(), '.vitepress/dist'),
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
    },
  }
}
