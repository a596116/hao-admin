import { DefaultTheme } from 'vitepress'

export function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '文檔',
      items: [
        {
          link: '/guide/introduction',
          text: '指南',
        },
      ],
    },
  ]
}
