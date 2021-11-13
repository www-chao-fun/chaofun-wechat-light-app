// 获取时间格式
export function pickImage(callback,val,size){
  // wx.chooseMedia({
  //   count: 1, // 默认9
  //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //   success: function (res) {
  //   // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //     let imgName = res.tempFiles[0].tempFilePath;
  //     console.log(imgName);
  //     wx.showLoading({
  //       title: '上传中，请稍后',
  //     })
  //   wx.uploadFile({
  //     url: 'https://chao.fun/api/upload_image', //此处换上你的接口地址
  //     filePath: res.tempFiles[0].tempFilePath,
  //     name: 'file',
  //     header: {
  //     "Content-Type": "multipart/form-data",
  //     'accept': 'application/json'
  //     },
  //     formData: {
  //       fileName: imgName
  //     },
  //     success: function (res) {
  //       let data = JSON.parse(res.data)
  //       callback(data)
  //     },
  //     fail: function (res) {
  //       console.log('fail');
  //     },
  //   })
  //   }
  // })


  var v = 'image'?9:1;
  var now = new Date().getTime();
  var real = new Date('2021-11-13 18:30:00').getTime();
  if(now<real){
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFiles);
        wx.showLoading({
          title: '上传中，请稍后',
        })
        if(res.tempFiles[0].tempFilePath.endsWith('.mp4')){
          wx.uploadFile({
            url: 'https://chao.fun/api/upload_image', //此处换上你的接口地址
            filePath: res.tempFiles[0].tempFilePath,
            name: 'file',
            header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json'
            },
            formData: {
              fileName: res.tempFiles[0].tempFilePath
            },
            success: function (res) {
              let data = JSON.parse(res.data)
              // arr.push(data.data);
              callback(data)
              console.log(res,'111')
            },
            fail: function (res) {
              console.log('fail');
            },
          })
        }else{
          res.tempFiles.forEach(item=>{
            let imgName = item.path;
            wx.uploadFile({
              url: 'https://chao.fun/api/upload_image', //此处换上你的接口地址
              filePath: item.path,
              name: 'file',
              header: {
              "Content-Type": "multipart/form-data",
              'accept': 'application/json'
              },
              formData: {
                fileName: imgName
              },
              success: function (res) {
                let data = JSON.parse(res.data)
                // arr.push(data.data);
                callback(data)
                console.log(res,'111')
              },
              fail: function (res) {
                console.log('fail');
              },
            })
          })
        }
        
        
      }
    })
  }else{
    wx.chooseMedia({
      count: v, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFiles);
        wx.showLoading({
          title: '上传中，请稍后',
        })
        if(res.tempFiles[0].tempFilePath.endsWith('.mp4')){
          wx.uploadFile({
            url: 'https://chao.fun/api/upload_image', //此处换上你的接口地址
            filePath: res.tempFiles[0].tempFilePath,
            name: 'file',
            header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json'
            },
            formData: {
              fileName: res.tempFiles[0].tempFilePath
            },
            success: function (res) {
              let data = JSON.parse(res.data)
              // arr.push(data.data);
              callback(data)
              console.log(res,'111')
            },
            fail: function (res) {
              console.log('fail');
            },
          })
        }else{
          res.tempFiles.forEach(item=>{
            let imgName = item.tempFilePath;
            wx.uploadFile({
              url: 'https://chao.fun/api/upload_image', //此处换上你的接口地址
              filePath: item.tempFilePath,
              name: 'file',
              header: {
              "Content-Type": "multipart/form-data",
              'accept': 'application/json'
              },
              formData: {
                fileName: imgName
              },
              success: function (res) {
                let data = JSON.parse(res.data)
                // arr.push(data.data);
                callback(data)
                console.log(res,'111')
              },
              fail: function (res) {
                console.log('fail');
              },
            })
          })
        }
        
        
      }
    })
  }
  
}

export function uploadImage(callback,size){
  wx.chooseImage({
    count: size, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      console.log(res.tempFiles);
      wx.showLoading({
        title: '上传中，请稍后',
      })
      res.tempFiles.forEach(item=>{
        let imgName = item.path;
        wx.uploadFile({
          url: 'https://chao.fun/api/upload_image', //此处换上你的接口地址
          filePath: item.path,
          name: 'file',
          header: {
          "Content-Type": "multipart/form-data",
          'accept': 'application/json'
          },
          formData: {
            fileName: imgName
          },
          success: function (res) {
            let data = JSON.parse(res.data)
            // arr.push(data.data);
            callback(data)
            console.log(res,'111')
          },
          fail: function (res) {
            console.log('fail');
          },
        })
      })
      
      
    }
  })
}

