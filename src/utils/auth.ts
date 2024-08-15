import { CacheEnum } from '@/enum/cacheEnum'

export const getToken = () => {
  return storage.get(CacheEnum.TOKEN_NAME)
}
