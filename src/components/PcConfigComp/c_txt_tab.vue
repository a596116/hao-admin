<template>
  <div v-if="state.configData" class="txt_tab">
    <el-row :gutter="24" class="c_row-item">
      <el-col :span="24" class="c_label">
        {{ state.configData?.title }}
        <span>{{ state.configData?.list[state.configData?.type].val }}</span>
      </el-col>
      <el-col :span="24" class="flex justify-end">
        <el-radio-group v-model="state.configData.type" type="button" @input="radioChange($event)">
          <el-radio-button v-for="(radio, key) in state.configData?.list" :key="key" :value="key">
            <SvgIcon v-if="radio.icon" class="iconfont-diy size-3" :name="radio.icon" />
            <span v-else>{{ radio.val }}</span>
          </el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'c_txt_tab',
})

// ----------- props -----------
const props = withDefaults(
  defineProps<{
    configObj: Record<string, any>
    configNme: string
  }>(),
  {},
)

// ----------- emit -----------
const emit = defineEmits<{
  (e: 'getConfig', data: any): void
}>()

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

const radioChange = (e: any) => {
  if (
    state.value.configData.name !== 'itemSstyle' &&
    state.value.configData.name !== 'bgStyle' &&
    state.value.configData.name !== 'conStyle'
  ) {
    emit('getConfig', { name: 'radio', values: e })
  }
}
</script>

<style scoped lang="scss">
.txt_tab {
  margin-top: 20px;
}

.c_row-item {
  margin-bottom: 20px;
}

.row-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.iconfont-diy {
  font-size: 18px;
}
</style>
