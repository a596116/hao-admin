import { defineStore } from 'pinia'
import { changeThemeColors, initThemeSettings } from './shared/theme'
/** Theme store */
export const useThemeStore = defineStore('theme-store', () => {
  const scope = effectScope()

  /** Theme settings */
  const settings: Ref<App.Theme.AppSetting> = ref({
    ...initThemeSettings(),
  })
  /** 初始化vueuse dark */
  const isDark = useDark({
    initialValue: 'light',
    valueDark: 'dark',
    valueLight: 'light',
  })
  const osTheme = ref({
    mode: isDark.value ? 'dark' : 'light',
    options: ['light', 'dark'],
  })

  /** Reset store */
  function resetStore() {
    const themeStore = useThemeStore()
    themeStore.$reset()
  }

  /**
   * 更新主题颜色
   */
  function updateThemeColors(color: string) {
    if (!color) {
      settings.value.themeColor = settings.value.themeColor
    }
    changeThemeColors(color, settings.value.themeColor)
  }

  /**
   * @description: 切换css主题(暗黑模式/亮白模式)
   */
  const toggleCssDarkMode = (val: string) => {
    isDark.value = val === 'dark'
  }

  /** On scope dispose */
  onScopeDispose(() => {
    scope.stop()
  })

  return {
    ...toRefs(settings.value),
    osTheme,
    resetStore,
    updateThemeColors,
    toggleCssDarkMode,
  }
})
