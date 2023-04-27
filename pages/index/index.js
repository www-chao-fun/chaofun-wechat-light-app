//index.js
//获取应用实例
const app = getApp();
const {
  util: { formatSecondTime },
  req
} = app;

Page({
  data: {
    orderIndex: 1,
    rangeIndex: 1,
    statusBar: {},
    params: {
      marker: '',
      key: '',
      pageSize: 20,
      order: 'hot',
      range: '1day',
      forumId: 3
    },
    choose: '',
    pagedata: [],
    imgOrigin: app.globalData.imgOrigin,
    navList: [
      {
        title: '首页',
        id: 'home'
      }, 
      {
        title: '推荐',
        id: 'recommend'
      }, 
      // {
      //     name: '全站',
      //     id: 'all'
      // }
    ],
    homeParams: {
      pageSize: 20,
      marker: '',
      range: '1day',
      key: '',
      order: 'hot',
      // forumId: 'home'
    },
    orders: [
      {
        label: '最新',
        value: 'new'
      },
      {
        label: '最热',
        value: 'hot'
      },
      {
        label: '新评',
        value: 'comment'
      },
      {
        label: '最赞',
        value: 'ups'
      },
    ],
    ranges: [
      {
        label: '现在',
        value: '1hour'
      },
      {
        label: '一天',
        value: '1day'
      },
      {
        label: '一周',
        value: '1week'
      },
      {
        label: '一月',
        value: '1month'
      },
      {
        label: '一年',
        value: '1year'
      },
      {
        label: '全部',
        value: 'all'
      },
    ],
    userdata: [],
    nsorts: '最新',
    range: '一天',
    hasJoin: null
  },
  getDateDiffs: app.util.getDateDiffs,
  inits(){
    // app.globalData.wxMediaCheckAsync(2,'https://i.chao-fan.com/cover/6c17696c0b705b5e0649f7eb3eb2e449c0c9f931.png?x-oss-process=image/resize,h_100')
    // let a = app.globalData.wxMsgSecCheck('特3456书yuuo莞6543李zxcz蒜7782法fgnv级')
    var that = this;
    let order = wx.getStorageSync('indexOrder')||'hot'
    let rangeValue = wx.getStorageSync('indexOrderRange')||'1day'

    let orderIndex = 1
    let rangeIndex = 1
    for (let i = 0; i < this.data.orders.length; i ++) {
      if (order === this.data.orders[i].value) {
        orderIndex = i;
      }
    }
    for (let i = 0; i < this.data.ranges.length; i ++) {
      if (rangeValue === this.data.ranges[i].value) {
        rangeIndex = i;
      }
    }

    let nsorts = this.data.orders[orderIndex].label;
    let range =this.data.ranges[rangeIndex].label;
  
    that.setData({
      statusBar: app.globalData.statusBar,
      'params.order': order,
      'homeParams.order': order,
      'params.range': rangeValue,
      'homeParams.range': rangeValue,
    
      orderIndex: orderIndex,
      rangeIndex: rangeIndex,
      nsorts: nsorts,
      range: range
    })

  },
  checkoutRange(e){
    console.log(e)
    let params = e.detail;
      this.setData({
        pagedata: [],
        'params.marker': '',
        'params.key': '',
        'params.order': params.order,
        'params.range': params.range,
        'homeParams.marker': '',
        'homeParams.key': '',
        'homeParams.order': params.order,
        'homeParams.range': params.range,
      })
      this.getLists()
  },
  changeVoteData(e){
    let params = e.detail.params;
    let item;
    let datas;
    let which;
    if(this.data.choose=='trends'){
      item = params.item;
      datas = this.data.userdata;
      which = 'userdata';
    }else{
      item = params.item;
      datas = this.data.pagedata;
      which = 'pagedata';
    }
    
    datas.splice(params.index,1,item);
    this.setData({
      [which]: datas
    })
    console.log(params)
  },
  async getProfile() {
    let res = await req.getProfile();
    console.log(res)
    if (res.data){
      app.globalData.userInfo = res.data;
      app.globalData.isLogin = true;
      this.setData({
        choose: 'home',
        navList: [
          {
            title: '首页',
            id: 'home'
          },
          {
            title: '全站',
            id: 'all'
          },
          {
            title: '推荐',
            id: 'recommend'
          }, 
          {
            title: '关注',
            id: 'trends'
          }
        ]
      })
      wx.setStorageSync('userId', res.data.userId)
    }else{
      app.globalData.isLogin = false;
      this.setData({
        choose: 'all',
        navList: [
          {
            title: '全站',
            id: 'all'
          },
          {
            title: '推荐',
            id: 'recommend'
          }, 
        ]
      })
      wx.removeStorageSync('userId')
    }
    this.getListForums()
  },
  bindOrderChange(e) {
    if (this.data.orders[e.detail.value].value != this.data.params.order) {
      let v = this.data.orders[e.detail.value].value
      this.setData({
        pagedata: [],
        'params.marker': '',
        'params.key': '',
        'params.order': v,
        'homeParams.marker': '',
        'homeParams.key': '',
        'homeParams.order': v,
      })
      this.setData({
        nsorts:this.data.orders[e.detail.value].label
      })
      wx.setStorageSync('indexOrder', v)
      this.getLists()
    }
  },
  bindRangeChange(e) {
    if (this.data.ranges[e.detail.value].value != this.data.params.range) {
      let v = this.data.ranges[e.detail.value].value
      this.setData({
        pagedata: [],
        'params.marker': '',
        'params.key': '',
        'params.range': v,
        'homeParams.marker': '',
        'homeParams.key': '',
        'homeParams.range': v,
      })
      this.setData({
        range:this.data.ranges[e.detail.value].label
      })
      wx.setStorageSync('indexOrderRange', v)
      this.getLists()
    }
  },
  skip(e){
    let item = e.currentTarget.dataset.item;
    this.setData({
      'params.forumId': item.id,
      'params.marker': '',
      'homeParams.marker': '',
      'homeParams.key': '',
      'params.key': '',
      pagedata: [],
      choose: item.id
    })
    this.getLists()
  },
  toForum(){
    wx.switchTab({
      url: '/pages/forum/forum',
    })
  },
  async getListForums() {
    
    let res = await req.getMenu({});
    //  res = await req.getListForums({});
    // console.log(res)
    let d = this.data.navList;
    let c = []
    let hasJoin = false;
    res.data.forEach(item=>{
      if(item.name=='已加入'){
        hasJoin = true
        item.menues.forEach(i=>{
          i.id = i.link.split('/')[2]
        })
        
        if(item.menues.length){
          this.setData({
            'hasJoin': true
          })
        }else{
          this.setData({
            'hasJoin': false
          })
        }
        d.push(...item.menues)
      } else if (item.name == '热门版块'){
        item.menues.forEach(i => {
          i.id = i.link.split('/')[2]
        })
        c.push(...item.menues)
      }
    })
    if(!hasJoin){
      d.push(...c)
    }
    // d.push(...res.data)
    this.setData({
      navList: d
    })
    this.getLists()
    
  },
  
  async getLists(v){
    if (!v){
      wx.showLoading({
        title: '',
      })
    }
    console.log('this.data.choose',this.data.choose)
    let res
    if (this.data.choose == 'home' || this.data.choose == 'all' || this.data.choose == 'recommend'){
      let params = this.data.homeParams
      if (this.data.choose == 'all' || this.data.choose == 'recommend'||this.data.choose == 'home'){
        params.forumId = this.data.choose
      }else{
        delete params.forumId
        delete params.key
      }
      res = await req.getHome(params);
      if(this.data.choose == 'recommend'){
        this.setData({
          'homeParams.key': res.data.key?res.data.key:''
        })
      }
    }else if(this.data.choose == 'trends'){
      let params = this.data.params;
      res = await req.listTrends(params);
      
    }else{
      let params = this.data.params; 
      res = await req.getPosts(params);
    }
    
    if(this.data.choose!='trends'){
      let datas = res.data.posts;
      datas.forEach(item=>{
        let o = this.doWidthAndHeight(item.width, item.height);
        item.rw = o.rw;
        item.rh = o.rh;
        item.rtime = this.getDateDiffs(item.gmtCreate);
      })
      let n;
      if(v=='refresh'){
        wx.stopPullDownRefresh()
        n = datas
      }else{
        n = this.data.pagedata.concat(datas)
      }
      this.setData({
        pagedata: n,
        'params.marker': res.data.marker,
        'homeParams.marker': res.data.marker,
        'homeParams.key': res.data.key?res.data.key:'',
        'params.key': res.data.key?res.data.key:'',
      })
    }else{
      let datas = res.data.trends;
      console.log(datas)
      datas.forEach(item=>{
        let o = this.doWidthAndHeight(item.postInfo.width, item.postInfo.height);
        item.postInfo.rw = o.rw;
        item.postInfo.rh = o.rh;
        item.postInfo.rtime = this.getDateDiffs(item.postInfo.gmtCreate);
        item.rtime = this.getDateDiffs(item.gmtCreate);
      })
      let n;
      if(v=='refresh'){
        wx.stopPullDownRefresh()
        n = datas
      }else{
       n = this.data.userdata.concat(datas)
      }
      this.setData({
        userdata: n,
        'params.marker': res.data.marker,
        'parms.key': res.data.key?res.data.key:'',
      })
      // userdata
    }
    
    wx.hideLoading()
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onReady(){
    // this.getProfile();
  },
  onLoad: function () {
    this.getProfile();
    console.log('app.globalData.isLogin',app.globalData.isLogin)
    this.inits();//wx.setStorageSync('order', item.value)
    let order = wx.getStorageSync('order');
    let range = wx.getStorageSync('range');
    let params = {
      order,range
    }
    this.setData({
      'params.order': params.order,
      'params.range': params.range.value,
      'homeParams.order': params.order,
      'homeParams.range': params.range.value,
    })
  },
  doWidthAndHeight(w,h){
    var systemInfo = wx.getSystemInfoSync();
    let rh;
    if(w>h){
      rh = parseInt(systemInfo.windowWidth*h/w)+'px';
      return {
        rw: '100%',
        rh: rh
      }
    }else{
      return {
        rw: '100%',
        rh: '270px'
      }
    }
  },
  getUserInfo: function(e) {
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
  },
  onReachBottom(){
    this.getLists('scroll')
  },
  refreshs(v){
    if(!v){
      if (app.globalData.refresh) {
        this.getProfile();
        var nav;
        
        this.setData({
          'params.forumId': '',
          'params.marker': '',
          'params.key': '',
          'homeParams.marker': '',
          'homeParams.key': '',
          pagedata: [],
          userdata: [],
          choose: app.globalData.isLogin?'home':'all',
          navList: nav
        })
        // this.getListForums()
        // this.getLists()
      }
      app.globalData.refresh = false
    }else{
      this.setData({
        'params.marker': '',
        'homeParams.marker': '',
        'params.key': '',
        'homeParams.key': '',
        // pagedata: [],
      })
      this.getLists('refresh')
    }
  },
  getSorts(){
    if(this.data.params.order=='new'){
      return '最新';
    }else if(this.data.params.order=='hot'){
      return '最热';
    }else if (this.data.params.order=='comment') {
      return '热评';
    } else {
      return '最赞'
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    this.refreshs()
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
        title: '【'+item.forum.name+'】'+item.title,
        imageUrl: `${(imageUrl && !imageUrl.includes('.mp4')) ? (this.data.imgOrigin + imageUrl) : ''}`,
        path: `/pages/detail/detail?postId=${item.postId}`
      }
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.refreshs('all')
  },
})
