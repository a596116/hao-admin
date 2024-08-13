import { DefaultTheme } from 'vitepress'

export function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      collapsed: false,
      text: '簡介',
      items: [
        {
          link: 'introduction',
          text: '關於 Hao Admin',
        },
        // { link: 'introduction/quick-start', text: '快速開始' },
      ],
    },
  ]
}
