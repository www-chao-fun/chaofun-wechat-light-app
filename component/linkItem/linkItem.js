// component/linkItem/linkItem.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  lifetimes: {
    created: function () {
      
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
      let item = this.data.item;
      if (item.cover) {
        item.cover = item.cover + (item.cover.includes('.ico') ? '' : '?x-oss-process=image/resize,h_100')
      }
      this.setData({
        item: item
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  properties: {
    item: {
      type: Object,
      value: {}
    },
    detail: {
      type: Boolean,
      value: false
    }
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
    toDetail(e) {
      let item = e.currentTarget.dataset.item;
      // if (!this.data.detail){
      //   wx.navigateTo({
      //     url: `/pages/detail/detail?postId=${item.postId}`,
      //   })
      // }else{
        wx.showModal({
          title: '复制链接',
          content: '复制链接，使用浏览器打开链接! \r\n 网址：https://chao.fan',
          confirmText: '复制',
          success(res) {
            if (res.confirm) {
              let link = 'https://chao.fan/middles?type=1&url=' + encodeURIComponent(item.link)
              wx.setClipboardData({
                data: link,
                success: function (res) {
                  wx.getClipboardData({
                    success: function (res) {
                      wx.showToast({
                        title: '复制成功'
                      })
                    }
                  })
                }
              })
            } else if (res.cancel) {
              
            }
          }
        })
      // }
    }
  }
})
