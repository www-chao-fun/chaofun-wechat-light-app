// pages/user/userInfo.js
const app = getApp();
const {
  req,util
} = app;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    imgOrigin: app.globalData.imgOrigin,
  },
  toEdit(e){
    wx.navigateTo({
      url: '/pages/user/editDesc?desc='+e.currentTarget.dataset.desc,
    })
  },
  async getProfile() {
    let res = await req.getProfile();
    console.log(res)
    if (res.data){
      this.setData({
        isLogin: true,
        userInfo: res.data
      })
    }else{
      wx.removeStorageSync('cookie')
      this.setData({
        isLogin: false
      })
      app.globalData.isLogin = false
    }
  },
  chooseImg(){
    util.pickImage(this.pushImage)
  },
  async pushImage(res){
    console.log(res)
    let r = await req.setIcon({imageName:res.data})
    wx.hideLoading({
      complete: (res) => {},
    })
    this.setData({
      'userInfo.icon': res.data
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProfile()
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
    this.getProfile()
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
  // onShareAppMessage: function () {

  // }
})