import { appConfig } from '@/app.config'
import { getColorPalette } from '@/utils/color'

const el: HTMLElement = document.documentElement

/** Init theme settings */
export function initThemeSettings() {
  const color_scheme: App.Theme.ColorScheme[] = [
    'primary',
    'success',
    'warning',
    'danger',
    'error',
    'info',
  ]
  const color_index: App.Theme.ColorLightPaletteNumber[] = [3, 5, 7, 8, 9]
  /** 變更element-plus 色系 */
  color_scheme.forEach((color) => {
    const hex = getComputedStyle(el).getPropertyValue(`--hd-${color}`)
    el.style.setProperty(`--el-color-${color}-dark-2`, getColorPalette(hex, 8))
    color_index.forEach((index, i: any) => {
      el.style.setProperty(
        `--el-color-${color}-light-${index}`,
        getColorPalette(hex, (5 - i) as any),
      )
    })
  })

  const settings: App.Theme.AppSetting = {
    ...appConfig,
    themeColor: storage.get('themeColor') || appConfig.themeColor,
  }
  el.style.setProperty('--el-color-primary', getColorPalette(settings.themeColor, 6))
  el.style.setProperty('--hd-primary', getColorPalette(settings.themeColor, 6))
  el.style.setProperty('--hd-primary-hover', getColorPalette(settings.themeColor, 5))
  el.style.setProperty('--hd-primary-active', getColorPalette(settings.themeColor, 7))
  return settings
}

/**
 * @description: 變更主題顏色
 * @param {string} color
 * @param {string} defaultThemeColor
 */
export const changeThemeColors = (color: string, defaultThemeColor: string) => {
  if (!color) {
    color = defaultThemeColor
  }
  storage.set('themeColor', getColorPalette(color, 6))
  el.style.setProperty('--el-color-primary', getColorPalette(color, 6))
  el.style.setProperty('--hd-primary', getColorPalette(color, 6))
  el.style.setProperty('--hd-primary-hover', getColorPalette(color, 5))
  el.style.setProperty('--hd-primary-active', getColorPalette(color, 7))
}
