<template>
  <div>
    <slot name="title" />
    <el-tooltip v-if="!isDropdown" effect="dark" content="偏好設定" placement="bottom-end">
      <div
        class="hover-transition-bg rounded-lg p-1 leading-none"
        @click="themeSettingDrawer = true">
        <svg-icon name="setting" class="h-5 w-5" />
      </div>
    </el-tooltip>
    <el-dropdown-item
      v-else
      class="m-1 rounded-md text-hd-text-50 hover:text-hd-text"
      @click="themeSettingDrawer = true">
      <svg-icon name="setting" class="mr-2 h-5 w-5" />
      <span class="text-sm font-medium"> 偏好設定 </span>
    </el-dropdown-item>

    <el-drawer
      v-model="themeSettingDrawer"
      title="偏好設定"
      :size="340"
      class="theme-setting-drawer rounded-l-xl"
      append-to-body>
      <div class="flex flex-col justify-center gap-3 px-2 text-lg text-hd-dark">
        <div class="">
          <div class="px-2">
            <el-divider>
              <span class="mx-2 font-medium">主題模式</span>
            </el-divider>
          </div>
          <section class="flex-c w-full">
            <el-segmented
              v-model="themeStore.osTheme.mode"
              :options="themeStore.osTheme.options"
              @change="themeStore.toggleCssDarkMode">
              <template #default="{ item }">
                <div class="flex-c px-4 py-2">
                  <svg-icon
                    :name="item == 'light' ? 'sun' : 'moon'"
                    :class="{
                      'size-[18px]': item == 'light',
                      'size-4': item == 'dark',
                    }"
                    class="fill-hd-text text-hd-text" />
                </div>
              </template>
            </el-segmented>
          </section>
        </div>
        <div class="flex w-full justify-between">
          <span class="flex-c mx-3 text-base">主題顏色</span>
          <el-color-picker
            v-model="themeStore.themeColor"
            :predefine="themeColorList"
            @change="themeStore.updateThemeColors" />
        </div>

        <div class="px-2">
          <el-divider>
            <span class="mx-2 font-medium">佈局</span>
          </el-divider>
        </div>
        <div class="flex w-full justify-between">
          <span class="flex-c mx-3 text-base">顯示標籤欄</span>
          <el-switch
            v-model="menuStore.isTabbarCollapse"
            class="ml-2"
            size="large"
            @change="menuStore.toggleTabbar" />
        </div>
        <div class="flex w-full justify-between">
          <span class="flex-c mx-3 text-base">顯示麵包屑</span>
          <el-switch
            v-model="menuStore.isBreadCrumb"
            class="ml-2"
            size="large"
            @change="menuStore.toggleBreadCrumb" />
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'
import { useThemeStore } from '@/stores/themeStore'
const menuStore = useMenuStore()
const themeStore = useThemeStore()

const props = withDefaults(
  defineProps<{
    isDropdown?: boolean
  }>(),
  {
    isDropdown: false,
  },
)
const themeSettingDrawer = ref<boolean>(false)
const themeColorList = ref<string[]>([themeStore.themeColor])
</script>
