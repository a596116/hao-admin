import { defineStore } from 'pinia'
import { reactive } from 'vue'

const getDefaultState = () => ({
  configName: '',
  pageTitle: 'Test',
  pageName: '',
  pageShow: 1,
  pageColor: 0,
  pagePic: 0,
  pageColorPicker: '#f5f5f5',
  pageTabVal: 0,
  pagePicUrl: '',
  defaultArray: {},
  pageFooter: {
    name: 'pageFoot',
    setUp: {
      tabVal: 0,
    },
    status: {
      title: '是否自定义',
      name: 'status',
      status: false,
    },
    txtColor: {
      title: '文字颜色',
      name: 'txtColor',
      default: [{ item: '#282828' }],
      color: [{ item: '#282828' }],
    },
    activeTxtColor: {
      title: '选中文字颜色',
      name: 'txtColor',
      default: [{ item: '#F62C2C' }],
      color: [{ item: '#F62C2C' }],
    },
    bgColor: {
      title: '背景颜色',
      name: 'bgColor',
      default: [{ item: '#fff' }],
      color: [{ item: '#fff' }],
    },
    menuList: [],
  },
})

export const usePcConfigStore = defineStore('pc_config', () => {
  const state = reactive(getDefaultState())

  const resetState = () => {
    Object.assign(state, getDefaultState())
  }

  const setFooter = (data) => {
    state.pageFooter.status.title = data.title
    state.pageFooter.menuList[2] = data.name
  }

  const addArray = (data) => {
    data.val.id = 'id' + data.val.timestamp
    state.defaultArray[data.num] = data.val
  }

  const deleteArray = (num) => {
    delete state.defaultArray[num]
  }

  const arrayReset = (num) => {
    delete state.defaultArray[num]
  }

  const defaultArraySort = (data) => {
    const newArr = objToArr(state.defaultArray)
    let sortArr = []
    let newObj = {}

    function objToArr(data) {
      return Object.keys(data).map((key) => data[key])
    }

    function swapArray(arr: any) {
      arr.forEach((el) => {
        if (!el.id) el.id = 'id' + el.timestamp
        data.list.forEach((item) => {
          if (el.id === item.id) el.timestamp = item.num
        })
      })
      return arr
    }

    console.log(data)
    if (data.oldIndex !== undefined) {
      sortArr = JSON.parse(JSON.stringify(swapArray(newArr)))
    } else {
      newArr.splice(
        data?.newIndex,
        0,
        data?.element?.data()?.defaultConfig || data?.data()?.defaultConfig,
      )
      sortArr = JSON.parse(JSON.stringify(swapArray(newArr)))
    }

    for (let i = 0; i < sortArr.length; i++) {
      newObj[sortArr[i].timestamp] = sortArr[i]
    }
    state.defaultArray = Object.assign({}, newObj)
  }

  const updateArray = (data) => {
    for (const key in state.defaultArray) {
      if (state.defaultArray[key].id === data.val.id) {
        state.defaultArray[key] = data.val
      }
    }
    state.defaultArray = { ...state.defaultArray }
  }

  const setConfigName = (name) => {
    state.configName = name
  }

  const clearDefaultArray = () => {
    state.defaultArray = {}
  }

  const updateFooter = (data) => {
    state.pageFooter.menuList = data
  }

  const setFooterStatus = (status) => {
    state.pageFooter.status.status = status
  }

  const updateFooterPage = (data) => {
    state.pageFooter = data
  }

  const updateTitle = (title) => {
    state.pageTitle = title
  }

  const updateName = (name) => {
    state.pageName = name
  }

  const updateShow = (val) => {
    state.pageShow = val
  }

  const updateColor = (val) => {
    state.pageColor = val
  }

  const updatePic = (val) => {
    state.pagePic = val
  }

  const updatePicker = (val) => {
    state.pageColorPicker = val
  }

  const updateRadio = (val) => {
    state.pageTabVal = val
  }

  const updatePicUrl = (val) => {
    state.pagePicUrl = val
  }

  return {
    state,
    resetState,
    setFooter,
    addArray,
    deleteArray,
    arrayReset,
    defaultArraySort,
    updateArray,
    setConfigName,
    clearDefaultArray,
    updateFooter,
    setFooterStatus,
    updateFooterPage,
    updateTitle,
    updateName,
    updateShow,
    updateColor,
    updatePic,
    updatePicker,
    updateRadio,
    updatePicUrl,
  }
})
