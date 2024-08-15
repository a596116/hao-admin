<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }" :width="width" :height="height">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
// ----------- props -----------
const props = withDefaults(
  defineProps<{
    name: string
    color?: string
    width?: string
    height?: string
    animation?: boolean
  }>(),
  {
    color: '',
    width: '20px',
    height: '20px',
    animation: false,
  },
)

const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  if (props.name) {
    return `svg-icon icon-${props.name} ${props.animation ? 'hover:animate-move' : ''}`
  }
  return 'svg-icon'
})
</script>

<style lang="scss" scoped>
.svg-icon {
  display: inline-block;
  vertical-align: middle;
  fill: currentcolor;
}

path {
  fill: none;
  stroke: #333;
  stroke-linecap: round;
  stroke-width: 1;
}
</style>
