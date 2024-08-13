/** Default app settings */
export const appConfig: App.Theme.AppSetting = {
  title: 'HaoAdmin',
  themeColor: '#5352ed',

  /** 從 router/module 自動導入路由 */
  autoImportRouter: true,

  page: {
    /** 是否開啟頁面動畫 */
    animate: true,
    /** 頁面動畫模式 */
    animateMode: 'fade-slide',
  },
  layout: {
    /** 是否顯示麵包屑 */
    showBreadCrumb: true,
    /** 是否顯示側邊選單 */
    showMenu: true,
    /** 是否顯示設定選單 */
    showSettingBar: true,
    /** 是否顯示全螢幕選單 */
    showFullScreenBar: true,
  },
  login: {
    /** 驗證碼類型 圖片 滑塊 無 */
    captchaType: null,
  },
}
