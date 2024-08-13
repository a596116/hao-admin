import vue from '@vitejs/plugin-vue'
import type { PluginOption } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { autoImport } from './autoImport'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'
import { manifestForPlugin } from './pwa'
import { viteBuildInfo } from '../build/info'

export const setupPlugins = () => {
  const plugins: PluginOption[] = [
    vue(),
    vueDevTools(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
    }),
    // @ts-ignore
    visualizer(),
    VitePWA(manifestForPlugin),
    viteBuildInfo(),
  ]
  autoImport(plugins)
  return plugins
}