export function randomRange(min, max, charStr) {
  var returnStr = "",
    range;
  if (typeof min == 'undefined') {
    min = 10;
  }
  if (typeof max == 'string') {
    charStr = max;
  }
  range = ((max && typeof max == 'number') ? Math.round(Math.random() * (max - min)) + min : min);
  charStr = charStr || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < range; i++) {
    var index = Math.round(Math.random() * (charStr.length - 1));
    returnStr += charStr.substring(index, index + 1);
  }
  return returnStr;
}

export function getDateDiffs(dateTime) {
  let dateTimeStamp = new Date(dateTime).getTime();
  let result = '';
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let halfamonth = day * 15;
  let month = day * 30;
  let year = day * 365;
  let now = new Date().getTime();
  let diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return;
  }
  let monthEnd = diffValue / month;
  let weekEnd = diffValue / (7 * day);
  let dayEnd = diffValue / day;
  let hourEnd = diffValue / hour;
  let minEnd = diffValue / minute;
  let yearEnd = diffValue / year;
  if (yearEnd >= 1) {
    result = new Date(dateTime).toLocaleDateString();
  } else if (monthEnd >= 1) {
    result = "" + parseInt(monthEnd) + "月前";
  } else if (weekEnd >= 1) {
    result = "" + parseInt(weekEnd) + "周前";
  } else if (dayEnd >= 1) {
    result = "" + parseInt(dayEnd) + "天前";
  } else if (hourEnd >= 1) {
    result = "" + parseInt(hourEnd) + "小时前";
  } else if (minEnd >= 1) {
    result = "" + parseInt(minEnd) + "分钟前";
  } else {
    result = "刚刚";
  }
  return result;
};

export function doWidthAndHeight(w, h, height='270px'){
  var systemInfo = wx.getSystemInfoSync();
  let rh;
  if (w > h || w == h) {
    rh = parseInt(systemInfo.windowWidth * h / w) + 'px';
    return {
      rw: '100%',
      rh: rh
    }
  } else {
    return {
      rw: '100%',
      rh: height
    }
  }
}


