import { ElIcon, ElMessageBox, type MessageBoxData } from 'element-plus'
import {
  WarningFilled,
  InfoFilled,
  SuccessFilled,
  QuestionFilled,
  CircleCloseFilled,
} from '@element-plus/icons-vue'

/**
 * 封裝MessageBox
 */
interface MessageOptions {
  title?: string
  subTitle?: string | Array<any>
  showCancelButton?: boolean
  showInput?: boolean
  inputPlaceholder?: string
  customClass?: string
  cancelButtonClass?: string
  showClose?: boolean
}
class Mes {
  private typeMap = {
    success: { icon: SuccessFilled, color: 'rgb(72 185 129)' },
    close: { icon: CircleCloseFilled, color: 'rgb(245 108 108)' },
    warning: { icon: WarningFilled, color: 'rgb(255 207 115)' },
    info: { icon: InfoFilled, color: 'gray' },
    question: { icon: QuestionFilled, color: 'rgb(30 154 214)' },
  }
  private TransformMes(mes: string | Array<any>) {
    return typeof mes == 'string'
      ? h('p', { style: 'color: gray' }, mes)
      : (mes as []).map((item: any) => {
          return h('p', { style: 'color: gray' }, item)
        })
  }
  private messagePop(
    type: 'success' | 'close' | 'warning' | 'info' | 'question',
    mes: MessageOptions,
  ): Promise<MessageBoxData> {
    return ElMessageBox({
      title: '',
      message: h(
        'div',
        {
          class: 'box',
          style: 'display:flex;flex-direction:column;align-items:center;gap:10px;',
        },
        [
          h(ElIcon, { size: 60, color: this.typeMap[type].color }, () => [
            h(this.typeMap[type].icon),
          ]),
          h('p', { style: 'color: var(--hd-dark);font-size:20px' }, mes.title),
          h('div', { class: 'content' }, this.TransformMes(mes.subTitle!)),
        ],
      ),
      // 是否要顯示取消按鈕，預設顯示
      showCancelButton: mes.showCancelButton || false,
      center: true,
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString: true,
      closeOnClickModal: false,
      closeOnPressEscape: true,
      // 是否要輸入框，取值使用.then(e=>e.value)
      showInput: mes.showInput || false,
      // 輸入框佔位符
      inputPlaceholder: mes.inputPlaceholder || '',
      customClass: mes.customClass || 'mesBox',
      cancelButtonClass: mes.cancelButtonClass || 'cancelBtn',
      confirmButtonClass: 'confirmBtn',
      showClose: mes.showClose || mes.showCancelButton ? false : true,
    })
  }

  /**
   * 成功
   * @param {any} mes:MessageOptions
   */
  success(mes?: MessageOptions) {
    const defaultMessageOptions: MessageOptions = {
      title: '', // 預設標題
      subTitle: '', // 預設內容
      ...mes, // 用戶提供的選項將覆蓋預設選項
    }
    return this.messagePop('success', defaultMessageOptions)
  }
  /**
   * 錯誤
   * @param {any} mes:MessageOptions
   */
  error(mes: MessageOptions) {
    return this.messagePop('close', mes)
  }
  /**
   * 提示
   * @param {any} mes:MessageOptions
   */
  warning(mes?: MessageOptions) {
    const defaultMessageOptions: MessageOptions = {
      title: '',
      subTitle: ``,
      ...mes, // 用戶提供的選項將覆蓋預設選項
    }
    return this.messagePop('warning', defaultMessageOptions)
  }
  /**
   * 訊息
   * @param {any} mes:MessageOptions
   */
  info(mes: MessageOptions) {
    return this.messagePop('info', mes)
  }
  /**
   * ？
   * @param {any} mes:MessageOptions
   */
  question(mes: MessageOptions) {
    return this.messagePop('question', mes)
  }
}
export const mesBox = new Mes()
