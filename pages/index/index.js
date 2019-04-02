//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabList:["科目一","科目四"],
    current:0 //科目一0,科目四1
  },
  onLoad: function () {
    
  },
  /**
   * 全真模拟
   */
  simulatedExam: function(e) {
    var that = this
    // console.log(that.data.current)
    var current = that.data.current;
    wx.navigateTo({
      url: '/pages/testPage/testPage?current=' + current+'&status=simlated',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
     * Tab的点击切换事件
     */
  tabItemClick: function (e) {
    this.setData({
      current: e.currentTarget.dataset.pos
    })
  },
  /**
   * 顺序答题
   */
  orderExam: function (e) {
    var that = this
    // console.log(that.data.current)
    var current = that.data.current;
    wx.navigateTo({
      url: '/pages/testPage/testPage?current='+current,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 分类答题
   */
  sortExam: function (e) {
    var that = this
    var current = that.data.current;
    ws:wx.navigateTo({
      url: '/pages/testPage/sortPage?current=' + current,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
     * 内容区域swiper的切换事件
     */
  contentChange: function (e) {
    this.setData({
      current: e.detail.current
    })
  }
})
