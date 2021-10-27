// pages/push/push.js
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
    canShowVideo: true,
    imgOrigin: app.globalData.imgOrigin,
    items: [{
        value: '1',
        name: '图片/视频',
        checked: 'true'
      },
      {
        value: '3',
        name: '链接'
      },
      {
        value: '2',
        name: '文本'
      },
      {
        value: '4',
        name: '投票'
      },
    ],
    voteList: [{
      optionName: ''
    }, {
      optionName: ''
    }, ],
    showDelete: false,
    checked: 1,
    disablePush: false,
    forms: {
      forumId: '',
      title: '',
      link: '',
      ossName: '',
      realOssName: '',
      article: ''
    },
    forumInfo: {},
    isLogin: true,
    datas: [],
    realDatas: [],
    ifImage: true,
  },
  deletes(e) {
    if (this.data.voteList.length > 2) {
      let index = e.currentTarget.dataset.index;
      console.log(index)
      var data = this.data.voteList;
      data.splice(index, 1);
      this.setData({
        voteList: data
      })
    } else {
      this.setData({
        showDelete: false
      })
    }

  },
  inputVote(e) {
    var voteList = this.data.voteList;
    var index = e.currentTarget.dataset.index;
    voteList[index].optionName = e.detail.value;
    this.setData({
      voteList: voteList
    })
    console.log(index)
  },
  addVote() {
    if (this.data.voteList.length < 6) {
      var voteList = this.data.voteList;
      voteList.push({
        optionName: ''
      })
      var showDelete = this.data.showDelete;
      if (voteList.length > 2) {
        showDelete = true;
      } else {
        showDelete = false;
      }
      this.setData({
        voteList: voteList,
        showDelete: showDelete
      })
    }

  },
  zhantie() {
    let _this = this;
    wx.getClipboardData({
      success: function (res) {
        console.log('res', res)
        _this.setData({
          'forms.link': res.data
        })
      }
    })
  },
  radioChange(e) {
    console.log(e)
    this.setData({
      checked: e.detail.value
    })
  },
  toChooseForum(e) {
    let f = this.data.forms;
    f.checked = this.data.checked;
    wx.setStorageSync('datas', f)
    wx.navigateTo({
      url: '/pages/chooseForum/chooseForum',
    })
  },
  bindTitle(e) {
    this.setData({
      'forms.title': e.detail.value
    })
  },
  bindArticle(e) {
    this.setData({
      'forms.article': e.detail.value
    })
  },
  bindLink(e) {
    this.setData({
      'forms.link': e.detail.value
    })
  },
  checkNull(params) {
    for (var key in params) {
      if (!params[key]) {
        wx.showToast({
          icon: 'none',
          title: '请填写完整'
        })
        return false
      }
    }
    return true
  },
  async chooseImage() {
    var that = this;
    let checks = await this.checkLogin();
    if (!checks) {
      return
    }
    if(this.data.ifImage){
      if(this.data.datas.length<9){
        if(this.data.datas.length>0){
          util.pickImage(this.pushImage,'image')
        }else{
          util.pickImage(this.pushImage,'all')
        }
        
      }else{
        wx.showToast({
          icon: 'none',
          title: '最多上传9张图片',
        })
      }
    }else{
      wx.showToast({
        icon: 'none',
        title: '只能选择一个视频',
      })
    }
    
    
  },
  toDelete(e){
    let index = e.currentTarget.dataset.index;
    console.log(index);
    let datas = this.data.datas;
    datas.splice(index,1);
    let realDatas = this.data.realDatas;
    realDatas.splice(index,1);
    if(realDatas.length==0){
      this.setData({
        ifImage: true
      })
    }
    this.setData({
      datas: datas,
      realDatas: realDatas
    })
  },
  pushImage(res) {
    let that = this;
    wx.hideLoading()
    console.log(res)

    if (res.success) {
      var data = "";
      data = res.data;
      var ossName = that.data.imgOrigin + data ;
      if (data.endsWith(".mp4")) {
        ossName += '?x-oss-process=video/snapshot,t_0';
        this.setData({
          ifImage: false
        })
      }
      var t = that.data.datas;
      var rt = that.data.realDatas;
      rt.push(data);
      t.push(ossName);
    
      
      console.log('data', data)
      console.log('datas', t)
      that.setData({
        datas: t,
        realDatas: rt,
        'forms.ossName': ossName,
        'forms.realOssName': data
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: res.errorMessage,
      })
    }
  },
  async getProfile() {
    let res = await req.getProfile();
    console.log(res)
    if (res.data) {
      app.globalData.userInfo = res.data;
      app.globalData.isLogin = true;
    } else {
      app.globalData.isLogin = false;
    }
    this.setData({
      isLogin: app.globalData.isLogin
    });
  },
  async checkLogin() {
    if (!this.data.isLogin) {
      await this.getProfile();
      if (!this.data.isLogin) {
        wx.showModal({
          title: '提示',
          content: '发布帖子需要登录，是否去登录？',
          confirmText: '去登录',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/login/login?from=/pages/push/push&id=111',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return false
      }
    }
    return true

  },
  async toSub() {
    this.setData({
      disablePush: true
    })

    try {
      let params
      let checks = await this.checkLogin();
      if (!checks) {
        this.setData({
          disablePush: false
        })
        return
      }
      if (this.data.checked == 1) {
        params = {
          forumId: this.data.forumInfo.forumId,
          title: this.data.forms.title,
          // ossName: this.data.realDatas.join(',')
        }
        if(this.data.realDatas.length>1){
          params.ossNames = this.data.realDatas.join(',')
        }else{
          params.ossName = this.data.realDatas[0]
        }
        let check = this.checkNull(params)
        if (!check) {
          this.setData({
            disablePush: false
          })
          return
        }
        let res = await req.submitImage(params);
        if (res.success) {
          wx.showToast({
            icon: 'none',
            title: '发布成功',
          })
          this.setData({
            datas: [],
            realDatas: [],
            ifImage: true,
            forms: {
              forumId: '',
              title: '',
              link: '',
              ossName: '',
              realOssName: '',
              article: ''
            }
          })
          this.saveForumHistory();
          wx.navigateTo({
            url: '/pages/list/list?v=1&n=我发布的',
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.errorMessage,
          })
        }
      } else if (this.data.checked == 3) {

        params = {
          forumId: this.data.forumInfo.forumId,
          title: this.data.forms.title,
          link: this.data.forms.link
        }
        console.log('params', params)
        let check = this.checkNull(params)
        if (!check) {
          this.setData({
            disablePush: false
          })
          return
        }
        let res = await req.submitLink(params);
        if (res.success) {
          wx.showToast({
            icon: 'none',
            title: '发布成功',
          })
          this.setData({
            datas: [],
            realDatas: [],
            ifImage: true,
            forms: {
              forumId: '',
              title: '',
              link: '',
              ossName: '',
              realOssName: '',
              article: ''
            }
          })
          this.saveForumHistory();
          wx.navigateTo({
            url: '/pages/list/list?v=1&n=我发布的',
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.errorMessage,
          })
        }
      } else if (this.data.checked == 2) {
        params = {
          forumId: this.data.forumInfo.forumId,
          title: this.data.forms.title,
          articleType: 'richtext',
          article: this.data.forms.article
        }
        let check = this.checkNull(params)
        if (!check) {
          this.setData({
            disablePush: false
          })
          return
        }
        let res = await req.submitArticle(params);
        if (res.success) {
          wx.showToast({
            icon: 'none',
            title: '发布成功',
          })
          this.setData({
            datas: [],
            realDatas: [],
            ifImage: true,
            forms: {
              forumId: '',
              title: '',
              link: '',
              ossName: '',
              realOssName: '',
              article: ''
            }
          })
          this.saveForumHistory();
          wx.navigateTo({
            url: '/pages/list/list?v=1&n=我发布的',
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '很抱歉，您上传的内容未通过内容安全检测',
          })
        }
      } else if (this.data.checked == 4) {
        params = {
          forumId: this.data.forumInfo.forumId,
          title: this.data.forms.title,
          options: JSON.stringify(this.data.voteList)
        }
        let check = this.checkNull(params)
        if (!check) {
          this.setData({
            disablePush: false
          })
          return
        }
        let res = await req.submitVote(params);
        if (res.success) {
          wx.showToast({
            icon: 'none',
            title: '发布成功',
          })
          this.setData({
            voteList: [{
              optionName: ''
            }, {
              optionName: ''
            }, ],
            showDelete: false,
            datas: [],
            realDatas: [],
            ifImage: true,
            forms: {
              forumId: '',
              title: '',
              link: '',
              ossName: '',
              realOssName: '',
              article: ''
            }
          })
          this.saveForumHistory();
          wx.navigateTo({
            url: '/pages/list/list?v=1&n=我发布的',
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '很抱歉，您上传的内容未通过内容安全检测',
          })
        }
      }
    } catch (e) {
      console.log(e);
    }
    this.setData({
      disablePush: false
    })
  },
  saveForumHistory() {
    let hist = wx.getStorageSync('forumHistory');
    if (!hist) {
      wx.setStorageSync('forumHistory', [this.data.forumInfo])
    } else {
      let has = false;
      let idx;
      hist.forEach((item, index) => {
        console.log(index);
        if (item.forumId == this.data.forumInfo.forumId) {
          console.log(item)
          has = true;
          idx = index;
        }
      })
      if (has) {
        hist.splice(idx, 1)
      }
      hist.unshift(this.data.forumInfo);
      wx.setStorageSync('forumHistory', hist)
      // if(!hist.includes(this.data.forumInfo)){
      //   hist.unshift(this.data.forumInfo);
      //   wx.setStorageSync('forumHistory', hist)
      // }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('load', options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var now = new Date().getTime();
    var real = new Date('2021-10-27 17:10:00').getTime();
    if(now<real){
      this.setData({
        canShowVideo: false,
        items: [{
            value: '1',
            name: '图片',
            checked: 'true'
          },
          {
            value: '3',
            name: '链接'
          },
          {
            value: '2',
            name: '文本'
          },
          {
            value: '4',
            name: '投票'
          },
        ],
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    console.log('forumInfo', app.globalData.forumInfo)
    this.setData({
      isLogin: app.globalData.isLogin
    })
    if (app.globalData.forumInfo.forumId) {
      this.setData({
        forumInfo: app.globalData.forumInfo
      })
    } else if (wx.getStorageSync('forumHistory')) {
      this.setData({
        forumInfo: wx.getStorageSync('forumHistory')[0]
      })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})