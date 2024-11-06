<template>
  <div class="box">
    <!-- 模板名稱 -->
    <!-- <div class="c_row-item" v-if="Number(route.query.type) !== 2">
      <el-col class="c_label" :span="24"> 模板名稱 </el-col>
      <el-col :span="24" class="slider-box">
        <el-input
          v-model="s.pageName"
          placeholder="選填不超過15個字"
          maxlength="15"
          @input="actions.changName" />
      </el-col>
    </div> -->

    <!-- 頁面標題 -->
    <div class="c_row-item1">
      <el-col class="c_label" :span="24"> 頁面標題 </el-col>
      <el-col :span="24" class="slider-box">
        <el-input
          v-model="s.pageTitle"
          placeholder="选填不超过30个字"
          maxlength="30"
          @input="actions.changVal" />
      </el-col>
    </div>

    <!-- 背景設置 -->
    <div class="c_row-item1">
      <el-col class="c_label" :span="24"> 背景設置 </el-col>
      <el-col :span="24" class="slider-box">
        <!-- 背景色 -->
        <div class="color flex-bc">
          <el-checkbox v-model="s.pageColor" @change="actions.bgColorTap">背景色</el-checkbox>
          <el-color-picker
            v-model="state.colorPicker"
            @change="actions.colorPickerTap(state.colorPicker)" />
        </div>

        <!-- 背景圖 -->
        <!-- <div class="color flex-bc">
          <el-checkbox v-model="s.pagePic" @change="actions.bgPicTap">背景圖</el-checkbox>
          <el-radio-group v-model="s.pageTabVal" type="button" @input="actions.radioTap">
            <el-radio-button :value="index" v-for="(item, index) in state.picList" :key="index">
              <SvgIcon class="iconfont-diy" :name="item"></SvgIcon>
            </el-radio-button>
          </el-radio-group>
        </div> -->

        <!-- <div v-if="s.pagePic">
          <div class="title">建議尺寸：690 * 240px</div>
          <div class="boxs" @click="actions.modalPicTap()">
            <img :src="state.bgPicUrl" alt="" v-if="state.bgPicUrl" />
            <div class="upload-box" v-else>
              <i class="el-icon-picture-outline" style="font-size: 24px"></i>
            </div>
            <div class="replace" v-if="state.bgPicUrl">更換圖片</div>
          </div>
        </div> -->
      </el-col>
    </div>
    <!-- <div>
      <el-dialog
        :visible.sync="modalPic"
        width="1024px"
        title="上传背景图"
        :close-on-click-modal="false"
        :z-index="1">
        <uploadPictures
          :isChoice="isChoice"
          @getPic="getPic"
          :gridBtn="gridBtn"
          :gridPic="gridPic"
          v-if="modalPic"></uploadPictures>
      </el-dialog>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { usePcConfigStore } from '@/stores/pcConfig'

const route = useRoute()
const pcConfigStore = usePcConfigStore()
const {
  state: { value: s },
} = storeToRefs(pcConfigStore)

defineOptions({
  name: 'pageTitle',
})

const state = ref({
  picList: ['dantu', 'pingpu', 'lashen'],
  colorPicker: '#f5f5f5',
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
  bgPicUrl: '',
})

const actions = {
  modalPicTap() {
    state.value.modalPic = true
  },

  bindDelete() {
    state.value.bgPicUrl = ''
  },

  getPic(pc) {
    nextTick(() => {
      state.value.bgPicUrl = pc.att_dir
      state.value.modalPic = false
      pcConfigStore.updatePicUrl(pc.att_dir)
    })
  },

  colorPickerTap(colorPicker) {
    pcConfigStore.updatePicker(colorPicker)
  },

  radioTap(val) {
    pcConfigStore.updateRadio(val)
  },

  changVal(val) {
    pcConfigStore.updateTitle(val)
  },

  changName(val) {
    pcConfigStore.updateName(val)
  },

  changeState(val) {
    pcConfigStore.updateShow(val)
  },

  bgColorTap(val) {
    pcConfigStore.updatePic(false)
    pcConfigStore.updateColor(val)
  },

  bgPicTap(val) {
    pcConfigStore.updateColor(false)
    pcConfigStore.updatePic(val)
  },
}
</script>

<style scoped lang="scss">
.upload-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: #ccc;
}

::v-deep .ivu-input {
  font-size: 13px !important;
}

.slider-box .title {
  margin-bottom: 5px;
  font-size: 13px;
  color: #999;
}

.c_row-item1 {
  @apply flex flex-col gap-1;

  padding: 0 15px;
  margin-top: 22px;
}

.slider-box .color {
  margin-bottom: 15px;
}

.boxs {
  position: relative;
  width: 60px;
  height: 60px;
  margin-bottom: 10px;

  .replace {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 24px;
    font-size: 12px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    background: rgb(0 0 0 / 40%);
    border-radius: 0 0 6px 6px;
  }

  .iconfont-diy {
    position: absolute;
    top: -15px;
    right: -8px;
    font-size: 25px;
    color: #999;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }
}

.ivu-color-picker ::v-deep .ivu-select-dropdown {
  position: absolute;
  // width: 300px !important;
  left: 34px !important;
}
</style>
