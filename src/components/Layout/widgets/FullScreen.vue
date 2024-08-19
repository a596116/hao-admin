<template>
  <div>
    <el-tooltip effect="dark" content="全螢幕" placement="bottom-end">
      <div
        class="hover-transition-bg flex-c hidden rounded-lg p-1 leading-none text-hd-text md:block"
        @click="fullScreen">
        <svg-icon v-if="isFullScreen" name="fullscreen-exit" class="size-5" />
        <svg-icon v-else name="fullscreen" class="size-5" />
      </div>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
const isFullScreen = ref<boolean>(false)
const fullScreen = () => {
  isFullScreen.value ? document.exitFullscreen() : document.documentElement.requestFullscreen()
  isFullScreen.value = !isFullScreen.value
}
</script>
