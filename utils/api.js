const { CONFIG } = require('./config.js');
console.log('全局配置', CONFIG)

// 请求地址
let { host, wxApi, userHost, hostUpload, baseHost, dev } = CONFIG.api;

const api = {
  host,
}

// 地址相关
const indexapi = {
  getHome: `${host}/api/v0/list_combine`,
  getPosts: `${host}/api/v0/list`,
  getListForums: `${host}/api/list_forums`,
  toLogin: `${host}/api/login`,// 登录
  register: `${host}/api/register`,// 注册
  getProfile: `${host}/api/get_profile`,
  getListPosts: `${host}/api/v0/me/list_posts`, // 我发布的
  upvotePost: `${host}/api/upvote_post`,// 点赞
  downvotePost: `${host}/api/downvote_post`,// 踩
  getPostInfo: `${host}/api/get_post_info`,
  listComments: `${host}/api/v0/list_comments`,// 评论列表
  addComments: `${host}/api/comment`,// 添加评论
  listTags: `${host}/api/v0/forum_tag/list_tags`,// 板块分类
  listForumsByTag: `${host}/api/list_forums_by_tag`,
  getForumInfo: `${host}/api/get_forum_info`,// 板块信息
  joinForum: `${host}/api/join_forum`,// 加入板块
  leaveForum: `${host}/api/leave_forum`,// 退出板块
  search: `${host}/api/search`,// 搜索
  listSaved: `${host}/api/v0/me/list_saved`,// 我收藏的
  listUpvotes: `${host}/api/v0/me/list_upvotes`,// 我点赞的
  searchForum: `${host}/api/search_forum`, // 板块搜索
  submitImage: `${host}/api/submit_image`,// 发布图片帖子
  submitArticle: `${host}/api/v0/submit_article`,// 发布文本帖子
  submitLink: `${host}/api/submit_link`,// 发布链接帖子
  deletePost: `${host}/api/delete_post`, // 删除帖子
  savePost: `${host}/api/v0/save_post`,// 收藏帖子
  getMenu: `${host}/api/get_menu`,
  // 这里去掉相关内容，方便内容审核
  getWxToken: `${wxApi}/cgi-bin/token`,
  wxMsgSecCheck: `${wxApi}/wxa/msg_sec_check`,
  wxMediaCheckAsync: `${wxApi}/wxa/media_check_async`,
  messageCheck: `${host}/api/v0/message/check`,//检测是否有新消息
  messageList: `${host}/api/v0/message/list`,// 消息列表
  setIcon: `${host}/api/v0/user/set_Icon`,// 设置头像
  userListPosts: `${host}/api/v0/user/list_posts`,// 获取用户发布的
  setDesc:`${host}/api/v0/user/set_desc`, // 设置个性签名
  userinfo: `${host}/api/v0/user/info`, // 获取用户信息
  toFocus: `${host}/api/v0/focus/focus`, // 关注用户
  toUnfocus: `${host}/api/v0/focus/unfocus`, // 取消关注
  getUserUpvotes: `${host}/api/v0/user/list_upvotes`, // 获取用户点赞的帖子
  listFocus: `${host}/api/v0/focus/list_focus`, // 用户关注的人
  listFans: `${host}/api/v0/focus/list_fans`, // 用户的粉丝
  listTrends: `${host}/api/v0/focus/list_trends`,//列出关注人的帖子
  getYear2020: `${host}/api/v0/getYear2020`,//年终总结

  toVote: `${host}/api/v0/post/vote`,
  toCircusee: `${host}/api/v0/post/circusee`,
  submitVote: `${host}/api/v0/submit_vote`,
  weChatLightAppPhoneLogin: `${host}/api/v0/account/weChatLightAppPhoneLogin`,
  weChatLightAppRegister: `${host}/api/v0/account/weChatLightAppRegister`,
  
}

const ARRAY = [indexapi];
const API = Object.freeze(Object.assign(api, ...ARRAY))

// 自检模块--变量重名检查
if (CONFIG.checkApiName) {
  const TEST_MSG = msg =>
    wx.showModal({
      title: '警告',
      content: `变量名：${msg} 已存在，请勿重复命名`,
      showCancel: false
    });
  const TEST_API = new Set();
  ARRAY.forEach(o => {
    Object.entries(o).forEach(i => (i => {
      TEST_API.has(i) ? TEST_MSG(i) : TEST_API.add(i)
    })((i => i[0])(i)))
  })
}

export default API