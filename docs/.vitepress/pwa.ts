import { PwaOptions } from '@vite-pwa/vitepress'
import { resolve } from 'path'

export function pwa(): PwaOptions {
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
