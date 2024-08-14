import { CacheEnum } from '@/enum/cacheEnum'
import { HttpStatus } from '@/enum/HttpStatus'
import router from '@/router'
import { useErrorStore } from '@/stores/errorStore'

export const handleCatchError = (error: any) => {
  const errorStore = useErrorStore()
  const {
    response: { status, data },
  } = error
  const { message } = data
  switch (status) {
    case HttpStatus.UNAUTHORIZED: //401
      storage.remove(CacheEnum.TOKEN_NAME)
      storage.remove(CacheEnum.USER_NAME)
      router.push({ name: 'login' })
    case HttpStatus.UNPROCESSABLE_ENTITY: //422
      errorStore.resetError()
      errorStore.setErrors(data?.errors)
      break
    case HttpStatus.BAD_REQUEST:
      notification.error({ title: message })
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
}
