interface ViteEnv {
  VITE_API_URL: string
  VITE_APP_TITLE: string
  VITE_BASEURL: string //數據接口
  VITE_DOMAIN: string //域名
}

interface ImportMeta {
  readonly env: ViteEnv
}
