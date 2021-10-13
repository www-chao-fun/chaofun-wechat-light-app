// pages/user/editDesc.js
const app = getApp();
const {
  req
} = app;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    desc: ''
  },
  bindDesc(e){
    this.setData({
      desc: e.detail.value
    })
  },
  tosubmit(){
    console.log(this.data.desc)
    // if(this.data.desc){

    // }
    req.setDesc({desc: this.data.desc}).then(res=>{
      if(res.success){
        wx.showToast({
          icon: 'none',
          title: '修改成功',
        })
        setTimeout(()=>{
          wx.navigateBack()
        },2000)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      desc: options.desc=='null'?'':options.desc
    })
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