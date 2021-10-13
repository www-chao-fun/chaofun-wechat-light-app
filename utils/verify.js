/* eslint-disable */

// 验证纯数字
export function verifyNumber (str) {
  const reg = /^[0-9]*$/
  return reg.test(str)
}

// 验证手机号码
export function verifyMobile (str) {
  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  return reg.test(str)
}

// 验证身份证号码
export function verifyIdNumber (str) {
  const reg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/
  return reg.test(str)
}

// 验证邮箱
export function verifyEmail (str) {
  const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  return reg.test(str)
}

// 验证金额
export function verifyMoney (str) {
  const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  return reg.test(str)
}

// 验证是否带有特殊符号
export function verifySymbol (str) {
  const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im
  const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
  return (regEn.test(str) || regCn.test(str))
}

export function excludeSpecial(s) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]")
  var rs = "";
  for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, '');
  }
  return rs;
}

// 验证微信授权码
export function verifyWxCode (str) {
  const reg = /^1[0|1|2|3|4|5]\d{16}$/
  return reg.test(str)
}

// 验证支付宝授权码
export function verifyAliCode (str) {
  const reg = /^(25|26|27|28|29|30)\d{14,22}$/
  return reg.test(str)
}
