// pages/user/userHome.js
const app = getApp();
const {
  req
} = app;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTop: false,
    params: {
      marker: '',
      pageSize: 20,
      userId: 133,
      key: '',
    },
    userInfo: {},
    datas: [],
    imgOrigin: app.globalData.imgOrigin,
    whichOne: 'pub',
    appInfo: app.globalData.userInfo,
    userId: '',
    focusData: []
  },
  getDateDiffs: app.util.getDateDiffs,
  async getUserInfo(){
    let res = await req.userinfo({userId: this.data.params.userId})
    if (!this.data.params.marker) {
      wx.setNavigationBarTitle({
        title: res.data.userName + ' 的主页',
      })
      this.setData({
        userInfo: res.data,
      })
    }
  },
  async getLists(){
    let params = this.params;
    let whichOne = this.data.whichOne;
    console.log('whichOne',whichOne)
    let datas = this.data.datas;
    let focusData = this.data.focusData;
    var res;
    if(whichOne=='pub'||whichOne=='love'){
      if(whichOne=='pub'){
        res = await req.userListPosts(this.data.params)
      }else{
        res = await req.getUserUpvotes(this.data.params)
      }
      if (res.data.posts.length){
        res.data.posts.forEach(item => {
          item.rtime = this.getDateDiffs(item.gmtCreate);
        })
        datas.push(...res.data.posts)
        this.setData({
          'params.marker': res.data.marker,
          'params.key': res.data.key?res.data.key:'',
          datas: datas
        })
      }
    }else if(whichOne=='listFocus'){
      let params = {
        marker: this.data.params.marker,
        key: this.data.params.key?this.data.params.key:'',
        pageSize: this.data.params.pageSize,
        userId: this.data.userInfo.userId
      }
      res = await req.listFocus(params);
      let resdata = res.data
      focusData.push(...resdata.users)
      this.setData({
        'params.marker': resdata.marker,
        'params.key': resdata.key?resdata.key:'',
        focusData: focusData
      })
    }else{
      let params = {
        marker: this.data.params.marker,
        key: this.data.params.key?this.data.params.key:'',
        pageSize: this.data.params.pageSize,
        focusId: this.data.userInfo.userId
      }
      res = await req.listFans(params);
      let resdata = res.data
      focusData.push(...resdata.users)
      this.setData({
        'params.marker': resdata.marker,
        'params.key': resdata.key?resdata.key:'',
        focusData: focusData
      })
    }
  },
  checkout(e){
    let item = e.currentTarget.dataset.item;
    this.setData({
      whichOne: item,
      'params.marker': '',
      'params.key': '',
      datas: [],
      focusData: []
    })
    this.getLists()
  },
  doFoucs(){
    if(this.data.userInfo.focused){
      req.toUnfocus({focusId: this.data.params.userId}).then(res=>{
        if(res.success){
          this.setData({
            'userInfo.focused': !this.data.userInfo.focused
          })
        }
      })
    }else{
      req.toFocus({focusId: this.data.params.userId}).then(res=>{
        if(res.success){
          this.setData({
            'userInfo.focused': !this.data.userInfo.focused
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'params.userId': options.userId,
      userId: wx.getStorageSync('userId')
    })
    this.getUserInfo();
    this.getLists()
    console.log('app.globalData.userInfo',app.globalData.userInfo)
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
    this.getLists()
  },

  onPageScroll: function (e) {
    if (e.scrollTop>600){
      this.setData({
        showTop: true
      })
    }else{
      this.setData({
        showTop: false
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res)
      let item = res.target.dataset.item;
      let imageUrl;
      if (item.type == 'link') {
        imageUrl = item.cover
      } else {
        imageUrl = item.imageName
      }
      return {
        title: item.title,
        imageUrl: `${(imageUrl && !imageUrl.includes('.mp4')) ? (this.data.imgOrigin + imageUrl) : '/assets/images/banner/b1.jpg'}`,
        path: `/pages/detail/detail?postId=${item.postId}`
      }
    }
  }
})