// pages/list/list.js
const app = getApp();
const {
  req
} = app;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myPub: {
      marker: '',
      key: '',
      pageSize: 20
    },
    pagedata: [],
    options: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.n
    })
    this.setData({
      options: options
    })
    this.getLists()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getDateDiffs: app.util.getDateDiffs,
  doWidthAndHeight: app.util.doWidthAndHeight,
  async getLists() {
    let v = this.data.options.v
    console.log('v',v)
    let res
    if (v == '1') {
      let params = this.data.myPub
      res = await req.getListPosts(params);
    } else if(v == '2') {
      let params = this.data.myPub;
      res = await req.listUpvotes(params);
    } else if(v == '3') {
      let params = this.data.myPub;
      res = await req.listSaved(params);
    }
    let datas = res.data.posts;
    datas.forEach(item => {
      // console.log(item.width, item.height)
      let o = this.doWidthAndHeight(item.width, item.height);
      item.rw = o.rw;
      item.rh = o.rh;
      item.rtime = this.getDateDiffs(item.gmtCreate);
      // console.log(item.rtime);
    })
    let n = this.data.pagedata.concat(datas)

    this.setData({
      pagedata: n,
      'myPub.marker': res.data.marker,
      'myPub.key': res.data.key?res.data.key:'',
    })
    console.log(res)
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
    this.getLists()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log(res)
    if(res.from=="button"){
      let item = res.target.dataset.item;
      let imageUrl;
      switch (item.type){
        case 'image': imageUrl = item.imageName;break;
        case 'gif': imageUrl = item.cover;break;
        case 'link': imageUrl = item.cover;break;
        default: imageUrl = 'biz/9563cdd828d2b674c424b79761ccb4c0.png';break;
      }
      return {
        title: '【'+item.forum.name+'】'+item.title,
        imageUrl: app.globalData.imgOrigin + imageUrl,
        path: `/pages/detail/detail?postId=${item.postId}`
      }
    }else{
      return {
        path: `/pages/index/index`
      }
    }
  }
})