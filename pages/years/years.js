// pages/years/years.js
const util = require('../../utils/util.js')
import Card from './card';
const app = getApp();
const {
  req
} = app;
Page({
  imagePath: '',
  history: [],
  future: [],
  isSave: false,
  /**
   * 页面的初始数据
   */
  data: {
    islogin: null,
    imgOrigin: app.globalData.imgOrigin,
    userId: '',
    userInfo: {},
    pagedata: {},
    template: {},
    customActionStyle: {
      border: {
        borderColor: '#1A7AF8',
      },
      scale: {
        textIcon: '/palette/switch.png',
        imageIcon: '/palette/scale.png'
      },
      delete: {
        icon: '/palette/close.png'
      }
    }
  },
  async messageCheck(){
    let res = await req.messageCheck(); 
    if (res.data.unreadMessage != this.data.readMessage.unreadMessage){
      this.setData({
        readMessage: res.data
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      userId: options.userId
    });
    
    this.getData();
    
  },
  backto(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  async getUserInfo(){
    // let res = await req.userinfo({userId: this.data.userId}); 
    let res = await req.getProfile();
    
    if(res.data){
      this.setData({
        islogin: true,
        userInfo: res.data
      })
    }else{
      this.setData({
        islogin: false
      })
    }
    
  },
  toForum(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/forumList/forumList?forumId='+id,
    })
  },
  toUser(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/user/userHome?userId=' + id,
    })
  },
  async getData(){
    console.log('123')
    this.getUserInfo();
    let res = await req.getYear2020(); 
    if(res.data){
      res.data.minutes = Math.ceil(res.data.minutes)
      res.data.register_time = util.formatTime(res.data.register_time/1000,'Y-M-D h:m:s');
      
      this.setData({
        pagedata: res.data
      })
      this.setData({
        paintPallette: new Card().palette(res.data,this.data.userInfo),
      });
    }
    // if (res.data.unreadMessage != this.data.readMessage.unreadMessage){
    //   this.setData({
    //     readMessage: res.data
    //   })
    // }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  onImgOK(e) {
    this.imagePath = e.detail.path;
    this.setData({
      image: this.imagePath
    })
    if (this.isSave) {
      this.saveImage(this.imagePath);
    }
  },

  onRevert() {
    const pre = this.history.pop()
    if (!pre) {
      return
    }
    const needRefresh = pre.index && pre.index >= 0 && pre.index <= this.data.template.views.length
    if (needRefresh) {
      if (this.data.template.views[pre.index].id === pre.view.id) {
        this.data.template.views.splice(pre.index, 1)
      } else {
        this.data.template.views.splice(pre.index, 0, pre.view)
      }
      this.future.push(pre)
    } else {
      for (let i in this.data.template.views) {
        if (this.data.template.views[i].id === pre.view.id) {
          this.future.push({ view: this.data.template.views[i] })
          this.data.template.views[i] = pre.view
          break
        }
      }
    }
    const props = {
      paintPallette: this.data.template,
    }
    if (needRefresh) {
      props.template = this.data.template
    } else {
      props.action = pre
    }
    this.setData(props)
  },

  onRecover() {
    const fut = this.future.pop()
    if (!fut) {
      return
    }
    const needRefresh = fut.index && fut.index >= 0 && fut.index <= this.data.template.views.length
    if (needRefresh) {
      if (this.data.template.views[fut.index].id === fut.view.id) {
        this.data.template.views.splice(fut.index, 1)
      } else {
        this.data.template.views.splice(fut.index, 0, fut.view)
      }
      this.history.push(fut)
    } else {
      for (let i in this.data.template.views) {
        if (this.data.template.views[i].id === fut.view.id) {
          this.history.push({ view: this.data.template.views[i] })
          this.data.template.views[i] = fut.view
          break
        }
      }
    }
    const props = {
      paintPallette: this.data.template,
    }
    if (needRefresh) {
      props.template = this.data.template
    } else {
      props.action = fut
    }
    this.setData(props)
  },

  saveImage() {
    if (this.imagePath && typeof this.imagePath === 'string') {
      this.isSave = false;
      wx.saveImageToPhotosAlbum({
        filePath: this.imagePath,
      });
    }
  },

  touchEnd({ detail }) {
    let needRefresh = detail.index >= 0 && detail.index <= this.data.template.views.length
    if (needRefresh) {
      this.history.push({
        ...detail
      })
      if (this.data.template.views[detail.index].id === detail.view.id) {
        this.data.template.views.splice(detail.index, 1)
      } else {
        this.data.template.views.splice(detail.index, 0, detail.view)
      }
    } else {
      for (let view of this.data.template.views) {
        if (view.id === detail.view.id) {
          this.history.push({
            view: {
              ...detail.view,
              ...view
            }
          })
          view.css = detail.view.css
          break
        }
      }
    }
    this.future.length = 0
    const props = {
      paintPallette: this.data.template,
    }
    if (needRefresh) {
      props.template = this.data.template
    }
    this.setData(props);
  },
  toSave(){
    var dat = this.data.pagedata;
    this.setData({
      paintPallette: new Card().palette(dat,this.data.userInfo),
    });
    this.saveImage();
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