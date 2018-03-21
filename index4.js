// pages/index4/index4.js
const app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

    /**
   * 事件处理函数
   */
  commentsubmit: function (e) {
    var value = e.detail.value
    if (value.article == "")
    {
      wx.showToast({
        title: '请输入评论内容',
        image: "/image/感叹号.png",
        duration: 1500
      })
    }
      else
      {
        wx.request({
          url: app.globalData.host,
          method: 'POST',
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          data: {
            collect: 5,
            titlename: app.globalData.staffshow.titlename,
            titletime: app.globalData.staffshow.titletime,
            commenttitlesrc : app.globalData.userInfo.avatarUrl,
            commentname : app.globalData.userInfo.nickName,
            commenttitle : value.article,
            commenttitletime : util.formatTime(new Date()),
            hidden : false,
            replyhidden : false
          },
          success: (res) => {
            wx.showToast({
              title: '评论成功',
            })
            setTimeout(function () {
              wx.navigateBack({
              })
            }, 1000)
          },
          fail: (res) => {
            wx.showToast({
              title: '评论失败',
            })
          }
        })
      }
  }




})