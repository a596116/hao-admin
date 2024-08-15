<template>
  <main class="relative z-[18] mb-1 flex max-h-[50px] flex-col justify-center">
    <div class="flex items-center justify-between overflow-hidden bg-transparent py-1">
      <div class="flex items-center justify-center gap-3">
        <section
          v-if="showMenu"
          :class="{ 'rotate-180': menuStore.isMenuCollapse }"
          class="center hover-transition-bg cursor-pointer rounded-lg p-1 text-xl leading-none duration-200 hover:scale-105"
          @click="menuStore.toggleMenu">
          <SvgIcon name="collapse" class="h-5 w-5" />
        </section>
        <Breadcrumb v-if="menuStore.isBreadCrumb" class="breadcrumb rounded-md bg-transparent" />
      </div>

      <div class="flex items-center justify-center gap-3">
        <FullScreen v-if="showFullScreen" />
        <ThemeSetting v-if="showThemeSetting" class="max-sm:hidden" />
        <UserInfo />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'
import { useThemeStore } from '@/stores/themeStore'

const menuStore = useMenuStore()
const themeStore = useThemeStore()

const showMenu = themeStore.layout.showMenu
const showFullScreen = themeStore.layout.showFullScreenBar
const showThemeSetting = themeStore.layout.showSettingBar
</script>
