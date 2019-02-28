//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabList:["科目一","科目四"],
    current:0
  },
  onLoad: function () {
    
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
     * 内容区域swiper的切换事件
     */
  contentChange: function (e) {
    this.setData({
      current: e.detail.current
    })
  }
})
