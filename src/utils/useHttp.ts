import { CacheEnum } from '@/enum/cacheEnum'
import router from '@/router'
import { HttpStatus } from '@/enum/HttpStatus'
import { useCommonStore } from '@/stores/common'
import { useErrorStore } from '@/stores/errorStore'
import axiosRetry from 'axios-retry'
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type CustomParamsSerializer,
  type InternalAxiosRequestConfig,
} from 'axios'
import { stringify } from 'qs'

const defaultConfig: AxiosRequestConfig = {
  baseURL: '/api',
  // 請求超時時間
  timeout: 10000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // 數組格式參數序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer,
  },
}

class Http {
  private static instance: AxiosInstance = axios.create(defaultConfig)
  constructor() {
    axiosRetry(Http.instance, { retries: 3 /*, retryDelay: 1000 */ })
    this.interceptors()
  }

  public async request<T, D = T extends responseResult<T> ? responseResult<T> : responseData<T>>(
    config: AxiosRequestConfig,
  ): Promise<D> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Http.instance.request<D>(config)
        resolve(res?.data || ({} as D))
      } catch (error) {
        reject(error)
      }
    })
  }

  private interceptors() {
    this.interceptorsRequest()
    this.interceptorsResponse()
  }

  // 請求攔截
  private interceptorsRequest() {
    Http.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        useCommonStore().loading = config.params?.loading == false ? false : true
        config.headers.Authorization = storage.get(CacheEnum.TOKEN_NAME)
          ? 'Bearer ' + storage.get(CacheEnum.TOKEN_NAME)
          : ''
        return config
      },
      (error) => {
        console.error('請求失敗')
        return Promise.reject(error)
      },
    )
  }

  // 響應攔截
  private interceptorsResponse() {
    Http.instance.interceptors.response.use(
      async (response) => {
        setTimeout(() => {
          useCommonStore().loading = false
        }, 100)
        if (response.data?.message) {
        }
        return response
      },
      (error) => {
        const errorStore = useErrorStore()
        setTimeout(() => {
          useCommonStore().loading = false
        }, 300)
        const {
          response: { status, data },
        } = error
        const { message } = data
        switch (status) {
          case HttpStatus.UNAUTHORIZED: //401
            router.push({ name: 'login' })
          case HttpStatus.UNPROCESSABLE_ENTITY: //422
            errorStore.resetError()
            errorStore.setErrors(data?.errors)
            break
          case HttpStatus.BAD_REQUEST:
            // notification.error({ title: message })
            break
          case HttpStatus.FORBIDDEN: //403
            notification.error({ title: message ?? '沒有操作權限' })
            break
          case HttpStatus.NOT_FOUND: //404
            router.push({ name: 'notFound' })
            break
          case HttpStatus.TOO_MANY_REQUESTS:
            notification.error({ title: message ?? '操作過於頻繁，請稍候在嘗試' })
            break
          default:
        }
        return Promise.reject(error.response)
      },
    )
  }
}

export const useHttp = new Http()
