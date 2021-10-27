// component/articleItem/articleItem.js
var WxParse = require("../../wxParse/wxParse.js");
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
  lifetimes: {
    created: function(){
      
      let article = this.data.item.article
      WxParse.wxParse("intro", "html", article, this, 10);
      this.setData({
        intro: this.data.intro
      })
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
      let article = this.data.item.article
      let that = this;
      
      
      WxParse.wxParse("intro", "html", article, that, 10);
      
      this.setData({
        intro: this.data.intro,
        isHtml: (this.data.item.article.substring(0,2)=='<p'||this.data.item.article.substring(0,3)=='<ol'||this.data.item.article.substring(0,3)=='<ul'||this.data.item.article.substring(0,4)=='<div')
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  properties: {
    item: {
      type: Object,
      value: {}
    },
    detail: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgOrigin: app.globalData.imgOrigin,
    isHtml: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e) {
      if (!this.data.detail) {
        let item = e.currentTarget.dataset.item;
        wx.navigateTo({
          url: `/pages/detail/detail?postId=${item.postId}`,
        })
      }
    }
  }
})
