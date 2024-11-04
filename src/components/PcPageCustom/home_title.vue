<template>
  <div>title</div>
</template>

<script setup lang="ts">
import { PcPageMenuType } from '@/enum/PcPage'

defineOptions({
  name: 'home_title',
  cname: '標題',
  type: PcPageMenuType.tool,
  icon: 'title',
  configName: 'c_home_title',
  defaultName: 'titles', // 外面匹配名稱
  data() {
    return {
      defaultConfig: {
        name: 'titles',
        timestamp: this.num,
        setUp: {
          tabVal: 0,
        },
        titleConfig: {
          title: '標題',
          value: '標題',
          place: '請輸入標題',
          max: 10,
        },
        linkConfig: {
          title: '鏈接',
          value: '',
          place: '請輸入鏈接地址',
          max: 100,
        },
        themeColor: {
          title: '字體顏色',
          name: 'themeColor',
          default: [
            {
              item: '#282828',
            },
          ],
          color: [
            {
              item: '#282828',
            },
          ],
        },
        titleColor: {
          title: '背景顏色',
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
        bgStyle: {
          title: '背景樣式',
          name: 'bgStyle',
          type: 0,
          list: [
            {
              val: '直角',
              icon: 'iconPic_square',
            },
            {
              val: '圓角',
              icon: 'iconPic_fillet',
            },
          ],
        },
        prConfig: {
          title: '背景邊距',
          val: 0,
          min: 0,
        },
        textPosition: {
          title: '文本位置',
          type: 0,
          list: [
            {
              val: '居左',
              style: 'left',
              icon: 'icondoc_left',
            },
            {
              val: '居中',
              style: 'center',
              icon: 'icondoc_center',
            },
            {
              val: '居右',
              style: 'right',
              icon: 'icondoc_right',
            },
          ],
        },
        textStyle: {
          title: '文本樣式',
          type: 0,
          list: [
            {
              val: '正常',
              style: 'normal',
              icon: 'icondoc_general',
            },
            {
              val: '斜體',
              style: 'italic',
              icon: 'icondoc_skew',
            },
            {
              val: '加粗',
              style: 'bold',
              icon: 'icondoc_bold',
            },
          ],
        },
        fontSize: {
          title: '文本大小',
          val: 12,
          min: 12,
        },
        mbConfig: {
          title: '頁面間距',
          val: 0,
          min: 0,
        },
      },
      tabVal: 0,
      title: '標題',
      link: '',
      themeColor: '#282828',
      titleColor: '#fff',
      bgStyle: 0,
      pr: 0,
      textPosition: 0,
      textStyle: 0,
      fontSize: 12,
      mb: 0,
    }
  },
})

// ----------- props -----------
const props = withDefaults(
  defineProps<{
    num: number
  }>(),
  {},
)
</script>
