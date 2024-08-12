import { fileURLToPath, URL } from 'node:url'
import { loadEnv, type ConfigEnv } from 'vite'
import { setupPlugins } from './vite/plugins'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): any => {
  // const isBuild = command === 'build'
  // const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [...setupPlugins()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
        },
      },
      cssCodeSplit: true,
      chunkSizeWarningLimit: 2000,
      sourcemap: false,
      minify: false,
      assetsInLineLimit: 5000,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/scss/base.scss";',
        },
      },
    },
    terserOptions: {
      compress: {
        // drop_console: true,
        // drop_debugger: true,
      },
    },
    server: {
      host: '0.0.0.0',
      port: 9527,
      proxy: {},
      // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
      warmup: {
        clientFiles: ['./index.html', './src/{views,components}/*'],
      },
    },
  }
}
