// pages/logs4-1-1/logs4-1-1.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staffmyarticles:[]
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
    this.setData({
      staffmyarticles: app.globalData.staffmycollect
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
    /**
   * 事件处理函数
   */
  nextmyarticles: function (e) {
    app.globalData.staffshow = e.currentTarget.dataset.texttile
    wx.navigateTo({
      url: '../logs4-3/logs4-3',
    })
  },
  delmyarticles: function (e) {
    var that = this
    wx.showActionSheet({
      itemList: ['删除'],
      success: function () {
        wx.request({
          url: app.globalData.host,
          method: 'POST',
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          data: {
            collect: 8,
            titlename: e.currentTarget.dataset.texttile.titlename,
            titletime: e.currentTarget.dataset.texttile.titletime,
          },
          success: (res) => {
            for (var i = 0; i < that.data.staffmyarticles.length; i++) {
              if (e.currentTarget.dataset.texttile.classifyvalue == that.data.staffmyarticles[i].classifyvalue && e.currentTarget.dataset.texttile.titletime == that.data.staffmyarticles[i].titletime) {
                that.data.staffmyarticles.splice(i, 1)
                that.setData({
                  staffmyarticles: that.data.staffmyarticles
                })
                wx.showToast({
                  title: res.data,
                  duration: 1000
                })
                break;
              }
            }
            app.globalData.judge=true
          },
          fail: (res) => {
            wx.showToast({
              title: '删除失败',
            })
          }
        })
      }
    })
  }
})