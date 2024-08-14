<template>
  <div class="max-w-[460px] max-sm:max-w-sm">
    <el-form
      ref="FormRef"
      :model="model"
      :rules="rules"
      label-position="left"
      class="flex flex-col gap-5"
      :hide-required-asterisk="true">
      <motion :delay="100">
        <div class="title flex flex-col items-center gap-1">
          <SvgIcon name="logo" class="h-[70px] w-[70px]" />
          <h1 class="">
            {{ title || appConfig.title.toLocaleUpperCase() }}
          </h1>
        </div>
      </motion>
      <motion v-for="(f, index) of fields" :key="f.prop" :delay="150 + 50 * index" class="w-full">
        <el-form-item :prop="f.prop" :label="f.label" :error="errors[f.prop]" class="text-hd-text">
          <template v-if="f.formatter">
            <div class="h-10 w-full">
              <slot :name="f.prop" />
            </div>
          </template>
          <el-input
            v-else-if="f.prop !== 'captcha'"
            v-model.trim="model[f.prop]"
            class="h-10"
            :placeholder="f.placeholder"
            clearable
            :show-password="f.type == 'password'"
            @keyup.enter="emit('submit', FormRef)">
            <template v-if="f.inputOptions?.icon" #prefix>
              <SvgIcon :name="f.inputOptions?.icon" class="h-4 w-4 text-hd-text-50 opacity-80" />
            </template>
          </el-input>

          <div v-else class="flex w-full items-center justify-center gap-4">
            <el-input
              v-model.trim="model[f.prop]"
              :placeholder="f.placeholder"
              clearable
              maxlength="4"
              class="h-10 !w-1/2"
              @keyup.enter="emit('submit', FormRef)" />
            <div class="w-1/2" @click="emit('on-refresh-captcha')" v-html="captcha.img" />
          </div>
        </el-form-item>
      </motion>

      <motion v-if="$slots['button']" :delay="150 + 50 * fields.length" class="w-full">
        <slot name="button" />
      </motion>

      <motion :delay="150 + 50 * (fields.length + 1)" class="w-full">
        <el-form-item class="relative">
          <el-button
            type="primary"
            class="relative h-10 w-full rounded-md border-none px-[50px] py-[8px] font-black text-white"
            @click="emit('submit', FormRef)">
            {{ submitTitle || '登入' }}
          </el-button>
          <span v-show="!isEmpty(alterText)" class="my-2 w-full text-center text-hd-success">
            {{ alterText }}
          </span>
        </el-form-item>
      </motion>

      <motion v-if="$slots['submit_button']" :delay="150 + 50 * (fields.length + 2)" class="w-full">
        <el-form-item class="relative">
          <slot name="submit_button" />
        </el-form-item>
      </motion>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { appConfig } from '@/app.config'
import { useCommonStore } from '@/stores/common'
import motion from '@/utils/motion'
import { cn } from '@/utils/tailwind'
import type { FormInstance } from 'element-plus'
import { isEmpty } from 'lodash-es'

// ----------- props ----------
const props = defineProps<{
  fields: IFormColumns[]
  title?: string
  rules: any
  submitTitle?: string
  alterText?: string
  captcha?: any
}>()

const model = defineModel<any>('model', { required: true })

// ----------- emit ----------
const emit = defineEmits<{
  (e: 'submit', form: FormInstance): void
  (e: 'on-refresh-captcha'): void
}>()

const FormRef = ref<FormInstance>()

const errors = ref({})

const immediateDebounce: any = useThrottleFn((formRef) => emit('submit', formRef), 1000)

useEventListener(document, 'keypress', ({ code }) => {
  if (['Enter', 'NumpadEnter'].includes(code) && !useCommonStore().loading)
    immediateDebounce(FormRef.value)
})
</script>

<style scoped lang="scss">
:deep(.el-form) {
  @apply relative h-fit w-[100%];

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    background-clip: text;
    box-shadow: 0 0 0 30px rgb(255 255 255 / 0%) inset !important;
    -webkit-text-fill-color: #000 !important;
  }

  .title {
    h1 {
      @apply relative text-h2 font-black text-hd-text-50;

      letter-spacing: 4px;
    }
  }

  .el-form-item.is-error .el-input {
    border-color: var(--el-color-danger);
  }

  .el-input {
    @apply w-full rounded-md border border-hd-border px-[6px] py-[5px] text-base text-hd-text outline-none;

    transition: all 0.2s;

    .el-input__wrapper {
      background-color: transparent !important;
      box-shadow: none !important;
    }

    ::placeholder {
      color: rgb(146 145 145) !important;
    }

    &:has(.el-input__wrapper.is-focus) {
      @apply border-hd-primary;
    }
  }

  .el-form-item__label,
  .el-input__inner {
    @apply text-hd-text;
  }
}
</style>
