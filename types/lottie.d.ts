declare module 'vue' {
  export interface GlobalComponents {
    Vue3Lottie: (typeof import('vue3-lottie'))['Vue3Lottie']
  }
}
export {}
