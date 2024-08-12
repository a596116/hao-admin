import { appConfig } from 'app.config'

const webTitle = appConfig.title

export const getPageTitle = (pageTitle: string) => {
  return pageTitle ? `${pageTitle} - ${webTitle}` : `${webTitle}`
}
