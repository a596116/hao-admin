<template>
  <div class="pc-config">
    <div v-for="(item, key) in state.rCom" :key="key">
      <component
        :is="componentName(item.components.name)"
        ref="childData"
        :key="key"
        :configObj="state.configObj"
        :configNme="item.configNme"
        :index="activeIndex"
        :num="item.num" />
    </div>
    <!-- <rightBtn :activeIndex="activeIndex" :configObj="state.configObj"></rightBtn> -->
  </div>
</template>

<script lang="ts" setup>
import toolCom from '@/components/PcConfigComp'
import { usePcConfigStore } from '@/stores/pcConfig'

const pcConfigStore = usePcConfigStore()
const tools = toolCom as any

defineOptions({
  name: 'c_auxiliary_box',
  componentsName: 'auxiliary_box',
})

const componentCache = new Map()
const componentName = (name: string) => {
  if (!componentCache.has(name)) {
    componentCache.set(
      name,
      defineAsyncComponent(() => import(`@/components/PcConfigComp/${name}.vue`)),
    )
  }
  return componentCache.get(name)
}

// ----------- props -----------
const props = withDefaults(
  defineProps<{
    activeIndex: number
    num: number
    index: number
  }>(),
  {
    activeIndex: 0,
    num: 0,
    index: 0,
  },
)

const state = ref({
  configObj: {} as any,
  rCom: [
    {
      components: tools.c_bg_color,
      configNme: 'bgColor',
    },
    {
      components: tools.c_slider,
      configNme: 'heightConfig',
    },
  ] as any,
})

watch(
  () => props.num,
  (nVal) => {
    let value = { ...pcConfigStore.state.defaultArray[nVal] }
    state.value.configObj = value
  },
)

watch(
  () => state.value.configObj,
  (nVal, oVal) => {
    pcConfigStore.updateArray({ num: props.num, val: nVal })
  },
  {
    deep: true,
  },
)

onMounted(() => {
  nextTick(() => {
    let value = { ...pcConfigStore.state.defaultArray[props.num] }
    state.value.configObj = value
  })
})
</script>
