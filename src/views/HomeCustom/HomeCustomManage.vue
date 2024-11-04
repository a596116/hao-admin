<template>
  <main class="diy-page flex h-screen w-full flex-col">
    <header class="flex justify-between bg-hd-primary p-4">
      <span class="text-h4 text-white" style="padding: 0" v-text="$route.meta.menu.title" />
      <div class="">
        <el-button
          class="ml20 header-btn close"
          :loading="state.loading"
          @click="actions.closeWindow"
          >關閉</el-button
        >
        <el-button
          class="ml20 header-btn save"
          :loading="state.loading"
          @click="actions.saveConfig(0)"
          >保存</el-button
        >
      </div>
    </header>

    <main class="diy-wrapper h-full">
      <!-- 左側 -->
      <section class="left">
        <div class="wrapper">
          <div v-for="(item, index) in state.leftMenu" :key="index">
            <div class="tips">
              {{ item.title }}
            </div>

            <VueDraggable
              v-model="item.list"
              class="dragArea list-group"
              :group="{ name: 'people', pull: 'clone', put: false }"
              :clone="actions.cloneDog"
              dragClass="dragClass"
              filter=".search , .navbar">
              <TransitionGroup ref="el" type="transition" tag="ul" name="draggable-fade">
                <li
                  v-for="element in item.list"
                  :key="element.name"
                  class="list-group-item"
                  :class="{
                    search: element.cname == '搜索框',
                    navbar: element.cname == '商品分类',
                  }"
                  @click="actions.addDom(element, 1)">
                  <div>
                    <div class="position" style="display: none">釋放鼠標將組建添加到此處</div>
                    <SvgIcon class="conter iconfont-diy" :name="element.icon" />
                    <p class="conter">{{ element.cname }}</p>
                  </div>
                </li>
              </TransitionGroup>
            </VueDraggable>
          </div>
        </div>
      </section>

      <!-- 中间 -->
      <section class="wrapper-con">
        <!-- <div class="acticons">
            <el-button class="bnt mb10" v-db-click @click="showTitle">页面设置</el-button>
            <span></span>
            <el-button class="bnt mb10" v-db-click @click="nameModal = true">另存模板</el-button>
            <span></span>
            <el-button class="bnt" v-db-click @click="reast">重置</el-button>
          </div> -->

        <div class="content">
          <div class="contxt">
            <div class="overflowy">
              <!-- <div class="picture">
                  <img src="@/assets/images/electric.png" />
                </div> -->

              <div
                class="page-title"
                :class="{ on: state.activeIndex == -100 }"
                @click="actions.showTitle">
                {{ titleTxt }}
                <div class="delete-box" />
                <div class="handle" />
              </div>
            </div>

            <div class="scrollCon">
              <div style="width: 100%; margin: 0 auto">
                <div
                  ref="imgContainer"
                  class="scroll-box"
                  :class="
                    picTxt && tabValTxt == 2
                      ? 'fullsize noRepeat'
                      : picTxt && tabValTxt == 1
                        ? 'repeat ysize'
                        : 'noRepeat ysize'
                  "
                  :style="
                    'background-color:' +
                    (colorTxt ? colorPickerTxt : '') +
                    ';background-image: url(' +
                    (picTxt ? picUrlTxt : '') +
                    ')'
                  ">
                  <VueDraggable
                    v-model="state.mConfig"
                    class="dragArea list-group"
                    target=".c-target"
                    group="people"
                    filter=".top"
                    @move="(e) => actions.onMove"
                    @change="(e) => actions.log(e, 'moved')"
                    @add="(e) => actions.log(e, 'added')">
                    <TransitionGroup
                      ref="el"
                      type="transition"
                      tag="ul"
                      name="draggable-fade"
                      class="c-target">
                      <li
                        v-for="(item, index) of state.mConfig"
                        :key="index"
                        class="mConfig-item"
                        :class="{
                          on: state.activeIndex == index,
                          top: item.name == 'search_box' || item.name == 'nav_bar',
                        }"
                        :style="
                          colorTxt
                            ? 'background-color:' + colorPickerTxt + ';'
                            : 'background-color:#fff;'
                        "
                        @click.stop="">
                        <component
                          :is="cPageComponent(item.name)"
                          ref="getComponentData"
                          :configData="state.propsObj"
                          :index="index"
                          :num="item.num" />
                        <!-- <div class="delete-box">
                          <div class="handleType">
                            <el-tooltip content="删除当前模块" placement="top">
                              <div
                                class="iconfont iconshanchu2"
                                v-db-click
                                @click.stop="bindDelete(item, key)"></div>
                            </el-tooltip>
  
                            <div
                              class="iconfont iconfuzhi"
                              v-db-click
                              @click.stop="bindAddDom(item, 0, key)"></div>
                            <div
                              class="iconfont iconshangyi"
                              :class="key === 0 ? 'on' : ''"
                              v-db-click
                              @click.stop="movePage(item, key, 1)"></div>
                            <div
                              class="iconfont iconxiayi"
                              :class="key === mConfig.length - 1 ? 'on' : ''"
                              v-db-click
                              @click.stop="movePage(item, key, 0)"></div>
                          </div>
                        </div> -->
                        <div class="handle" />
                      </li>
                    </TransitionGroup>
                  </VueDraggable>
                </div>
              </div>
            </div>

            <!-- <div class="overflowy">
              <div class="page-foot" @click="showFoot" :class="{ on: state.activeIndex == -101 }">
                <footPage></footPage>
                <div class="delete-box"></div>
                <div class="handle"></div>
              </div>
            </div> -->

            <!-- <div class="defaultData" v-if="pageId !== 0">
                <div class="data" v-db-click @click="setmoren">设置默认</div>
                <div class="data" v-db-click @click="getmoren">恢复默认</div>
              </div> -->
          </div>
        </div>
      </section>

      <!-- 右侧 -->
      <div class="right-box">right</div>
    </main>
  </main>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import mPage from '@/components/PcPageCustom'
