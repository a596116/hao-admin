<template>
  <div class="setUp">
    <div class="tab">
      <div class="item" :class="{ on: state.tabVal == 0 }" @click="onClickTab(0)">
        <span class="text">內容</span>
      </div>
      <div class="item" :class="{ on: state.tabVal == 1 }" @click="onClickTab(1)">
        <span class="text">樣式</span>
      </div>
      <div :class="state.tabVal == 0 ? 'bg-left' : 'bg-right'" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'c_set_up',
})

// ----------- props -----------
const props = withDefaults(
  defineProps<{
    configObj: any
    configNme: string
  }>(),
  {},
)

const state = ref({
  defaults: {} as any,
  configData: {} as any,
  tabVal: 0,
})

watch(
  () => props.configObj,
  (nVal, oVal) => {
    nextTick(() => {
      state.value.defaults = nVal
      state.value.configData = nVal[props.configNme]
      state.value.tabVal = state.value.configData.tabVal
    })
  },
  { deep: true, immediate: true },
)

onMounted(() => {
  nextTick(() => {
    state.value.defaults = props.configObj
    // state.value.configData = props.configObj[props.configNme]
  })
})

const onClickTab = (e: number) => {
  state.value.configData.tabVal = e
}
</script>

<style scoped lang="scss">
.setUp {
  margin-bottom: 16px;
}

.tab {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30px;
  margin: 0 auto;
  font-size: 12px;
  background: #f2f2f2;
  border-radius: 20px;

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 30px;
    padding: 5px 10px;
    cursor: pointer;
    transition: all 0.3s;

    .text {
      z-index: 2;
    }
  }

  .item.on {
    color: #fff;
    border-radius: 20px;
  }

  .bg-left,
  .bg-right {
    position: absolute;
    left: 0;
    z-index: 1;
    width: 50%;
    height: 30px;
    padding: 5px 10px;
    background-color: var(--hd-primary);
    transition: 0.3s ease-in-out;
  }

  .bg-left {
    border-radius: 20px 0 0 20px;
    transform: translateX(0%);
  }

  .bg-right {
    border-radius: 0 20px 20px 0;
    transform: translateX(100%);
  }
}

.setUp ::v-deep .ivu-tabs-nav-scroll {
  padding: 0 30px;
}

.setUp ::v-deep .ivu-tabs-nav .ivu-tabs-tab {
  padding: 8px 45px;
}
</style>
