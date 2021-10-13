/** pro 正式环境； dev 测试环境； deb 调试环境（调试环境需自定义）*/
// const env = 'pro';
const env = 'dev';
// const env = 'deb';

// api
const api = {
  pro: {
    host: 'https://chao.fun', // 开发服务
    wxApi: 'https://api.weixin.qq.com',
    dev: '',
  },
  dev: {
    host: 'https://chao.fun', // 开发服务
    wxApi: 'https://api.weixin.qq.com',
    dev: '/dev',
  },
  deb: {
    host: 'https://chao.fun', // 开发服务
    wxApi: 'https://api.weixin.qq.com',
    dev: '/dev',
  }
}



// 注意，请求地址需在api.js中修改 
const CONFIG = {
  api: api[env] || api['pro'],
  tips: true, // 是否开启错误提示
  tipsType: 'toast', // modal-弹框 / toast-轻提示
  isConsoleLog: env === 'pro' ? false : true,  // 是否开启consoleLog打印
  checkApiName: env === 'pro' ? false : true, // 检查API是否重名
  debounceTime: 3e1, // 防抖时间控制
  test_token: '',   // 调试用token
  Default_Face: '/img/headimg01.png',  // 默认头像

  discounts: true,  // 优惠券全局开关
};

// 兼容
if (!Object.entries)
  Object.entries = function (obj) {
    if (typeof (obj) !== "object") return [];
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i);
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    return resArray;
  };

export {
  CONFIG
};