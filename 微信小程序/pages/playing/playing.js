// pages/playing/playing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: [],
    recommendedvideo: [],
    id: 0,
    //获取视频列表  图片的  数据
    videoPicture: [],
    //评论列表
    commentsList: [],
    //用户头像
    userpicture: [],
    commentNum: 0
  },


//获取视频列表函数
  getVedioList: function () {
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
        // console.log(res.data.data.videosList)
        // console.log(res)

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  
  // 获取推荐列表函数
  getRecommendedVideo: function(){
    var that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/othersList',
      data:'',
      header:{},
      method:'GET',
      dataType:'json',
      responseType:'text',
      success:function(res){
        console.log(res)
        //将取到的视频列表数据数组数据添加到data数据中
        that.setData({
          recommendedvideo:res.data.data.othersList,
        })

        //遍历推荐视频列表
        var  pictureArr = [];
        for(var i=0;i<res.data.data.othersList.length;i++){
          var str = res.data.data.othersList[i].imgSrc.substring(0, res.data.data.othersList[i].imgSrc.lastIndexOf("."));
          pictureArr.push(str);
        }
        that.setData({
          videoPicture:pictureArr,
        })

      },
      fail:function(res){},
      complete:function(res){}
    })
  },

  //获取评论列表数据
  getCommentsList : function() {
      var  that = this;
      wx.request({
        url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/commentsList',
        data:'',
        header:{},
        method:'GET',
        dataType:'json',
        responseType:'text',
        success:function(res){
          console.log(res)
          //将获取的评论数数目添加到data数据中
          that.setData({
            commentNum: res.data.data.commentData.commentTotalCount,

          })
          //将获取的评论列表添加到data数据中
          that.setData({
            commentsList: res.data.data.commentData.commentList,
          })

          //遍历评论列表
          var  commentArr = [];
          for (var i = 0;i<res.data.data.commentData.commentList.length;i++){
            var str = res.data.data.commentData.commentList[i].userIconSrc.substring(0, res.data.data.commentData.commentList[i].userIconSrc.lastIndexOf("."))
            commentArr.push(str);
          }
          that.setData({
            userpicture: commentArr,
          })
          
        },
        fail:function(res){},
        complete:function(res){}
      })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //调用获取视频列表的函数
    this.getVedioList();
    this.getRecommendedVideo();
    this.getCommentsList();
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

  }
})