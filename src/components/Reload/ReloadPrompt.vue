<script setup lang="ts">
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
  <div v-show="offlineReady || needRefresh" class="pwa-toast" role="alert">
    <div class="message">
      <span v-if="offlineReady"> 新內容以就緒 </span>
      <span v-else> 有新内容，點擊重新加載按鈕更新。 </span>
    </div>
    <button v-if="needRefresh" @click="updateServiceWorker()">重新加載</button>
    <button @click="close">關閉</button>
  </div>
</template>

<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 10000;
  padding: 12px;
  margin: 16px;
  text-align: left;
  background-color: white;
  border: 1px solid #8885;
  border-radius: 4px;
  box-shadow: 3px 4px 5px 0 #8885;
}

.pwa-toast .message {
  margin-bottom: 8px;
}

.pwa-toast button {
  padding: 3px 10px;
  margin-right: 5px;
  border: 1px solid #8885;
  border-radius: 2px;
  outline: none;
}
</style>
