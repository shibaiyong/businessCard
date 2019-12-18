//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        
        
        wx.request({
          url:'https://micang.bzqmall.com.cn/xcx/getopenid',
          method:'get',
          data:{
            code:res.code
          },
          success:function(res){
            wx.setStorageSync('openid',res.data.openid)
          }
        })
        wx.request({
          url: 'https://micang.bzqmall.com.cn/xcx/index',
          method: 'get',
          data: {
            openid:wx.getStorageSync('openid'),
          },
          success: function (res) {
            console.log(res)
            if(res.data.code==2){
              console.log('hahahhaha')
            }else if(res.data.code==1){
              console.log(123456)
              wx.switchTab({
                url:'../index/index'
              })
            }
          }
        })
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     console.log(res)
    //     if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    apiUrl:'https://micang.bzqmall.com.cn',
    code:null,
    appid:'wx2800797d6f30815c'
  }
})