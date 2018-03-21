// pages/logs4-2/logs4-2.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staffmycollect: []
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
        collect: 2,
        collectname: app.globalData.userInfo.nickName
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
  nextmycollect: function (e) {
    app.globalData.staffshow = e.currentTarget.dataset.texttile
    wx.navigateTo({
      url: '../logs4-4/logs4-4',
    })
  },
  delmycollect: function (e) {
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
            collect: 9,
            collectname: e.currentTarget.dataset.texttile.collectname,
            titlename:e.currentTarget.dataset.texttile.titlename,
            titletime:e.currentTarget.dataset.texttile.titletime,
          },
          success: (res) => {
            for (var i = 0; i < that.data.staffmycollect.length; i++) {
              if (e.currentTarget.dataset.texttile.classifyvalue == that.data.staffmycollect[i].classifyvalue && e.currentTarget.dataset.texttile.titletime == that.data.staffmycollect[i].titletime) {
                that.data.staffmycollect.splice(i, 1)
                that.setData({
                  staffmycollect: that.data.staffmycollect
                })
                wx.showToast({
                  title: res.data,
                  duration: 1000
                })
                break;
              }
            }
          },
          fail: (res) => {
            wx.showToast({
              title: '获取数据失败',
            })
          }
        })
      }
    })
  }
})