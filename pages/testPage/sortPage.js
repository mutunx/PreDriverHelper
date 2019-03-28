Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabList: ["科目一", "科目四"],
    current:0,
    type:-1,
  },

  /**
   * 模式切换事件点击
   */
  tabItemClick: function (e) {
    console.log(e)
    this.setData({
      current: e.currentTarget.dataset.pos
    })
  },
  /**
   * 获取分类题目
   */
  sortClick: function(e) {
    var that = this
    // console.log(e);
    var cid = e.target.id;
    wx.navigateTo({
      url: '/pages/testPage/testPage?cid='+cid+"&current="+that.data.current,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 获取科目几
    var type = (options.current == 0) ? 1 : 4;
    this.setData({
      type: type,
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