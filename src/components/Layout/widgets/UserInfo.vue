<template>
  <div class="flex items-center">
    <el-dropdown popper-class="rounded-md min-w-[220px]" trigger="click">
      <div class="hover-transition-bg center rounded-full p-1 leading-none">
        <el-image src="/avatar.png" class="logo1 h-7 w-7 rounded-full" fit="cover" :lazy="true" />
      </div>
      <template #dropdown>
        <el-dropdown-menu class="gap-0 p-0">
          <div class="flex items-center gap-2 p-3">
            <el-image src="/avatar.png" class="logo1 h-10 w-10 rounded-full" fit="cover" />
            <div class="flex flex-col gap-1">
              <span class="text-base text-hd-text">{{ userStore.user.name }}</span>
              <span class="text-xs text-hd-text-50">{{ userStore.user.email }}</span>
            </div>
          </div>
          <el-divider class="my-0 bg-hd-border" />
          <template v-for="item in options" :key="item.label">
            <el-divider v-if="item.divider" class="my-0 bg-hd-border" />
            <ThemeSetting v-else-if="item.themeSetting" :is-dropdown="true" />
            <el-dropdown-item
              v-else
              class="m-1 rounded-md text-hd-text-50 hover:text-hd-text"
              @click="item.click">
              <svg-icon :name="item.icon" class="mr-2 h-5 w-5" />
              <span class="text-sm font-medium"> {{ item.label }} </span>
            </el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- <DialogResetPassword v-model:dialog-visible="dialogVisible" /> -->
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'

const userStore = useAuthStore()
const dialogVisible = ref(false)

const options = [
  {
    label: '文檔',
    icon: 'book',
    click: () => {
      window.open('https://hao-doc.vercel.app')
    },
  },
  {
    label: 'Github',
    icon: 'github',
    click: () => {
      window.open('https://github.com/a596116/hao-admin')
    },
  },
  {
    divider: true,
  },
  {
    themeSetting: true,
  },
  // {
  //   label: '修改密碼',
  //   icon: 'reset',
  //   click: () => {
  //     dialogVisible.value = true
  //   },
  // },
  {
    label: '退出登入',
    icon: 'logout',
    click: () => {
      userStore.logoutAuth()
    },
  },
]
</script>
