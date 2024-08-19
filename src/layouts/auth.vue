<template>
  <main class="relative">
    <LoginBg />
    <div class="introduce">
      <div class="introduce-content">
        <Vue3Lottie :animationLink="appConfig.login.logo" width="500px" class="block" />
      </div>
    </div>
    <div class="form-wrapper">
      <router-view #default="{ Component }">
        <!-- <Transition appear name="fade-slide" mode="out-in"> -->
        <component :is="Component" class="flex-c absolute h-full w-full p-10" />
        <!-- </Transition> -->
      </router-view>
    </div>
  </main>
</template>

<script setup lang="ts">
import { appConfig } from '@/app.config'
</script>

<style scoped lang="scss">
main {
  @apply relative flex h-screen w-screen overflow-hidden text-hd-text;
}

.introduce {
  @apply relative h-full w-1/2 max-md:hidden;

  .introduce-content {
    @apply flex-c h-full w-full;

    .tips {
      @apply text-3xl font-black;
    }
  }
}

.form-wrapper {
  @apply flex-c absolute right-0 box-border h-full w-1/2 px-[10%] max-md:w-full;
}
</style>
