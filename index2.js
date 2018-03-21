// pages/index2/index2.js
const app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleimagesrc:"",
    src: "/image/2.png",
    multiArray: [['教育', '军事', '社会', '体育', '历史', '科技', '娱乐', '健康', '文学'], ['计算机', '数学', '语文', '物理', '生物', '化学', '工程学', '会计学', '机械', '英语'], ['人工智能', '大数据', '数据库', '系统', '信息安全', '网络与通讯', '服务器', '人机交互', '软件工程', 'Java', 'C', 'C++', 'HTML', 'CSS', 'JavaScript', 'PHP', 'Python']],
    multiIndex: [0, 0, 0],
      classifyvalue:"",
      classifyvalue1:""
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
  //获取用户输入的文章信息并保存到全局数据app.globalData.staff中
  publish: function (e) {
    var that=this
    var value = e.detail.value
    if (value.title == '')
    {
      wx.showToast({
        title: '请输入标题',
        image: "/image/感叹号.png",
        duration: 1500
      })
    }
    else if (this.data.classifyvalue == '')
    {
      wx.showToast({
        title: '请选择分类',
        image: "/image/感叹号.png",
        duration: 1500
      })
    }
    else if (value.article == '')
    {
      wx.showToast({
        title: '请输入文章内容',
        image: "/image/感叹号.png",
        duration: 1500
      })
    }
    else
    {
    wx.showModal({
      title: '提示',
      content: '确定发表这篇文章吗?',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '上传中'
          })
          if(that.data.articleimagesrc != '')
          {
            wx.uploadFile({
              url: 'https://www.yixuebei.com/upload',
              filePath: that.data.articleimagesrc,
              name: 'image',
              formData: {
                title: value.title,
                classifyvalue: that.data.classifyvalue,
                classifyvalue1: that.data.classifyvalue1,
                article: value.article,
                articleimagesrc: "",
                titlesrc: app.globalData.userInfo.avatarUrl,
                titlename: app.globalData.userInfo.nickName,
                titletime: util.formatTime(new Date()),
                likenumber: 0,
                collectnumber: 0,
                commentnumber: 0,
                collectname: "",
              },
              success: function (res) {
                wx.hideLoading()
                wx.showToast({
                  title: res.data,
                })
                setTimeout(function () {
                  wx.navigateBack({
                  })
                }, 1000)
              },
                fail: (res) => {
                wx.showToast({
                  title: '发表失败',
                })
                }
            })
          }
          else {
            wx.request({
              url: app.globalData.host,
              method: 'POST',
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              data: {
                title: value.title,
                classifyvalue: that.data.classifyvalue,
                classifyvalue1: that.data.classifyvalue1,
                article: value.article,
                articleimagesrc: "",
                titlesrc: app.globalData.userInfo.avatarUrl,
                titlename: app.globalData.userInfo.nickName,
                titletime: util.formatTime(new Date()),
                likenumber: 0,
                collectnumber: 0,
                commentnumber: 0,
                collectname: "",
              },
              success: function (res) {
                wx.hideLoading()
                wx.showToast({
                  title: res.data,
                })
                setTimeout(function () {
                  wx.navigateBack({
                  })
                }, 1000)
              },
              fail: (res) => {
                wx.showToast({
                  title: '发表失败',
                })
              }
            })
          }
          }
        }
      })
  }
  },
  radioChange: function (e) {
    this.data.multiIndex = e.detail.value
    this.data.classifyvalue = this.data.multiArray[2][this.data.multiIndex[2]]
    this.data.classifyvalue1 = this.data.multiArray[1][this.data.multiIndex[1]]
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['计算机', '数学', '语文', '物理', '生物','化学','工程学','会计学','机械','英语'];
            data.multiArray[2] = ['人工智能', '大数据', '数据库', '系统', '信息安全', '网络与通讯', '服务器', '人机交互', '软件工程', 'Java', 'C', 'C++', 'HTML', 'CSS', 'JavaScript', 'PHP', 'Python'];
            break;
          case 1:
            data.multiArray[1] = ['国内军事', '国外军事', '军事武器'];
            data.multiArray[2] = ['空军', '海军','陆军'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;






      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['人工智能','大数据','数据库','系统','信息安全','网络与通讯','服务器','人机交互','软件工程','Java', 'C', 'C++', 'HTML', 'CSS', 'JavaScript', 'PHP', 'Python'];
                break;
              case 1:
                data.multiArray[2] = ['数学分析','实变函数','泛函分析','复分析','调和分析','傅里叶分析','常微分方程','偏微分方程','初等数论','代数数论','解析数论','数学几何','丢番图逼近论','模形式','初等代数','高等代数','近世（或抽象）代数','交换代数','同调代数','李代数','初等几何','高等几何','解析几何','微分几何','黎曼几何','张量分析','拓扑学','概率统计','数值分析','运筹学','排队论'];
                break;
              case 2:
                data.multiArray[2] = ['小学语文', '初中语文','高中语文','大学语文','散文','诗词','论语','格言'];
                break;
              case 3:
                data.multiArray[2] = ['牛顿力学','理论力学','电磁学','电动力学','热力学','相对论','量子力学','粒子物理学','原子核物理学','原子与分子物理学','固体物理学','凝聚态物理学','激光物理学','等离子体物理学','地球物理学','生物物理学','天体物理学'];
                break;
              case 4:
                data.multiArray[2] = ['动物生物学', '植物生物学', '微生物学', '生物化学', '遗传学', '细胞生物学', '分子生物学','普通生态学','生物统计学','发育生物学','生物技术概论','进化生物学'];
                break;
                case 5:
                data.multiArray[2] = ['无机化学','分析化学','有机化学','物理化学','高分子化学','核化学','生物化学','理论化学','计算化学','热化学','电化学','光化学','药物化学','量子化学','放射化学','天文化学','大气化学','环境化学','绿色化学','信息化学','地球化学','石油化学','超分子化学']
                break;
                case 6:
                data.multiArray[2] = ['精益生产','生产计划与控制','设施规划与物流分析','质量管理','人因工程','机械设计','系统工程导论','管理信息系统']
                break;
                case 7:
                data.multiArray[2] = ['基础会计', '财务管理学原理', '微观经济学', '宏观经济学', '产业经济学', '会计学基础', '统计学原理', '管理学', '会计学原理', '财务管理','审计学', '成本会计学', '管理会计学', '会计电算化', '高级财务会计', '管理统计学', '中级财务会计']
                break;
                case 8:
                data.multiArray[2] = ['过程装备与控制工程', '车辆工程专业', '机械工程及自动化', '机械电子工程', '汽车服务工程', '汽车运用工程', '物流装备', '制造工程', '轮机工程技术', '电气自动化技术']
                break;
                case 9:
           data.multiArray[2] = ['英语精读','英语泛读','英语听力','英语语法','英语口语','英语写作','综合英语','英汉翻译','汉英翻译','语言学概论','英美文学','英语国家文化']
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['空军', '海军', '陆军'];
                break;
              case 1:
                data.multiArray[2] = ['特种部队', '坦克', '步枪'];
                break;
              case 2:
                data.multiArray[2] = ['歼20', '轰20', '航母'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        break;
    }
    this.setData(data);
  },
  addimage: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          src: res.tempFilePaths[0],
          articleimagesrc: res.tempFilePaths[0],
          view: {
            height: 105,
            width: 413,
            marginleft: 0
          }
        })
      }
    })
}
})