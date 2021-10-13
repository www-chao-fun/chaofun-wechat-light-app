// 延时器控制
let timeOut = null;
// 支付状态
const PayType = (_type, _price, _trade_type, _sn, _is_activity) => {
  wx.showToast({
    title: _type ? "支付成功" : "支付失败",
    icon: "none"
  });
  clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    clearTimeout(timeOut);
    if (_is_activity) {
      _sn += `&is_activity=${_is_activity}`;
    }
    wx.redirectTo({
      url: `/subpackage/pages/paySuccess/paySuccess?code=${_type}&price=${_price}&trade_type=${_trade_type}&sn=${_sn}`
    });
  }, 2000);
};
// 支付
const Pay = (sn, price, req, orderType = "order", is_activity = null) => {
  let openid = wx.getStorageSync("openId");

  let params = {
    payment_plugin_id: "weixinPayPlugin",
    pay_mode: "normal",
    client_type: "XCX",
    split_pay: 0,
    sn: sn,
    openid: openid
  };
  // trade
  req.payConfirm(orderType, sn, params).then(res => {
    let obj = {
      nonceStr: "",
      package: "",
      paySign: "",
      signType: "",
      timeStamp: ""
    };

    res.form_items.forEach(_o => {
      obj[_o.item_name] = _o.item_value;
    });

    wx.requestPayment({
      timeStamp: obj.timeStamp,
      nonceStr: obj.nonceStr,
      package: obj.package,
      signType: obj.signType,
      paySign: obj.paySign,
      success(res) {
        console.log(res, "支付成功");
        PayType(1, price, orderType, sn, is_activity);
      },
      fail(res) {
        console.log(res, "支付失败");
        PayType(0, price);
      }
    });
  });
};
// 提示码
const tipsCode = (code, msg) => {

  let codeTxt = {
    "301": "您不是新用户，无法领取。",
    "302": ["您不是老用户，无法领取。", "完成一单消费立即成为老用户"],
    "303": "您不是新用户，无法使用。",
    "304": ["您不是老用户，无法使用。", "完成一单消费立即成为老用户"],
    "305": "您不是本店新用户，无法领取。",
    "306": ["您不是本店老用户，无法领取。", "在本店完成消费立即成为老用户"],
    "307": "您不是本店新用户，无法使用。",
    "308": ["您不是本店老用户，无法使用。", "在本店完成消费立即成为老用户"],
    "309": "该优惠卷需开通贵宾会员",
    "310": "该优惠卷需开通铂金会员",
    "311": "该优惠卷需开通钻石会员"
  };
  if (["302", "304", "306", "308"].includes(code)) {
    wx.showModal({
      title: codeTxt[code][0],
      content: codeTxt[code][1],
      confirmText: "我知道了",
      showCancel: false,
      confirmColor: "#F63B75",
      success(res) {}
    });
  } else if (("301", "303", "305", "307").includes(code)) {
    wx.showModal({
      content: codeTxt[code] || msg || "领取用户身份不符",
      confirmText: "我知道了",
      showCancel: false,
      confirmColor: "#F63B75",
      success(res) {}
    });
  } else {
    wx.showToast({
      title: msg,
      icon: "none",
      duration: 2000
    });
  }
};

export { Pay, tipsCode };
