//logs.js
// const util = require('../../utils/util.js')
const app = getApp();
const {
  req
} = app;
Page({
  data: {
    logs: [],
    isLogin: true,
    userInfo: {},
    ulData: [{
        label: '我的发布',
        value: 1,
        icon: '/assets/images/icon/fabu.png'
      },
      {
        label: '我的点赞',
        value: 2,
        icon: '/assets/images/icon/dianzan.png'
      },
      {
        label: '我的收藏',
        value: 3,
        icon: '/assets/images/icon/shoucang.png'
      },
      {
        label: '关注&粉丝',
        value: 5,
        icon: '/assets/images/icon/gz.png'
      },
      {
        label: '关于炒饭',
        value: 6,
        icon: '/assets/images/icon/about.png'
      },
    ],
    imgOrigin: app.globalData.imgOrigin,
    readMessage: {
      hasNewMessage: false,
      unreadMessage: 0
    }
  },
  toYear() {
    wx.navigateTo({
      url: '/pages/years/years?userId=' + this.data.userInfo.userId,
    })
  },

  onReady() {
    if (wx.getStorageSync('cookie')) {
      this.setData({
        isLogin: true
      })
    } else {
      this.setData({
        isLogin: false
      })
    }
  },
  toInfo() {
    wx.navigateTo({
      url: '/pages/user/userInfo',
    })
  },
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login?from=/pages/user/user&id=111',
    })
  },
  out(t) {
    wx.removeStorageSync('cookie')
    this.setData({
      isLogin: false
    })
    app.globalData.refresh = true;
    app.globalData.isLogin = false
  },
  toList(e) {
    if (this.data.isLogin) {
      let item = e.currentTarget.dataset.item;
      if (item.value == 6) {
        wx.navigateTo({
          url: '/pages/about/about',
        })
      } else if (item.value == 4) {
        // wx.showToast({
        //   icon: 'none',
        //   title: '功能开发中，敬请期待',
        // })
        wx.navigateTo({
          url: '/pages/message/message',
        })
      } else if (item.value == 5) {
        wx.navigateTo({
          url: '/pages/user/myattent',
        })
      } else {
        wx.navigateTo({
          url: `/pages/list/list?v=${item.value}&n=${item.label}`,
        })
      }
    } else {
      this.toLogin()
    }

  },
  async messageCheck() {
    let res = await req.messageCheck();
    if (res.data.unreadMessage != this.data.readMessage.unreadMessage) {
      this.setData({
        readMessage: res.data
      })
    }
  },
  async getProfile() {
    let res = await req.getProfile();
    console.log(res)
    if (res.data) {
      this.setData({
        isLogin: true,
        userInfo: res.data
      })
      wx.setStorageSync('userId', res.data.userId)
    } else {
      wx.removeStorageSync('cookie')
      wx.removeStorageSync('userId')
      this.setData({
        isLogin: false
      })
      app.globalData.isLogin = false
    }
  },
  onShow() {
    this.getProfile();
    this.messageCheck();
  },
  onLoad: function () {

  }
})