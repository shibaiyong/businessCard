const app = getApp();

Page({
  data: {
    imgUrls: [
      { src: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640', id: 1 },
      { src: 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640', id: 2 },
      { src: 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640', id: 3 }
    ],
    defaulthead:'../../img/personhead.png',
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    btnStatus: '1',
    weight: '180g',
    num: 1,
    totalPrice: 0,
    price: 24,
    region: ['北京市', '北京市', '朝阳区'],
    customItem: '全部',
    userinfo: {
      address: "",
      city: "",
      id: "",
      imgurl: "",
      openid: "",
      phone: "",
      province: "",
      username: "",
      imgurl: "../../img/personhead.png",
      wxname: ""
    }
  },
  onLoad: function (options) {
    if (options.data) {
      let data = JSON.parse(decodeURIComponent(options.data))
      this.setData({
        userinfo: data,
        region: [data.province, data.city, '全部'],
        defaulthead: data.imgurl
      })
    }
  },
  onShow(){
    this.fetchData()
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  switchChange(e) {
    console.log(e.detail.value)
  },
  uploadimg() {
    let that = this
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.globalData.apiUrl + '/xcx/uploadfile',
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            if (res && res.data) {
              that.setData({
                defaulthead: JSON.parse(res.data).data
              })
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 2000
              })
            }
          }
        })
      }
    })
  },
  fetchData() {
    let that = this
    wx.request({
      url: 'https://micang.bzqmall.com.cn/xcx/index',
      method: 'get',
      data: {
        openid:wx.getStorageSync('openid')
      },
      success: function (res) {

        if (res && res.data) {

          that.setData({
            userinfo: res.data.data[0]
          })

        }
      }
    })
  },
  formSubmit(e) {
    
    let data = Object.assign(this.data.userinfo,e.detail.value, {
      province: this.data.region[0],
      city: this.data.region[1],
      openid:wx.getStorageSync('openid'),
      imgurl: this.data.defaulthead
    })
    console.log(e.detail.value)
    wx.request({
      method: "get",
      url: app.globalData.apiUrl + '/xcx/updateuser',
      data: data,
      success: function (res) {
        console.log(res)
        // wx.switchTab({
        //   url: '../index/index'
        // })
        let code = res.data.code
        let msg = res.data.msg
        if(code==1){
          wx.showToast({
            title: msg,
            duration: 2000
          })
        }else if(code ==2){
          wx.showToast({
            title: msg,
            duration: 2000,
            success:function(){
              wx.switchTab({
                url: '../index/index'
              })
            }
          })
        }else{
          wx.showToast({
            title: msg,
            duration: 2000
          })
        }
        
      }
    })
  }
})