<template>
  <VueDraggable
    v-model="tabs"
    target=".tabs-chrome"
    :scroll="true"
    :animation="150"
    ghostClass="ghost">
    <TransitionGroup
      ref="el"
      type="transition"
      tag="ul"
      name="slide-left"
      class="tabs-chrome tabs relative size-full flex-1"
      :style="style">
      <li
        v-for="(link, i) of tabs"
        :key="link.title"
        :class="cn({ 'is-active': route.path === link.route })"
        :data-active-tab="route.path"
        :data-index="i"
        :style="{
          width: `${maxWidth}px`,
          left: `${(maxWidth - gap * 2) * i}px`,
        }"
        class="tabs-chrome__item group absolute flex h-full select-none items-center transition-all"
        @click="handleTabClick(link)">
        <div
          v-if="i !== 0 && route.path !== link.route"
          :class="
            cn(
              'tabs-chrome__divider absolute top-1/2 z-0 h-4 w-[1px] translate-y-[-50%] bg-hd-border transition-all',
              `left-[var(--gap)]`,
            )
          " />

        <!-- background -->
        <div
          :class="
            cn(
              'tabs-chrome__background absolute z-[1] size-full py-0 transition-opacity duration-150',
              `px-[calc(var(--gap)-1px)]`,
            )
          ">
          <div
            :class="
              cn(
                'tabs-chrome__background-content h-full duration-150',
                'rounded-tl-[var(--gap)] rounded-tr-[var(--gap)]',
                'group-[.is-active]:bg-hd-primary-hover',
              )
            " />
          <svg
            :class="
              cn(
                'tabs-chrome__background-before absolute bottom-0 left-[-1px] fill-transparent transition-all duration-150',
                'group-[.is-active]:fill-hd-primary-hover',
              )
            "
            height="7"
            width="7">
            <path d="M 0 7 A 7 7 0 0 0 7 0 L 7 7 Z" />
          </svg>
          <svg
            :class="
              cn(
                'tabs-chrome__background-after absolute bottom-0 right-[-1px] fill-transparent transition-all duration-150',
                'group-[.is-active]:fill-hd-primary-hover',
              )
            "
            height="7"
            width="7">
            <path d="M 0 0 A 7 7 0 0 0 7 7 L 0 7 Z" />
          </svg>
        </div>

        <!-- extra -->
        <div
          :class="
            cn(
              'tabs-chrome__extra absolute top-1/2 z-[3] size-4 translate-y-[-50%] leading-none',
              'right-[calc(var(--gap)*1.5)]',
            )
          ">
          <!-- close-icon -->
          <SvgIcon
            name="close"
            :class="
              cn(
                'size-3 cursor-pointer rounded-full stroke-hd-primary-hover transition-all',
                'hover:bg-accent group-[.is-active]:text-primary hover:stroke-hd-primary',
              )
            "
            @click.stop="menuStore.removeHistoryMenu(link)" />
        </div>

        <!-- tab-item-main -->
        <div
          :class="
            cn(
              'tabs-chrome__item-main absolute left-0 right-0 z-[2] my-0 flex h-full items-center overflow-hidden pr-4 text-hd-text-50 duration-150',
              'rounded-tl-[5px] rounded-tr-[5px]',
              'mx-[calc(var(--gap)*2)] group-hover:pr-3 group-[.is-active]:text-hd-white',
            )
          "
          class="">
          <span
            :class="
              cn(
                'tabs-chrome__label flex-1 overflow-hidden whitespace-nowrap text-sm',
                'ml-[var(--gap)]',
              )
            ">
            {{ link.title }}
          </span>
        </div>
      </li>
    </TransitionGroup>
  </VueDraggable>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'
import { cn } from '@/utils/tailwind'
import { VueDraggable } from 'vue-draggable-plus'

const menuStore = useMenuStore()
const route = useRoute()
const router = useRouter()
// ----------- props -----------
const props = withDefaults(
  defineProps<{
    gap?: number
    maxWidth?: number
  }>(),
  {
    gap: 7,
    maxWidth: 120,
  },
)

const { historyMenus: tabs } = storeToRefs(menuStore)

watch(route, () => {
  scrollIntoView()
})

function scrollIntoView() {
  setTimeout(() => {
    const element = document.querySelector(`.tabs-chrome__item.is-active`)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
}

const style = computed(() => {
  const { gap } = props
  return {
    '--gap': `${gap}px`,
  }
})

const handleTabClick = (link: any) => {
  if (route.path === link.route) return
  router.push({ path: link.route })
}
</script>

<style scoped lang="scss">
.tabs-chrome {
  .dragging {
    .tabs-chrome__item-main {
      @apply pr-0;
    }

    .tabs-chrome__extra {
      @apply hidden;
    }
  }

  &__item {
    &:hover:not(.is-active) {
      & + .tabs-chrome__item {
        .tabs-chrome__divider {
          @apply opacity-0;
        }
      }

      .tabs-chrome__divider {
        @apply opacity-0;
      }

      .tabs-chrome__background {
        &-content {
          @apply mx-1 rounded-md bg-hd-border pb-2;
        }

        &-before,
        &-after {
          @apply fill-hd-border;
        }
      }
    }

    &.is-active {
      @apply z-[2];

      & + .tabs-chrome__item {
        .tabs-chrome__divider {
          @apply opacity-0 !important;
        }
      }

      .tabs-chrome__background {
        @apply opacity-100;
      }
    }
  }

  &__scrollbar,
  &__label {
    mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 16px), transparent);
  }
}
</style>
