// pages/message/message.js
const app = getApp();
const {
  req,
  util
} = app;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    refresh: false,
    params: {
      marker: '',
      key: '',
      pageSize: 20
    },
    datas: [],
    imgOrigin: app.globalData.imgOrigin,
    isLogin: true,
  },
  toDetail(e) {
      let item = e.currentTarget.dataset.item;
      wx.navigateTo({
        url: `/pages/detail/detail?postId=${item.postId}`,
      })
    
  },
  toUser(e) {
    console.log(9876)
    let info = e.currentTarget.dataset.info;
    wx.navigateTo({
      url: '/pages/user/userHome?userId=' + info.userId,
    })
  },
  async getList(){
    let params = this.data.params;
    let res = await req.messageList(params);
    let datas = res.data.messages;
    datas.forEach(item => {
      item.rtime = app.util.getDateDiffs(item.gmtCreate);
      // console.log(item.rtime);
    })
    wx.stopPullDownRefresh({
    })
    if(this.data.refresh){
      this.setData({
        datas: [],
        refresh: false
      })
    }
    
    let data = this.data.datas;
    data.push(...datas)
    this.setData({
      datas: data,
      'params.marker': res.data.marker,
      'parms.key': res.data.key?res.data.key:'',
    })
  },
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login?from=/pages/message/message&id=111',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.isLogin){
      this.getList()
    }
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
    if(this.data.isLogin!=app.globalData.isLogin){
      this.setData({
        isLogin: app.globalData.isLogin
      })
      console.log('app.globalData.isLogin',app.globalData.isLogin);
      if(!app.globalData.isLogin){
        
      }else{
        this.getList()
      }
    }
    
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
    this.setData({
      params: {
        marker: '',
        key: '',
        pageSize: 20
      },
      refresh: true
    })
    this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})