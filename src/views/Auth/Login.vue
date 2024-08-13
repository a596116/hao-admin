<template>
  <FormLogin
    v-model:model="state.loginForm"
    :fields="state.authLoginColumns"
    :rules="loginRules"
    class="w-full"
    :captcha="state.captcha"
    @submit="actions.handleSubmit"
    @on-refresh-captcha="actions.handleFetchCaptcha(state.captcha.key)">
    <template #button>
      <div class="flex items-center justify-between gap-4">
        <el-checkbox v-model="state.loginForm.rememberMe" label="記住我" class="text-black" />
        <Anchor :to="{ path: '/' }" class="text-hd-link" hover>忘記密碼？</Anchor>
      </div>
    </template>
  </FormLogin>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import CryptoJS from 'crypto-js'
import { isEmpty } from 'lodash-es'
import { appConfig } from '@/app.config'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const captchaRef = ref(null)
const verify = ref({
  key: null,
  id: '',
})

const state = reactive({
  // 登入表單
  authLoginColumns: [
    { label: '帳號', prop: 'account', placeholder: '請輸入帳號', inputOptions: { icon: 'user' } },
    {
      label: '密碼',
      prop: 'password',
      type: 'password',
      placeholder: '請輸入密碼',
      inputOptions: { icon: 'password' },
    },
    appConfig.login.captchaType == 'image'
      ? { title: '驗證碼', prop: 'captcha', placeholder: '請輸入驗證碼' }
      : {},
  ].filter((r) => !isEmpty(r)) as IFormColumns[],

  // 登入表單
  loginForm: {
    account: '',
    password: '',
    rememberMe: false,
    captcha: '',
  },
  captcha: {
    img: '',
    key: '',
  },

  alterText: '',
})

// ----------- Rules ----------
const loginRules = reactive<FormRules>({
  account: [{ required: true, message: '請輸入帳號', trigger: 'change' }],
  password: [],
})

onMounted(() => {
  getCookie()
  actions.handleFetchCaptcha()
  if (route.query.u) {
    state.loginForm.account = String(route.query.u).split(',')[0]
    state.loginForm.password = String(route.query.u).split(',')[1]
  }
})

const getCookie = () => {
  const {
    account: storeAccount,
    password: storePassword,
    rememberMe: storeRememberMe,
  } = authStore.rememberUser
  const { account, password, rememberMe } = state.loginForm

  let decryptedPassword = ''
  if (storePassword) {
    const decrypted = CryptoJS.AES.decrypt(storePassword, 'haodai')
    decryptedPassword = JSON.parse(CryptoJS.enc.Utf8.stringify(decrypted))
  }
  state.loginForm = {
    account: storeAccount ? storeAccount : account,
    password: decryptedPassword ? decryptedPassword : password,
    rememberMe: storeRememberMe ? Boolean(storeRememberMe) : rememberMe,
    captcha: '',
  }
}
const setCookie = (account: string, password: string, rememberMe: any) => {
  if (rememberMe) {
    const encryptPassword = CryptoJS.AES.encrypt(JSON.stringify(password), 'haodai').toString()
    authStore.rememberUser = {
      account,
      password: encryptPassword,
      rememberMe,
    }
  } else {
    authStore.rememberUser = {
      account: '',
      password: '',
      rememberMe: false,
    }
  }
}
const actions = {
  handleSubmit: async (formEl: FormInstance | undefined) => {
    console.log()
  },

  /**
   * @description 取得Captcha驗證碼
   */
  handleFetchCaptcha: (id?: string) => {
    if (appConfig.login.captchaType !== 'image') return
  },
}
</script>
