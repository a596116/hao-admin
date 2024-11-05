<template>
  <div class="w-full p-4">
    <div v-for="(item, key) in state.rCom" :key="key" class="w-full">
      <component
        :is="componentName(item.components.name)"
        ref="childData"
        :key="key"
        :configObj="state.configObj"
        :configNme="item.configNme"
        :index="activeIndex"
        :num="item.num" />
    </div>
    <!-- <rightBtn :activeIndex="activeIndex" :configObj="configObj"></rightBtn> -->
  </div>
</template>

<script lang="ts" setup>
import toolCom from '@/components/PcConfigComp'
import { usePcConfigStore } from '@/stores/pcConfig'

const pcConfigStore = usePcConfigStore()

defineOptions({
  name: 'c_home_bargain',
  componentsName: 'home_bargain',
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
      // @ts-ignore
      components: toolCom.c_set_up,
      configNme: 'setUp',
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

watch(
  () => state.value.configObj?.setUp?.tabVal,
  (nVal, oVal) => {
    var arr = [state.value.rCom[0]]
    if (nVal == 0) {
      let tempArr = [
        {
          // @ts-ignore
          components: toolCom.c_input_item,
          configNme: 'titleConfig',
        },
        // {
        // @ts-ignore
        //   components: toolCom.c_input_item,
        //   configNme: 'linkConfig',
        // },
      ]
      state.value.rCom = arr.concat(tempArr)
    } else {
      let tempArr = [
        // {
        //   components: toolCom.c_bg_color,
        //   configNme: 'titleColor',
        // },
        // {
        //   components: toolCom.c_bg_color,
        //   configNme: 'themeColor',
        // },
        // {
        //   components: toolCom.c_txt_tab,
        //   configNme: 'textPosition',
        // },
        // {
        //   components: toolCom.c_txt_tab,
        //   configNme: 'textStyle',
        // },
        // {
        //   components: toolCom.c_txt_tab,
        //   configNme: 'bgStyle',
        // },
        // {
        //   components: toolCom.c_slider,
        //   configNme: 'prConfig',
        // },
        // {
        //   components: toolCom.c_slider,
        //   configNme: 'fontSize',
        // },
        // {
        //   components: toolCom.c_slider,
        //   configNme: 'mbConfig',
        // },
      ]
      state.value.rCom = arr.concat(tempArr)
    }
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

<style scoped lang="scss">
.title-tips {
  padding-bottom: 10px;
  font-size: 14px;
  color: #333;

  span {
    margin-right: 14px;
    color: #999;
  }
}
</style>
