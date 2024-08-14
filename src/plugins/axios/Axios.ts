import { CacheEnum } from '@/enum/cacheEnum'
import axiosRetry from 'axios-retry'
import { useCommonStore } from '@/stores/common'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'
import { handleCatchError } from './error'

export default class Axios {
  private instance: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    axiosRetry(this.instance, { retries: 3 /*, retryDelay: 1000 */ })
    this.interceptors()
  }

  public async request<T, D = T extends responseResult<T> ? responseResult<T> : responseData<T>>(
    config: AxiosRequestConfig,
  ): Promise<D> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.instance.request<D>(config)
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
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        useCommonStore().loading = config.params?.loading == false ? false : true
        config.headers = {
          Authorization: storage.get(CacheEnum.TOKEN_NAME)
            ? 'Bearer ' + storage.get(CacheEnum.TOKEN_NAME)
            : '',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        } as AxiosRequestHeaders
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
    this.instance.interceptors.response.use(
      async (response) => {
        setTimeout(() => {
          useCommonStore().loading = false
        }, 100)
        return response
      },
      (error) => {
        setTimeout(() => {
          useCommonStore().loading = false
        }, 100)
        handleCatchError(error)
        return Promise.reject(error.response)
      },
    )
  }
}
