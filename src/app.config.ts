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
    /** 登入頁面 Logo 圖片，可從 https://lottiefiles.com/featured 獲取 */
    logo: 'https://lottie.host/e3e52f0b-652c-4485-95db-e84eb80f1160/TXpyjvxsVV.json',
    /** 驗證碼類型 圖片 滑塊 無 */
    captchaType: null,
  },

  /** 密碼規則 */
  password: {
    /** 密碼長度 */
    length: [8, 15],
    /** 密碼是否包含大寫英文 */
    includeUppercase: true,
    /** 密碼是否包含小寫英文 */
    includeLowercase: true,
    /** 密碼是否包含數字 */
    includeNumber: true,
    /** 密碼是否包含特殊字符 */
    includeSpecialChar: false,
  },
}
