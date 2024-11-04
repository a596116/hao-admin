<template>
  <div>banner</div>
</template>

<script setup lang="ts">
import { PcPageMenuType } from '@/enum/PcPage'

const a = 1
</script>

<script lang="ts">
export default {
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
        // 图片列表
        swiperConfig: {
          title: '最多可添加10張圖片，建議寬度750px；鼠標拖拽左側圓點可調整圖片 順序',
          maxList: 10,
          list: [
            {
              img: '',
              info: [
                {
                  title: '標題',
                  value: '今日推薦',
                  tips: '選填，不超過4個字',
                  max: 4,
                },
                {
                  title: '鏈接',
                  value: '',
                  tips: '請輸入鏈接',
                  max: 100,
                },
              ],
            },
          ],
        },
        isShow: {
          title: '是否顯示背景色',
          val: true,
        },
        // 背景颜色
        bgColor: {
          title: '背景顏色(漸變)',
          default: [
            {
              item: '#F62C2C',
            },
            {
              item: '#F96E29',
            },
          ],
          color: [
            {
              item: '#F62C2C',
            },
            {
              item: '#F96E29',
            },
          ],
        },
        dotColor: {
          title: '指示器顏色',
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
        // 左右間距
        lrConfig: {
          title: '左右邊距',
          val: 10,
          min: 0,
        },
        // 頁面間距
        mbConfig: {
          title: '頁面間距',
          val: 0,
          min: 0,
        },
        // 輪播圖點樣式
        docConfig: {
          cname: 'swiper',
          title: '指示器樣式',
          type: 0,
          list: [
            {
              val: '圓形',
              icon: 'iconDot',
            },
            {
              val: '直線',
              icon: 'iconSquarepoint',
            },
            {
              val: '數字',
              icon: 'iconshuzi',
            },
            {
              val: '無指示器',
              icon: 'iconjinyong',
            },
          ],
        },
        txtStyle: {
          title: '指示器位置',
          type: 0,
          list: [
            {
              val: '居左',
              icon: 'icondoc_left',
            },
            {
              val: '居中',
              icon: 'icondoc_center',
            },
            {
              val: '居右',
              icon: 'icondoc_right',
            },
          ],
        },
        // 圖片樣式
        imgConfig: {
          cname: 'docStyle',
          title: '輪播圖樣式',
          type: 0,
          list: [
            {
              val: '圓角',
              icon: 'iconPic_fillet',
            },
            {
              val: '直角',
              icon: 'iconPic_square',
            },
          ],
        },
      },
      pageData: {},
      bgColor: [],
      mTOP: 0,
      edge: 0,
      imgStyle: 0,
      imgSrc: '',
      docStyle: 0,
      dotPosition: 0,
      dotColor: '',
      isShow: true,
    }
  },
}
</script>
