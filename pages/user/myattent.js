// pages/user/myattent.js
const app = getApp();
const {
  req
} = app;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    whichOne: 'listFocus',
    params: {
      marker: '',
      key: '',
      pageSize: 10,
    },
    focusData: [],
    canget: true,
  },
  checkout(e){
    let item = e.currentTarget.dataset.item;
    if(item!=this.data.whichOne){
      this.setData({
        whichOne: item,
        'params.marker': '',
        'params.key': '',
        focusData: [],
        canget: true
      })
      this.getLists()
    }
    
  },
  async getLists(){
    let whichOne = this.data.whichOne;
    let res,focusData=this.data.focusData;

    if(this.data.canget){
      if(whichOne=='listFocus'){
        let params = {
          marker: this.data.params.marker,
          pageSize: this.data.params.pageSize,
          userId: this.data.userId,
          key: this.data.params.key?this.data.params.key:''
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
          pageSize: this.data.params.pageSize,
          focusId: this.data.userId,
          key: this.data.params.key?this.data.params.key:'',
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
    }
    if(res.data.users.length<this.data.params.pageSize){
      console.log(999)
      this.setData({
        canget: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: wx.getStorageSync('userId')
    })
    this.getLists();
    console.log(wx.getStorageSync('userId'))
    
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

})