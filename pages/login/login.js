// import { delete } from "request";

// pages/login/login.js
const app = getApp();
const {
  util: { formatSecondTime },
  req
} = app;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showWhich: '2',
    params: {
      userName: '',
      password: '',
      repassword: '',
      options: {}
    },
    wechatAuth: false,
    authCode: ''
  },
  async getPhoneNumber (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    console.log(e)
    wx.showLoading({
      title: '',
    })
    if(e.currentTarget.dataset.name=='register'){
      this.register(e);
    }else{
      let that = this;
      let params = {
        authCode: this.data.authCode,//res.code,
        phoneInfoEncryptedData: e.detail.encryptedData,
        phoneInfoEncryptedDataIV: e.detail.iv,
      }
      req.weChatLightAppPhoneLogin(params).then(res1=>{
        wx.hideLoading({
          success: (res) => {},
        })
        if(res1.success){
          console.log(res1);
          that.doLoginSuccess(res1);
        }else if(res1.errorCode=='need_register'){
          that.setData({
            wechatAuth: true,
            showWhich: '3'
          })
        }else{
          wx.showToast({
            icon: 'none',
            title: res1.errorMessage+'，请重试'
          })
        }
        
      });
    }
    
    
    // wx.login({
    //   success (res) {
    //     console.log(res.code);
    //     if (res.code) {
    //       //发起网络请求
    //       // wx.getPhoneNumber(resOk=>{
    //       //   console.log(res)
    //       // })
    //       let params = {
    //         authCode: this.data.authCode,//res.code,
    //         phoneInfoEncryptedData: e.detail.encryptedData,
    //         phoneInfoEncryptedDataIV: e.detail.iv,
    //       }
    //       req.weChatLightAppPhoneLogin(params).then(res1=>{
    //         if(res1.success){
    //           console.log(res1);
    //           that.doLoginSuccess(res1);
    //         }else if(res1.errorCode=='need_register'){
    //           that.setData({
    //             wechatAuth: true,
    //             showWhich: '3'
    //           })
    //         }else{
    //           wx.showToast({
    //             icon: 'none',
    //             title: res1.errorMessage+'，请重试'
    //           })
    //         }
            
    //       });
          
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
  },
  password(e){
    this.setData({
      'params.password': e.detail.value
    })
  },
  repassword(e){
    this.setData({
      'params.repassword': e.detail.value
    })
  },
  userName(e){
    this.setData({
      'params.userName': e.detail.value
    })
  },
  cancellogin(){
    wx.switchTab({
      url: '/pages/user/user'
    })
  },
  checkout(e){
    let ins = e.currentTarget.dataset.ins; 
    let a;
    if(ins=='register'){
      a = 3
    }else if(ins=='login'){
      a = 2
    }else if(ins=='bind'){
      a = 4
    }
    this.setData({
      showWhich: a
    })
  },
  async login(){
    let params = {
      userName: this.data.params.userName,
      password: this.data.params.password
    };
    if(!params.userName||!params.password){
      wx.showToast({
        icon: 'none',
        title: '请填写完整'
      })
    }
    let res = await req.toLogin(params);
    console.log(res)
    if (res.success){
      wx.showToast({
        title: '登录成功',
      })
      this.doLoginSuccess(res);
    }else{
      wx.showToast({
        icon: 'none',
        title: res.errorMessage
      })
    }
  },
  doLoginSuccess(res){
    wx.setStorageSync('cookie', `${res.data.name}=${res.data.value};`)
      app.globalData.isLogin = true
      app.globalData.refresh = true
      setTimeout(()=>{
        let url = (this.data.options.from ? this.data.options.from : '/pages/index/index')
        if (url.includes('/pages/user/user')||url.includes('/pages/push/push')||url.includes('/pages/message/message')||url.includes('/pages/index/index')){
          wx.switchTab({
            url: url,
          })
        }else{
          if(url.includes('/detail/detail')){
            wx.redirectTo({
              url: url+'?postId='+this.data.options.postId,
            })
          }else{
            wx.redirectTo({
              url: url,
            })
          }
        }
      },1500)
  },
  async register(e){
    
    let params = {
      userName: this.data.params.userName,
      password: this.data.params.password,
      repassword: this.data.params.repassword
    };
    if(!params.userName||!params.password||!params.repassword){
      wx.showToast({
        icon: 'none',
        title: '请填写完整'
      })
      return 
    }else if(params.password!=params.repassword){
      wx.showToast({
        icon: 'none',
        title: '两次填写的密码不一致'
      })
      this.setData({
        'params.password': '',
        'params.repassword': ''
      })
      return 
    }
    let res;
    if(this.data.wechatAuth){
      delete params.repassword;
      res = await req.weChatLightAppRegister(params);
    }else{
      params.authCode = this.data.authCode;
      params.phoneInfoEncryptedData = e.detail.encryptedData;
      params.phoneInfoEncryptedDataIV = e.detail.iv;
      // res = await req.register(params);
      res = await req.weChatLightAppRegister(params);
    }
    // let res = await req.register(params);
    console.log(res)
    if (res.success){
      wx.showToast({
        title: '登录成功',
      })
      wx.setStorageSync('cookie', `${res.data.name}=${res.data.value}`)
      app.globalData.isLogin = true
      setTimeout(()=>{
        let url = (this.data.options.from ? this.data.options.from : '/pages/index/index')
        if (url.includes('/pages/user/user')){
          wx.switchTab({
            url: url,
          })
        }else{
          if(url.includes('/detail/detail')){
            wx.redirectTo({
              url: url+'?postId='+this.data.options.postId,
            })
          }else{
            wx.redirectTo({
              url: url,
            })
          }
        }
      },1500)
    }else{
      this.refreshCode();
      wx.showToast({
        icon: 'none',
        title: res.errorMessage
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log('options', options)
    this.setData({
      options: options
    })
    // let that = this;
    // wx.login({
    //   success (res) {
    //     console.log(res.code);
    //     if (res.code) {
    //       that.setData({
    //         authCode: res.code
    //       })
    //     }
    //   }
    // })
  },
  toLogin(){

  },
  getUserInfo(e){
    console.log(e)
    if (e.detail.errMsg =='getUserInfo:ok'){
      wx.setStorageSync('userInfo', e.detail.userInfo)
      this.setData({
        showWhich: '2'
      })
    }else{
      console.log('拒绝授权')
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
    this.refreshCode();
  },
  refreshCode(){
    let that = this;
    wx.login({
      success (res) {
        console.log(res.code);
        if (res.code) {
          that.setData({
            authCode: res.code
          })
        }
      }
    })
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