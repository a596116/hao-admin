import type { Directive } from 'vue'

declare module 'vue' {
  export interface ComponentCustomProperties {
    /** `Loading` 動畫加載指令，具體看：https://element-plus.org/zh-CN/component/loading.html#%E6%8C%87%E4%BB%A4 */
    vLoading: Directive<Element, boolean>
    /** 字數行數限制指令 */
    vTextline: Directive<HTMLElement, string | number>
    /** 只能輸入數字 */
    vNumber: Directive<HTMLElement>
  }
}

export {}
