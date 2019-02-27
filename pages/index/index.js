//index.js
//获取应用实例
const app = getApp()

Page({
  onReady(e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')

    const innerAudioContext  = wx.createInnerAudioContext();
    innerAudioContext.title = '略略略'
    innerAudioContext.epname = '花粥'
    innerAudioContext.singer = '花粥'
    innerAudioContext.coverImgUrl = 'https://img3.doubanio.com/view/group_topic/l/public/p28430810.webp'
    innerAudioContext.src = 'http://192.168.100.139/lueluelue.mp3'
    innerAudioContext.play()
    this.music = innerAudioContext;
  },
  moveToLocation() {
    this.music.play();
    this.mapCtx.moveToLocation()
  },
  data: {
    // lon:"112",
    // lat:"83",
    motto: 'Hello 有米',
    userInfo: {},
    hasUserInfo: false,
    isPlayingMusic:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      });
    } else {
      wx.playBackgroundAudio({
        dataUrl: 'http://192.168.100.139/lueluelue.mp3'
            });
      this.setData({
        isPlayingMusic: true
      });
    }
  },
  markertap:function(){
    // const innerAudioContext = wx.createInnerAudioContext();
    this.music.stop()
    console.log("123");
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
