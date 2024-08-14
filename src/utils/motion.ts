import { h, defineComponent, withDirectives, resolveDirective } from 'vue'

/** 封裝@vueuse/motion動畫庫中的自定義指令v-motion */
export default defineComponent({
  name: 'Motion',
  props: {
    delay: {
      type: Number,
      default: 50,
    },
  },
  render() {
    const { delay } = this
    const motion = resolveDirective('motion')
    return withDirectives(
      h(
        'div',
        {},
        {
          // @ts-ignore
          default: () => [this.$slots?.default()],
        },
      ),
      [
        [
          motion,
          {
            initial: { opacity: 0, y: 100 },
            enter: {
              opacity: 1,
              y: 0,
              transition: {
                delay,
              },
            },
          },
        ],
      ],
    )
  },
})
