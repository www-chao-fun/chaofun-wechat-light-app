// component/voteItem/voteItem.js
const app = getApp();
const {
  req
} = app;
Component({

  lifetimes: {
    created: function () {

    },
    attached: function () {
      let item = this.data.item;
      let bool = this.checkoutVote(item.options,item);
      console.log('bool',bool)
      this.setData({
        isChoose: bool
      })
      this.setData({
        item: item
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
   
  },
 
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isChoose: false,
    index: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    fixed(e) {
      console.log('1231231231')
      return e.toFixed(2)
    },
    radioChange(e){
      console.log(e);
      this.setData({
        index: e.detail.value
      })
    },
    async getPostInfo(){
      let re = await req.getPostInfo({ postId: this.data.item.postId});
      let bool = this.checkoutVote(re.data.options,re.data);
      this.setData({
        item: re.data, 
        isChoose: bool
      })
      this.data.item = re.data;
    },
    async toToup(e){
      var self = this;
      // if(this.checkLogin()){
        var res = await req.toVote({postId: self.data.item.postId,option: self.data.index});
        if(res.success){
          this.getPostInfo();
        } else if (res.errorCode === 'need_login'){
          this.showLogin()
        } else {
          wx.showToast({
            icon: 'none',
            title: res.errorMessage
          })
        }
      // }
    },
    async circusee(e){
      var self = this;
      var res = await req.toCircusee({postId: self.data.item.postId});
        if(res.success){
          this.getPostInfo();
        } else if (res.errorCode === 'need_login'){
          this.showLogin()
        } else {
          wx.showToast({
            icon: 'none',
            title: res.errorMessage
          })
        }
      
    },
    showLogin(){
      let that = this
      wx.showModal({
        title: '提示',
        content: '需要登录才能使用哦~，是否去登录？',
        confirmText: '去登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login?from=/pages/detail/detail&postId='+that.data.item.postId,
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    checkLogin(){
      let that = this
      if(!app.globalData.isLogin){
        wx.showModal({
          title: '提示',
          content: '需要登录才能使用哦~，是否去登录？',
          confirmText: '去登录',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/login/login?from=/pages/detail/detail&postId='+that.data.item.postId,
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return false
      }else{
        return true
      }
    },
    checkoutVote(list,item){
      var a = false;
      list.forEach(item=>{
        if(item.optionVote){
          a = true;
        }
      })
      if(item.circuseeCount){
        a = true;
      }
      return a;
    },
    doBg(it,its){
      var num = it.optionVote;
      var total = 0;
      its.forEach(item=>{
          total += item.optionVote*1;
      })
      // return (num*100/total).toFixed(2)+'%';
      return '100%';
    },

  }
})
