// pages/forum/forum.js
const app = getApp();
const {
  req
} = app;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagsData: [],
    tagsLists: [],
    imgOrigin: app.globalData.imgOrigin,
    chooseId: 0,
    allForum: '',
    search: ''
  },
  toClear(){
    this.searchForum({detail:{value: ''}})
  },
  searchForum(e){
    let data = this.data.tagsLists;
    let arr = []

    if (e.detail.value){
      data.forEach(item => {
        if (item.name.includes(e.detail.value)) {
          // debugger
          arr.push(item)
          console.log(item.name)
        }
      })
      this.setData({
        tagsLists: arr,
        search: e.detail.value
      })
    }else{
      this.listForumsByTag(0)
      this.setData({
        search: ''
      })
    }
    
  },
  async listTags(){
    let res = await req.listTags({});
    this.setData({
      tagsData: res.data
    })
  },
  async listForumsByTag(tagId){
    // if(tagId == 0&&wx.getStorageSync('allForum')){
    //   this.setData({
    //     tagsLists: wx.getStorageSync('allForum')
    //   })
    // }else{
      let res = await req.listForumsByTag({ tagId });
      this.setData({
        tagsLists: res.data
      })
      if (tagId == 0){
        wx.setStorageSync('allForum', res.data)
      }
    // }
    
  },
  checkout(e){
    let item = e.currentTarget.dataset.item;
    this.setData({
      chooseId: item.id
    })
    this.listForumsByTag(item.id)
  },
  toForum(e){
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/forumList/forumList?forumId='+item.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.listTags();
    this.listForumsByTag(0);
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