import { PcPageMenuType, PcPageMenuTypeText } from '@/enum/PcPage'
import { usePcConfigStore } from '@/stores/pcConfig'
import HomeTitle from '@/components/PcPageCustom/home_title.vue'

const pcConfigStore = usePcConfigStore()

let idGlobal = 0
const state = ref({
  loading: false,
  /** 页面动态高度 */
  clientHeight: '',
  rollHeight: '',

  /** 左側菜單 */
  leftMenu: [],
  /** 左側組件 */
  lConfig: [],
  /** 中間組件渲染 */
  mConfig: [],
  /** 右側組件配置 */
  rConfig: [],
  activeConfigName: '',
  /** 组件传递的数据 */
  propsObj: {},
  /** 选中的下标 */
  activeIndex: -100,
  number: 0,
  pageId: '',
  pageName: '',
  pageType: '',
  category: [],
  urlList: [],
  footActive: false,
  loading: false,
  isSearch: false,
  isTab: false,
  isHomeProduct: false,
  isFllow: false,
  qrcodeImg: '',
  modal: false,
  nameModal: false,
  saveName: '',
})

onMounted(() => {
  state.value.lConfig = actions.objToArr(mPage)

  nextTick(() => {
    actions.createLeftMenu()
  })
})

/** computed */
const cPageComponent = (name: string) => {
  return defineAsyncComponent(() => import(`@/components/PcPageCustom/${name}.vue`))
}

const {
  state: {
    value: {
      pageTitle: titleTxt = '首頁',
      pageName: nameTxt = '模版',
      pageShow: showTxt,
      pageColor: colorTxt,
      pagePic: picTxt,
      pageColorPicker: colorPickerTxt,
      pageTabVal: tabValTxt,
      pagePicUrl: picUrlTxt,
    },
  },
} = storeToRefs(pcConfigStore)

