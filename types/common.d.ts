interface IRadioTable {
  title: string
  search_keyword: string
  showTab?: boolean
  code:
    | 'all_number'
    | 'manufacturer'
    | 'customer'
    | 'product'
    | 'product2'
    | 'bank'
    | 'employee'
    | 'manufacturer,customer'
  selected?: any
  filter?: any
  func_type: 1 | 2
  columns: any[]
  // 其他欄位
  [key: string]: any
}
interface IRadio {
  api: string
  api_func?: string
  columns: IColumns[]
  title: string
  type?: number //刊登類型
  selected?: any
  search_keyword?: string
  status?: number
}

// ------------------------------------------------------
/**
 * @description: table欄位配置
 */
interface IColumns {
  /**
   * @description: 欄位名稱
   */
  label: string
  /**
   * @description: 欄位屬性
   */
  prop: string
  /**
   * @description: 欄位寬度
   */
  width?: number | string
  /**
   * @description: 最小寬度
   */
  min_width?: number | string
  /**
   * @description: 是否自訂自欄位，使用slot
   * @example: <template #${ prop }></template>
   */
  formatter?: true | false
  /**
   * @description: 是否自訂標題，使用slot
   * @example: <template #${ prop }_header></template>
   */
  header?: true | false
  /**
   * @description: 是否排序
   * @example: 'no'
   */
  sort?: 'no'
  /**
   * @description: 對齊方式
   */
  align?: 'left' | 'center' | 'right'
  /**
   * @description: 跳轉路徑
   * 可使用{{id}}取代欄位值
   * @example: '/path/{{id}}'
   */
  path?: string
  /**
   * @description: 跳轉參數
   * @example: { id: 'id' }
   */
  query?: any
  /**
   * @description: 跳轉方式
   */
  target?: '_blank' | '_self' | '_parent' | '_top'
  /**
   * @description: 狀態欄位value
   */
  status_value?: string
  /**
   * @description: tag選項配置
   * @example: { 1: 'success' , 2: 'info' , 3: 'warning' , 4: 'danger'}
   */
  tag_options?: any[]
  /**
   * @description: tag是否全寬
   */
  tag_full_width?: boolean
  /**
   * @description: 排序值
   */
  sort_value?: string
  /**
   * @description: 固定列
   */
  fixed?: 'left' | 'right'
  /**
   * @description: 欄位格式化
   * @example: '{{product_number}} {{product_name}}'
   */
  format_value?: string
  /**
   * @description: 圖片寬高比
   */
  image_aspect_ratio?: number
  /**
   * @description: 欄位類型
   */
  type?:
    | 'image'
    | 'date'
    | 'input'
    | 'tag'
    | 'alert'
    | 'switch'
    | 'preview'
    | 'category'
    | 'link'
    | 'list'
    | 'status'
    | 'money'

  link_prop?: string
}

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
/**
 * @description: form欄位配置
 */
interface IFormColumns {
  /**
   * @description: 欄位名稱
   */
  label: string
  /**
   * @description: 欄位字段
   */
  prop: string
  /**
   * @description: 錯誤字段
   */
  error_name?: string
  /**
   * @description: 欄位尺寸
   */
  size?: '' | 'default' | 'small' | 'large' | undefined
  /**
   * @description: 是否自訂自欄位，使用slot
   * @example: <template #${ prop }></template>
   */
  formatter?: boolean
  /**
   * @description: col佔比
   */
  span?: number
  /**
   * @description: >768px時col佔比
   */
  sm?: number
  /**
   * @description: >992px時col佔比
   */
  md?: number
  /**
   * @description: >1200px時col佔比
   */
  lg?: number
  /**
   * @description: 欄位類型
   */
  type?:
    | 'input'
    | 'textarea'
    | 'formatThousand'
    | 'password'
    | 'image'
    | 'radio'
    | 'switch'
    | 'select'
    | 'editor'
    | 'lists'
    | 'date'
    | 'datetime'
    | 'tel'
    | 'address'
    | 'tag'
    | 'seo'
  /**
   * @description: 是否隱藏欄位
   */
  hidden?: boolean
  /**
   * @description: 是否只讀
   */
  readonly?: boolean
  /**
   * @description: 是否禁用
   */
  disabled?: boolean
  /**
   * @description: 是否為空行
   */
  emptyRow?: boolean
  /**
   * @description: 提示訊息
   */
  placeholder?: string
  /**
   * @description: 是否可清除
   */
  clearable?: boolean
  /**
   * @description: textarea配置
   * @param minRows 最小行數
   * @param maxRows 最大行數
   * @example: { minRows: 2, maxRows: 4 }
   */
  textareaOptions?: {
    minRows?: number
    maxRows?: number
  }
  /**
   * @description: input配置
   * @param icon icon名稱
   * @param onlyNumber 是否只能輸入數字
   */
  inputOptions?: {
    icon?: string
    onlyNumber?: boolean
  }
  /**
   * @description: image配置
   * @param width 圖片寬度
   * @param height 圖片高度
   * @param maxLen 圖片上傳最大數量
   * @param cropper 是否啟用裁切
   */
  imageOptions?: {
    width?: number
    height?: number
    maxLen?: number
    cropper?: boolean
  }
  /**
   * @description: switch配置
   * @param activeValue 開啟值
   * @param inactiveValue 關閉值
   * @param activeColor 開啟顏色
   * @param inactiveColor 關閉顏色
   */
  switchOptions?: {
    activeValue?: string | number
    inactiveValue?: string | number
    activeColor?: string
    inactiveColor?: string
  }
  /**
   * @description: date配置
   * @param noRange 是否不顯示範圍
   * @param minDate 最小日期
   * @param shortcut 快速選擇
   * @param isSelectBefore 是否選擇之前
   */
  dateOptions?: {
    noRange?: boolean
    minDate?: string
    shortcut?: 'after' | 'before'
    isSelectBefore?: boolean
    onChange?: ((val: string) => any) | undefined
  }
  /**
   * @description: radio配置
   * @param type radio類型
   * @param size radio尺寸
   * @param options radio選項
   * @example: { type: 'radio', size: 'default', options: [{ label: '選項1', value: 1 }] }
   */
  radioOptions?: {
    type: 'radio' | 'button'
    size?: '' | 'default' | 'small' | 'large'
    options: {
      label: string
      value: string | number
    }[]
    onChange?: ((val: string | number | boolean) => any) | undefined
  }

  /**
   * @description: select配置
   * @param format_value 選項格式化 '{{label}} {{value}}'
   * @param options 選項
   * @param multiple 是否多選
   * @param onChange 選擇後事件
   */
  selectOptions?: {
    format_value?: string
    options: {
      label: string
      value: string | number
    }[]
    multiple?: boolean
    onChange?: ((val: string | number | boolean) => any) | undefined
  }

  /**
   * @description: password配置
   */
  passwordOptions?: {
    maxLen?: number
    minLen?: number
  }

  /**
   * @description: tag選項配置
   * @example: { 1: 'success' , 2: 'info' , 3: 'warning' , 4: 'danger'}
   */
  tagOptions?: {
    options: any
  }

  telOptions?: {
    telProp?: string
    codeProp?: string
  }

  seoOptions?: {
    routePath?: string
    mpage?: string
  }
}

// errors
type IErrors<T> = Partial<Record<keyof T, string>>

// response?.data?.errors
interface I422Error<T> {
  response: {
    status: number
    data: {
      errors: {
        [K in Extract<keyof T, string>]: string[]
      }
    }
  }
}
