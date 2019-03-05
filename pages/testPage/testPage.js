// pages/testPage/testPage.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
      tabList:["刷题模式","背题模式"],
      items:[      ],
      current:0,
      showResult:false,
      choosedAnswers:[],
      trueNum:0,
      worryNum:0,
      answer:['D','A','B','C','D'],
      userAnswer:[],
    types: ['default', 'default','default', 'default', 'default'],
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
   * 题目切换
   */
  contentChange: function(e) {
    this.setData({
      // types: ['default', 'default', 'default', 'default', 'default']
    })
  },
  /**
   * 选择选项
   */
  radioChange: function(e) {
    var myThis = this;
    // console.log(e.currentTarget.dataset.pos)
    var qIndex = e.currentTarget.dataset.pos;
    // console.log(e.detail)
    // console.log(myThis.data.items[qIndex].val)
    console.log(e)
    if(myThis.data.items[qIndex].val === e.detail.value) {
      myThis.setData({ trueNum: myThis.data.trueNum+1})
    } else {
      myThis.setData({ worryNum: myThis.data.worryNum+1})
    }
    
    myThis.setData({showResult:true})
    
  },

  tapItem: function(e) {
    var myThis = this
    var qIndex = e.currentTarget.dataset.pos;
    var rightAnswer = myThis.data.items[qIndex].val
    var chooseAnswer = e.target.id
    var chooses = [0, 'default', 'default', 'default', 'default']
    if (rightAnswer === chooseAnswer) {
      myThis.setData({ trueNum: myThis.data.trueNum + 1 })
      chooses[rightAnswer] = 'primary'
    } else {
      myThis.setData({ worryNum: myThis.data.worryNum + 1 })
      chooses[rightAnswer] = 'primary'
      chooses[chooseAnswer] = "warn"
    }
    chooses[0] = 1
    // console.log(chooses)
    var list = myThis.data.choosedAnswers
    list[qIndex] = chooses
    // console.log(list)
    myThis.setData({ 
      showResult: true,
      // types : chooses,
      choosedAnswers : list
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
    var myThis = this;
    wx.request({
      url: 'https://apicloud.mob.com/tiku/kemu1/query', // 仅为示例，并非真实的接口地址
      data: {
        key: '2a1e2819ba25c',
        page: '1',
        size: '20'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var list = []
        for(var i=1; i<21; i++) {
          list[i] = [0, 'default', 'default', 'default', 'default']
        }
        myThis.setData({
          items: res.data.result.list,
          choosedAnswers : list
        }) 
      }
    })
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