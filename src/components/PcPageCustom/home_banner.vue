<template>
  <div
    :style="{
      marginTop: `${state.mTOP}px`,
    }">
    <div v-if="!state.img?.img?.length" class="flex-c">Swiper</div>
    <!-- {{ state.img }} -->
    <Swiper
      v-if="state.img.length"
      :modules="modules"
      :lazy="true"
      :speed="state.speed"
      :parallax="true"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :pagination="{ clickable: true, enabled: state.docStyle !== 2 }"
      class="mySwiper relative w-full rounded-[0px]"
      :class="{
        'pagination-bullets': state.docStyle === 0,
        'pagination-square': state.docStyle === 1,
      }">
      <SwiperSlide v-for="(item, index) of state.img" :key="index" class="h-auto w-full">
        <Anchor v-if="item?.img[0]?.img" class="aspect-[21/9] h-full w-full">
          <img
            :src="item?.img[0]?.img"
            class="banner-bg parallax-bg h-full w-full object-cover max-md:hidden" />

          <div
            class="banner-inner absolute flex w-1/2 -translate-x-[80%] -translate-y-[90%] flex-col text-hd-white max-md:w-full max-md:-translate-x-1/2 max-md:-translate-y-[50%] max-md:px-10">
            <span class="desc" data-swiper-parallax="-800">
              {{ item.info[0].value }}
            </span>
          </div>
        </Anchor>
      </SwiperSlide>
      <div v-if="state.navStyle !== 2" class="swiper-button-prev swiper-button-prev" />
      <div v-if="state.navStyle !== 2" class="swiper-button-next swiper-button-next" />
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { PcPageMenuType } from '@/enum/PcPage'
import { usePcConfigStore } from '@/stores/pcConfig'
import {
  Pagination,
  Autoplay,
  EffectCards,
  EffectCreative,
  Parallax,
  EffectFade,
  Navigation,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue' // Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/parallax'
import 'swiper/css/effect-cards'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-cube'
import 'swiper/css/effect-flip'
import 'swiper/css/autoplay'

const modules = [
  Pagination,
  Autoplay,
  EffectCards,
  EffectCreative,
  Parallax,
  EffectFade,
  Navigation,
]

const pcConfigStore = usePcConfigStore()

defineOptions({
  name: 'home_banner',
  cname: '輪播圖',
  type: PcPageMenuType.basis,
  icon: 'banner',
  configName: 'c_banner',
  defaultName: 'swiperBg', // 外面匹配名稱

  data() {
    return {
      // 默認初始化數據禁止修改
      defaultConfig: {
        name: 'swiperBg',
        timestamp: this.num,
        setUp: {
          tabVal: 0,
        },
        // 圖片列表
        swiperConfig: {
          title: '最多可添加10張圖片，建議寬度750px；鼠標拖拽左側圓點可調整圖片 順序',
          maxList: 10,
          list: [
            {
              img: [],
              info: [
                {
                  title: '標題',
                  value: '',
                  placeholder: '選填',
                },
                {
                  title: '鏈接',
                  value: '',
                  placeholder: '請輸入鏈接',
                  max: 100,
                },
              ],
            },
          ],
        },
        // isShow: {
        //   title: '是否顯示背景色',
        //   val: true,
        // },
        // 背景颜色
        // bgColor: {
        //   title: '背景顏色(漸變)',
        //   default: [
        //     {
        //       item: '#F62C2C',
        //     },
        //     {
        //       item: '#F96E29',
        //     },
        //   ],
        //   color: [
        //     {
        //       item: '#F62C2C',
        //     },
        //     {
        //       item: '#F96E29',
        //     },
        //   ],
        // },
        dotColor: {
          title: '分頁、指示器顏色',
          default: [
            {
              item: '#fff',
            },
          ],
          color: [
            {
              item: '#fff',
            },
          ],
        },
        // 輪播速度
        speed: {
          title: '輪播速度(秒)',
          val: 0,
          max: 10,
        },
        // 左右間距
        // lrConfig: {
        //   title: '左右邊距',
        //   val: 10,
        //   min: 0,
        // },
        // 頁面間距
        mbConfig: {
          title: '頁面間距',
          val: 0,
          min: 0,
        },
        // 輪播圖點樣式
        docConfig: {
          cname: 'swiper',
          title: '分頁器樣式',
          type: 1,
          list: [
            {
              val: '圓形',
              icon: 'dot',
            },
            {
              val: '直線',
              icon: 'squarepoint',
            },
            // {
            //   val: '數字',
            //   icon: 'iconshuzi',
            // },
            {
              val: '無分頁器',
              icon: 'jinyong',
            },
          ],
        },
        navConfig: {
          cname: 'swiper',
          title: '指示器樣式',
          type: 0,
          list: [
            {
              val: '大',
              icon: 'L',
            },
            {
              val: '小',
              icon: 'S',
            },
            {
              val: '無指示器',
              icon: 'jinyong',
            },
          ],
        },
        txtStyle: {
          title: '分頁器位置',
          type: 1,
          list: [
            {
              val: '居左',
              icon: 'doc_left',
            },
            {
              val: '居中',
              icon: 'doc_center',
            },
            {
              val: '居右',
              icon: 'doc_right',
            },
          ],
        },
        // 圖片樣式
        // imgConfig: {
        //   cname: 'docStyle',
        //   title: '輪播圖樣式',
        //   type: 0,
        //   list: [
        //     {
        //       val: '圓角',
        //       icon: 'pic_fillet',
        //     },
        //     {
        //       val: '直角',
        //       icon: 'pic_square',
        //     },
        //   ],
        // },
      },
    }
  },
})

// ----------- props -----------
const props = withDefaults(
  defineProps<{
    num: number
    index?: number
  }>(),
  {},
)
const {
  state: {
    value: { defaultArray },
  },
} = storeToRefs(pcConfigStore)
const state = ref({
  pageData: {},
  // bgColor: [],
  mTOP: 0,
  // edge: 0,
  // imgStyle: 0,
  img: [] as any,
  docStyle: 0,
  navStyle: 0,
  dotPosition: 0,
  dotColor: '',
  // isShow: true,
  speed: 0,
})

onMounted(function () {
  nextTick(function () {
    state.value.pageData = defaultArray[props.num]
    setConfig(state.value.pageData)
  })
})

const nav_size = computed(() => {
  return state.value.navStyle === 0 ? '44px' : '20px'
})
const pag_align = computed(() => {
  return state.value.dotPosition === 0 ? 'start' : state.value.dotPosition === 1 ? 'center' : 'end'
})

watch(
  () => state.value.pageData,
  (newVal) => {
    setConfig(newVal)
  },
  { deep: true },
)
watch(
  () => props.num,
  (newVal) => {
    let data = defaultArray[newVal]
    setConfig(data)
  },
  { deep: true },
)
watch(
  () => defaultArray,
  (newVal) => {
    let data = newVal[props.num]
    setConfig(data)
  },
  { deep: true },
)

const setConfig = (data) => {
  if (!data) return
  // state.value.isShow = data.isShow.val
  // state.value.bgColor = data.bgColor.color
  state.value.mTOP = data.mbConfig.val
  // state.value.edge = data.lrConfig.val
  // state.value.imgStyle = data.imgConfig.type
  state.value.img = data.swiperConfig.list.length ? [{ ...data.swiperConfig.list[0] }] : []
  state.value.docStyle = data.docConfig.type
  state.value.dotPosition = data.txtStyle.type
  state.value.navStyle = data.navConfig.type
  state.value.dotColor = data.dotColor.color[0].item
  state.value.speed = data.speed.val
}
</script>

<style scoped lang="scss">
.mySwiper {
  --swiper-pagination-color: v-bind(state.dotcolor);
  --swiper-navigation-color: v-bind(state.dotcolor);
  --swiper-navigation-size: v-bind(nav_size);

  &.pagination-square {
    :deep(.swiper-pagination-bullet) {
      width: 20px;
      height: 4px;
      border-radius: 0;
    }
  }

  :deep(.swiper-pagination) {
    text-align: v-bind(pag_align);
  }
}

.banner-bg {
  @apply m-auto h-full w-full;

  position: relative;
  clip-path: polygon(100% 0, 0 0, 0 100%, 100% 100%);
  background-repeat: no-repeat;
  background-size: 100%;
  border-radius: 0;
}

.banner-inner {
  @apply left-1/2 top-1/2 text-center;
}

:deep(.swiper-pagination-lock),
:deep(.swiper-button-lock),
:deep(.swiper-pagination-bullet:only-child) {
  display: inline-block !important;
}

.desc {
  @apply text-start text-h6 font-bold lg:text-h4;
}
</style>
