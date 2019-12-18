const App = getApp();

Page({
    data: {
        imgUrls: [
          {src:'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',id:1},
          {src:'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',id:2},
          {src:'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',id:3}
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 1000,
        btnStatus:'1',
        weight:'180g',
        num:1,
        totalPrice:0,
        price:24,
        goodid:''
      },
    onLoad:function(options){
        //可以options获取路由参数
        console.log(this.route)
        console.log(options)

        this.setData({
          goodid:options.id
        })
        this.calculatePrice()
    },
    changeIndicatorDots(e) {
      this.setData({
        indicatorDots: !this.data.indicatorDots
      })
    },
    changeAutoplay(e) {
      this.setData({
        autoplay: !this.data.autoplay
      })
    },
    intervalChange(e) {
      this.setData({
        interval: e.detail.value
      })
    },
    durationChange(e) {
      this.setData({
        duration: e.detail.value
      })
    },
    changeActive(e){
      let type = e.target.dataset.type
      if(type=='1'){
        this.setData({
          btnStatus:'1',
          weight:'180g',
          price:24
        })

      }else{
        this.setData({
          btnStatus:'2',
          weight:'360g',
          price:48
        })
      }
      this.calculatePrice()
    },
    changeNum(e){
      let type = e.target.dataset.type
      if(type=='0'&&this.data.num>1){
        this.setData({
          num:--this.data.num
        }) 
      }else if(type=='1'){
        this.setData({
          num:++this.data.num
        })
      }
      this.calculatePrice()
    },
    calculatePrice(){
      let num = this.data.num
      let price = this.data.price
      let totalPrice = num * price
      this.setData({
        totalPrice:totalPrice
      })
    },
    goConfirmOder(){
      let goodid = this.data.goodid
      wx.navigateTo({
        //url: '../orderconfirm/orderconfirm?goodid='+goodid,
        url:'../addAdress/addAdress?goodid='+goodid
      })
    }
})