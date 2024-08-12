import { defineConfig } from 'vite'
import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa'

export const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  // injectRegister: 'auto',
  // workbox: {
  //   sourcemap: true,
  //   clientsClaim: true,
  //   skipWaiting: true,
  //   globPatterns: [
  //     '**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp,wav,mp3,gltf,bin,eot,ttf,woff,woff2}',
  //   ],
  //   maximumFileSizeToCacheInBytes: 25097152,
  // },
  manifest: {
    name: 'HaoAdmin',
    short_name: 'HaoAdmin',
    description: 'An HaoAdmin, V0.0.1',
    theme_color: '#587464',
    background_color: '#587464',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    icons: [
      {
        src: '/logo.svg', // path to your app's logo
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
}
