<script lang="ts" setup>
import { getColorPalette } from '@/utils/color'

const lightColor = computed(() =>
  getColorPalette(
    getComputedStyle(document.documentElement).getPropertyValue(`--hd-primary-active`),
    5,
  ),
)
const darkColor = computed(() =>
  getColorPalette(
    getComputedStyle(document.documentElement).getPropertyValue(`--hd-primary-active`),
    7,
  ),
)
</script>

<template>
  <div
    class="z-1 absolute left-0 top-0 h-full w-full overflow-hidden bg-hd-login-bg"
    :style="{
      // backgroundColor: darkColor,
    }">
    <!-- <div class="absolute -right-[120px] -top-[80px] max-md:-right-[450px] max-md:-top-[100px]">
      <svg width="900" height="470">
        <defs>
          <path
            id="path-1"
            opacity="1"
            fill-rule="evenodd"
            d="M975.326 244.269C1068.58 102.969 1158.2 -87.5862 1084.52 -220.437C1014.18 -347.256 827.823 -276.172 684.303 -280.437C591.713 -283.189 506.96 -281.201 417.28 -240.266C261.889 -169.338 -0.103418 -142.373 0.761352 31.568C1.65755 211.832 286.655 133.425 419.599 226.159C510.685 289.695 515.119 466.073 628.991 469.783C762.266 474.126 892.627 369.574 975.326 244.269Z" />
          <linearGradient
            id="linearGradient-2"
            x1="844.262"
            y1="-801.358"
            x2="790.455"
            y2="425.264"
            gradientUnits="userSpaceOnUse">
            <stop offset="0" :stop-color="lightColor" stop-opacity="1" />
            <stop offset="1" :stop-color="darkColor" stop-opacity="1" />
          </linearGradient>
        </defs>
        <g opacity="1">
          <use xlink:href="#path-1" fill="url(#linearGradient-2)" fill-opacity="1" />
        </g>
      </svg>
    </div> -->
    <div class="absolute -bottom-[440px] -left-[300px] max-md:-bottom-[680px] max-md:-left-[300px]">
      <svg width="1081" height="929">
        <defs>
          <path
            id="path-2"
            opacity="1"
            fill-rule="evenodd"
            d="M62.9067 310.235C21.6761 441.821 -49.8367 581.797 52.7072 707.55C163.038 842.851 370.063 907.692 563.207 923.767C755.804 939.796 977.833 918.907 1058.1 791.226C1131.66 674.219 1011.2 490.285 911 366.378C819.5 268.378 661.041 362.682 581 310.235C443.95 220.433 438.271 -9.0208 274.297 0.351579C110.685 9.70326 101.298 187.709 62.9067 310.235Z" />
          <linearGradient
            id="linearGradient-3"
            x1="463.894"
            y1="915.323"
            x2="677.982"
            y2="96.4348"
            gradientUnits="userSpaceOnUse">
            <stop offset="0" :stop-color="darkColor" stop-opacity="1" />
            <stop offset="1" :stop-color="lightColor" stop-opacity="1" />
          </linearGradient>
        </defs>
        <g opacity="1">
          <use xlink:href="#path-2" fill="url(#linearGradient-3)" fill-opacity="1" />
        </g>
      </svg>
    </div>
  </div>
</template>
