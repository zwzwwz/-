// pages/logs4-5-1/logs4-5-1.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staffmyarticles:[],
    staffmycollect:[],
    attentionsrc:"",
    attentionname:"",
    length: 0,
    length1: 0,
    judge: true,
    color: "red",
    color1: "gray",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    }),
      wx.request({
        url: app.globalData.host,
        method: 'GET',
        data: {
          collect: 1,
          titlename: app.globalData.staffshow1.attentionname
        },
        success: (res) => {
          this.setData({
            staffmyarticles: res.data,
            attentionsrc: app.globalData.staffshow1.attentionsrc,
            attentionname: app.globalData.staffshow1.attentionname
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
        method: 'GET',
        data: {
          collect: 2,
          collectname: app.globalData.staffshow1.attentionname
        },
        success: (res) => {
          this.setData({
            staffmycollect: res.data
          })
          wx.hideLoading()
          wx.showToast({
            title: '加载完成',
          })
        },
        fail: (res) => {
          wx.showToast({
            title: '获取数据失败',
          })
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  staffjudge: function () {
    if (this.data.judge == false) {
      this.setData({
        color: "red",
        color1: "gray",
        judge: true
      })
    }
  },
  staffjudge1: function () {
    if (this.data.judge == true) {
            this.setData({
              staffmycollect: this.data.staffmycollect,
              color: "gray",
              color1: "red",
              judge: false
            })
          }
  },
  nextmyarticles: function (e) {
    app.globalData.staffshow = e.currentTarget.dataset.texttile
    wx.navigateTo({
      url: '../logs4-3/logs4-3',
    })
  },
  nextmycollect: function (e) {
    app.globalData.staffshow = e.currentTarget.dataset.texttile
    wx.navigateTo({
      url: '../logs4-4/logs4-4',
    })
  }
})