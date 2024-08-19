<template>
  <button class="center hover-transition-bg rounded-lg p-1 leading-none" @click.stop="toggleTheme">
    <SvgIcon :name="isDark ? 'sun' : 'moon'" class="size-5 fill-hd-text text-hd-text" />
  </button>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/themeStore'

const themeStore = useThemeStore()

const { osTheme, isDark } = storeToRefs(themeStore)

const toggleTheme = (event: MouseEvent) => {
  const isAppearanceTransition =
    document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!isAppearanceTransition || !event) {
    themeStore.toggleCssDarkMode(!isDark.value ? 'dark' : 'light')
    return
  }
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  const transition = document.startViewTransition(async () => {
    themeStore.toggleCssDarkMode(!isDark.value ? 'dark' : 'light')
    await nextTick()
  })
  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 450,
        easing: 'ease-in',
        pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)',
      },
    )
  })
}
</script>
