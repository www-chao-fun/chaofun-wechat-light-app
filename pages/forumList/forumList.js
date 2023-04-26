// pages/forumList/forumList.js
const app = getApp();
const {
    req
} = app;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLogin: true,
        orderIndex: 1,
        rangeIndex: 1,
        options: {},
        params: {
            marker: '',
            key: '',
            range: '1day',
            pageSize: 20,
            order: 'hot',
            forumId: 3
        },
        datas: [],
        forumInfo: {},
        imgOrigin: app.globalData.imgOrigin,
        orders: [{
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
        ranges: [{
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
        showTop: false,
        nsorts: '最热',
        range: '一天',
        onlyNew: false,
    },
    checkoutRange(e) {
        console.log(e)
        let params = e.detail;
        this.setData({
            datas: [],
            'params.marker': '',
            'params.key': '',
            'params.order': params.order,
            'params.range': params.range || '',
            onlyNew: params.onlyNew,
        })
        this.getPosts()
    },
    toPub(e) {
        let forumId = e.currentTarget.dataset.id;
        app.globalData.forumInfo = {
            forumId,
            name: this.data.forumInfo.name
        }
        wx.switchTab({
            url: '/pages/push/push?forumId=' + forumId,
        });

    },
    async getForumInfo() {
        let res = await req.getForumInfo({
            forumId: this.data.options.forumId
        });
        if (res.success) {
            this.setData({
                forumInfo: res.data
            })
            wx.setNavigationBarTitle({
                title: res.data.name,
            })
        }
    },
    async getPosts(v) {
        let params = this.data.params;
        params.onlyNew = this.data.onlyNew;
        let res = await req.getPosts(params);

        let datas = res.data.posts;
        datas.forEach(item => {
            let o = app.util.doWidthAndHeight(item.width, item.height);
            item.rw = o.rw;
            item.rh = o.rh;
            item.rtime = app.util.getDateDiffs(item.gmtCreate);
        })
        let n;
        if (v == 'refresh') {
            wx.stopPullDownRefresh()
            n = datas
        } else {
            n = this.data.datas.concat(datas)
        }

        this.setData({
            datas: n,
            'params.marker': res.data.marker,
            'params.key': res.data.key ? res.data.key : '',
        })
    },
    async joinForum() {

        let res = await req.joinForum({
            forumId: this.data.options.forumId
        });
        if (res.success) {
            this.setData({
                'forumInfo.joined': true
            })
        } else {
            wx.navigateTo({
                url: '/pages/login/login',
            })
        }

    },
    async leaveForum() {
        let res = await req.leaveForum({
            forumId: this.data.options.forumId
        });
        if (res.success) {
            this.setData({
                'forumInfo.joined': false
            })
        }
    },
    bindOrderChange(e) {
        if (this.data.orders[e.detail.value].value != this.data.params.order) {
            this.setData({
                datas: [],
                'params.marker': '',
                'params.key': '',
                'params.order': this.data.orders[e.detail.value].value
            })
            this.setData({
                nsorts: this.data.orders[e.detail.value].label
            })
            this.getPosts()
        }

    },
    bindRangeChange(e) {
        if (this.data.ranges[e.detail.value].value != this.data.params.range) {
            let v = this.data.ranges[e.detail.value].value
            this.setData({
                datas: [],
                'params.marker': '',
                'params.key': '',
                'params.range': v,
            })
            this.setData({
                range: this.data.ranges[e.detail.value].label
            })
            this.getPosts()
        }
    },

    inits(options) {

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {


        if (wx.getStorageSync('cookie')) {
            this.setData({
                isLogin: true
            })
        } else {
            this.setData({
                isLogin: false
            })
        }
        let order = wx.getStorageSync('order');
        let range = wx.getStorageSync('range');
        let params = {
            order,
            range
        }
        this.setData({
            options: options,
            'params.forumId': options.forumId,
            'params.order': params.order,
            'params.range': params.range.value,
            'homeParams.order': params.order,
            'homeParams.range': params.range.value,
        })
        this.getForumInfo()
        this.getPosts()
    },

    onPageScroll: function (e) {
        if (e.scrollTop > 600) {
            this.setData({
                showTop: true
            })
        } else {
            this.setData({
                showTop: false
            })
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
        this.setData({
            // datas: [],
            forumInfo: {},
            params: {
                marker: '',
                key: '',
                pageSize: 20,
                forumId: this.data.options.forumId
            }
        })
        this.getForumInfo()
        this.getPosts('refresh')
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        this.getPosts()
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
                title: '【' + item.forum.name + '】' + item.title,
                imageUrl: `${(imageUrl && !imageUrl.includes('.mp4')) ? (this.data.imgOrigin + imageUrl) : ''}`,
                path: `/pages/detail/detail?postId=${item.postId}`
            }
        }
    }
})