const actions = {
  /**
   * @description: 創建左側菜單
   */
  createLeftMenu() {
    let tempArr = []
    let basis = {
      title: PcPageMenuTypeText.basis,
      list: [],
    }
    let marketing = {
      title: PcPageMenuTypeText.marketing,
      list: [],
    }
    let tool = {
      title: PcPageMenuTypeText.tool,
      list: [],
    }
    state.value?.lConfig?.map((el, index) => {
      switch (el.type) {
        case PcPageMenuType.basis:
          basis.list.push(el)
          break
        case PcPageMenuType.marketing:
          marketing.list.push(el)
          break
        case PcPageMenuType.tool:
          tool.list.push(el)
          break
      }
    })
    basis.list.length && tempArr.push(basis)
    marketing.list.length && tempArr.push(marketing)
    tool.list.length && tempArr.push(tool)
    state.value.leftMenu = tempArr
  },

  onMove(e) {
    if (e.data?.name == 'search_box') return false
    if (e.data?.name == 'nav_bar') return false
    // if (e.relatedContext.element.name == 'search_box') return false
    // if (e.relatedContext.element.name == 'nav_bar') return false
    return true
  },

  /**
   * @description: 拖拽排序
   */
  log(evt, type: 'moved' | 'added') {
    // 中间拖拽排序
    if (type == 'moved') {
      console.log('moved', evt)
      if (evt.data?.name == 'search_box' || evt.data?.name == 'nav_bar') {
        notification.warning({
          title: '該組件禁止拖拽',
        })
        return
      }

      evt.oldDraggableIndex = state.value.mConfig[evt.oldIndex].num
      evt.newDraggableIndex = state.value.mConfig[evt.newIndex].num
      evt.status = evt.oldIndex > evt.newIndex
      state.value.mConfig.forEach((el, index) => {
        el.num = new Date().getTime() * 1000 + index
      })
      evt.clonedData.list = state.value.mConfig
      state.value.rConfig = []
      let tempItem = { ...evt.clonedData, ...evt.data }
      // let tempItem = JSON.parse(JSON.stringify(item))
      state.value.rConfig.push(tempItem)
      state.value.activeIndex = evt.newIndex

      pcConfigStore.setConfigName(evt.data.name)
      pcConfigStore.defaultArraySort(tempItem)
    }

    // 從左向右拖拽排序
    if (type == 'added') {
      console.log('added', evt)
      let data = evt.data
      let obj = {}
      let timestamp = new Date().getTime() * 1000
      data.num = timestamp
      state.value.activeConfigName = data.name
      // let tempItem = { ...data }

      let tempItem = { ...evt.clonedData, ...evt.data }
      // let tempItem = JSON.parse(JSON.stringify(data))
      tempItem.id = 'id' + tempItem.num
      state.value.mConfig[evt.newIndex] = tempItem
      state.value.rConfig = []
      state.value.rConfig.push(tempItem)
      state.value.mConfig.forEach((el, index) => {
        el.num = new Date().getTime() * 1000 + index
      })
      tempItem.list = state.value.mConfig
      // evt.list = state.value.mConfig
      state.value.activeIndex = evt.newIndex
      // 保存組件名稱
      pcConfigStore.setConfigName(data.name)

      // pcConfigStore.defaultArraySort(tempItem)
      pcConfigStore.defaultArraySort(evt.data)
    }
  },

  /**
   * @description: 頁面標題點擊
   */
  showTitle() {
    state.value.activeIndex = -100
    let obj = {} as any
    for (var i in state.value.mConfig) {
      if (i == 'pageTitle') {
        obj = state.value.mConfig[i]
        obj.configName = state.value.mConfig[i].name
        obj.cname = '頁面設置'
      }
    }
    state.value.rConfig = []
    state.value.rConfig[0] = JSON.parse(JSON.stringify(obj))
  },

  /**
   * @description: 頁面底部點擊
   */
  showFoot() {
    state.value.activeIndex = -101
    let obj = {} as any
    for (var i in state.value?.mConfig) {
      if (i == 'pageFoot') {
        obj = state.value.mConfig[i]
        obj.configName = state.value.mConfig[i].name
        obj.cname = '底部菜單'
      }
    }
    state.value.rConfig = []
    state.value.rConfig[0] = JSON.parse(JSON.stringify(obj))
  },

  /**
   * @description: 组件添加
   */
  addDomCon(item, type, index) {
    if (item.name == 'search_box') {
      if (state.value.isSearch) return notification.warning({ title: '該組件只能添加一次' })
      state.value.isSearch = true
    }
    if (item.name == 'nav_bar') {
      if (state.value.isTab) return notification.warning({ title: '該組件只能添加一次' })
      state.value.isTab = true
    }
    if (item.name == 'home_product') {
      if (state.value.isHomeProduct) notification.warning({ title: '該組件只能添加一次' })
      state.value.isHomeProduct = true
    }
    idGlobal += 1
    let obj = {} as any
    let timestamp = new Date().getTime() * 1000
    item.num = `${timestamp}`
    item.id = `id${timestamp}`
    state.value.activeConfigName = item.name
    let tempItem = { ...item }
    // let tempItem = JSON.parse(JSON.stringify(item))
    if (item.name == 'search_box') {
      state.value.rConfig = []
      state.value.mConfig.unshift(tempItem)
      state.value.activeIndex = 0
      state.value.rConfig.push(tempItem)
    }
    // 動態拖動可上傳此部分代碼
    else if (item.name == 'nav_bar') {
      state.value.rConfig = []
      if (state.value.mConfig[0] && state.value.mConfig[0].name === 'search_box') {
        state.value.mConfig.splice(1, 0, tempItem)
        state.value.activeIndex = 1
      } else {
        state.value.mConfig.splice(0, 0, tempItem)
        state.value.activeIndex = 0
      }
      state.value.rConfig.push(tempItem)
    } else {
      if (type) {
        state.value.rConfig = []
        state.value.mConfig.push(tempItem)
        state.value.activeIndex = state.value.mConfig.length - 1
        state.value.rConfig.push(tempItem)
      } else {
        state.value.mConfig.splice(index + 1, 0, tempItem)
        state.value.activeIndex = index
      }
    }
    state.value.mConfig.forEach((el, index) => {
      el.num = new Date().getTime() * 1000 + index
    })

    // 保存組件名稱
    obj.element = item
    obj.list = state.value.mConfig
    pcConfigStore.setConfigName(item.name)
    pcConfigStore.defaultArraySort(obj)
  },

  /**
   * @description: 中間頁點擊添加模塊
   */
  bindAddDom(item, type, index) {
    let i = item
    state.value.lConfig.forEach((j) => {
      if (item.name == j.name) {
        i = j
      }
    })
    actions.addDomCon(i, type, index)
  },

  /**
   * @description: 左邊配置模塊點擊添加
   */
  addDom(item, type) {
    actions.addDomCon(item, type, state.value.mConfig.length - 1)
  },

  /**
   * @description: 點擊顯示相應的配置
   */
  bindconfig(item, index) {
    state.value.rConfig = []
    let tempItem = JSON.parse(JSON.stringify(item))
    state.value.rConfig.push(tempItem)
    state.value.activeIndex = index
    pcConfigStore.setConfigName(item.name)
  },

  /**
   * @description: 組件刪除
   */
  bindDelete(item, key) {
    if (item.name == 'search_box') {
      state.value.isSearch = false
    }
    if (item.name == 'nav_bar') {
      state.value.isTab = false
    }
    if (item.name == 'home_product') {
      state.value.isHomeProduct = false
    }
    state.value.mConfig.splice(key, 1)
    state.value.rConfig.splice(0, 1)
    if (state.value.mConfig.length != key) {
      state.value.rConfig.push(state.value.mConfig[key])
    } else {
      if (state.value.mConfig.length) {
        state.value.activeIndex = key - 1
        state.value.rConfig.push(state.value.mConfig[key - 1])
      } else {
        actions.showTitle()
      }
    }
    // 刪除第幾個配置
    pcConfigStore.deleteArray(key)
  },

  cloneDog(data) {
    return {
      ...data,
    }
  },

  objToArr(data) {
    let obj = Object.keys(data)
    let m = obj.map((key) => data[key])
    return m
  },
  /**
   * @description: 關閉窗口
   */
  closeWindow() {
    mesBox
      .question({
        title: '提示',
        subTitle: '請先保存配置，位保存的配置會丟失，確定要關閉嗎？',
        showCancelButton: true,
      })
      .then(() => {
        window.close()
      })
  },

  /**
   * @description: 保存配置
   */
  saveConfig(type: number) {
    console.log('保存配置')
  },
}
</script>

