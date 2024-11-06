<template>
  <div class="hot_imgs">
    <div v-if="state.configData.title" class="title" />
    <div class="list-box">
      <VueDraggable
        v-model="state.configData.list"
        class="dragArea list-group"
        :animation="150"
        ghostClass="ghost"
        handle=".move-icon">
        <div v-for="(item, index) in state.configData.list" :key="index" class="item">
          <div class="move-icon">
            <SvgIcon name="drag" class="iconfont-diy" />
          </div>
          <div class="img-box">
            <UploadImage
              v-model="item.img"
              :max="1"
              :width="90"
              :height="90"
              @on-submit="actions.getPic" />
            <!-- <img :src="item.img" alt="" v-if="item.img" />
            <div class="upload-box" v-else>
              <i class="el-icon-picture-outline" style="font-size: 24px"></i>
            </div> -->
          </div>
          <div class="info">
            <div v-for="(infos, key) in item.info" :key="key" class="info-item">
              <span>{{ infos.title }}</span>
              <div class="input-box" @click="actions.getLink(index, key, item.info)">
                <el-input
                  v-if="state.configData.isCube"
                  v-model="infos.value"
                  :suffix-icon="key == item.info.length - 1 ? 'el-icon-arrow-right' : ''"
                  :readonly="key == item.info.length - 1 ? true : false"
                  :placeholder="infos.placeholder"
                  :maxlength="infos.max"
                  @blur="actions.onBlur" />
                <el-input
                  v-else
                  v-model="infos.value"
                  :suffix-icon="key == item.info.length - 1 ? 'el-icon-arrow-right' : ''"
                  :readonly="key == item.info.length - 1 ? true : false"
                  :placeholder="infos.placeholder"
                  :maxlength="infos.max" />
              </div>
            </div>
          </div>

          <div
            v-if="!state.configData.isCube"
            class="delect-btn"
            @click.stop="actions.bindDelete(index)">
            <SvgIcon name="close" class="iconfont-diy" />
          </div>
        </div>
      </VueDraggable>
    </div>

    <template v-if="state.configData.list">
      <div v-if="state.configData.list.length < state.configData.maxList" class="add-btn">
        <el-button type="primary" ghost class="w-full" @click="actions.addBox">+</el-button>
      </div>
    </template>
    <!-- <linkaddress ref="linkaddres" @linkUrl="linkUrl"></linkaddress> -->
  </div>
</template>

<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'

defineOptions({
  name: 'c_menu_list',
})

// ----------- props -----------
const props = withDefaults(
  defineProps<{
    configObj: any
    configNme: string
    index: any
  }>(),
  {},
)

const state = ref({
  defaults: props.configObj,
  configData: props.configObj[props.configNme],
  menus: [],
  list: [
    {
      title: 'aa',
      val: '',
    },
  ],
  modalPic: false,
  isChoice: '單選',
  gridBtn: {
    xl: 4,
    lg: 8,
    md: 8,
    sm: 8,
    xs: 8,
  },
  gridPic: {
    xl: 6,
    lg: 8,
    md: 12,
    sm: 12,
    xs: 12,
  },
  activeIndex: 0,
  indexLast: 0,
  lastObj: {} as any,
})

watch(
  () => props.configObj,
  (nVal, oVal) => {
    state.value.defaults = nVal
    state.value.configData = nVal[props.configNme]
  },
  { deep: true },
)

const actions = {
  linkUrl(e: any) {
    state.value.configData.list[state.value.activeIndex].info[state.value.indexLast].value = e
    if (state.value.defaults.name == 'pictureCube') {
      state.value.defaults.picStyle.picList[state.value.defaults.picStyle.tabVal].link = e
    }
  },
  getLink(index, key, item) {
    state.value.indexLast = item.length - 1
    if (key != item.length - 1) {
      return
    }
    state.value.activeIndex = index
    // this.$refs.linkaddres.modals = true;
  },

  addBox() {
    if (state.value.configData.list.length == 0) {
      state.value.lastObj.img = []
      state.value.lastObj.info[0].value = ''
      state.value.lastObj.info[1].value = ''
      state.value.configData.list.push(state.value.lastObj)
    } else {
      let obj = { ...state.value.configData.list[state.value.configData.list.length - 1] }
      obj.img = []
      obj.info[0].value = ''
      obj.info[1].value = ''
      state.value.configData.list.push(obj)
    }
  },

  onBlur() {
    let data = state.value.defaults.menuConfig
    state.value.defaults.picStyle.picList[state.value.defaults.picStyle.tabVal].link =
      data.list[0].info[0].value
  },
  // 删除
  bindDelete(index) {
    if (state.value.configData.list.length == 1) {
      state.value.lastObj = state.value.configData.list[0]
    }
    state.value.configData.list.splice(index, 1)
  },

  // 获取图片信息
  getPic(pc) {
    return
    nextTick(() => {
      state.value.configData.list[state.value.activeIndex].img = pc
      let data = state.value.defaults.menuConfig
      if (data && data.isCube) {
        state.value.defaults.picStyle.picList.splice(state.value.defaults.picStyle.tabVal, 1, {
          image: pc,
          link: data.list[0].info[0].value,
        })
      }
    })
  },
}
</script>

<style scoped lang="scss">
.hot_imgs {
  margin-bottom: 20px;
  //border-top: 1px solid rgba(0,0,0,0.05);
  .title {
    padding: 0 0 13px;
    font-size: 12px;
    color: #999;
    border-bottom: 1px solid rgb(0 0 0 / 5%);
  }

  .list-box {
    .item {
      position: relative;
      display: flex;
      padding-bottom: 10px;
      margin-top: 14px;
      border-bottom: 1px solid #eee;

      .move-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 80px;
        cursor: move;
      }

      .img-box {
        position: relative;
        width: 70px;
        height: 70px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .info {
        flex: 1;
        margin-left: 22px;

        .info-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          span {
            width: 40px;
            font-size: 13px;
          }

          .input-box {
            flex: 1;

            :deep(.ivu-input) {
              font-size: 13px !important;
            }
          }
        }
      }

      .delect-btn {
        position: absolute;
        top: -12px;
        right: -7px;
        cursor: pointer;

        .iconfont-diy {
          font-size: 25px;
          color: #999;
        }
      }
    }
  }

  .add-btn {
    margin-top: 10px;
  }

  .upload-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #ccc;
  }

  .iconfont-diy {
    font-size: 28px;
    color: #ddd;
  }
}
</style>
