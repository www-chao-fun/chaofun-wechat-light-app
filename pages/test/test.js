// pages/test/test.js
const app = getApp();
const {
  util: { formatSecondTime },
  req
} = app;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toMini(e){
    let appid = e.currentTarget.dataset.appid
    wx.navigateToMiniProgram({
      appId: appid,
      // path: '/p/1035502686',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  },
  async getWxToken(){
    let res = await req.getWxToken({});
    console.log('res',res)
    return res.access_token
  },
  async wxMsgSecCheck(){
    let access_token = await this.getWxToken()
    let content = '完2347全dfji试3726测asad感3847知qwez到'
    let res = await req.wxMsgSecCheck(access_token,{content});
    // errcode: 87014
    // errmsg: "risky content hint: [mEBCODALRa-k8Hb0a]"
    if (res.errMsg=='ok'){
      return true
    }else{
      return false
    }
  },
  toWebView(e){
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: '/pages/test/view?url='+url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.wxMsgSecCheck()
    // this.getWxToken()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})