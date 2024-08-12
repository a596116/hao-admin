import vue from '@vitejs/plugin-vue'
import type { Plugin } from 'vite'
import visualizer from 'rollup-plugin-visualizer'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { autoImport } from './autoImport'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'
import { manifestForPlugin } from './pwa'

export const setupPlugins = () => {
  const plugins: any[] = [
    vue(),
    vueDevTools(),
    visualizer(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
    }),
    VitePWA(manifestForPlugin),
  ]
  autoImport(plugins)
  return plugins
}
