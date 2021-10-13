// component/content/content.js
const app = getApp();
const {
  req
} = app;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pagedata: {
      type: Array,
      value: []
    },
    hasshare: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgOrigin: app.globalData.imgOrigin,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    playvideo(e){
      console.log(e);
      console.log('执行程序');
      let kindex = e.detail.kindex;
      let ks = this.data.pagedata[kindex];
      ks.isplay = true;

      this.setData({
        pagedata: this.data.pagedata
      })
    },
    showNoShare() {
      wx.showToast({
        title: '该页面无法进行分享',
      })
    },
    toUser(e) {
      let info = e.currentTarget.dataset.info;
      wx.navigateTo({
        url: '/pages/user/userHome?userId=' + info.userId,
      })
    },
    toForum(e) {
      wx.navigateTo({
        url: '/pages/forumList/forumList?forumId=' + e.currentTarget.dataset.id,
      })
    },
    async toDelete(e) {
      let item = e.currentTarget.dataset.item;
      let index = e.currentTarget.dataset.index;
      let _this = this;
      wx.showActionSheet({
        itemList: ['删除'],
        success(res) {
          if (res.tapIndex == 0) {
            _this.deletes(item, index)
          }
          console.log(res.tapIndex)
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })
    },
    async deletes(item, index) {
      let res = await req.deletePost({
        postId: item.postId
      });
      if (res.success) {
        wx.showToast({
          icon: 'none',
          title: '删除成功',
        })
        setTimeout(() => {
          let pagedata = this.data.pagedata;
          pagedata.splice(index, 1);
          this.setData({
            pagedata: pagedata
          })
        }, 1500)

      }
    },
    async upvotePost(e) {
      let item = e.currentTarget.dataset.item;
      let index = e.currentTarget.dataset.index;
      let params = {
        postId: item.postId
      }

      // 因为投票的特殊性，这里额外处理了，不然投票状态会消掉
      if (item.type != 'vote') {
        if (item.vote != 1) {
          if (item.vote == -1) {
            item.ups += 2;
          } else {
            item.ups += 1;
          }
          item.vote = 1;
          // item.downs -= 1;
          let data = this.data.pagedata;
          // data.splice(index, 1, item);
          let str = `pagedata[${index}].ups`;
          let str2 = `pagedata[${index}].vote`;
          this.setData({
            [str]: item.ups,
            [str2]: item.vote
          })
        } else {
          if (item.vote == 1) {
            item.vote = 0;
            item.ups -= 1;
            let data = this.data.pagedata;
            let str = `pagedata[${index}].ups`;
            let str2 = `pagedata[${index}].vote`;
            this.setData({
              [str]: item.ups,
              [str2]: item.vote
            })
          }
        }
      }
      this.triggerEvent('changeVoteData',{params: {item:item,index:index}})
      await req.upvotePost(params);
      if (item.type == 'vote') {
        this.getPostInfo(item, index)
      }
    },

    async getPostInfo(item, index) {
      if (item.type == 'vote') {
        let res = await req.getPostInfo({
          postId: item.postId
        });
        if (res.success) {
          item = res.data
          let str = `pagedata[${index}]`;
          this.setData({
            [str]: item,
          })
        }
      }
    },
    async downvotePost(e) {
      let item = e.currentTarget.dataset.item;
      let index = e.currentTarget.dataset.index;
      let params = {
        postId: item.postId
      }

      // 因为投票的特殊性，这里额外处理了，不然投票状态会消掉
      if (item.type != 'vote') {

        if (item.vote != -1) {
          if (item.vote == 1) {
            item.ups -= 2;
          } else {
            item.ups -= 1;
          }
          item.vote = -1

        } else {
          item.vote = 0
          item.ups += 1;
        }
        let data = this.data.pagedata;
        let str = `pagedata[${index}].ups`;
        let str2 = `pagedata[${index}].vote`;
        this.setData({
          [str]: item.ups,
          [str2]: item.vote
        })
      }
      this.triggerEvent('changeVoteData',{params: {item:item,index:index}})
      await req.downvotePost(params);
      if (item.type == 'vote') {
        this.getPostInfo(item, index)
      }
    },
    async collects(e) {
      let item = e.currentTarget.dataset.item;
      let index = e.currentTarget.dataset.index;
      let res = await req.savePost({
        postId: item.postId
      });
      if (res.success) {
        item.save = !item.save
        let data = this.data.pagedata;
        data.splice(index, 1, item)
        this.setData({
          pagedata: data
        })
      }
    },
    toDetail(e) {
      let item = e.currentTarget.dataset.item;
      wx.navigateTo({
        url: `/pages/detail/detail?postId=${item.postId}`,
      })
    },
    toTop() {
      wx.pageScrollTo({
        scrollTop: 0,
      })
    }
  }
})