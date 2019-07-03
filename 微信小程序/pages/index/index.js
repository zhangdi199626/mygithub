//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //获取导航栏列表数据
    nav: [],
    //设置导航栏选中状态
    active: 0,
    isActiveSearch:true,

    // 轮播图数据
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    indicatorDots: true,
    indicatorColor: "rgba(255,255,255,.3)",
    indicatorActiveColor: "#fff",
    // 轮播图数据结束

    //设置播放的是哪一个视频
    id: 0,
    //获取视频列表数据
    video: [],
    //获取视频列表 图片的数据
    vedioPicture:[],
    isActiveSerch: true




  },



  //点击搜索框函数
  onSearch: function() {
    // console.log(11);
    this.setData({
      isActiveSearch: false,
    });
  },

  // 点击x关闭搜索框 
  closeSearch: function() {
    // console.log(1230);
    this.setData({
      isActiveSearch: true,
    })
  },

  // 获取导航栏里的函数
  getNavData: function() {
    var that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/navList',
      //  请求参数
      data: '',
      header: {
        'content-type': 'application/json' //默认值
        //这里写你接口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) { //请求成功后，进行的一些函数操作
        // console.log(res.data);
        that.setData({
          nav: res.data.data.navList,
        })
        // console.log(res.data.data.navList);

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },



  // 点击导航栏函数
  onClickNav: function(e) {
    // console.log(e);
    if (e.currentTarget.dataset.id != this.data.active) {
      this.setData({
        active: e.currentTarget.dataset.id,
      })
      if (e.currentTarget.dataset.id==0){
        wx.navigateTo({
          url: '../index',
        })
     }else{
        wx.navigateTo({
          url: '../other/other?id=' + e.currentTarget.dataset.id,
        })
     }
     
    }
  },

  //获取轮播图的图片
  getlunbo: function() {
    console.log(33);
    var that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/swiperList',
      data: '',
      header: {},
      dataType: "json",
      responseType: "text",
      success: function(res) {
        console.log(res);
        //遍历轮播图
        var lunbopArr = []; //新建一个数组，用来单独存放图片的网络地址      
        console.log(111)
        for (var i = 0; i < res.data.data.swiperList.length; i++) {
          var str = res.data.data.swiperList[i].imgSrc.substring(0, res.data.data.swiperList[i].imgSrc.lastIndexOf(".")); //去掉.webp
          console.log(str);
          lunbopArr.push(str); //将去掉后缀的网络图片地址存放到刚创建的数组中去
          console.log(55);
        }

        that.setData({
          imgUrls: lunbopArr, //将该数组转到data数据当中
        })
      },
      fail: function(res) {},
      complete: function(res) {}
    })
  },

  // 获取视频列表函数
  getVideoList: function () {
    var that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/videosList',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        //将取到的视频列表数据数组数据添加到data数据中
        that.setData({
          video: res.data.data.videosList,
        })
        // console.log(res)
        //遍历视频列表
        var pictureArr = [];
        for (var i = 0; i < res.data.data.videosList.length; i++) {
          var str = res.data.data.videosList[i].imgSrc.substring(0, res.data.data.videosList[i].imgSrc.lastIndexOf(".")) //去掉.webp
          pictureArr.push(str);
        }
        that.setData({
          videoPicture: pictureArr,
        })
        // console.log(pictureArr)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  // 点击视频函
  onPlayVideo: function (e) {
    this.setData({
      id: e.currentTarget.dataset.id //判断点击的是哪一个视频
    })
     
    // console.log(this.data.id);
   
   
      wx.navigateTo({
        url: '../playing/playing?id=' + this.data.id
      })
   
    },

 

  // 生命周期函数--监听页面加载
  onLoad: function(options) {
    // console.log(22);
    this.getNavData();
    this.getlunbo();
    this.getVideoList();
   

  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})