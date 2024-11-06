<template>
  <div class="mobile-page">
    <div class="box" :style="{ height: state.cSlider + 'px', background: state.bgColor }" />
  </div>
</template>

<script lang="ts" setup>
import { PcPageMenuType } from '@/enum/PcPage'
import { usePcConfigStore } from '@/stores/pcConfig'

const pcConfigStore = usePcConfigStore()

defineOptions({
  name: 'z_auxiliary_box',
  cname: '空白區塊',
  configName: 'c_auxiliary_box',
  icon: 'blank',
  type: PcPageMenuType.tool,
  defaultName: 'blankPage', // 外面匹配名稱
  data() {
    return {
      defaultConfig: {
        name: 'blankPage',
        timestamp: this.num,
        bgColor: {
          title: '背景顏色',
          name: 'bgColor',
          default: [
            {
              item: '#f5f5f5',
            },
          ],
          color: [
            {
              item: '#f5f5f5',
            },
          ],
        },
        heightConfig: {
          title: '組件高度',
          val: 10,
          min: 1,
        },
      },
    }
  },
})

// ----------- props -----------
const props = withDefaults(
  defineProps<{
    index: number
    num: number
  }>(),
  {
    index: -1,
    num: 0,
  },
)

const {
  state: {
    value: { defaultArray },
  },
} = storeToRefs(pcConfigStore)

const state = ref({
  cSlider: '',
  bgColor: '',
  confObj: {},
  pageData: {},
  edge: '',
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

const setConfig = (data: any) => {
  if (!data) return
  if (data.heightConfig) {
    state.value.cSlider = data.heightConfig.val
    state.value.bgColor = data.bgColor.color[0].item
  }
}
</script>

<style scoped lang="scss">
.box {
  height: 20px;
  background: #f5f5f5;
}
</style>
