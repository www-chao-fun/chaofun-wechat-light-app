// component/header/header.js
const app = getApp();
const {
  req
} = app;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    types: {
      type: String,
      value: 'view'
    },
    keyword: {
      type: String,
      value: ''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    statusBar: app.globalData.statusBar
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toSearch() {
      wx.navigateTo({
        url: '/pages/search/search'
      })
    },
    search(e){
      console.log(e)
      let val = e.detail.value;
      this.triggerEvent('toSearch',val)
    },
    toHome() {
      wx.switchTab({
        url: '/pages/index/index',
      })
    },
  }
})
