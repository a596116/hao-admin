<template>
  <suspense>
    <el-config-provider :locale="zhTw">
      <RouterView />
    </el-config-provider>
  </suspense>
  <ReloadPrompt />
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhTw from 'element-plus/es/locale/lang/zh-tw.mjs'
import { useThemeStore } from '@/stores/themeStore'
useThemeStore()
</script>

<style lang="scss">
// @import '@/styles/scss/base.scss';
</style>
