<template>
  <div class="max-md:hidden">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">
        <div class="center hover-transition-bg relative rounded-md px-1 py-1 leading-none">
          <svg-icon name="home" class="h-4 w-4" />
        </div>
      </el-breadcrumb-item>

      <el-breadcrumb-item v-if="menuStore.getChildrenMenus?.length > 1">
        <el-dropdown>
          <span class="hover-transition-bg rounded-md px-2 py-1">
            {{ route?.meta?.page?.menu?.title || route?.meta?.menu?.title }}
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item of menuStore.getChildrenMenus"
                :key="item?.title"
                class="text-hd-dark hover:!text-hd-primary"
                @click="dropdownClick(item?.route)">
                <span class="px-2">
                  {{ item?.title }}
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-breadcrumb-item>

      <el-breadcrumb-item v-if="route?.meta?.menu?.title !== '首頁'">
        {{ route?.meta?.menu?.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'

const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()

const dropdownClick = (route: string) => {
  if (route) {
    router.push({ name: route })
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  --el-text-color-regular: var(--hd-primary) !important;
  .el-breadcrumb__inner {
    color: var(--hd-primary) !important;
  }

  .el-breadcrumb__inner.is-link {
    color: var(--hd-text-50) !important;
  }

  .el-breadcrumb__inner.is-link:hover {
    color: var(--hd-primary-hover) !important;
  }
  :deep(.el-breadcrumb__item) {
    height: 24px !important;
  }
}
</style>
