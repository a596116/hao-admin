import { isEmpty, isEqual } from 'lodash-es'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('error', () => {
  const loading = ref<boolean>(false)

  const formEdit = reactive({
    /** 表單是否編輯過 */
    isFormEdit: false,
    /** 舊表單 */
    oldForm: {} as any,
  })

  /**
   * @description: 設置表單是否編輯過
   */
  const setIsFormEdit = (b: boolean) => {
    formEdit.isFormEdit = b
  }
  /**
   * @description: 設置舊表單
   */
  const setOldForm = (form: any) => {
    formEdit.oldForm = form
  }
  /**
   * @description: 傳入表單，與舊表單比較是否編輯過
   */
  const isFormEdit = (form: any) => {
    // 取出不為空的欄位
    const oldForm = Object.keys(formEdit.oldForm).reduce((obj: any, key) => {
      if (!isEmpty(formEdit.oldForm[key])) {
        obj[key] = formEdit.oldForm[key]
      }
      return obj
    }, {})
    const newForm = Object.keys(form).reduce((obj: any, key) => {
      if (!isEmpty(form[key])) {
        obj[key] = form[key]
      }
      return obj
    }, {})
    if (isEqual(newForm, oldForm)) {
      formEdit.isFormEdit = false
    } else {
      formEdit.isFormEdit = true
    }
  }

  /**
   * @description: 重置表單編輯狀態
   */
  const resetFormEdit = () => {
    formEdit.isFormEdit = false
    formEdit.oldForm = {}
  }

  return { loading, isFormEdit, formEdit, setIsFormEdit, setOldForm, resetFormEdit }
})
