// pages/testPage/testPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabList:["刷题模式","背题模式"],
      items:[
        { name: "A", value:"以正常速度行驶"},
        { name: "B", value: "持续鸣喇叭示意其让道"},
        { name: "C", value: "加速绕行" },
        { name: "D", value: "提前鸣喇叭，并适当降低车速" }
      ],
      current:0
  },

  /**
   * 模式切换事件点击
   */
  tabItemClick: function (e) {
    this.setData({
      current: e.currentTarget.dataset.pos
    })
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

  }
})