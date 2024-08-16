<template>
  <div class="relative flex h-full w-full items-center gap-3 bg-hd-bg p-2 text-hd-dark max-sm:p-1">
    <!-- <Menu v-if="showMenu" /> -->
    <div class="content flex h-full w-full flex-1 flex-col">
      <Header />
      <Tabbar />

      <main
        class="main relative h-full max-h-full flex-1 overflow-y-auto overflow-x-hidden rounded-lg"
        :class="{
          'bg-hd-bg-1': !invisible_bg.includes(route.path),
        }">
        <router-view #default="{ Component }">
          <Transition appear name="fade-slide" mode="out-in">
            <component :is="Component" class="absolute h-full w-full" />
          </Transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'
import { useThemeStore } from '@/stores/themeStore'
const route = useRoute()
const menuStore = useMenuStore()
const themeStore = useThemeStore()
const showMenu = themeStore.layout.showMenu

menuStore.init('admin')
watch(
  route,
  () => {
    menuStore.addHistoryMenu(route)
  },
  { immediate: true },
)

const invisible_bg = ['/home/dashboard']
</script>

<style scoped lang="scss">
.animate__bounceInRight {
  animation-duration: 0.8s;
}

.animate__bounceOutLeft {
  animation-duration: 0.5s;
}

.mask {
  z-index: 99;
  @apply absolute top-0 h-screen w-screen bg-hd-dark-50 opacity-20;

  &.close {
    @apply hidden;
  }
}
</style>
