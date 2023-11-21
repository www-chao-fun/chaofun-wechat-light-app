// pages/detail/detail.js
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
        postId: '',
        postData: {},
        imgOrigin: app.globalData.imgOrigin,
        commentData: [],
        commentVal: '',
        isLogin: true,
        bottom: '',
        replays: {},
        imageNames: '',
        commentOrder: 'hot',
        showSetTagPopup: false,
        forumTagList: [],
        forumTagSelectedId: 0,
    },

    commentOrderChange(e) {
        let order = e.target.dataset.order;
        if (order != this.data.commentOrder) {
            wx.setStorageSync('commentListOrder', order)
            this.setData({
                commentOrder: order
            });
            this.listComments();
        }
    },

    playvideo(e) {
        console.log(e);
        console.log('执行程序');
        this.data.postData.isplay = true;
        this.setData({
            postData: this.data.postData
        })
    },
    //util.pickImage(this.pushImage,'image')
    async chooseImage() {
        var that = this;
        let checks = await this.checkLogin();
        if (!checks) {
            return
        } else {
            util.uploadImage(this.pushImage, 1);
        }
    },
    pushImage(res) {
        let that = this;
        wx.hideLoading()


        if (res.success) {
            var data = "";
            data = res.data;
            var ossName = data;
            this.setData({
                imageNames: ossName
            })
        }
    },
    toReplay(e) {
        this.setData({
            replays: e.currentTarget.dataset.item
        })
    },
    sendMsg(item) {

        this.setData({
            replays: item.detail
        })
    },

    deleteComment(e) {
        req.deleteComment({
            commentId: e.detail.id,
        }).then(() => {
            this.listComments();
        });
    },

    highlightComment(e) {
        let reqParams = {
            commentId: e.detail.id
        };
        if (e.detail.forumAdminHighlight) {
            req.unHighlightComment(reqParams).then(() => {
                this.listComments();
            });
        } else {
            req.highlightComment(reqParams).then(() => {
                this.listComments();
            });
        }
    },

    showImg(e) {
        let item = e.currentTarget.dataset.item;
        wx.previewImage({
            current: `${this.data.imgOrigin + item.imageNames}`, // 当前显示图片的http链接
            urls: [this.data.imgOrigin + item.imageNames] // 需要预览的图片http链接列表
        })
    },
    transformTree(list) {
        const tree = []

        for (let i = 0, len = list.length; i < len; i++) {
            if (!list[i].parentId) {
                const item = this.queryChildren(list[i], list)

                tree.push(item)
            }
        }

        return tree
    },

    queryChildren(parent, list) {
        const children = []

        for (let i = 0, len = list.length; i < len; i++) {
            if (list[i].parentId === parent.id) {
                const item = this.queryChildren(list[i], list)

                children.push(item)
            }
        }

        if (children.length) {
            parent.children = children
        }

        return parent
    },
    toPub(e) {
        let forumId = this.data.postData.forum.id;
        console.log('this.data.postData', this.data.postData)
        app.globalData.forumInfo = {
            forumId,
            name: this.data.postData.forum.name
        }
        wx.switchTab({
            url: '/pages/push/push?forumId=' + forumId,
        });
    },
    refreshComment(e) {
        this.listComments();
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
                this.setData({
                    postData: item
                })
            } else {
                if (item.vote == 1) {
                    item.vote = 0;
                    item.ups -= 1;
                    this.setData({
                        postData: item
                    })
                }
            }
        }
        let res = await req.upvotePost(params);
        if (item.type == 'vote') {
            this.getPostInfo(item, index)
        }
    },
    async collects(e) {
        let checks = this.checkLogin()
        if (!checks) {
            return
        }
        let item = e.currentTarget.dataset.item;
        let res = await req.savePost({
            postId: item.postId
        });
        if (res.success) {
            item.save = !item.save
            this.setData({
                postData: item
            })
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
            this.setData({
                postData: item
            })
        }
        // if (item.vote != -1) {
        //   item.vote = -1;
        //   if (item.vote == 1) {
        //     item.downs += 2;
        //   } else {
        //     item.downs += 1;
        //   }
        //   this.setData({
        //     postData: item
        //   })
        // } else {
        //   if (item.vote == -1) {
        //     item.vote = 0;
        //     item.downs -= 1;
        //     this.setData({
        //       postData: item
        //     })
        //   }
        // }
        let res = await req.downvotePost(params);
        if (item.type == 'vote') {
            this.getPostInfo(item, index)
        }
    },

    async getPostInfo() {
        let res = await req.getPostInfo({
            postId: this.data.postId
        });
        wx.setNavigationBarTitle({
            title: res.data.title,
        })
        let item = res.data;
        let o = app.util.doWidthAndHeight(item.width, item.height, '500px');
        item.rw = o.rw;
        item.rh = o.rh;
        item.rtime = app.util.getDateDiffs(item.gmtCreate);

        this.setData({
            postData: item
        })
    },
    async listComments() {
        let res = await req.listComments({
            postId: this.data.postId,
            pageNum: 1,
            pageSize: 80,
            order: this.data.commentOrder
        });
        res.data.forEach(item => {
            item.rtime = app.util.getDateDiffs(item.gmtCreate);
            if (item.imageNames) {
                item.imageNames = item.imageNames.split(',');
            }

        })
        let data = this.transformTree(res.data);
        console.log('data', data)
        this.setData({
            commentData: data
        })
    },
    bindInputs(e) {
        this.setData({
            commentVal: e.detail.value
        })
    },
    checkLogin() {
        let that = this
        if (!this.data.isLogin) {
            wx.showModal({
                title: '提示',
                content: '需要登录才能使用哦~，是否去登录？',
                confirmText: '去登录',
                success(res) {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: '/pages/login/login?from=/pages/detail/detail&postId=' + that.data.postId,
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
            return false
        } else {
            return true
        }
    },
    toDetail() {
        this.setData({
            replays: {}
        })
    },
    async toSend() {
        console.log(this.data.commentVal)
        let obj = {
            parentId: this.data.replays.id ? this.data.replays.id : '',
            comment: this.data.commentVal,
            postId: this.data.postId
        }
        if (this.data.imageNames) {
            obj.imageNames = this.data.imageNames;
        }
        let checks = this.checkLogin()
        if (!checks) {
            return
        }
        if (!obj.comment || obj.comment.replace(/\s+/g, "") == '') {
            wx.showToast({
                icon: 'none',
                title: '请输入评论内容',
            })
            return
        }
        // debugger
        let res = await req.addComments(obj);
        if (res.success) {
            wx.showToast({
                icon: 'none',
                title: '评论成功',
            })
            this.setData({
                commentVal: '',
                imageNames: ''
            })
            this.listComments()
        } else {
            wx.showToast({
                icon: 'none',
                title: res.errorMessage,
            })
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getProfile();
        this.setData({
            postId: options.postId,
            isLogin: app.globalData.isLogin,
            isPhoneX: app.globalData.isPhoneX
        })
        this.getPostInfo()

        let order = wx.getStorageSync('commentListOrder');
        if (order) {
            this.setData({
                commentOrder: order
            });
        }
        this.listComments()
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        let imageUrl;
        if (this.data.postData.type == 'link') {
            imageUrl = this.data.postData.cover
        } else {
            imageUrl = this.data.postData.imageName
        }
        return {
            title: '【' + this.data.postData.forum.name + '】' + this.data.postData.title,
            imageUrl: `${(imageUrl && !imageUrl.includes('.mp4')) ? (this.data.imgOrigin + imageUrl):''}`,
            path: `/pages/detail/detail?postId=${this.data.postId}`
        }
    },
    onShareTimeline(res) {
        return {
            title: this.data.postData.title,
            imageUrl: `${(imageUrl && !imageUrl.includes('.mp4')) ? (this.data.imgOrigin + imageUrl):'/assets/images/banner/b1.jpg'}`
        }
    },

    async toMore(e) {
        let _this = this;
        wx.showActionSheet({
            itemList: ['设置标签', '删除'],
            async success(res) {
                if (res.tapIndex == 0) {
                    // 版块标签列表
                    await _this.getForumTagList();

                    // 选中已有标签
                    if (_this.data.postData && _this.data.postData.tags && _this.data.postData.tags.length && _this.data.postData.tags[0]) {
                        _this.setData({
                            forumTagSelectedId: _this.data.postData.tags[0].id
                        })
                    } else {
                        _this.setData({
                            forumTagSelectedId: 0
                        })
                    }

                    //
                    _this.setData({
                        showSetTagPopup: true
                    })
                } else if (res.tapIndex == 1) {
                    _this.deletePost()
                }
            }
        })
    },

    async getForumTagList() {
        let res = await req.getForumTagList({
            forumId: this.data.postData.forumId
        });
        this.setData({
            forumTagList: res.data
        })
    },

    forumTagSelectedChange(e) {
        let tagid = e.target.dataset.tagid;
        this.setData({
            forumTagSelectedId: (this.data.forumTagSelectedId === tagid) ? 0 : tagid
        });
    },

    async exitPopupAndSetTag() {
        // 隐藏popup
        this.setData({
            showSetTagPopup: false
        })

        //
        let tagId = this.data.forumTagSelectedId;
        if (tagId) {
            // addTag
            let res = await req.postAddTag({
                postId: this.data.postId,
                tagId: tagId
            });
            if (res.success) {
                this.data.postData.tags = [res.data]
                this.setData({
                    postData: this.data.postData
                })
            }
        } else {
            // removeTag
            if (this.data.postData && this.data.postData.tags && this.data.postData.tags.length && this.data.postData.tags[0]) {
                tagId = this.data.postData.tags[0].id
                let res = await req.postRemoveTag({
                    postId: this.data.postId,
                    tagId: tagId
                });
                if (res.success) {
                    this.data.postData.tags = []
                    this.setData({
                        postData: this.data.postData
                    })
                }
            }
        }
    },

    async deletePost() {
        let res = await req.deletePost({
            postId: this.data.postId
        });
        if (res.success) {
            wx.showToast({
                icon: 'none',
                title: '删除成功',
            })
            setTimeout(() => {
                wx.navigateBack()
            }, 1500)
        }
    },

})