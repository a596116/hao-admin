<template>
  <div v-if="state.configData" class="box">
    <div class="c_row-item">
      <el-col class="text-sm" :span="24">
        {{ state.configData.title }}
      </el-col>
      <el-col :span="24" class="slider-box">
        <div>
          <InputLink v-if="state.configData.title == '鏈接'" v-model="state.configData.value" />
          <el-input
            v-else
            v-model="state.configData.value"
            :placeholder="state.configData.place"
            :maxlength="state.configData.max" />
        </div>
      </el-col>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'c_input_item',
})

// ----------- props -----------
const props = withDefaults(
  defineProps<{
    configObj: any
    configNme: string
  }>(),
  {},
)

const state = ref({
  value: '',
  defaults: props.configObj,
  configData: props.configObj[props.configNme],
})

watch(
  () => props.configObj,
  (nVal, oVal) => {
    state.value.defaults = nVal
    state.value.configData = nVal[props.configNme]
  },
  { deep: true, immediate: true },
)
</script>

<style scoped lang="scss">
:deep(.ivu-input) {
  font-size: 13px !important;
}

.c_row-item {
  @apply flex flex-col gap-1;

  margin-bottom: 13px;
}
</style>
