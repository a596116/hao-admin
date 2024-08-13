/**
 * 此文件作用於 `vite.config.ts` 的 `optimizeDeps.include` 依賴預構建配置項
 * 依賴預構建，`vite` 啓動時會將下面 include 里的模塊，編譯成 esm 格式並緩存到 node_modules/.vite 文件夾，頁面加載到對應模塊時如果瀏覽器有緩存就讀取瀏覽器緩存，如果沒有會讀取本地緩存並按需加載
 * 尤其當您禁用瀏覽器緩存時（這種情況只應該發生在調試階段）必須將對應模塊加入到 include里，否則會遇到開發環境切換頁面卡頓的問題（vite 會認為它是一個新的依賴包會重新加載並強制刷新頁面），因為它既無法使用瀏覽器緩存，又沒有在本地 node_modules/.vite 里緩存
 * 溫馨提示：如果您使用的第三方庫是全局引入，也就是引入到 src/main.ts 文件里，就不需要再添加到 include 里了，因為 vite 會自動將它們緩存到 node_modules/.vite
 */
const include: string[] = [
  'xlsx',
  'dayjs',
  'axios',
  'axios-retry',
  'pinia',
  'vue-cropper',
  'sortablejs',
  '@vueuse/core',
  '@pureadmin/utils',
  'vue3-cookies',
  'workbox-window',
  'lodash-es',
  'element-plus',
  'colord',
  'crypto-js',
]

/**
 * 在預構建中強制排除的依賴項
 * 溫馨提示：所有以 `@iconify-icons/` 開頭引入的的本地圖標模塊，都應該加入到下面的 `exclude` 里，因為平台推薦的使用方式是哪裡需要哪裡引入而且都是單個的引入，不需要預構建，直接讓瀏覽器加載就好
 */
const exclude: string[] = []

export { include, exclude }
