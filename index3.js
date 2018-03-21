// pages/index3/index3.js
const app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleimagesrc:"",
    title:"",
    titlename:"",
    titlesrc:"",
    classifyvalue:"",
    titletime:"",
    article:"",
    likenumber:0,
    comment:[],
    collectnumber:0,
    likesrc:"/image/0.png",
    likevalue:false,
    collectsrc:"/image/4.png",
    collectvalue:0,
    attentiontext:"加关注",
    backgroundcolor:"orangered",
    color:"white"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //在页面加载中，将获取到的全局数据app.globalData.staffshow赋给页面数据title和content
  onLoad: function (options) {
      wx.request({
        url: app.globalData.host,
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          collect: 16,
          username: app.globalData.userInfo.nickName,
          attentionname: app.globalData.staffshow.titlename,
        },
        success: (res) => {
          if (res.data.length != 0)
            this.setData({
              backgroundcolor: "white",
              color: "#ccc",
              attentiontext: "已关注"
            })
        },
        fail: (res) => {
          wx.showToast({
            title: '关注更新失败',
          })
        }
      })
      this.setData({
        articleimagesrc: app.globalData.staffshow.articleimagesrc,
        title: app.globalData.staffshow.title,
        article: app.globalData.staffshow.article,
        likenumber: app.globalData.staffshow.likenumber,
        collectnumber: app.globalData.staffshow.collectnumber,
        titlename: app.globalData.staffshow.titlename,
        titlesrc: app.globalData.staffshow.titlesrc,
        classifyvalue: app.globalData.staffshow.classifyvalue,
        titletime: app.globalData.staffshow.titletime,
        collectsrc: this.data.collectsrc,
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
        collect: 4,
        titlename: app.globalData.staffshow.titlename,
        titletime: app.globalData.staffshow.titletime,
      },
      success: (res) => {
        for(var i=0 ;i < res.data.length ; i++)
        {
        res.data[i].hidden=false
        res.data[i].replyhidden=false
        }
        this.setData({
          comment: res.data
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '评论更新失败',
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
    app.globalData.staffshow.likenumber = this.data.likenumber;
    app.globalData.staffshow.collectnumber=this.data.collectnumber
    app.globalData.staffshow.commentnumber = this.data.comment.length
    for (var i = 0; i < app.globalData.staff.length ; i++)
    {
      if (app.globalData.staffshow.titlename == app.globalData.staff[i].titlename && app.globalData.staffshow.titletime == app.globalData.staff[i].titletime)
      {
        app.globalData.staff[i] = app.globalData.staffshow
      }
    }
    wx.request({
      url: app.globalData.host,
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        collect: 3,
        title: app.globalData.staffshow.title,
        classifyvalue: app.globalData.staffshow.classifyvalue,
        article: app.globalData.staffshow.article,
        articleimagesrc: app.globalData.staffshow.articleimagesrc,
        titlesrc: app.globalData.staffshow.titlesrc,
        titlename: app.globalData.staffshow.titlename,
        titletime: app.globalData.staffshow.titletime,
        likenumber: app.globalData.staffshow.likenumber,
        collectnumber: app.globalData.staffshow.collectnumber,
        commentnumber: this.data.comment.length,
        collectname: app.globalData.staffshow.collectname,
      },
      success: (res) => {
      },
      fail: (res) => {
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.request({
      url: app.globalData.host,
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        collect: 4,
        titlename: app.globalData.staffshow.titlename,
        titletime: app.globalData.staffshow.titletime,
      },
      success: (res) => {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].hidden = false
          res.data[i].replyhidden = false
        }
        this.setData({
          comment: res.data
        })
        wx.showToast({
          title: '评论刷新成功',
        })
        wx.stopPullDownRefresh()
      },
      fail: (res) => {
        wx.showToast({
          title: '评论更新失败',
        })
        wx.stopPullDownRefresh()
      }
    })
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
  focusevent: function () {
    wx.navigateTo({
      url: '../index4/index4',
    })
  },
  like :function () {
    if (!this.data.likevalue)
    {
          this.data.likevalue = true
          this.setData({
            likenumber: Number(this.data.likenumber) + 1,
            likesrc: "/image/1.png",
          })
          wx.showToast({
            title: '点赞成功',
          })
    }
    else
    {
      this.data.likevalue = false
      this.setData({
        likenumber: Number(this.data.likenumber) - 1,
        likesrc: "/image/0.png",
      })
      wx.showToast({
        title: '取消点赞',
      })
    }
  },
  collect : function () {
    if(this.data.collectvalue == 0)
    {
      app.globalData.staffshow.collectname = app.globalData.userInfo.nickName
      wx.request({
        url: app.globalData.host,
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          collect: 1,
          title: app.globalData.staffshow.title,
          classifyvalue: app.globalData.staffshow.classifyvalue,
          article: app.globalData.staffshow.article,
          articleimagesrc: app.globalData.staffshow.articleimagesrc,
          titlesrc: app.globalData.staffshow.titlesrc,
          titlename: app.globalData.staffshow.titlename,
          titletime: app.globalData.staffshow.titletime,
          likenumber: Number(this.data.likenumber),
          collectnumber: Number(this.data.collectnumber) + 1,
          collectname: app.globalData.userInfo.nickName,
        },
        success: (res) => {
          this.setData({
            collectnumber: Number(this.data.collectnumber) + 1,
            collectsrc: "/image/5.png",
            collectvalue: 1
          })
          wx.showToast({
            title: res.data,
          })
        },
        fail: (res) => {
          wx.showToast({
            title: '收藏失败',
          })
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
          collect: 2,
          titlename: app.globalData.staffshow.titlename,
          titletime: app.globalData.staffshow.titletime,
          collectname: app.globalData.staffshow.collectname,
        },
        success: (res) => {
          this.setData({
            collectnumber: Number(this.data.collectnumber) - 1,
            collectsrc: "/image/4.png",
            collectvalue: 0
          })
          wx.showToast({
            title: res.data,
          })
        },
        fail: (res) => {
          wx.showToast({
            title: '取消收藏失败',
          })
        }
      })
  }
  },
   /**
   * 触摸水波涟漪效果
   */
  containerTap: function (res) {
    var x = res.touches[0].pageX;
    var y = res.touches[0].pageY + 85;
    this.setData({
      rippleStyle: ''
    });
    this.setData({
      rippleStyle: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.4s linear;animation:ripple 0.4s linear;'
    });
  },
  Hidden: function (e) {
    for(var i=0 ; i < this.data.comment.length;i++)
    {
      if (e.currentTarget.dataset.reply.commentname == this.data.comment[i].commentname && e.currentTarget.dataset.reply.commenttitletime == this.data.comment[i].commenttitletime)
      {
        this.data.comment[i].hidden=true
        this.setData({
          comment:this.data.comment,
        })
      }
    }
  },
  blurfocus: function (e) {
    for (var i = 0; i < this.data.comment.length; i++) {
      if (e.currentTarget.dataset.reply.commentname == this.data.comment[i].commentname && e.currentTarget.dataset.reply.commenttitletime == this.data.comment[i].commenttitletime) {
        this.data.comment[i].hidden = false
        this.setData({
          comment: this.data.comment,
        })
      }
    }
  },
  replymessage: function (e) {
    wx.request({
      url: app.globalData.host,
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        collect: 6,
        titlename:e.currentTarget.dataset.reply.titlename,
        titletime:e.currentTarget.dataset.reply.titletime,
        commentname:e.currentTarget.dataset.reply.commentname,
        commenttitletime:e.currentTarget.dataset.reply.commenttitletime,
        replyusersrc:app.globalData.userInfo.avatarUrl,
        replyusername:app.globalData.userInfo.nickName,
        replyusertime:util.formatTime(new Date()),
        replytitle:e.detail.value
      },
      success: (res) => {
      },
      fail: (res) => {
        wx.showToast({
          title: '回复失败',
        })
      }
    })
    },
  replyhidden: function (e) {
    wx.request({
      url: app.globalData.host,
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        collect: 7,
        titlename: e.currentTarget.dataset.reply.titlename,
        titletime: e.currentTarget.dataset.reply.titletime,
        commentname: e.currentTarget.dataset.reply.commentname,
        commenttitletime: e.currentTarget.dataset.reply.commenttitletime,
      },
      success: (res) => {
        for (var i = 0; i < this.data.comment.length; i++) {
          if (e.currentTarget.dataset.reply.commentname == this.data.comment[i].commentname && e.currentTarget.dataset.reply.commenttitletime == this.data.comment[i].commenttitletime && res.data.length != 0)
          {
            this.data.comment[i].replyhidden = !(this.data.comment[i].replyhidden)
            break
          }
        }
            this.setData({
              replymessage: res.data,
              comment:this.data.comment,
            })
          },
      fail: (res) => {
        wx.showToast({
          title: '获取回复数据失败',
        })
      }
    })
  },
  attention: function () {
    if (this.data.attentiontext == "加关注")
    {
      wx.request({
        url: app.globalData.host,
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          collect: 14,
          username: app.globalData.userInfo.nickName,
          usersrc: app.globalData.userInfo.avatarUrl,
          attentionname: app.globalData.staffshow.titlename,
          attentionsrc: app.globalData.staffshow.titlesrc,
        },
        success: (res) => {
          this.setData({
            backgroundcolor: "white",
            color: "#ccc",
            attentiontext: "已关注"
          })
          wx.showToast({
            title: res.data,
          })
        },
        fail: (res) => {
          wx.showToast({
            title: '关注失败',
          })
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
          collect: 15,
          username: app.globalData.userInfo.nickName,
          attentionname: app.globalData.staffshow.titlename,
        },
        success: (res) => {
          this.setData({
            backgroundcolor: "orangered",
            color: "white",
            attentiontext: "加关注"
          })
          wx.showToast({
            title: res.data,
          })
        },
        fail: (res) => {
          wx.showToast({
            title: '取消关注失败',
          })
        }
      })
    }
  }


  
})