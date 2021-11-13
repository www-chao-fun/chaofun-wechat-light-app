// component/typeItem/typeItem.js
const app = getApp();
Component({
  options: {
    // styleIsolation: 'isolated',
    // 或者
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    dClass: {
      type: Boolean,
      value: false
    },
    detail: {
      type: Boolean,
      value: false
    },
    kindex: {
      type: Number,
      value: -1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgOrigin: app.globalData.imgOrigin,
    isShare: true,
    canShowVideo: true,
  },
  ready(){
    
    var now = new Date().getTime();
    var real = new Date('2021-11-13 18:30:00').getTime();
    if(now<real){
      this.setData({
        canShowVideo: false
      })
    }
    
  },
  /**
   * 组件的方法列表
   */
  
  methods: {
    toPlay(e){
      this.data.item.isplay = true;
      this.setData({
        item: this.data.item
      })
      this.triggerEvent('playvideo', {val: true,kindex: this.data.kindex});
    },
    showImgMore(e){

      
      let item = e.currentTarget.dataset.item;
      let index = e.currentTarget.dataset.index;
      
      var a = item.images
      var b = item.images.map(it=>{
        return this.data.imgOrigin+it;
      })
      
      wx.previewImage({
        current: `${this.data.imgOrigin + item.images[index]}`, // 当前显示图片的http链接
        urls: b // 需要预览的图片http链接列表
      })
    },
    showImg(e){
      let item = e.currentTarget.dataset.item;
      wx.previewImage({
        current: `${this.data.imgOrigin + item.imageName}`, // 当前显示图片的http链接
        urls: [this.data.imgOrigin + item.imageName] // 需要预览的图片http链接列表
      })
    },
    toDetail(e) {
      if (!this.data.detail) {
        let item = e.currentTarget.dataset.item;
        wx.navigateTo({
          url: `/pages/detail/detail?postId=${item.postId}`,
        })
      }
    }
  },
})
