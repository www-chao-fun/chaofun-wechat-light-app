// component/treeItem/treeItem.js
const app = getApp();
const {
    req
} = app;
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        node: {
            type: Array,
            value() {
                return []
            }
        },
    },
    lifetimes: {
        ready() {
            this.data.node.forEach(item => {
                if (item.imageNames && typeof item.imageNames == 'string') {
                    item.imageNames = item.imageNames.split(',');
                }
            })
            this.setData({
                'node': this.data.node
            })

        },
        attached: function () {
            // 在组件实例进入页面节点树时执行

        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        imgOrigin: app.globalData.imgOrigin,
        replays: {}
    },

    /**
     * 组件的方法列表
     */
    methods: {

        toUser(e) {
            let info = e.currentTarget.dataset.info;
            wx.navigateTo({
                url: '/pages/user/userHome?userId=' + info.userId,
            })
        },
        showImg(e) {
            let item = e.currentTarget.dataset.item;
            let arr = [];

            if (item.imageNames.length) {
                // var t = item.imageNames.split(',')
                item.imageNames.forEach(it => {
                    arr.push(this.data.imgOrigin + it)
                })

            }
            wx.previewImage({
                current: `${this.data.imgOrigin + item.imageNames[0]}`, // 当前显示图片的http链接
                urls: arr // 需要预览的图片http链接列表
            })
        },
        sendMsg(item) {
            this.triggerEvent('sendMsg', item.detail);
        },
        toReplay(e) {
            // this.setData({
            //   replays: e.currentTarget.dataset.item
            // })
            let item = e.currentTarget.dataset.item;
            this.triggerEvent('sendMsg', item);
        },
    }
})