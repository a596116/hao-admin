import { appConfig } from '@/app.config'
import { getColorPalette } from '@/utils/color'

const el: HTMLElement = document.documentElement
const el1: HTMLElement = document.documentElement
const el2: HTMLElement = document.documentElement
const el3: HTMLElement = document.documentElement

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
  getComputedStyle(el).getPropertyValue(`--hd-primary`)
  el.style.setProperty('--hd-primary', settings.themeColor)
  getComputedStyle(el1).getPropertyValue(`--hd-primary-hover`)
  // el1.style.setProperty('--hd-primary-hover', getColorPalette(settings.themeColor, 3))
  el1.style.setProperty('--hd-primary-hover', settings.themeColor + '95')
  getComputedStyle(el2).getPropertyValue(`--el-color-primary`)
  el2.style.setProperty('--el-color-primary', settings.themeColor)
  getComputedStyle(el3).getPropertyValue(`--hd-primary-active`)

  el1.style.setProperty('--hd-primary-active', settings.themeColor + '75')
  // el3.style.setProperty('--hd-primary-active', getColorPalette(settings.themeColor, 4))
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
  storage.set('themeColor', color || defaultThemeColor)
  el.style.setProperty('--hd-primary', color || defaultThemeColor)
  el1.style.setProperty('--hd-primary-hover', color || defaultThemeColor + '95')
  el2.style.setProperty('--el-color-primary', color || defaultThemeColor)
  el3.style.setProperty('--hd-primary-active', color || defaultThemeColor + '75')
}
