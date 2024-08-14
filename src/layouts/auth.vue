<template>
  <main class="relative">
    <LoginBg />
    <div class="introduce">
      <div class="introduce-content">
        <Vue3Lottie
          animationLink="https://lottie.host/e3e52f0b-652c-4485-95db-e84eb80f1160/TXpyjvxsVV.json"
          width="500px"
          class="block" />
      </div>
    </div>
    <div class="form-wrapper">
      <router-view #default="{ Component }">
        <Transition appear name="fade-slide" mode="out-in">
          <component :is="Component" class="center absolute h-full w-full p-10" />
        </Transition>
      </router-view>
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
main {
  @apply relative flex h-screen w-screen overflow-hidden text-hd-text;
}

.introduce {
  @apply relative h-full w-1/2 max-md:hidden;

  .introduce-content {
    @apply flex h-full w-full items-center justify-center;

    .tips {
      @apply text-3xl font-black;
    }
  }
}

.form-wrapper {
  @apply absolute right-0 box-border flex h-full w-1/2 items-center justify-center px-[10%] max-md:w-full;
}
</style>
