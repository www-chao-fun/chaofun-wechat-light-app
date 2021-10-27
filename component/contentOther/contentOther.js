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
      
      let kindex = e.detail.kindex;
      let ks = this.data.pagedata[kindex];
      ks.postInfo.isplay = true;

      this.setData({
        pagedata: this.data.pagedata
      })
    },
    toUser(e) {
      let info = e.currentTarget.dataset.info;
      wx.navigateTo({
        url: '/pages/user/userHome?userId=' + info.userId,
      })
    },
    toForum(e){
      wx.navigateTo({
        url: '/pages/forumList/forumList?forumId='+e.currentTarget.dataset.id,
      })
    },
    async toDelete(e){
      let item = e.currentTarget.dataset.item;
      let index = e.currentTarget.dataset.index;
      let _this = this;
      wx.showActionSheet({
        itemList: ['删除'],
        success(res) {
          if (res.tapIndex==0){
            _this.deletes(item,index)
          }
          
        },
        fail(res) {
          
        }
      })
    },
    async deletes(item,index){
      let res = await req.deletePost({postId: item.postId});
        if(res.success){
          wx.showToast({
            icon: 'none',
            title: '删除成功',
          })
          setTimeout(()=>{
            let pagedata = this.data.pagedata;
            pagedata.splice(index, 1);
            this.setData({
              pagedata: pagedata
            })
          },1500)
          
        }
    },
    async upvotePost(e) {
        let item = e.currentTarget.dataset.item;
        let index = e.currentTarget.dataset.index;
        let params = {
          postId: item.postInfo.postId
        }
        if (item.postInfo.vote != 1) {
          if (item.postInfo.vote == -1) {
            item.postInfo.ups += 2;
          } else {
            item.postInfo.ups += 1;
          }
          item.postInfo.vote = 1;
          item.downs -= 1;
          let data = this.data.pagedata;
          data.splice(index, 1, item);
          this.setData({
            pagedata: data
          })
        } else {
          if (item.postInfo.vote == 1) {
            item.postInfo.vote = 0;
            item.postInfo.ups -= 1;
            let data = this.data.pagedata;
            data.splice(index, 1, item);
            this.setData({
              pagedata: data
            })
          }
        }
        this.triggerEvent('changeVoteData',{params: {item:item,index:index}})
        let res = await req.upvotePost(params);
        if (res.success) {
          
        }
    },
    async downvotePost(e) {
      let item = e.currentTarget.dataset.item;
      let index = e.currentTarget.dataset.index;
      let params = {
        postId: item.postInfo.postId
      }
      
      if (item.postInfo.vote != -1) {
        if(item.postInfo.vote == 1){
          item.postInfo.ups -= 2;
        }else{
          item.postInfo.ups -= 1;
        }
        item.postInfo.vote = -1
        
      }else{
        item.postInfo.vote = 0
        item.postInfo.ups += 1;
      }
      let data = this.data.pagedata;
      // let dd = data[index];
      // dd.postInfo = item;
      data.splice(index, 1, item);
      this.setData({
        pagedata: data
      })
      // if (item.vote != -1) {
      //   item.vote = -1;
      //   // item.ups -= 1;
      //   if (item.vote == 1) {
      //     item.downs += 2;
      //   } else {
      //     item.downs += 1;
      //   }

      //   let data = this.data.pagedata;
      //   data.splice(index, 1, item);
      //   this.setData({
      //     pagedata: data
      //   })
      // } else {
      //   if (item.vote == -1) {
      //     item.vote = 0;
      //     item.downs -= 1;
      //     let data = this.data.pagedata;
      //     data.splice(index, 1, item);
      //     this.setData({
      //       pagedata: data
      //     })
      //   }
      // }
      this.triggerEvent('changeVoteData',{params: {item:item,index:index}})
      let res = await req.downvotePost(params);
      if (res.success) {
        
      }
    },
    async collects(e){
      let item = e.currentTarget.dataset.item;
      let index = e.currentTarget.dataset.index;
      let res = await req.savePost({postId: item.postInfo.postId});
      if(res.success){
        item.postInfo.save = !item.postInfo.save
        let data = this.data.pagedata;
        data.splice(index,1,item)
        this.setData({
          pagedata: data
        })
      }
    },
    toDetail(e){
      let item = e.currentTarget.dataset.item;
      wx.navigateTo({
        url: `/pages/detail/detail?postId=${item.postId}`,
      })
    },
    toTop(){
      wx.pageScrollTo({
        scrollTop: 0,
      })
    }
  }
})
