<template>
  <div class="c_row-item">
    <el-col class="c_label">{{ state.configData.title }}</el-col>
    <el-col class="acea-row row-right row-middle">
      <el-switch v-model="state.configData.val" :active-value="1" :inactive-value="0" />
    </el-col>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'c_is_show',
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
  (nVal) => {
    state.value.defaults = nVal
    state.value.configData = nVal[props.configNme]
  },
  { immediate: true, deep: true },
)
</script>

<style scoped lang="scss">
.c_row-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
