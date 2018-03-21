// pages/logs4-1/logs4-1.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staffmyarticles:[],
    staffclassifyvalue:[],
    judge:true,
    backgroundcolor:"#000000",
    color:"white",
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
          titlename: app.globalData.userInfo.nickName
        },
        success: (res) => {
          var staffclassifyvalue = []
          for (var i = 0; i < res.data.length; i++) {
            var classifyvalue = {
              classname: res.data[i].classifyvalue1,
              classnumber: 1
            }
            for (var j = 0; j < staffclassifyvalue.length; j++) {
              if (staffclassifyvalue[j].classname == classifyvalue.classname) {
                staffclassifyvalue[j].classnumber++;
                break;
              }
            }
            if (j == staffclassifyvalue.length) {
              staffclassifyvalue.push(classifyvalue)
            }
          }
          this.setData({
            staffmyarticles: res.data,
            staffclassifyvalue: staffclassifyvalue
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
    if (app.globalData.judge)
    {
      wx.request({
        url: app.globalData.host,
        method: 'GET',
        data: {
          collect: 1,
          titlename: app.globalData.userInfo.nickName
        },
        success: (res) => {
          var staffclassifyvalue = []
          for (var i = 0; i < res.data.length; i++) {
            var classifyvalue = {
              classname: res.data[i].classifyvalue1,
              classnumber: 1
            }
            for (var j = 0; j < staffclassifyvalue.length; j++) {
              if (staffclassifyvalue[j].classname == classifyvalue.classname) {
                staffclassifyvalue[j].classnumber++;
                break;
              }
            }
            if (j == staffclassifyvalue.length) {
              staffclassifyvalue.push(classifyvalue)
            }
          }
          this.setData({
            staffmyarticles: res.data,
            staffclassifyvalue: staffclassifyvalue
          })
        },
        fail: (res) => {
          wx.showToast({
            title: '获取数据失败',
          })
        }
      })
    app.globalData.judge = false
    }
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
    var that=this
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
                break;
              }
            }
            for (var i = 0; i < that.data.staffclassifyvalue.length; i++) {
              if (e.currentTarget.dataset.texttile.classifyvalue1 == that.data.staffclassifyvalue[i].classname) {
                that.data.staffclassifyvalue[i].classnumber--;
                if (that.data.staffclassifyvalue[i].classnumber == 0)
                that.data.staffclassifyvalue.splice(i, 1)
                break;
              }
            }
            that.setData({
              staffmyarticles: that.data.staffmyarticles,
              staffclassifyvalue: that.data.staffclassifyvalue
            })
            wx.showToast({
              title: res.data,
              duration: 1000
            })
          },
          fail: (res) => {
            wx.showToast({
              title: '删除失败',
            })
          }
        })
      }
    })
  },
  staffjudge : function () {
    if(this.data.judge == false)
    {
      this.setData({
        judge:true,
        backgroundcolor: "#000000",
        color: "white"
      })
    }
  },
  staffjudge1: function () {
    if (this.data.judge == true) {
      this.setData({
        judge: false,
        backgroundcolor: "white",
        color: "#000000"
      })
    }
  },
  nextstaffclassifyvalue : function (e) {
    app.globalData.staffmycollect=[]
    for (var i = 0; i < this.data.staffmyarticles.length; i++)
    {
      if (this.data.staffmyarticles[i].classifyvalue1== e.currentTarget.dataset.texttile.classname)
      {
        app.globalData.staffmycollect.push(this.data.staffmyarticles[i])
      }
    }
    wx.navigateTo({
      url: '../logs4-1-1/logs4-1-1',
    })
  }




})