<template>
  <div class="w-full">
    <VueDraggable
      v-model="propsData"
      :disabled="disabled"
      :scroll="true"
      :animation="150"
      filter=".upload-li"
      ghostClass="ghost"
      class="draggable-upload flex h-full w-full flex-wrap gap-2"
      @update="(e) => emit('on-drag', e)">
      <!-- <TransitionGroup
        ref="el"
        type="transition"
        tag="ul"
        name="draggable-fade"
        class="sort-target draggable-upload flex h-full w-full flex-wrap gap-2"> -->
      <div
        v-for="(item, index) of propsData"
        :key="index"
        class="draggable-upload-li relative bg-hd-bg"
        :style="{
          width: `${width}px`,
          height: `${height || width}px`,
        }">
        <article class="flex h-full w-full flex-col justify-between">
          <div class="flex h-full w-full justify-center">
            <el-image :src="item.img" fit="contain" class="h-full w-full" />
          </div>
        </article>
        <article
          class="absolute top-0 flex h-full w-full flex-col opacity-0 duration-300 hover:opacity-100">
          <div class="flex h-full w-full flex-col items-center bg-gray-100/70 delay-75">
            <section class="flex-c w-full">
              <el-tooltip
                effect="dark"
                :content="item.alt || '-'"
                placement="top-start"
                :show-after="1000"
                :show-arrow="false">
                <el-text class="" truncated>
                  {{ item.alt }}
                </el-text>
              </el-tooltip>
            </section>
            <!-- action -->
            <section class="mt-auto flex justify-center gap-x-1 p-1 text-white">
              <div
                v-if="showDownload"
                class="flex size-8 cursor-pointer items-center justify-center rounded-lg bg-gray-700 hover:bg-opacity-70"
                @click.stop="actions.handleDownload(item.img, item.alt)">
                <svg-icon name="download-image" class="h-5 w-5" />
              </div>
              <div
                v-if="showPreview"
                class="flex size-8 cursor-pointer items-center justify-center rounded-lg bg-gray-700 hover:bg-opacity-70"
                @click.stop="actions.handlePreview()">
                <svg-icon name="search" class="h-5 w-5" />
              </div>
              <div
                v-if="!disabled"
                class="flex size-8 cursor-pointer items-center justify-center rounded-lg bg-gray-700 hover:bg-opacity-70"
                @click.stop="actions.handleDelete(index)">
                <svg-icon name="delete" />
              </div>
            </section>
          </div>
        </article>
      </div>
      <div key="upload-li" class="upload-li">
        <el-upload
          v-if="propsData.length < max && !disabled"
          :style="{
            width: `${width}px`,
            height: `${height || width}px`,
          }"
          action="#"
          drag
          :multiple="true"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="actions.handleUpload">
          <template #trigger>
            <div class="flex h-full w-full items-center justify-center">
              <svg-icon name="plus" />
            </div>
          </template>
        </el-upload>
      </div>
      <!-- </TransitionGroup> -->
    </VueDraggable>

    <el-dialog
      v-model="state.dialogVisible"
      class="custom-dialog custom-dialog-body relative mt-[5vh] h-[90vh] max-md:w-[95%]"
      :close-on-click-modal="false"
      :title="`裁切照片`">
      <vue-cropper
        ref="cropper"
        :img="state.imageUrl"
        :output-size="state.option.size"
        :output-type="state.option.outputType"
        :info="true"
        :full="state.option.full"
        :can-move="state.option.canMove"
        :can-move-box="state.option.canMoveBox"
        :fixed-box="state.option.fixedBox"
        :original="state.option.original"
        :auto-crop="state.option.autoCrop"
        :auto-crop-width="800"
        :auto-crop-height="800 * aspectRatio"
        :center-box="state.option.centerBox"
        :fixed="fixed"
        :fixed-number="[800, 800 * aspectRatio]"
        :high="state.option.high"
        mode="cover"
        :max-img-size="state.option.max" />
      <template #footer>
        <span>
          <el-button @click="state.dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="actions.handleCropper">OK</el-button>
        </span>
      </template>
    </el-dialog>

    <el-image-viewer
      v-if="state.showImageViewer"
      :url-list="propsData.map((item) => item.img)"
      @close="state.showImageViewer = false" />
  </div>
</template>

