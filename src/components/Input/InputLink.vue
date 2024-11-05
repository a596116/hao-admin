<template>
  <div class="w-full">
    <el-input
      ref="inputRef"
      v-model.trim="state.link"
      class="input-tel relative w-full"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="clearable"
      :readonly="readyOnly"
      :formatter="(v) => v.replace(/^https:\/\//, '')"
      @input="handleInput"
      @change="handleInput">
      <template #prepend>
        <span>https://</span>
      </template>

      <template v-if="showTarget" #append>
        <div class="">
          是否外部開啟
          <el-switch
            v-model="propsTarget"
            :disabled="disabled"
            :readonly="readyOnly"
            active-value="_blank"
            inactive-value="_self" />
        </div>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { InputInstance } from 'element-plus'
// ----------- props -----------
const propsModelValue = defineModel<string | undefined>('modelValue', {
  required: true,
  default: '',
})
const propsTarget = defineModel<string | null>('target', {
  default: '_blank',
})

const props = withDefaults(
  defineProps<{
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    readyOnly?: boolean
    showTarget?: boolean
  }>(),
  {
    placeholder: '請輸入手機號碼',
    disabled: false,
    clearable: false,
    readyOnly: false,
    showTarget: true,
  },
)

const inputRef = ref<InputInstance>()

const state = computed(() => ({
  link: propsModelValue.value || '',
}))

const handleInput = (value: string) => {
  // console.log(value)
  if (value.trim() === 'https://') {
    propsModelValue.value = ''
    return
  }
  // 如果開頭不是 https:// 則補上
  if (!value.startsWith('https://') && value.trim() !== '') {
    propsModelValue.value = `https://${value}`
    // console.log(propsModelValue.value)
  } else {
    propsModelValue.value = value
  }
}
</script>

<style scoped lang="scss">
:deep(.input-tel) {
  .el-input__validateIcon {
    display: none;
  }
}
</style>
