export default class LastMayday {
  palette(data,userInfo) {
    var imgOrigin = 'https://i.chao-fan.com/';
    return ({
      width: '750rpx',
      height: '2200rpx',
      background: '#fff',
      views: [
        // _textDecoration('overline', 0),
        // _textDecoration('underline', 1),
        // _textDecoration('line-through', 2),
        // _textDecoration('overline underline line-through', 3, 'red'),
        {// 标题
          id: 'text-id-7',
          type: 'text',
          text: "我的炒饭2020年度总结",
          css: [common,{
            top: `${50 + 0 * gapSize}rpx`,
            // shadow: '10rpx 10rpx 5rpx #888888',
            // fontWeight: 'bold',
            fontSize: '44rpx',
            color: '#333',
            left: `150rpx`
          } ],
        },
        {// 标题
          id: 'text-id1',
          type: 'text',
          text: "旅程的开始",
          css: [common,{
            top: `${startTop + 0 * gapSize}rpx`,
            // shadow: '10rpx 10rpx 5rpx #888888',
            fontWeight: 'bold',
            fontSize: '32rpx',
            color: '#333',
          } ],
        },
        {
          type: 'image',
          url: imgOrigin+userInfo.icon+'?x-oss-process=image/resize,h_100',
          css: {
            width: '100rpx',
            height: '100rpx',
            mode: 'scaleToFill',
            top: `${startTop + 1.5 * gapSize}rpx`,
            left: `${startLeft}rpx`,
            borderRadius: '50rpx',
          },
        },
        {//昵称
          id: 'text-id-2',
          type: 'text',
          text: `${userInfo.userName}`,
          css: [
              common,{
              top: `${startTop + 1.5 * gapSize + gapSize}rpx`,
              // shadow: '10rpx 10rpx 5rpx #888888',
              fontWeight: 'normal',
              left: `${100+40}rpx`,
              fontSize: '32rpx',
            }
          ],
        },
        {
          id: 'text-id-3',
          type: 'text',
          text: `${'注册于'+data.register_time+'，是炒饭第'+data.user_id+'个注册用户，成为炒饭'+data.total_users+'名注册用户中的一员，开启了炒饭旅程!'}`,
          css: [{
            top: `${startTop + 4 * gapSize}rpx`,
            width: '710rpx',
            padding: '10rpx',
            scalable: true,
            deletable: true,
            lineHeight: '40rpx',
          }, common],
        },
        _title(`我在炒饭`,6.3),
        {
          id: 'text-id-5',
          type: 'text',
          text: `${'炒饭陪伴了我'+data.days+'天'}`,
          css: [{
            top: `${startTop + 7.5 * gapSize}rpx`,
            width: '710rpx',
            padding: '10rpx',
            scalable: true,
            deletable: true,
            lineHeight: '40rpx',
          }, common],
        },
        {
          id: 'text-id-6',
          type: 'text',
          text: `${'我在炒饭逛了'+data.minutes+'分钟'}`,
          css: [{
            top: `${startTop + 8.5 * gapSize}rpx`,
            width: '710rpx',
            padding: '10rpx',
            scalable: true,
            deletable: true,
            lineHeight: '40rpx',
          }, common],
        },
        _title(`我的炒饭生活`,9.8),
        // {// 标题
        //   id: 'text-id-7',
        //   type: 'text',
        //   text: "我的炒饭生活",
        //   css: [common,{
        //     top: `${startTop + 9.8 * gapSize}rpx`,
        //     // shadow: '10rpx 10rpx 5rpx #888888',
        //     fontWeight: 'bold',
        //     fontSize: '32rpx',
        //     color: '#333',
        //   } ],
        // },
        _desnew(`这一年里，我浏览了${data.total_shows}个帖子`,11),
        _desnew(`这一年里，我发布了${data.posts}个帖子`,12),

        _desnew(`这一年里，我发表了${data.comments}条评论`,13),
        _desnew(`这一年里，我点赞了${data.total_upvotes}次`,14),
        _desnew(`这一年里，我收藏了${data.total_saves}个帖子`,15),
        _desnew(`这一年里我过得很快乐！`,16),

        _title(`我的收获`,17.3),
        _desnew(`2020年里，我收获了${data.total_ups}个点赞`,18.5),
        // _desnew(`2020年里，我涨了${userInfo.followers}个粉丝`,19.5),
        _desnew(`2020年里，取得全站排名第${data.total_ups_rank}名的好成绩`,19.5),
        _desnew(`在2020年里，我收获了热情`,20.5),

        _title(`我最喜欢的板块`,21.8),
        _desnew(`最喜欢的板块是 ----`,23),
        _imagenew(`${imgOrigin+data.most_like_forum.imageName}?x-oss-process=image/resize,h_100`,56,56,22.8,300),
        _desnew(`${data.most_like_forum.name}`,23.2,370),
        _desnew(`在这里，我浏览了${data.most_like_forum_shows}条  ${data.most_like_forum_upvotes?'点赞了'+data.most_like_forum_upvotes+'次':''} ${data.most_like_forum_comments?'评论了'+data.most_like_forum_comments+'个':''} ${data.most_like_forum_saves?'收藏了'+data.most_like_forum_saves+'个':''}`,24.2),
        _desnew(`在这里，我找到了我的兴趣`,25.2),

        _title(`我最关注的用户`,26.5),
        _desnew(`最关注的用户是 ----`,27.8),
        _imagenew(`${imgOrigin+data.most_like_user.icon}?x-oss-process=image/resize,h_100`,56,56,27.5,300),
        _desnew(`${data.most_like_user.userName}`,27.8,370),
        _desnew(`我浏览了他 ${data.most_like_user_shows||'0'} 条  ${data.most_like_user_upvotes?'点赞了'+data.most_like_user_upvotes+'次':''} ${data.most_like_user_comments?'评论了'+data.most_like_user_comments+'个':''} ${data.most_like_user_saves?'收藏了'+data.most_like_user_saves+'个':''}`,29),
        _desnew(`在这里，我找到了志趣相投的人`,30),

        _title(`谁最关注我？`,31.5),
        _desnew(`最关注我的是 ----`,32.8),
        _imagenew(`${imgOrigin+data.most_be_like_user.icon}?x-oss-process=image/resize,h_100`,56,56,32.5,280),
        _desnew(`${data.most_be_like_user.userName}`,32.8,350),
        _desnew(`他浏览了我 ${data.most_be_like_user_shows||'0'} 条  ${data.most_be_like_user_upvotes?'点赞了'+data.most_be_like_user_upvotes+'次':''} ${data.most_be_like_user_comments?'评论了'+data.most_be_like_user_comments+'个':''} ${data.most_be_like_user_saves?'收藏了'+data.most_be_like_user_saves+'个':''}`,34),
        

        _imagenew(`https://i.chao-fan.com/biz/1a36fc13fa5e65418595d4b09b5c1147.png`,340,340,36,200),
        // _desnew(`快来看看你的炒饭2020年终总结吧`,32.8,350),
        {
          id: 'text-id-5',
          type: 'text',
          text: `快来看看你的炒饭2020年终总结吧`,
          css: [common,{
            top: `${startTop + 44.5 * gapSize}rpx`,
            width: '710rpx',
            padding: '10rpx',
            left: '160rpx',
            scalable: true,
            deletable: true,
            lineHeight: '40rpx',
            color: '#999'
          }],
        },
        
        // {
        //   type: 'text',
        //   text: '我设置了maxLines为1，看看会产生什么效果',
        //   css: [{
        //     top: `${startTop + 6 * gapSize}rpx`,
        //     width: '500rpx',
        //     maxLines: 1,
        //   }, common],
        // },
        // {
        //   type: 'text',
        //   text: '我设置了maxLines为1，看看会产生什么效果',
        //   css: [{
        //     top: `${startTop + 7 * gapSize}rpx`,
        //     width: '500rpx',
        //     maxLines: 1,
        //   }, common],
        // },
        
        // {
        //   id: 'text-id-2',
        //   type: 'text',
        //   text: '我是把width设置为400rpx后，我就换行了xx行了',
        //   css: [{
        //     top: `${startTop + 5 * gapSize}rpx`,
        //     align: 'center',
        //     width: '400rpx',
        //     background: '#538e60',
        //     textAlign: 'center',
        //     padding: '10rpx',
        //     scalable: true,
        //     deletable: true,
        //   }, common, { left: '300rpx' }],
        // },
        
        // _image(0),
        // _des(0, '普通'),
        // _image(1, 30),
        // _des(1, 'rotate: 30'),
        // _image(2, 30, '20rpx'),
        // _des(2, 'borderRadius: 30rpx'),
        // _image(3, 0, '60rpx'),
        // _des(3, '圆形'),
        // {
        //   type: 'image',
        //   url: '/palette/avatar.jpg',
        //   css: {
        //     bottom: '40rpx',
        //     left: '40rpx',
        //     borderRadius: '50rpx',
        //     borderWidth: '10rpx',
        //     borderColor: 'yellow',
        //     width: '100rpx',
        //     height: '100rpx',
        //   },
        // },
        // {
        //   type: 'qrcode',
        //   content: 'https://github.com/Kujiale-Mobile/Painter',
        //   css: {
        //     bottom: '40rpx',
        //     left: '180rpx',
        //     color: 'red',
        //     borderWidth: '10rpx',
        //     borderColor: 'blue',
        //     borderStyle: 'dashed',
        //     width: '120rpx',
        //     height: '120rpx',
        //   },
        // },
        // {
        //   id: 'rect',
        //   type: 'rect',
        //   css: {
        //     scalable: true,
        //     bottom: '40rpx',
        //     right: '40rpx',
        //     color: 'radial-gradient(rgba(0, 0, 0, 0) 5%, #0ff 15%, #f0f 60%)',
        //     borderRadius: '20rpx',
        //     borderWidth: '10rpx',
        //     width: '120rpx',
        //     height: '120rpx',
        //   },
        // },
        // {
        //   type: 'text',
        //   text: 'borderWidth',
        //   css: {
        //     bottom: '40rpx',
        //     right: '200rpx',
        //     color: 'green',
        //     borderWidth: '2rpx',
        //   },
        // },
        // {
        //   type: 'rect',
        //   css: {
        //     width: '100rpx',
        //     height: '100rpx',
        //     color: 'rgba(0,0,0,0.2)',
        //     left: '50%',
        //     top: '50%',
        //     align: 'center',
        //     verticalAlign: 'center',
        //   }
        // }
      ],
    });
  }
}

