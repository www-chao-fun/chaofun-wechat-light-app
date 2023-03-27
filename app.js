//app.js
import req from "./utils/request.js";
const util = require("./utils/util.js");
App({
  util,
  req,
  onLaunch: function () {
    this.globalData.wxMsgSecCheck = this.wxMsgSecCheck
    this.globalData.wxMediaCheckAsync = this.wxMediaCheckAsync
    // inits(){
    var that = this;

    if (wx.getStorageSync('statusBar')) {
      this.globalData.statusBar = wx.getStorageSync('statusBar')
      this.globalData.isPhoneX = wx.getStorageSync('isPhoneX')
    } else {
      wx.getSystemInfo({
        success: e => {   // { statusBarHeight: 20, ... }，单位为 px
          // 获取右上角胶囊的位置信息
          let info = wx.getMenuButtonBoundingClientRect()  // { bottom: 58, height: 32, left: 278, right: 365, top: 26, width: 87 }，单位为 px
          console.log('e', e)
          console.log('info', info)
          let CustomBar = info.bottom + info.top - e.statusBarHeight

          this.globalData.statusBar = {
            statusBarHeight: info.top || e.statusBarHeight,
            height: info.height,
            menuButtonInfo: info,
            homeTop: info.bottom + 10,
            paddingRight: info.width + 20,
            bottom: e.screenHeight - e.windowHeight - e.safeArea.top
          }
          wx.setStorageSync('statusBar', this.globalData.statusBar)
          if (/iPhone X/i.test(e.model)) {
            // debugger
            this.globalData.isPhoneX = true
            wx.setStorageSync('isPhoneX', true)
          }
        }
      })
    }

    this.update()

      // if(wx.getStorageSync('cookie')){
      //   this.globalData.isLogin = true
      // }

    // },
  },

  async getWxToken() {
    let res = await req.getWxToken({});
    console.log('res', res)
    return res.access_token
  },
  async wxMsgSecCheck(content) {
    let access_token = await this.getWxToken()
    // let content = '完2347全dfji试3726测asad感3847知qwez到'
    let res = await req.wxMsgSecCheck(access_token, { content });
    // errcode: 87014
    // errmsg: "risky content hint: [mEBCODALRa-k8Hb0a]"
    if (res.errMsg == 'ok') {
      return true
    } else {
      return false
    }
  },
  async wxMediaCheckAsync(media_type,media_url) {
    let access_token = await this.getWxToken()
    // let content = '完2347全dfji试3726测asad感3847知qwez到'
    let res = await req.wxMsgSecCheck(access_token, { media_type,media_url });
    // errcode: 87014
    // errmsg: "risky content hint: [mEBCODALRa-k8Hb0a]"
    if (res.errMsg == 'ok') {
      return true
    } else {
      return false
    }
  },
  update () {
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
  },
  globalData: {
    userInfo: null,
    imgOrigin: 'https://i.chao-fan.com/',
    statusBar: {},
    forumInfo:{},
    isLogin: false,
    refresh: false,
    wxMsgSecCheck: null,
    wxMediaCheckAsync: null,
    isPhoneX: false
  }
})
