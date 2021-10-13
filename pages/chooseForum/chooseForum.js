// pages/chooseForum/chooseForum.js
const app = getApp();
const {
  req
} = app;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: [],
    imgOrigin: app.globalData.imgOrigin,
    keyword: '',
    histArr: []
  },
  async getListForums(){
    let res = await req.getListForums({});
    if(res.success){
      this.setData({
        datas: res.data
      })
    }
  },
  async searchForum(keyword){
    let res = await req.searchForum({keyword});
    if(res.success){
      this.setData({
        datas: res.data
      })
    }
  },  
  bindInput(e){
    let val = e.detail.value;
    this.setData({
      keyword: val
    })
    if(val){
      this.searchForum(val)
    }else{
      this.getListForums(val)
    }
  },
  choose(e){
    let item = e.currentTarget.dataset.item;
    let forumId,name;
    if(this.data.keyword){
      forumId = item.link.split('/')[2];
      name = item.title;
    }else{
      forumId = item.id;
      name = item.name;
    }
    app.globalData.forumInfo = {
      forumId,
      name
    }
    wx.switchTab({
      url: `/pages/push/push`,
    })
  },
  choose2(e){
    let item = e.currentTarget.dataset.item;
    app.globalData.forumInfo = {
      forumId: item.forumId,
      name: item.name
    }
    wx.switchTab({
      url: `/pages/push/push`,
    })
  },
  gethist(){
    let hist = wx.getStorageSync('forumHistory');
    if(hist){
      this.setData({
        histArr: hist.slice(0,10)
      })
    }
  },
  clearHist(){
    wx.removeStorageSync('forumHistory');
    this.setData({
      histArr: []
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gethist();
    this.getListForums()
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