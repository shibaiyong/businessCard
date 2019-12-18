const App = getApp();

Page({
  data: {
    defaulthead: '../../img/personhead.png',
    cardlist: [
      // {
      //   address:"奥体大街69号",
      //   city:"南京",
      //   id:"1",
      //   imgurl:"http://thirdwx.qlogo.cn/mmopen/vi_32/kAhzMT1iaf6Aib2Y6xYRoq9jeWoCia7AxBEEiaapmOOqI7ia0qiafHhKZL5ticUrV4S9vsC7O0sayazFBSwTubKv2gAyg/132",
      //   openid:"abc",
      //   phone: "18651888613",
      //   province:"江苏",
      //   username:"韩文广",
      //   wximgurl:"http://thirdwx.qlogo.cn/mmopen/vi_32/kAhzMT1iaf6Aib2Y6xYRoq9jeWoCia7AxBEEiaapmOOqI7ia0qiafHhKZL5ticUrV4S9vsC7O0sayazFBSwTubKv2gAyg/132",
      //   wxname:""
      // }
    ]
  },
  onLoad: function (options) {
    this.fetchData()
  },
  onShow(){
    this.fetchData()
  },
  showtoast() {
    alert('hahahaha')
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
            cardlist: res.data.data
          })

        }
      }
    })
  },
  linktopath(e) {
    let data = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../edit/edit?data='+encodeURIComponent(data)
    })
  }
})