const startTop = 150;
const startLeft = 30;
const gapSize = 44;
const common = {
  left: `${startLeft}rpx`,
  fontSize: '28rpx',
  color: '#666',
};

function _textDecoration(decoration, index, color) {
  return ({
    type: 'text',
    text: decoration,
    css: [{
      top: `${startTop + index * gapSize}rpx`,
      color: color,
      textDecoration: decoration,
    }, common],
  });
}

function _image(index, rotate, borderRadius) {
  return (
    {
      id: `image-${index}`,
      type: 'image',
      url: '/palette/avatar.jpg',
      css: {
        top: `${startTop + 8.5 * gapSize}rpx`,
        left: `${startLeft + 160 * index}rpx`,
        width: '120rpx',
        height: '120rpx',
        shadow: '10rpx 10rpx 5rpx #888888',
        rotate: rotate,
        minWidth: '60rpx',
        borderRadius: borderRadius,
        scalable: true,
      },
    }
  );
}

function _des(index, content) {
  const des = {
    type: 'text',
    text: content,
    css: {
      fontSize: '22rpx',
      top: `${startTop + 8.5 * gapSize + 140}rpx`,
    },
  };
  if (index === 3) {
    des.css.right = '60rpx';
  } else {
    des.css.left = `${startLeft + 120 * index + 30}rpx`;
  }
  return des;
}
function _desnew(content,top,left) {
  const des = {
    id: 'text-id-6',
    type: 'text',
    text: `${content}`,
    css: [common,{
      top: `${startTop + top * gapSize}rpx`,
      left: left?`${left}rpx`: `${startLeft}rpx`,
      width: '710rpx',
      padding: '0rpx',
      scalable: true,
      deletable: true,
      lineHeight: '40rpx',
    }],
  };
  return des;
}

function _title(content,top,left) {
  const des = {// 标题
    // id: 'text-id-7',
    type: 'text',
    text: `${content}`,
    css: [common,{
      top: `${startTop + top * gapSize}rpx`,
      // shadow: '10rpx 10rpx 5rpx #888888',
      fontWeight: 'bold',
      fontSize: '32rpx',
      color: '#333',
    } ],
  };
  return des;
}

function _imagenew(url,width,height,top,left) {
  const des = {
    type: 'image',
    url: `${url}`,
    css: {
      width: `${width}rpx`,
      height: `${height}rpx`,
      mode: 'scaleToFill',
      top: `${startTop + top * gapSize}rpx`,
      left: `${left}rpx`,
      borderRadius: '50rpx',
    },
  };
  return des;
}
