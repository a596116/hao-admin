import { ElMessage, type MessageHandler } from 'element-plus'

/**
 * 封裝Message
 */
interface Options {
  title?: string
  subTitle?: string | Array<any>
  offset?: number
  showClose?: boolean
  duration?: number
  plain?: boolean
}
class Message {
  private TransformMes(mes: string | Array<any>) {
    // console.log(mes)
    return typeof mes == 'string'
      ? h('p', { style: 'color: gray' }, mes)
      : (mes as []).map((item: any) => {
          return h('p', { style: 'color: gray' }, item)
        })
  }
  private message(
    type: 'success' | 'error' | 'warning' | 'info',
    options: Options,
  ): MessageHandler {
    return ElMessage({
      message: h(
        'div',
        {
          class: 'box',
        },
        [
          h('p', { style: `color: var(--hd-${type});font-size:14px` }, options.title),
          options.subTitle &&
            h(
              'div',
              { class: 'content', style: 'color: var(--hd-dark);font-size:12px' },
              this.TransformMes(options.subTitle!),
            ),
        ],
      ),
      type: type,
      plain: options.plain || false,
      showClose: options.showClose || false,
      offset: options.offset || undefined,
      duration: options.duration || 3500,
    })
  }

  /**
   * 成功
   * @param {any} options:MessageOptions
   */
  success(options: Options) {
    return this.message('success', options)
  }
  /**
   * 錯誤
   * @param {any} options:MessageOptions
   */
  error(options: Options) {
    return this.message('error', options)
  }
  /**
   * 提示
   * @param {any} options:MessageOptions
   */
  warning(options: Options) {
    return this.message('warning', options)
  }
  /**
   * 訊息
   * @param {any} options:MessageOptions
   */
  info(options: Options) {
    return this.message('info', options)
  }
}
export const message = new Message()
