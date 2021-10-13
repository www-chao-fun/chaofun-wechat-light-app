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
    params: {
      keyword: '',
      pageNum: 1
    },
    datas: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      statusBar: app.globalData.statusBar,
      'params.keyword': decodeURI(options.keyword)
    })
    this.search()
  },
  async search() {
    let params = this.data.params
    let res = await req.search(params);
    console.log(res)
    if(res.success){
      let data = this.data.datas;
      data.push(...res.data);
      this.setData({
        datas: data,
        'params.pageNum': (this.data.params.pageNum+1)
      })
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
    this.search()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.params.keyword,
      imageUrl: `https://chao.fun/assets/images/b1.jpg`,
      path: `/pages/search/searchResult?keyword=${encodeURIComponent(this.data.params.keyword)}`
    }
  }
})