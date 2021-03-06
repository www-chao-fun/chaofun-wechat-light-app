import api from "./api.js";
import { wechat, getString } from "./util.js";
const { CONFIG } = require("./config.js");
// const regeneratorRuntime = require("./runtime");

const http = {
  async request(url, data, method = "POST", _header = {}, reqArg = {}) {
    let [that, header] = [this, { ...this.header, ..._header }];
    header.cookie = wx.getStorageSync('cookie');
    header['fun-device'] = 'light-app';
    header['Content-Type'] = header['Content-Type']||'application/x-www-form-urlencoded'
    try {
      header.Authorization = (await wechat.api("getStorage", {
        key: "accessToken"
      })).data;
    } catch (e) { }

    return new Promise(async (resolve, reject) => {
      if (header.storage) {
        try {
          const { data } = await wechat.api("getStorage", {
            key: header.storage
          });
          resolve(data);
          return;
        } catch (e) { }
      }
      try {
        console.log('reqArg',reqArg)
        const arg = await this.Debounce({ url, data, method, header, ...reqArg });
        wechat.api("showNavigationBarLoading");
        try {
          console.log('arg',arg)
          const { data, statusCode,header } = await wechat.api("request", { ...arg });
          if (statusCode === 200) {
            let cookie = wx.getStorageSync('cookie')?wx.getStorageSync('cookie'):'';
            // if(cookie&&cookie.includes('fun_ticket')){
              if(header['Set-Cookie']){
                let a = header['Set-Cookie'];
                var b,c;
                if(a.includes('SESSION')){
                  var b = a.split(';');
                  var c = b[0];
                  cookie = cookie.split(';');
                  cookie = cookie[0] + ';' + c;
                }
                wx.setStorageSync('cookie', cookie)
              }else if(header['set-cookie']){
                let a = header['set-cookie'];
                var b,c;
                if(a.includes('SESSION')){
                  var b = a.split(';');
                  var c = b[0];
                  cookie = cookie.split(';');
                  cookie = cookie[0] + ';' + c;
                }
                wx.setStorageSync('cookie', cookie)
              }
            // }
            
            // console.log('-------',header['Set-Cookie'])
            if (header.storage)
              wechat.api("setStorage", { key: header.storage, data });
            // console.log('000000000000', header['Set-Cookie'])
            // wx.setStorageSync('cookie', header['Set-Cookie'])
            resolve(data);
          } else if (data.code) {
            /**???????????????code */
            if (
              [
                "203",
                "301",
                "302",
                "303",
                "304",
                "305",
                "306",
                "307",
                "308",
                "309",
                "310",
                "311"
              ].includes(data.code)
            ) {
              resolve(data);
            } else {
              reject(data);
            }
          } else reject(data);
        } catch (error) {
          reject(error);
        } finally {
          wechat.api("hideNavigationBarLoading");
          await that._STime(that._TimeOut, 1500);
          wx.hideLoading();
        }
      } catch (e) {
        throw new Error(e);
      }
    }).catch(res => {
      console.log("catch", res);
      // ????????????????????????
      if (res.errMsg) {
        // ??????
        if (res.errMsg.includes('timeout')) {
          wx.showToast({
            title: "???????????????",
            icon: "none"
          });
          return;
        }
      }
      if (res.code == "001" && that.loginModal) {
        that.LogonFailure(res);
      } else if ((res.code == "301" || res.code == "463") && that.msgModal) {
        that.msgModal = false;
        wx.showModal({
          title: "??????",
          content: res.message,
          showCancel: false,
          confirmColor: "#f2753f",
          confirmText: "??????",
          success() {
            that.msgModal = true;
            wx.navigateBack({ delta: 1 });
          }
        });
      } else if (CONFIG.tips && that.loginModal) {
        if (CONFIG.tipsType === "modal") {
          wx.showModal({
            title: "??????",
            content: res.message || "??????????????????????????????????????????",
            showCancel: false,
            confirmColor: "#f2753f"
          });
        } else if (CONFIG.tipsType === "toast") {
          wx.showToast({
            title: res.message || "??????????????????????????????????????????",
            icon: "none"
          });
        }
      }
    });
  },
  /** ???????????? */
  async LogonFailure(res) {
    if (!this.loginModal) return;
    const url = "/pages/login/login";
    this.loginModal = false;
    wx.showToast({
      title: res.message || "??????????????????????????????",
      icon: "none",
      duration: 2000,
      mask: true
    });
    await Promise.all([
      wechat.api("clearStorage"),
      this._STime(this._TimeOutToLogin, 1800)
    ]);
    this.loginModal = true;
    wechat.api("navigateTo", { url });
  },

  /**
   * ????????????
   * @param { String | Array } fileUrl
   * @param {*} pathName
   */
  upload(fileUrl, pathName) {
    wx.showLoading({
      title: "?????????",
      mask: true
    });
    let TYPE = Object.prototype.toString
      .call(fileUrl)
      .match(/\[object (.*?)\]/)[1];
    if (TYPE === "String") fileUrl = [fileUrl];
    let _IDX = fileUrl.length;
    // ?????????????????????
    let FAIL = 0;
    // ?????????????????????
    let SUCCESS = 0;
    // ????????????
    let _FILE = [];
    return new Promise((resolve, reject) => {
      fileUrl.forEach((imageUrl, idx) => {
        wx.uploadFile({
          url: api.upLoad,
          name: "file",
          filePath: imageUrl,
          formData: {
            path: pathName
          },
          header: {
            "Content-Type": "multipart/form-data",
            Authorization: wx.getStorageSync("accessToken")
          },
          success(res) {
            SUCCESS++;
            _FILE.splice(idx, 0, JSON.parse(res.data));
          },
          fail(error) {
            FAIL++;
            if (FAIL == fileUrl.length) reject(error);
          },
          complete() {
            wx.hideLoading();
            _IDX--;
            if (FAIL != 0 && _IDX == 0) {
              wx.showModal({
                title: "??????",
                content:
                  fileUrl.length == 1
                    ? "??????????????????"
                    : `??????${FAIL}???????????????????????????????????????`,
                showCancel: false
              });
            }
            if (_IDX == 0)
              TYPE === "String" ? resolve(_FILE[0]) : resolve(_FILE);
          }
        });
      });
    });
  },

  /**
   * GET??????
   * @param {String} url
   * @param {Object} data
   * @param {String} storage
   */
  async get(url, data, storage = "", reqArg = {}) {
    let header = { storage: storage };
    return this.request(url, data, "GET", header, reqArg);
  },

  // POST??????
  post(url, data,reqArg = {}) {
    return this.request(url, data, "POST",{},reqArg);
  },
  

  /**
   * POST?????? - ??????JSON??????
   * @param {String} url ????????????
   * @param {Object} data ???????????????
   * @param {Boolean} type ???true????????????????????????url??????
   */
  async postJson(url, data, type) {
    if (type) url += await this.Url_Addition(data);
    let header = { "content-type": "application/json" };
    return this.request(url, data, "POST", header);
  },

  put(url, data, header = {}) {
    return this.request(url, data, "PUT", header);
  },

  delete(url, data, header = {}) {
    return this.request(url, data, "DELETE", header);
  },

  /**
   * ??????????????????
   * @param  {Object} _Array ???????????????????????????url,header...?????????
   */
  Debounce(_Arg) {
    if (!_Arg.timeout) _Arg.timeout = this.timeout;
    return new Promise((resolve, reject) => {
      this.header.Authorization = wx.getStorageSync("accessToken");
      let _A_String = JSON.stringify(_Arg);
      let _T = new Date().getTime();
      if (
        this._Map.has(_A_String) &&
        _T - this._Map.get(_A_String) < CONFIG.debounceTime
      ) {
        reject(`??????????????????: ${_Arg.url}`);
      } else {
        this._Map.set(_A_String, _T);
        resolve(_Arg);
      }
    });
  },

  Url_Addition(_arg) {
    return new Promise((resolve, reject) => {
      const jsonD =
        String.fromCharCode(63) +
        Object.keys(_arg)
          .map(o => `${o}=${_arg[o]}`)
          .join(String.fromCharCode(38));
      resolve(jsonD);
    });
  },

  _STime(_d, _t = 1500) {
    return new Promise((resolve, reject) => {
      clearTimeout(_d);
      _d = setTimeout(() => {
        clearTimeout(_d);
        resolve();
      }, _t);
    });
  },

  // ????????????
  header: {
    Authorization: CONFIG.test_token || wx.getStorageSync("accessToken"),
    app: "wechat-app",
    // "content-type": "application/x-www-form-urlencoded",
    channel: "XCX",
    version: "2.2.12"
  },
  // ??????
  timeout: 5000,
  // ????????????
  ...{
    loginModal: true,
    msgModal: true,
    _TimeOut: null,
    _TimeOutToLogin: null
  },
  _Map: new Map()
};

export default http;
