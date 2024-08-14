import { fileURLToPath, URL } from 'node:url'
import { loadEnv, type ConfigEnv, type UserConfigExport } from 'vite'
import { setupPlugins } from './vite/plugins'
import { __APP_INFO__ } from './vite/build/utils'
import { include, exclude } from './vite/plugins/optimize'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  // const isBuild = command === 'build'
  // const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [...setupPlugins()],
    // https://cn.vitejs.dev/config/dep-optimization-options.html#dep-optimization-options
    optimizeDeps: {
      include,
      exclude,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        // output: {
        //   entryFileNames: `assets/[name].js`,
        //   chunkFileNames: `assets/[name].js`,
        //   assetFileNames: `assets/[name].[ext]`,
        //   manualChunks(id: string) {
        //     if (id.includes('node_modules')) {
        //       return id.toString().split('node_modules/')[1].split('/')[0].toString()
        //     }
        //   },
        // },
      },
      cssCodeSplit: true,
      chunkSizeWarningLimit: 4000,
      sourcemap: false,
      minify: false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/scss/base.scss";',
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 9527,
      // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
      proxy: {},
      // 預熱文件以提前轉換和緩存結果，降低啓動期間的初始頁面加載時長並防止轉換瀑布
      warmup: {
        clientFiles: ['./index.html', './src/{views,components}/*'],
      },
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  }
}
