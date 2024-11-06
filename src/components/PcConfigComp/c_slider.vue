<template>
  <div class="slider-box">
    <el-row :gutter="24" class="c_row-item">
      <el-col v-if="state.configData?.title" class="c_label" :span="24">
        {{ state.configData?.title }}
      </el-col>
      <el-col :span="24" class="slider-box">
        <el-slider
          v-model="state.configData.val"
          show-input
          size="small"
          :min="state.configData?.min"
          :max="state.configData?.max"
          @change="sliderChange($event)" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'c_slider',
})

// ----------- props -----------
const props = withDefaults(
  defineProps<{
    configObj: Record<string, any>
    configNme: string
  }>(),
  {},
)

const state = ref({
  defaults: props.configObj,
  configData: props.configObj[props.configNme],
})

watch(
  () => props.configObj,
  (nVal, oVal) => {
    state.value.defaults = nVal
    state.value.configData = nVal[props.configNme]
  },
  { immediate: true, deep: true },
)

onMounted(function () {
  nextTick(function () {
    state.value.defaults = props.configObj
    state.value.configData = props.configObj[props.configNme]
  })
})

const sliderChange = (e: any) => {
  // console.log(e)
}
</script>

<style scoped lang="scss">
.c_row-item {
  margin-bottom: 20px;

  .c_label {
    color: #999;
  }

  .slider-box {
    :deep(.el-input-number) {
      width: 100px;
    }
  }
}
</style>
