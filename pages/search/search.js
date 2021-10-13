// pages/search/search.js
const app = getApp();
const {
  req
} = app;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBar: {},
    historySearch: []
  },
  clear(){
    this.setData({
      historySearch: []
    })
    wx.removeStorageSync('historySearch')
  },
  toList(e){
    let keyword = e.currentTarget.dataset.item;
    wx.redirectTo({
      url: '/pages/search/searchResult?keyword=' + keyword,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      statusBar: app.globalData.statusBar
    })
    if (wx.getStorageSync('historySearch')){
      this.setData({
        historySearch: wx.getStorageSync('historySearch')
      })
    }
  },
  toSearch(e){
    let val = e.detail;
    console.log('搜索页面',e.detail)
    let historySearch = this.data.historySearch;
    historySearch.push(val)
    wx.setStorageSync('historySearch', historySearch)
    wx.redirectTo({
      url: '/pages/search/searchResult?keyword=' + e.detail,
    })
  },
  async search(v){
    let params = {

    }
    let res = await req.search({});
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
  // onShareAppMessage: function () {

  // }
})