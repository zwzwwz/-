//logs4.js
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    length:0,
    length1:0
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    else if (this.data.canIUse) {
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
  onShow: function () {
    wx.request({
      url: app.globalData.host,
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        collect: 17,
        username: app.globalData.userInfo.nickName,
      },
      success: (res) => {
        this.setData({
          length: res.data.length
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '获取数据失败',
        })
      }
    })
    wx.request({
      url: app.globalData.host,
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        collect: 18,
        attentionname: app.globalData.userInfo.nickName,
      },
      success: (res) => {
        this.setData({
          length1: res.data.length
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '获取数据失败',
        })
      }
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //事件处理函数
  myarticles: function (){
    wx.navigateTo({
      url: '../logs4-1/logs4-1',
    })
  },
  mycollect: function () {
    wx.navigateTo({
      url: '../logs4-2/logs4-2',
    })
  },
  myattention: function () {
    wx.navigateTo({
      url: '../logs4-5/logs4-5',
    })
  }
})