<script setup lang="ts">
import { VueCropper } from 'vue-cropper'
import 'vue-cropper/dist/index.css'
import { SortableEvent, VueDraggable } from 'vue-draggable-plus'

interface Props {
  /** 最大上傳數量 */
  max?: number
  /** 是否禁用 */
  disabled?: boolean
  /** 是否裁切 */
  cropper?: boolean
  /** 圖片寬度 */
  width?: number
  /** 圖片高度 */
  height?: number
  /** 是否顯示下載 */
  showDownload?: boolean
  /** 寬高比 */
  aspectRatio?: number
  /** 是否固定裁切框 */
  fixed?: boolean
  /** 是否顯示預覽 */
  showPreview?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  max: 10,
  disabled: false,
  cropper: false,
  width: 160,
  showDownload: false,
  aspectRatio: 1,
  fixed: false,
  showPreview: true,
})
// ----------- emit -----------
// ----------- emit -----------
const emit = defineEmits<{
  (e: 'on-drag', event: SortableEvent): void
  (e: 'on-submit', data: any): void
}>()

const state = ref({
  drag: false,
  dragOptions: {
    animation: 200,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost',
  },
  dialogVisible: false,
  imageUrl: '',
  imageName: '',
  option: {
    size: 1,
    full: false,
    outputType: 'png',
    canMove: true,
    fixedBox: false,
    original: false,
    canMoveBox: true,
    autoCrop: true,
    // 只有自动截图开启 宽度高度才生效
    autoCropWidth: 200,
    autoCropHeight: 200,
    centerBox: false,
    high: true,
    max: 99999,
  },
  showImageViewer: false,
})

const cropperRef = ref<typeof VueCropper>()

// ----------- computed ----------
const propsData = defineModel<{ img: string; alt?: string }[]>('modelValue', {
  required: true,
  default: [],
})

const actions = {
  handleUpdateList: (list: any) => {
    propsData.value = list
  },

  /**
   * @description 刪除檔案
   */
  handleDelete(index: number) {
    const filterData = propsData.value.filter((item, i) => i !== index)
    propsData.value = filterData
    emit('on-submit', propsData.value)
  },
  /**
   * @description 下載檔案
   */
  handleDownload: async (file: string, fileName?: string) => {
    try {
      const blob = actions.base64ToBlob(file)
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName || 'image')
      document.body.appendChild(link)
      link.click()
    } catch (error) {
      notification.error({
        title: '下載發生錯誤，請稍後再試',
        subTitle: '',
      })
    }
  },

  handleUpload: (uploadFile: any) => {
    if (uploadFile.raw?.type !== 'image/jpeg' && uploadFile.raw?.type !== 'image/png') {
      notification.error({
        title: '上傳的檔案類型不符合(jpg,jpeg, png)',
      })
      return false
    } else if (uploadFile.raw?.size / 1024 / 1024 > 10) {
      notification.error({
        title: '上傳的檔案大小不能超過 10MB',
      })
      return false
    }
    if (props.cropper) {
      state.value.imageName = uploadFile.raw.name.split('.')[0]
      state.value.imageUrl = URL.createObjectURL(uploadFile.raw)
      state.value.dialogVisible = true
    } else {
      actions.getBase64(uploadFile.raw).then((res: any) => {
        propsData.value.push({
          img: res,
          alt: uploadFile.raw.name,
        })
        emit('on-submit', propsData.value)
      })
    }
  },

  handleCropper: () => {
    cropperRef.value?.getCropData(async (data: string) => {
      propsData.value.push({
        img: data,
        alt: state.value.imageName,
      })
      emit('on-submit', propsData.value)
    })
    state.value.dialogVisible = false
  },

  /*
   * @description: 轉base64
   */
  getBase64: (file: any) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      let fileResult: any
      reader.readAsDataURL(file)
      reader.onload = function () {
        fileResult = reader.result
      }
      reader.onerror = function (error) {
        reject(error)
      }
      reader.onloadend = function () {
        resolve(fileResult)
      }
    })
  },
  base64ToBlob: (data: any) => {
    let arr = data.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = window.atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  },

  handlePreview: () => {
    state.value.showImageViewer = true
  },
}
</script>

<style scoped lang="scss">
:deep(.el-upload--text),
:deep(.el-upload-dragger) {
  height: 100%;
}

:deep(.el-dialog__body) {
  width: 100%;
  height: calc(100% - 100px);
}
</style>
