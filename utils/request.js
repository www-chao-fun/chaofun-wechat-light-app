import api from "./api.js";
import http from "./http.js";
const regeneratorRuntime = require("./runtime");
const { wechat: wxChat } = require("./util.js");
import { serialize } from "./qs.js";

const Request = {
  checkWallet: params => {
    return http.get(api.checkWallet, params);
  }
};
// 地址相关
const indexapi = {
  getHome: params => {
    return http.get(api.getHome, params);
  },
  getPosts: params => {
    return http.get(api.getPosts, params);
  }, 
  getListForums: params => {
    return http.get(api.getListForums, params);
  },
  toLogin: params => {
    return http.get(api.toLogin, params);
  },
  register: params => {
    return http.get(api.register, params);
  },
  getProfile: params => {
    return http.get(api.getProfile, params);
  },
  getListPosts: params => {
    return http.get(api.getListPosts, params);
  },
  upvotePost: params => {
    return http.get(api.upvotePost, params);
  },
  downvotePost: params => {
    return http.get(api.downvotePost, params);
  },
  getPostInfo: params => {
    return http.get(api.getPostInfo, params);
  },
  listComments: params => {
    return http.get(api.listComments, params);
  },
  addComments: params => {
    return http.get(api.addComments, params);
  },
  deleteComment: params => {
    return http.get(api.deleteComment, params);
  },
  highlightComment: params => {
    return http.get(api.highlightComment, params);
  },
  unHighlightComment: params => {
    return http.get(api.unHighlightComment, params);
  },
  listRules: params => {
    return http.get(api.listRules, params);
  },
  listTags: params => {
    return http.get(api.listTags, params);
  },
  listForumsByTag: params => {
    return http.get(api.listForumsByTag, params);
  },
  getForumInfo: params => {
    return http.get(api.getForumInfo, params);
  },
  joinForum: params => {
    return http.get(api.joinForum, params);
  },
  leaveForum: params => {
    return http.get(api.leaveForum, params);
  },
  search: params => {
    return http.get(api.search, params);
  },
  listSaved: params => {
    return http.get(api.listSaved, params);
  },
  listUpvotes: params => {
    return http.get(api.listUpvotes, params);
  },
  searchForum: params => {
    return http.get(api.searchForum, params);
  },
  submitImage: params => {
    return http.get(api.submitImage, params);
  },
  submitArticle: params => {
    return http.request(api.submitArticle, params,'post',{'Content-Type': 'application/x-www-form-urlencoded'});
  },
  submitLink: params => {
    return http.get(api.submitLink, params);
  },
  deletePost: params => {
    return http.get(api.deletePost, params);
  },
  savePost: params => {
    return http.get(api.savePost, params);
  },
  getMenu: params => {
    return http.get(api.getMenu, params);
  },
  messageCheck: params => {
    return http.get(api.messageCheck, params);
  },
  messageList: params => {
    return http.get(api.messageList, params);
  },
  setIcon: params => {
    return http.get(api.setIcon, params);
  },
  userListPosts: params => {
    return http.get(api.userListPosts, params);
  },
  setDesc: params => {
    return http.get(api.setDesc, params);
  },
  userinfo: params => {
    return http.get(api.userinfo, params);
  },
  toFocus: params => {
    return http.get(api.toFocus, params);
  },
  toUnfocus: params => {
    return http.get(api.toUnfocus, params);
  },
  getUserUpvotes: params => {
    return http.get(api.getUserUpvotes, params);
  },
  listFocus: params => {
    return http.get(api.listFocus, params);
  },
  listFans: params => {
    return http.get(api.listFans, params);
  },
  listTrends: params => {
    return http.get(api.listTrends, params);
  },
  getYear2020: params => {
    return http.get(api.getYear2020, params);
  },
  toVote: params => {
    return http.get(api.toVote, params);
  },
  toCircusee: params => {
    return http.get(api.toCircusee, params);
  },
  submitVote: params => {
    return http.post(api.submitVote, params);
  },
  getForumTagList: params => {
    return http.get(api.getForumTagList, params);
  },
  weChatLightAppPhoneLogin: params => {
    // return http.post(api.weChatLightAppPhoneLogin+'?'+json2Form(params), {},
    // {});
    // return http.post(api.weChatLightAppPhoneLogin, params,
    // {'Content-Type':'multipart/form-data'});
    return http.request(api.weChatLightAppPhoneLogin, params,'post',{'Content-Type': 'application/x-www-form-urlencoded'});
    // return http.request(api.weChatLightAppPhoneLogin, params,'post',{},{});
  },
  weChatLightAppRegister: params => {
    // return http.request(api.weChatLightAppRegister, {},'post',{},{params: params});
    // return http.post(api.weChatLightAppRegister+'?'+json2Form(params), {});//`?userName=${params.userName}&password=${params.password}`
    // return http.post(api.weChatLightAppRegister, params,
    //   {'Content-Type':'multipart/form-data'});
    return http.request(api.weChatLightAppRegister, params,'post',{'Content-Type': 'application/x-www-form-urlencoded'});
  },
  
};
function json2Form(json) { 
  var str = []; 
  for(var p in json){ 
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p])); 
  } 
  return str.join("&"); 
}
const wxapi = {
  getWxToken: params => {
    return http.get(api.getWxToken, params);
  },
  wxMsgSecCheck: (token,params) => {
    console.log(params)
    return http.request(api.wxMsgSecCheck + '?access_token='+token, params, 'POST', {'Content-Type': 'application/json'})
    // return http.post(api.wxMsgSecCheck +'?access_token='+'token', params);
  },
  wxMediaCheckAsync: (token,params) => {
    console.log(params)
    return http.request(api.wxMediaCheckAsync + '?access_token='+token, params, 'POST', {'Content-Type': 'multipart/form-data'})
    // return http.post(api.wxMsgSecCheck +'?access_token='+'token', params);
  },
}

const request = Object.assign(
  indexapi, wxapi
);

module.exports = request;
