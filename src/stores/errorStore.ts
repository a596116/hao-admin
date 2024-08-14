import { isArray } from 'lodash-es'
import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error-store', () => {
  /** 錯誤信息 */
  const errors = ref<Record<string, any>>({})

  /**
   * @description: 獲取錯誤信息
   * @param {string} name 錯誤信息名稱
   */
  const getError = computed(() => {
    return (name: string) => errors.value[name]
  })
  /**
   * @description: 是否有錯誤信息
   */
  const hasError = computed(() => {
    return Object.keys(errors).length > 0
  })

  /**
   * @description: 重置錯誤信息
   */
  const resetError = () => {
    errors.value = {}
  }
  /**
   * @description: 設置錯誤信息
   */
  const setErrors = (error: Record<string, string[]>) => {
    Object.entries(error).forEach(([key, value]) => {
      errors.value[key] = isArray(value) ? value.join(' ') : value
    })
  }
  /**
   * @description: 清除錯誤信息
   * @param {string} name 錯誤信息名稱
   */
  const clearError = (name: string) => {
    if (errors.value[name]) {
      errors.value[name] = undefined
      // delete errors.value[name]
    }
  }

  return { errors, getError, hasError, resetError, setErrors, clearError }
})
