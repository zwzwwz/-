// pages/logs4-5/logs4-5.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staffmyattention: [],
    staffmyattention1: [],
    judge:true,
    color:"#000000",
    color1:"gray",
    distance:134
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showLoading({
      title: '加载中'
    }),
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
            staffmyattention: res.data
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
            staffmyattention1: res.data
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
  staffjudge: function () {
    if(this.data.judge == false)
    {
      this.setData({
        color: "#000000",
        color1: "gray",
        distance: 134,
        judge:true
      })
    }
  },
  staffjudge1: function () {
    if (this.data.judge == true) {
          this.setData({
            color: "gray",
            color1: "#000000",
            distance: 200,
            judge: false,
            staffmyattention1: this.data.staffmyattention1
          })
      }
  },
  delmyattention: function (e) {
    var that = this
    wx.showActionSheet({
      itemList: ['取消关注'],
      success: function () {
        wx.request({
          url: app.globalData.host,
          method: 'POST',
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          data: {
            collect: 15,
            username: app.globalData.userInfo.nickName,
            attentionname: e.currentTarget.dataset.texttile.attentionname,
          },
          success: (res) => {
            for (var i = 0; i < that.data.staffmyattention.length; i++) {
              if (e.currentTarget.dataset.texttile.attentionname == that.data.staffmyattention[i].attentionname) {
                that.data.staffmyattention.splice(i, 1)
                that.setData({
                  staffmyattention: that.data.staffmyattention
                })
                wx.showToast({
                  title: '取消关注成功',
                  duration: 1000
                })
                break;
              }
            }
          },
          fail: (res) => {
            wx.showToast({
              title: '取消关注失败',
            })
          }
        })
      }
    })
  },
  nextmyattention: function (e) {
    app.globalData.staffshow1 = e.currentTarget.dataset.texttile
    wx.navigateTo({
      url: '../logs4-5-1/logs4-5-1',
    })
  },
  nextmyattention1: function (e) {
    app.globalData.staffshow1 = e.currentTarget.dataset.texttile
    wx.navigateTo({
      url: '../logs4-5-2/logs4-5-2',
    })
  }

})