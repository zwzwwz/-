// pages/index1/index1.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus:true,
    Searchresult: [],
    Searchhistory: [],
    Hidden:false,
    judge:false,
    judge1:false,
    judge2: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.host,
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        collect: 12,
        searchname: app.globalData.userInfo.nickName,
      },
      success: (res) => {
        if (res.data != "") {
          that.setData({
            Searchhistory: res.data,
            Hidden: false,
            judge: true,
            judge1: false,
            judge2: false
          })
        }
      },
      fail: (res) => {
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
    this.setData({
      Hidden: true,
      judge: false,
      judge1: false,
      judge2: true
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
  /**
   * 事件处理函数
   */,
  nextpage3: function (e) {
    app.globalData.staffshow = e.currentTarget.dataset.texttile
    wx.navigateTo({
      url: '../index3/index3',
    })
  },
  focusevent: function () {
    this.setData({
      focus:true
    })
  },
  Search: function (e) {
    if (e.detail.value != '')
    {
    var that=this
    wx.request({
      url: app.globalData.host,
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        collect: 10,
        searchname: app.globalData.userInfo.nickName,
        searcharticle: e.detail.value,
      },
      success: (res) => {
        that.setData({
          Searchresult: res.data,
          judge1: false,
          judge2:true,
          Hidden: true
        })
        if(res.data=="")
        wx.showToast({
          title: '暂无搜索结果',
        })
      },
      fail: (res) => {
      }
    })
    }
  },
  Searchinput: function (e) {
    var that=this
    if (e.detail.value != "")
    {
    wx.request({
      url: app.globalData.host,
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        collect: 11,
        searchname: app.globalData.userInfo.nickName,
        searcharticle: e.detail.value,
      },
      success: (res) => {
        that.setData({
          Searchresult:res.data,
          judge:false,
          judge1: true,
          judge2:false,
          Hidden: true
        })
      },
      fail: (res) => {
      }
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
          collect: 12,
          searchname: app.globalData.userInfo.nickName,
        },
        success: (res) => {
          that.setData({
            Searchhistory: res.data,
            Searchresult: [],
            judge: true,
            Hidden: false
          })
        },
        fail: (res) => {
        }
      })
    }
  },
  searchresult:function (e) {
        this.setData({
          judge1: false,
          judge2:true
        })
  },
  searchhistory:function (e)
  {
    var that = this
    wx.request({
      url: app.globalData.host,
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        collect: 10,
        searchname: app.globalData.userInfo.nickName,
        searcharticle: e.currentTarget.dataset.texttile.searcharticle,
      },
      success: (res) => {
        that.setData({
          Searchresult: res.data,
          Hidden:true,
          judge1: false,
          judge: false,
          judge2:true
        })
        if (res.data == "")
          wx.showToast({
            title: '暂无搜索结果',
          })
      },
      fail: (res) => {
      }
    })
  },
  clear:function () {
    var that = this
    wx.request({
      url: app.globalData.host,
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        collect: 13,
        searchname: app.globalData.userInfo.nickName,
      },
      success: (res) => {
        that.setData({
          judge: false,
        })
      },
      fail: (res) => {
      }
    })
  },
  containerTap: function (res) {
    console.log(res.touches[0]);
    var x = res.touches[0].pageX;
    var y = res.touches[0].pageY + 85;
    this.setData({
      rippleStyle: ''
    });
    this.setData({
      rippleStyle: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.4s linear;animation:ripple 0.4s linear;'
    });
  }


})