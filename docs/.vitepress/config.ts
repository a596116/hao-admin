import { withPwa } from '@vite-pwa/vitepress'
import { defineConfigWithTheme } from 'vitepress'

import { sidebarGuide } from './sidebar/guide'
import { nav } from './nav'
import { head } from './head'
import { pwa } from './pwa'

export default withPwa(
  defineConfigWithTheme({
    title: 'HaoAdmin',
    description: 'Hao Admin',
    lang: 'zh',
    srcDir: 'src',
    head: head(),
    pwa: pwa(),
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
      siteTitle: 'Hao Admin',
      socialLinks: [{ icon: 'github', link: 'https://github.com/a596116?tab=repositories' }],
    },
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
        port: 5173,
      },
      ssr: {
        external: ['@vue/repl'],
      },
    },
  }),
)
