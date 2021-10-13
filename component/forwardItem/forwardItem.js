// component/forwardItem/forwardItem.js
const app = getApp();
const {
  req
} = app;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgOrigin: app.globalData.imgOrigin,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
