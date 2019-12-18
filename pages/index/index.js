//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    currentid: '1',
    iconType: 'clear',
    showToast: false,
    defaultSize: 'default',
    scrollX: true,
    defaulthead: '../../img/personhead.png',
    cardlist: []
  },
  //事件处理函数
  changeStatus: function (event) {
    let id = event.currentTarget.dataset.id;
    this.setData({
      currentid: id
    })
  },
  closeShowToast() {

    this.setData({
      showToast: false
    })
  },
  openshowToast() {
    this.setData({
      showToast: true
    })
  },
  addConnect() {
    // wx.addPhoneContact({
    //   lastName:'时',
    //   firstName:'佰勇',
    //   mobilePhoneNumber:'13716430632',
    //   addressCountry:'中国',
    //   addressState:'山东'
    // })
    let data = JSON.stringify(this.data.cardlist[0])
    wx.navigateTo({
      url: '../edit/edit?data=' + encodeURIComponent(data)
    })
  },

  onShow() {
    this.fetchData()
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //初始化本页面 调用一下接口可以使本页面具备分享能力
    wx.showShareMenu()
  },

  Location() {
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标， 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        console.log(res)
        let latitude = res.latitude
        let longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 14, // 缩放比例
          // name: 'name', // 位置名
          // address: 'address', // 地址的详细说明
          success: function (res) {
            console.log(res)
          }
        })
      },
      fail: function () {
        console.log('小程序获取位置信息失败')
      }
    })
  },

  fetchData() {
    const that = this
    wx.request({
      url: 'https://micang.bzqmall.com.cn/xcx/index',
      method: 'get',
      data: {
        openid: wx.getStorageSync('openid')
      },
      success: function (res) {

        if (res && res.data) {
          that.setData({
            cardlist: res.data.data,
            defaulthead: res.data.data[0].imgurl
          })

        }
      }
    })
  },
  getUserInfo: function (e) {

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onShareAppMessage: (res) => {

    if (res.from === 'button') {
      console.log("来自页面内转发按钮");
    }
    else {
      console.log("来自右上角转发菜单")
    }
    // 不进行配置默认转发当前页
    return {
      title: '我的名片请惠存',
      // path: '/pages/index/index',
      // imageUrl: "../../img/personhead.png",
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }
})
