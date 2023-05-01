// pages/forumMore/forumMore.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        forumId: '',
        forumName: '',
        activeTab: 'rule',
    },

    onTabTap(e) {
        this.setData({
            activeTab: e.currentTarget.dataset.tab
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let params = {
            forumId: options.forumId
        }
        if (options.forumName) {
            params.forumName = options.forumName;
            wx.setNavigationBarTitle({
                title: options.forumName + ' - 更多',
            })
        }
        this.setData(params);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})