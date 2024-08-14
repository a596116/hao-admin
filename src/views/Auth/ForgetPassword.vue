<template>
  <FormLogin
    v-model:model="state.data"
    title="忘記密碼"
    :fields="state.formColumns"
    :rules="loginRules"
    class="w-full"
    submit-title="確定"
    @submit="actions.handleSubmit">
    <template #verify>
      <div class="flex h-full w-full items-center justify-center gap-4">
        <el-input
          v-model.trim="state.data.verify"
          placeholder="請輸入驗證碼"
          clearable
          class="h-full flex-1" />
        <el-button
          type="primary"
          class="h-full w-[50px] rounded-md border-none px-[50px] font-black text-white"
          @click="actions.handleSendVerify">
          發送驗證碼
        </el-button>
      </div>
    </template>
    <template #submit_button>
      <el-button
        type="default"
        class="relative h-10 w-full rounded-md px-[50px] py-[8px] font-black text-hd-text"
        @click="router.push({ name: 'login' })">
        返回
      </el-button>
    </template>
  </FormLogin>
</template>

<script setup lang="ts">
import { validatePassword } from '@/utils/formValidate'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()

const state = reactive({
  // 表單
  formColumns: [
    { label: '', prop: 'account', placeholder: '請輸入帳號', inputOptions: { icon: 'user' } },
    {
      label: '',
      prop: 'verify',
      formatter: true,
    },
    {
      label: '',
      prop: 'password',
      type: 'password',
      placeholder: '請輸入密碼',
      inputOptions: { icon: 'password' },
    },
    {
      label: '',
      prop: 'confirmPassword',
      type: 'password',
      placeholder: '請再次輸入密碼',
      inputOptions: { icon: 'password' },
    },
  ] as IFormColumns[],

  data: {
    account: '',
    verify: '',
    password: '',
    confirmPassword: '',
  },

  alterText: '',
})

// ----------- Rules ----------
const loginRules = reactive<FormRules>({
  account: [{ required: true, message: '請輸入帳號', trigger: 'change' }],
  verify: [{ required: true, message: '請輸入驗證碼', trigger: 'change' }],
  password: [{ required: true, validator: validatePassword, trigger: 'change' }],
  confirmPassword: [{ required: true, validator: validatePassword, trigger: 'change' }],
})

onMounted(() => {})

const actions = {
  handleSubmit: async (formEl: FormInstance | undefined) => {
    await formEl?.validate((valid: boolean) => {
      if (valid) {
      }
    })
  },
  handleSendVerify: useThrottleFn(async () => {
    // 發送驗證碼
    if (!state.data.account) {
      notification.warning({ title: '請輸入帳號' })
    } else {
      notification.success({ title: '驗證碼已發送', subTitle: '發送至 hao@gmail.com' })
    }
  }, 5000),
}
</script>
