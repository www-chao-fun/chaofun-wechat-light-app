// component/attentionItem/attentionItem.js
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
    userId: {
      type: Number
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
    toUser(e) {
      let info = e.currentTarget.dataset.info;
      wx.navigateTo({
        url: '/pages/user/userHome?userId=' + info.userId,
      })
    },
    doFoucs(e){
      let foucus = e.currentTarget.dataset.focused;
      if(foucus){
        req.toUnfocus({focusId: this.data.item.userId}).then(res=>{
          if(res.success){
            this.setData({
              'item.focused': !foucus
            })
            wx.showToast({
              icon: 'none',
              title: '已取消关注',
            })
          }else{
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        })
      }else{
        req.toFocus({focusId: this.data.item.userId}).then(res=>{
          if(res.success){
            this.setData({
              'item.focused': !foucus
            })
            wx.showToast({
              icon: 'none',
              title: '已关注',
            })
          }else{
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        })
      }
    },
  }
})
