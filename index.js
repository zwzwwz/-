//index.js
const app = getApp()
Page({
  data: {
    staff:[],
    imgUrls: [
      'https://www.yixuebei.com/images/10.jpg',
      'https://www.yixuebei.com/images/11.jpg',
      'https://www.yixuebei.com/images/12.jpg',
      'https://www.yixuebei.com/images/13.jpg',
    ],
  },
  //生命周期函数
  onReady: function (e) {
  },
  //获取全局数据app.globalData.staff并保存到页面数据this.data.staff中,然后显示出来
  onLoad: function () {
    var that = this
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
      }
    })
    wx.showLoading({
      title: '加载中'
    }),
    wx.request({
      url: app.globalData.host,
      method: 'GET',
      success: (res) => {
        app.globalData.staff = res.data
        that.setData({
          staff: res.data,
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
  //获取全局数据app.globalData.staff并保存到页面数据this.data.staff中,然后显示出来
  onShow: function () {
    this.setData({
      staff: app.globalData.staff,
    })
  },
  onPullDownRefresh: function () {
    var that = this
    wx.request({
      url: app.globalData.host,
      method: 'GET',
      success: (res) => {
          if (res.data.length)
          {
            app.globalData.staff = res.data
            that.setData({
              staff: res.data,
            })
            wx.showToast({
              title: '刷新成功',
            })
          }
          else
          {
            wx.showToast({
              title: '暂无更新数据',
            })
          }
          wx.stopPullDownRefresh()
        },
      fail: (res) => {
        wx.showToast({
          title: '刷新失败',
        })
        wx.stopPullDownRefresh()
      }
    })
  },
  onReachBottom : function () 
  {
    var that = this
    wx.showLoading({
      title: '加载中'
    }),
    wx.request({
      url: app.globalData.host,
      method: 'GET',
      success: (res) => {
        app.globalData.staff = app.globalData.staff.concat(res.data)
        that.setData({
            staff: app.globalData.staff,
          })
        wx.hideLoading()
        wx.showToast({
          title: '加载完成',
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '加载失败',
        })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: "易学呗",
      path: this.route
    }
  },







  //事件处理函数
  nextpage1: function () {
    wx.navigateTo({
      url: '../index1/index1'
    })
  },
  nextpage2: function () {
    wx.navigateTo({
      url: '../index2/index2'
    })
  },
  //首先绑定到当前组件上data-text，然后将当前触发点击事件的值赋给全局数据app.globalData.staffshow，并跳转到下一个页面
  nextpage3:function (e) {
    app.globalData.staffshow = e.currentTarget.dataset.texttile
      wx.navigateTo({
        url: '../index3/index3',
      })
  },
add: function () {
  var qw = this
    wx.chooseImage({
    count: 9, // 默认9
    sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (e) {   //success:function(e)中不能使用this
      qw.data.imgUrls = e.tempFilePaths.concat(qw.data.imgUrls)
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      qw.setData({
        imgUrls: qw.data.imgUrls
      })
    }
  })
},
look: function (e) {
  var imgsrc = e.target.dataset.src;     //获取当前图片的链接
  wx.previewImage({
    current: imgsrc, // 当前显示图片的http链接
    urls: this.data.imgUrls ,// 需要预览的图片http链接列表
  })
},
/**
 * 触摸水波涟漪效果
*/
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