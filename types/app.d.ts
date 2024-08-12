/** The global namespace for the app */
declare namespace App {
  namespace Theme {
    /** element-plus color palette number */
    type ColorScheme = 'primary' | 'success' | 'warning' | 'danger' | 'error' | 'info'
    type ColorLightPaletteNumber = 3 | 5 | 7 | 8 | 9
    type ColorDarkPaletteNumber = 2

    /** App setting */
    interface AppSetting {
      defaultThemeColor: string
      /** Theme color */
      themeColor: string
      /** Other color */
      otherColor: OtherColor

      title: string
      /** Page */
      page: {
        /** 是否啟用頁面動畫 */
        animate: boolean
        /** 頁面動畫模式 */
        animateMode: String
      }
      layout: {
        /** 是否顯示麵包屑 */
        showBreadCrumb: boolean
        /** 是否顯示側邊選單 */
        showMenu: boolean
        /** 是否顯示設定選單 */
        showSettingBar: boolean
        /** 是否顯示全螢幕選單 */
        showFullScreenBar: boolean
      }
      login: {
        /** 驗證碼類型 圖片 滑塊 無 */
        captchaType: 'image' | 'slider' | null
      }
    }

    interface OtherColor {
      info: string
      success: string
      warning: string
      error: string
    }

    interface ThemeColor extends OtherColor {
      primary: string
    }

    type ThemeColorKey = keyof ThemeColor

    type ThemePaletteColor = {
      [key in ThemeColorKey | `${ThemeColorKey}-${ColorPaletteNumber}`]: string
    }
  }
}
