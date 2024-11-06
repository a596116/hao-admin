<template>
  <div>
    <el-row v-if="state.configData" :gutter="24" class="c_row-item">
      <el-col :span="8" class="c_label">{{ state.configData?.title }}</el-col>
      <el-col :span="14" class="color-box">
        <div
          v-for="(color, key) in state.configData?.color"
          :key="key"
          class="color-item acea-row row-middle">
          <el-color-picker v-model="color.item" show-alpha @change="changeColor($event, color)" />

          <span @click="resetBgA(color, key)">重置</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'c_bg_color',
})

// ----------- props -----------
const props = withDefaults(
  defineProps<{
    configObj: Record<string, any>
    configNme: string
  }>(),
  {},
)
let restColor = ''

const state = ref({
  defaults: props.configObj,
  configData: props.configObj[props.configNme],
  bgColor: {
    bgStar: '',
    bgEnd: '',
  },
  oldColor: {
    bgStar: '',
    bgEnd: '',
  },
  index: 0,
})

watch(
  () => props.configObj,
  (nVal, oVal) => {
    state.value.defaults = nVal
    state.value.configData = nVal[props.configNme]
  },
  { immediate: true, deep: true },
)

const changeColor = (e: any, color: any) => {
  if (!e) {
    color.item = 'transparent'
  }
}

const resetBgA = (color: any, key: number) => {
  color.item = state.value.configData.default[key].item
}
</script>

<style scoped lang="scss">
.c_row-item {
  margin-bottom: 20px;
}

.color-box {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .color-item {
    margin-left: 15px;

    span {
      margin-left: 5px;
      font-size: 13px;
      color: #999;
      cursor: pointer;
    }
  }
}
</style>
