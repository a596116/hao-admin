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
  name: 'c_banner',
  componentsName: 'home_banner',
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
      components: tools.c_set_up,
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
    pcConfigStore.updateArray({ num: props.num, val: { ...nVal } })
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
          components: tools.c_menu_list,
          configNme: 'swiperConfig',
        },
      ]
      state.value.rCom = arr.concat(tempArr)
    } else {
      let tempArr = [
        // {
        //   components: tools.c_txt_tab,
        //   configNme: 'imgConfig',
        // },
        {
          components: tools.c_txt_tab,
          configNme: 'navConfig',
        },
        {
          components: tools.c_txt_tab,
          configNme: 'docConfig',
        },
        {
          components: tools.c_txt_tab,
          configNme: 'txtStyle',
        },
        // {
        //   components: tools.c_is_show,
        //   configNme: 'isShow',
        // },
        // {
        //   components: tools.c_bg_color,
        //   configNme: 'bgColor',
        // },
        {
          components: tools.c_bg_color,
          configNme: 'dotColor',
        },
        // {
        //   components: tools.c_slider,
        //   configNme: 'lrConfig',
        // },
        {
          components: tools.c_slider,
          configNme: 'mbConfig',
        },
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

const handleSubmit = (name: string) => {
  let obj = {
    activeIndex: props.activeIndex,
    data: state.value.configObj,
  }
  pcConfigStore.updateArray(obj)
}
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