export function formatTime(number, format) {
  var formateArr = ["Y", "M", "D", "h", "m", "s"];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(this.formatNumber(date.getMonth() + 1));
  returnArr.push(this.formatNumber(date.getDate()));

  returnArr.push(this.formatNumber(date.getHours()));
  returnArr.push(this.formatNumber(date.getMinutes()));
  returnArr.push(this.formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

//数据转化
// function formatNumber(n) {
//   n = n.toString();
//   return n[1] ? n : "0" + n;
// }

//时间戳转换时间
export function toData(number) {
  var n = number * 1000;
  var date = new Date(n);
  var Y = date.getFullYear() + "/";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return Y + M + D;
}

export function dateFtt(fmt, date) {
  //author: meizz
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
}

// 秒数获取时间格式
export function formatSecondTime(s) {
  let date = new Date(s * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
}

// 订单时间显示格式
export function getDateDiff(s) {
  // 订单时间
  let date = new Date(s * 1000);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  // 当前时间
  const nowDate = new Date();
  const nowYear = nowDate.getFullYear();
  const nowMonth = nowDate.getMonth() + 1;
  const nowDay = nowDate.getDate();
  // 如果同年同月同日
  if (year === nowYear && month === nowMonth && day === nowDay) {
    return "今天 " + [hour, minute].map(formatNumber).join(":");
  } else {
    return `${year}年${month}月${day}日`;
  }
}

//日期转成时间戳
export function gettime(time) {
  // var date=new Date('2014-04-23 18:55:49:121');
  console.log(time, 90);
  var date = new Date(time);
  // var date = new Date(time.replace(/-/g, '/'));
  var time1 = date.getTime();
  return time1;
}
// 订单排序
export function orderSort(obj1, obj2) {
  let a = obj1.result.result[0].baseInfo.createTime;
  let b = obj2.result.result[0].baseInfo.createTime;
  if (a < b) {
    return 1;
  } else if (a > b) {
    return -1;
  } else {
    return 0;
  }
}

// 1位数前面补0
export function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0" + n;
}

// 获取月份的天数
export function getMonthDate(m) {
  let d = new Date();
  d.setMonth(m + 1);
  d.setDate(1);
  d.setMonth(m);
  d.setDate(0);
  let date = d.getDate() || 0;
  return date;
}

// 获取周数
export function getWeek(date, s) {
  let day = date.getDay();
  let week = ["日", "一", "二", "三", "四", "五", "六"];
  let str = (s || "星期") + week[day];
  return str;
}

// 判断对象是否为空
export function isEmptyObject(obj) {
  for (let key in obj) return false;
  return true;
}

// 提示
export function showToast(title, icon, duration) {
  wx.showToast({
    title: title,
    icon: icon || "loading",
    duration: duration || 60000
  });
}

// 提示错误弹窗
export function showError(title, content) {
  wx.showModal({
    title: title || "提示",
    content,
    showCancel: false
  });
}

// 去掉空格和转换成字符串
export function getString(obj) {
  for (let k in obj) {
    obj[k] = obj[k].toString().trim();
  }
  return obj;
}

export function parseXML(ret) {
  var xmlDoc = null;
  try {
    //Internet Explorer
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async = "false";
    xmlDoc.loadXML(ret);
  } catch (e) {
    try {
      //Firefox, Mozilla, Opera, etc.
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(ret, "text/xml");
    } catch (e) {
      // alert(e.message)
    }
  }
  return xmlDoc;
}

// ----------------

const mandatory = (msg = "必填参数缺失！") => {
  throw new Error(msg);
};

// 提取富文本中的图片地址src
export function getPicSrc(_data) {
  // 获取图片
  let imgReg = /<img.*?(?:>|\/>)/gi;
  // //匹配src属性
  let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/gi;
  let arr = _data.intro.match(imgReg) || [];
  arr = arr.map(item => {
    item = item.match(srcReg);
    return item[0].replace(/src=/i, "").slice(1, -1);
  });
  return arr;
}

// 校验手机号是否合法
const checkPhone = _phone =>
  new RegExp(/0?(13|14|15|16|17|18|19)[0-9]{9}/).test(_phone);

/**
 * @todo 待完善 19-05-18
 * @arg {Object} object  - 监听的对象
 * @arg {String} element - 监听的元素
 * @arg {callback}  callback  - 回调函数
 */
const Listener = (object, element, callback) => {
  // console.log( Object.prototype.toString.call(element).match(/\[object (.*?)\]/)[1] )
  Object.defineProperties(object, {
    [element]: {
      get: function(val) {
        return this.value;
      },
      set: function(val) {
        callback(val);
        this.value = val;
      }
    }
  });
};

// 校验ix适配
const compatibility = () => {
  const app = getApp();
  wx.getSystemInfo({
    success: function(res) {
      let model = res.model;
      app.globalData.compatibility.isIpx = model.search("iPhone X") != -1;
    }
  });
};

const msg = (msg = "请求有误") => {
  wx.showToast({
    title: msg,
    icon: "none",
    duration: 2000
  });
};

const ckg = (current = "", urls = []) => {
  wx.previewImage({ current, urls });
};

const wechat = class Wechat {
  static api(name = mandatory("缺失wx的Api名称字段"), opts = {}) {
    return new Promise((success, fail) => {
      let obj = { ...opts, ...{ success, fail } };
      wx[name](obj);
    });
  }
  /**
   *
   * @param {*} _fn 传入一个方法函数
   * @demo
   * let a = await wechat.pro((res)=>{
   *  操作过程。。。
   *  res('输出结果')
   * })
   */
  static pro(_fn) {
    return new Promise((resolve, reject) => {
      _fn(resolve);
    });
  }
};

const rate = wx.getSystemInfoSync().windowWidth / 750;
const rpx2px = rpx => rate * rpx;

class Csx {
  constructor() {
    this._toString = Object.prototype.toString;
  }
  isObject = obj => {
    return this._toString.call(obj).slice(8, -1) === "Object";
  };
  Err = error => {
    console.error("error: ", error);
  };
  Hint = msg => {
    wx.showToast({
      title: msg,
      icon: "none",
      duration: 2000
    });
  };
}

export { Listener, checkPhone, ckg, compatibility, msg, wechat, rpx2px, Csx };
