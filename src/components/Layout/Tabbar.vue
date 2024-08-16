<template>
  <div v-show="!!menuStore.isTabbarCollapse" class="">
    <section class="history mt-1 flex h-[26px] max-w-[100vw] overflow-auto px-1">
      <TabViews />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'

const menuStore = useMenuStore()
</script>

<style scoped lang="scss">
main > div {
  // box-shadow: 5px 5px 14px #a7aaad, -5px -5px 14px #ffffff;
}
.history::-webkit-scrollbar {
  display: none;
}
</style>
