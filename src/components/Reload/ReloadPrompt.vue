<script setup lang="ts">
import { cn } from '@/utils/tailwind'
import { useRegisterSW } from 'virtual:pwa-register/vue'

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
  // immediate: true,
  onRegisteredSW(swUrl, r) {
    r &&
      setInterval(async () => {
        await r.update()
      }, 20000 /* 20s for testing purposes */)
  },
})

async function close() {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <div
    v-show="needRefresh"
    role="alert"
    :class="
      cn(
        'pwa-toast fixed bottom-0 right-0 z-[10000] m-4 rounded-md bg-white px-4 py-3 text-left',
        'border border-[#8885] shadow-xl shadow-[#8885]',
      )
    ">
    <div class="mb-2 flex flex-col">
      <span class="text-base font-medium"> 有新版本可用 </span>
      <span class="text-sm"> 點擊刷新按鈕獲取最新版本 </span>
    </div>

    <el-button type="primary" @click="updateServiceWorker()">刷新</el-button>
    <el-button type="default" plain @click="close">關閉</el-button>
  </div>
  <!-- <div v-show="offlineReady || needRefresh" class="pwa-toast" role="alert">
    <div class="message">
      <span v-if="offlineReady"> 新內容以就緒 </span>
      <span v-else> 有新内容，點擊重新加載按鈕更新。 </span>
    </div>
    <button v-if="needRefresh" @click="updateServiceWorker()">重新加載</button>
    <button @click="close">關閉</button>
  </div> -->
</template>
