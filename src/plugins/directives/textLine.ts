import type { Directive, DirectiveBinding } from 'vue'

/**
 * @description: 字數行數限制, 超過顯示省略號
 */
export const vTextLine: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string | number>) {
    const { value } = binding
    if (!value) {
      throw new Error('[Directive: textLine]: need maxLine Number! \nex. v-textline="3"')
    }
    el.style.textOverflow = 'ellipsis'
    el.style.overflow = 'hidden'
    el.style.display = '-webkit-box'
    el.style.webkitBoxOrient = 'vertical'
    el.style.webkitLineClamp = String(value)
  },
}
