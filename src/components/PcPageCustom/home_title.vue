<template>
  <div
    class="title-box"
    :style="{
      textAlign: state.txtPosition,
      fontStyle: state.txtStyle != 'bold' ? state.txtStyle : '',
      fontWeight: state.txtStyle == 'bold' ? state.txtStyle : '',
      fontSize: state.fontSize + 'px',
      margin: '0 ' + state.prConfig + 'px',
      marginTop: `${state.mTOP}px`,
      padding: `${state.pyConfig}px ${state.pxConfig}px`,
      background: state.titleColor,
      color: state.themeColor,
    }">
    {{ state.titleTxt }}
  </div>
</template>

<script setup lang="ts">
import { PcPageMenuType } from '@/enum/PcPage'
import { usePcConfigStore } from '@/stores/pcConfig'

const pcConfigStore = usePcConfigStore()

defineOptions({
  name: 'home_title',
  cname: '標題',
  type: PcPageMenuType.tool,
  icon: 'title',
  configName: 'c_home_title',
  defaultName: 'titles', // 外面匹配名稱
  data() {
    return {
      defaultConfig: {
        name: 'titles',
        timestamp: this.num,
        setUp: {
          tabVal: 0,
        },
        titleConfig: {
          title: '標題',
          value: '標題',
          place: '請輸入標題',
          max: 10,
        },
        linkConfig: {
          title: '鏈接',
          value: '',
          place: '請輸入鏈接地址',
          max: 100,
        },
        themeColor: {
          title: '字體顏色',
          name: 'themeColor',
          default: [
            {
              item: '#282828',
            },
          ],
          color: [
            {
              item: '#282828',
            },
          ],
        },
        titleColor: {
          title: '背景顏色',
          default: [
            {
              item: '#fff',
            },
          ],
          color: [
            {
              item: '#fff',
            },
          ],
        },
        // bgStyle: {
        //   title: '背景樣式',
        //   name: 'bgStyle',
        //   type: 0,
        //   list: [
        //     {
        //       val: '直角',
        //       icon: 'iconPic_square',
        //     },
        //     {
        //       val: '圓角',
        //       icon: 'iconPic_fillet',
        //     },
        //   ],
        // },

        textPosition: {
          title: '文本位置',
          type: 0,
          list: [
            {
              val: '居左',
              style: 'left',
              icon: 'doc_left',
            },
            {
              val: '居中',
              style: 'center',
              icon: 'doc_center',
            },
            {
              val: '居右',
              style: 'right',
              icon: 'doc_right',
            },
          ],
        },
        textStyle: {
          title: '文本樣式',
          type: 0,
          list: [
            {
              val: '正常',
              style: 'normal',
              icon: 'doc_general',
            },
            {
              val: '斜體',
              style: 'italic',
              icon: 'doc_skew',
            },
            {
              val: '加粗',
              style: 'bold',
              icon: 'doc_bold',
            },
          ],
        },
        fontSize: {
          title: '文本大小',
          val: 12,
          min: 12,
        },
        prConfig: {
          title: '背景左右(外邊距)',
          val: 0,
          min: 0,
        },
        pxConfig: {
          title: '背景左右(內邊距)',
          val: 0,
          min: 0,
        },
        pyConfig: {
          title: '背景上下(內邊距)',
          val: 0,
          min: 0,
        },
        mbConfig: {
          title: '頁面間距',
          val: 0,
          min: 0,
        },
      },
    }
  },
})

// ----------- props -----------
const props = withDefaults(
  defineProps<{
    num: number
    index?: number
  }>(),
  {},
)
const {
  state: {
    value: { defaultArray },
  },
} = storeToRefs(pcConfigStore)
const state = ref({
  titleTxt: '',
  link: '',
  txtPosition: '' as any,
  txtStyle: '',
  fontSize: 0,
  mTOP: 0,
  titleColor: '',
  themeColor: '',
  prConfig: 0,
  pxConfig: 0,
  pyConfig: 0,
  // bgStyle: 0,s
  pageData: {},
})

onMounted(function () {
  nextTick(function () {
    state.value.pageData = defaultArray[props.num]
    setConfig(state.value.pageData)
  })
})

watch(
  () => state.value.pageData,
  (newVal) => {
    setConfig(newVal)
  },
  { deep: true },
)
watch(
  () => props.num,
  (newVal) => {
    let data = defaultArray[newVal]
    setConfig(data)
  },
  { deep: true },
)
watch(
  () => defaultArray,
  (newVal) => {
    let data = newVal[props.num]
    setConfig(data)
  },
  { deep: true },
)

const setConfig = (data) => {
  if (!data) return
  if (data.mbConfig) {
    state.value.titleTxt = data.titleConfig.value
    state.value.link = data.linkConfig.value
    state.value.txtPosition = data.textPosition.list[data.textPosition.type].style
    state.value.txtStyle = data.textStyle.list[data.textStyle.type].style
    state.value.themeColor = data.themeColor.color[0].item
    state.value.fontSize = data.fontSize.val
    state.value.mTOP = data.mbConfig.val
    state.value.prConfig = data.prConfig.val
    state.value.pxConfig = data.pxConfig.val
    state.value.pyConfig = data.pyConfig.val
    // state.value.bgStyle = data.bgStyle.type
    state.value.titleColor = data.titleColor.color[0].item
  }
}
</script>

<style scoped lang="scss">
.title-box {
  padding: 5px 10px;
  color: #282828;
}

.titleOn {
  border-radius: 10px !important;
}
</style>
