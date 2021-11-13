// component/orders/orders.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    params: {
      type: Object,
      value: {}
    }
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      console.log(wx.getStorageSync('order'),'--------------')
      let order = wx.getStorageSync('order')||'new';
      let range = wx.getStorageSync('range')||{
        label: '一天',
        value: '1day'
      };
      this.setData({
        'order': order,
        'range': range
      })
      
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    order: 'new',
    range: {
      label: '一天',
      value: '1day'
    },
    orders: [
      {
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
    ranges: [
      {
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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkoutRange(e){
      let item = e.currentTarget.dataset.item;
      if(item.value!='ups'){
        
        console.log(item)
        this.setData({
          'order': item.value
        })
        wx.setStorageSync('order', item.value)
        this.triggerEvent('checkoutRange',{order: item.value})
      }
      
    },
    bindRangeChange(e) {
      console.log(e)
      let item = this.data.ranges[e.detail.value]
        this.setData({
          'range': item,
          'order': 'ups'
        })
        
        wx.setStorageSync('order', 'ups')
        wx.setStorageSync('range', item)
        this.triggerEvent('checkoutRange',{order: 'ups',range: item.value})
    },
  }
})