<style scoped lang="scss">
:deep(.el-card__body) {
  padding: 0;
  border-radius: 0;
}

:deep(.el-button--small) {
  // border-radius: 0;
  border-radius: 4px;
}

.look,
.look:hover,
.look:focus,
.look:active,
.close,
.close:hover,
.close:focus,
.close:active {
  color: #fff;
  background: var(--hd-primary);
  border-color: #fff;
}

.save,
.save:hover,
.save:active,
.save:focus {
  color: var(--hd-primary);
  background: #fff;
  border-color: var(--hd-primary);
}

.ysize {
  background-size: 100%;
}

.fullsize {
  background-size: 100% 100%;
}

.repeat {
  background-repeat: repeat;
}

.noRepeat {
  background-repeat: no-repeat;
}

.wrapper-con {
  @apply relative flex h-full flex-1 justify-center bg-[#f0f2f5] p-1;

  .acticons {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
    display: flex;
    flex-direction: column;

    .el-button + .el-button {
      margin-left: 0;
    }
  }

  /* min-width 700px; */
}

.main .content-wrapper {
  padding: 0 !important;
}

.defaultData {
  position: absolute;
  left: 50%;
  margin-left: 245px;

  /* margin-left 20px; */
  cursor: pointer;

  .data {
    width: 94px;
    height: 32px;
    margin-top: 20px;
    font-size: 12px;
    line-height: 32px;
    color: #282828;
    text-align: center;
    background-color: #fff;
    border-radius: 3px;
  }

  .data:hover {
    color: #fff;
    background-color: #2d8cf0;
    border: 0;
  }
}

.overflowy {
  overflow-y: scroll;

  .picture {
    width: 379px;
    height: 20px;
    margin: 0 auto;
    background-color: #fff;
  }
}

.bnt {
  width: 80px !important;
}

/* 定义滑块 内阴影+圆角 */
::-webkit-scrollbar-thumb {
  display: none;
  box-shadow: inset 0 0 6px #fff;
}

.left:hover::-webkit-scrollbar-thumb,
.right-box:hover::-webkit-scrollbar-thumb {
  display: block;
}

.contxt:hover ::-webkit-scrollbar-thumb {
  display: block;
}

::-webkit-scrollbar {
  width: 4px !important; /* 对垂直流动条有效 */
}

.scrollCon {
  overflow: hidden scroll;
}

.scroll-box .position {
  display: block !important;
  height: 40px;
  line-height: 40px;
  color: var(--hd-primary);
  text-align: center;
  background-color: #edf4fb;
  border: 1px dashed var(--hd-primary);
}

.scroll-box .conter {
  display: none !important;
}

.conter {
  margin-top: 3px;
}

.dragClass {
  background-color: #fff;
}

.ivu-mt {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.iconfont-diy {
  font-size: 24px;
  color: var(--hd-primary);
}

.diy-wrapper {
  @apply flex h-full w-full min-w-[1100px] max-w-full flex-1 justify-between;

  .left {
    @apply w-[150px] border-r bg-white;
    // min-width: 300px;
    // max-width: 300px;

    /* border 1px solid #DDDDDD */

    .wrapper {
      @apply flex flex-col gap-4 p-2;

      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;

      .tips {
        display: flex;
        justify-content: space-between;
        padding-bottom: 15px;
        font-size: 13px;
        color: #000;
        cursor: pointer;
      }
    }

    .link-item {
      padding: 10px;
      font-size: 12px;
      color: #323232;
      border-bottom: 1px solid #f5f5f5;

      .name {
        font-size: 14px;
        color: var(--hd-primary);
      }

      .copy_btn {
        cursor: pointer;
      }

      .link-txt {
        margin-top: 2px;
        word-break: break-all;
      }

      .params {
        margin-top: 5px;
        color: #1cbe6b;
        word-break: break-all;

        .txt {
          color: #323232;
        }

        span {
          &:last-child i {
            display: none;
            color: red;
          }
        }
      }

      .lable {
        display: flex;
        margin-top: 5px;
        color: #999;

        p {
          flex: 1;
          word-break: break-all;
        }

        button {
          width: 38px;
          margin-left: 30px;
        }
      }
    }

    .dragArea.list-group {
      @apply flex w-full flex-wrap gap-[10px];

      .list-group-item {
        @apply flex-c size-[60px] cursor-pointer flex-col rounded-[5px] text-center text-xs text-[#666];

        &:hover {
          border-right: 5px;
          box-shadow: 0 0 5px 0 rgb(24 144 255 / 30%);
          transition: all 0.2s;
          transform: scale(1.1);
        }

        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }

  .content {
    @apply relative flex size-full border-r;

    .contxt {
      @apply flex h-full w-full flex-1 flex-col overflow-hidden;
    }

    .page-foot {
      position: relative;
      // width: 379px;
      // margin: 0 auto 20px auto;

      .delete-box {
        position: absolute;
        top: 0;
        left: -2px;
        display: none;
        width: 383px;
        height: 100%;
        padding: 10px 0;
        border: 2px dashed var(--hd-primary);
      }

      &:hover,
      &.on {
        /* cursor: move; */
        .delete-box {
          /* display: block; */
        }
      }

      &.on {
        cursor: move;

        .delete-box {
          display: block;
          border: 2px solid var(--hd-primary);
          box-shadow: 0 0 10px 0 rgb(24 144 255 / 30%);
        }
      }
    }

    .page-title {
      position: relative;
      width: 100%;
      height: 35px;
      margin: 0 auto;
      font-size: 15px;
      line-height: 35px;
      color: #333;
      text-align: center;
      background: #fff;

      .delete-box {
        position: absolute;
        // left: -2px;
        top: 0;
        display: none;
        width: 100%;
        height: 100%;
        padding: 10px 0;
        border: 2px dashed var(--hd-primary);

        span {
          position: absolute;
          right: 0;
          bottom: 0;
          z-index: 11;
          display: inline-block;
          width: 32px;
          height: 16px;
          margin-left: 2px;
          font-size: 10px;
          line-height: 16px;
          color: #fff;
          text-align: center;
          cursor: pointer;
          background: rgb(0 0 0 / 40%);
        }
      }

      &:hover,
      &.on {
        /* cursor: move; */
        .delete-box {
          /* display: block; */
        }
      }

      &.on {
        cursor: move;

        .delete-box {
          display: block;
          border: 2px solid var(--hd-primary);
          box-shadow: 0 0 10px 0 rgb(24 144 255 / 30%);
        }
      }
    }

    .scroll-box {
      @apply relative h-full w-full flex-1 bg-white pt-[1px];
    }

    .dragArea.list-group {
      width: 100%;
      height: 100%;

      .mConfig-item {
        position: relative;
        cursor: move;

        .delete-box {
          position: absolute;
          top: 0;
          left: -2px;
          display: none;
          width: 383px;
          height: 100%;
          border: 2px dashed var(--hd-primary);

          /* padding: 10px 0; */
          .handleType {
            position: absolute;
            top: 0;
            right: -43px;
            width: 36px;
            height: 111px;
            padding: 4px 0;
            font-weight: bold;
            color: #fff;
            text-align: center;
            cursor: pointer;
            background-color: var(--hd-primary);
            border-radius: 4px;

            .el-tooltip {
              color: inherit;
              background-color: inherit;
            }

            .iconfont {
              padding: 5px 0;

              &.on {
                opacity: 0.4;
              }
            }
          }
        }

        &.on {
          cursor: move;

          .delete-box {
            display: block;
            border: 2px solid var(--hd-primary);
            box-shadow: 0 0 10px 0 rgb(24 144 255 / 30%);
          }
        }
      }

      .mConfig-item:hover {
        box-shadow: 0 0 10px 0 rgb(24 144 255 / 30%);
        transition: all 0.2s;
        transform: scale(1.01);
      }
    }
  }

  .right-box {
    @apply h-full w-[300px] overflow-scroll;

    -webkit-overflow-scrolling: touch;

    :deep(.ivu-tabs-bar) {
      margin-bottom: 16px;
    }

    .title-bar {
      width: 100%;
      height: 45px;
      padding-left: 24px;
      font-size: 14px;
      line-height: 45px;
      color: #000;
      border-bottom: 1px solid #eee;
      border-radius: 4px;
    }
  }

  ::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #bfc1c4;
  }
}

.foot-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  background: #fff;
  box-shadow: 0 -2px 4px 0 rgb(0 0 0 / 3%);

  button {
    width: 100px;
    height: 32px;
    font-size: 13px;

    &:first-child {
      margin-right: 20px;
    }
  }
}

:deep(.ivu-scroll-loader) {
  display: none;
}

:deep(.ivu-card-body) {
  width: 100%;
  height: calc(100vh - 73px);
  padding: 0;
}

.rbtn {
  position: absolute;
  right: 20px;
}

.code {
  position: relative;
}
</style>
