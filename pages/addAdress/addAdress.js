const app = getApp();

Page({
  data: {
    btnStatus:'1',
    region: ['北京市', '北京市','朝阳区'],
    customItem:'全部',
    defaulthead:'../../img/personhead.png',
    imgUrl:'',
    formData:{
        address:"",
        city:"",
        imgurl:"",
        phone: "",
        province:"",
        username:"",
        wximgurl:""
      }
  },
  onLoad:function(options){
    console.log(options);
  },

  uploadimg(){
    let that = this
    wx.chooseImage({
      success (res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.globalData.apiUrl + '/xcx/uploadfile',
          filePath: tempFilePaths[0],
          name: 'file',
          success (res){
            if(res&&res.data){
              that.setData({
                defaulthead:JSON.parse(res.data).data
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
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  switchChange(e){
    console.log(e.detail.value)
  },
  formSubmit(e){
    Object.assign(e.detail.value,{
      province:this.data.region[0],
      city:this.data.region[1],
      openid:wx.getStorageSync('openid'),
      imgurl:this.data.defaulthead
    })
    console.log(e.detail.value)
    wx.request({
      method:"get",
      url: app.globalData.apiUrl + '/xcx/adduser',
      data: e.detail.value,
      success: function(res) {
        console.log(res)
        wx.switchTab({
          url: '../index/index'
        })
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
      }
    })

  },

})