import { appConfig } from '@/app.config'
import { isEmpty } from 'lodash-es'

/**
 * @description: 驗證email
 */
export const validateEmail = (rule: any, value: any, callback: any) => {
  if (!isEmpty(value)) {
    const reg = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    if (!reg.test(value)) {
      return callback(new Error('Email格式不正確'))
    } else {
      return callback() // *驗證成功的地方必須callback()
    }
  } else {
    if (rule.required) {
      return callback(new Error('Email為必填欄位'))
    } else {
      return callback()
    }
  }
}

/**
 * @description: 驗證手機號碼(台灣)
 */
export const validatePhones = (rule: any, value: any, callback: any) => {
  if (!isEmpty(value)) {
    const reg = /^09\d{8}$/
    // (+886) 09xx-xxx-xxx
    if (!reg.test(value.split(')')[1])) {
      return callback(new Error('手機號碼格式不正確'))
    } else {
      return callback() // *驗證成功的地方必須callback()
    }
  } else {
    if (rule.required) {
      return callback(new Error('手機號碼為必填欄位'))
    } else {
      return callback()
    }
  }
}

/**
 * @description: 驗證網址（http:// 或 https:// 開頭）
 */
export const validateUrl = (rule: any, value: any, callback: any) => {
  if (!isEmpty(value)) {
    const reg = /^(http|https):\/\/([\w.]+\/?)\S*/
    if (!reg.test(value)) {
      return callback(new Error('網址為 http:// 或 https:// 開頭'))
    } else {
      return callback() // *驗證成功的地方必須callback()
    }
  } else {
    if (rule.required) {
      return callback(new Error('連結為必填欄位'))
    } else {
      return callback()
    }
  }
}

/**
 * @description: 驗證密碼
 */
export const validatePassword = (rule: any, value: any, callback: any) => {
  if (!isEmpty(value)) {
    // 密碼長度
    if (
      value.length < appConfig.password.length[0] ||
      value.length > appConfig.password.length[1]
    ) {
      return callback(
        new Error(
          `密碼長度在 ${appConfig.password.length[0]} 到 ${appConfig.password.length[1]} 個字符`,
        ),
      )
    }
    // 大小寫英文
    if (
      (appConfig.password.includeLowercase && !/[a-z]/.test(value)) ||
      (appConfig.password.includeUppercase && !/[A-Z]/.test(value))
    ) {
      return callback(
        new Error(
          `密碼需包含${appConfig.password.includeUppercase ? '大' : ''}${appConfig.password.includeLowercase ? '小' : ''}寫英文`,
        ),
      )
    }
    // 數字
    if (appConfig.password.includeNumber && !/\d/.test(value)) {
      return callback(new Error('密碼需包含數字'))
    }
    // 特殊字符
    if (
      appConfig.password.includeSpecialChar &&
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)
    ) {
      return callback(new Error('密碼需包含特殊字符'))
    }
    return callback() // *驗證成功的地方必須callback()
  } else {
    if (rule.required) {
      return callback(new Error('密碼為必填欄位'))
    } else {
      return callback()
    }
  }
}
