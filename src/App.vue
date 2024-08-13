<template>
  <suspense>
    <el-config-provider :locale="zhCn">
      <RouterView />
    </el-config-provider>
  </suspense>
  <ReloadPrompt />
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { useThemeStore } from '@/stores/themeStore'
useThemeStore()
</script>

<style lang="scss">
// @import '@/styles/scss/base.scss';
</style>
