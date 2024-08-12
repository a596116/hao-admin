/** Default theme settings */

export const appConfig: App.Theme.AppSetting = {
  defaultThemeColor: '#8c9dc8',
  themeColor: '',
  otherColor: {
    info: '',
    success: '',
    warning: '',
    error: '',
  },
  title: 'HaoAdmin',
  page: {
    animate: true,
    animateMode: 'fade-slide',
  },
  layout: {
    showBreadCrumb: true,
    showMenu: true,
    showSettingBar: true,
    showFullScreenBar: true,
  },
  login: {
    captchaType: null,
  },
}
