// component/forumMore/forumMoreMod.js
const app = getApp();
const {
    req
} = app;
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        forumId: '',
    },

    /**
     * 组件的初始数据
     */
    data: {
        dataList: [],
        userId: '',
    },

    lifetimes: {
        ready: function () {

            //
            this.setData({
                userId: wx.getStorageSync('userId')
            });

            //
            req.listMod({
                forumId: this.properties.forumId
            }).then(res => {
                if (res.success) {
                    this.setData({
                        dataList: res.data
                    })
                }
            });
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})