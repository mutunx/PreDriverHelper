// pages/testPage/testPage.js
var timer = require("../../utils/wxTimer.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
      tabList:["刷题模式","背题模式"],
      isShowMode:0,
      items:[      ], //题目集
      current:0,
      showResult:false,
      choosedAnswers:[], //用户答案集
      trueNum:0,
      worryNum:0,
      answer:['D','A','B','C','D'],
      userAnswer:[],
      type:-1, //科目一:1 科目四:4
      total:0, //题库总数
      pageIndex:0,
      pageSize:10,
      isSort: -1, //是不是分类答题
      url:"",
      cid:-1,
      status:"",
  },

  /**
   * 模式切换事件点击
   */
  tabItemClick: function (e) {
    this.setData({
      isShowMode: e.currentTarget.dataset.pos
    })
  },
  /**
   * 题目切换
   */
  contentChange: function(e) {
    // console.log(e.detail.current)
    var that = this
    var current = e.detail.current;
    var pageIndex = this.data.pageIndex
    var pageSize = this.data.pageSize
    let url = "";
    let data = {};
    console.log("current:",current,"pageIdex:",pageIndex,"pageSize:",pageSize)
    //如果刷到头就载入下一页的
    if(current+1 >= (pageIndex+1)*pageSize) {
      //获取下一页题目
      pageIndex += 1;
      that.setData({pageIndex:pageIndex});
      if (this.data.cid > -1) {
        url = "http://apicloud.mob.com/tiku/shitiku/query"
        data = {
          key: '2a1e2819ba25c',
          page: that.data.pageIndex,
          size: that.data.pageSize,
          cid: that.data.cid,
        }
      } else {
        url = "http://localhost:8080/question/getAll"
        data = {
          pageIndex: that.data.pageIndex,
          pageSize: that.data.pageSize,
          type: that.data.type,
        }
      }
      wx:wx.request({
        url: url,
        data: data,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' 
        },
        success: function(res) {
          var items = that.data.items
          var newItems = res.data.data
          for (var i = 0; i < newItems.length; i++) {
            items.push(newItems[i])

          }
          console.log("items",items)
          that.setData({items:items})
          
        },
        fail: function(res) {},
        complete: function(res) {},
      })
      //更新到题目库
    }
  },
  /**
   * 选择选项
   */
  radioChange: function(e) {
    var that = this;
    // console.log(e.currentTarget.dataset.pos)
    var qIndex = e.currentTarget.dataset.pos; //获取当前题目的下标
    // console.log(e.detail)
    // console.log(that.data.items[qIndex].val)
    console.log(e)
    if(that.data.items[qIndex].val === e.detail.value) {  //判断答案是否正确
      that.setData({ trueNum: that.data.trueNum+1})
    } else {
      that.setData({ worryNum: that.data.worryNum+1})
    }
    
    that.setData({showResult:true})  //显示答案
    
  },
/**
 * 点击选项
 */
  tapItem: function(e) {
    var that = this
    var qIndex = e.currentTarget.dataset.pos;
    var rightAnswer = that.data.items[qIndex].val
    var chooseAnswer = e.target.id
    var chooses = [0, 'default', 'default', 'default', 'default']
    // console.log("rightAnswer:",rightAnswer);
    // console.log("chooseAnswwer",chooseAnswer);
    if (rightAnswer === chooseAnswer) {
      that.setData({ trueNum: that.data.trueNum + 1 })
      chooses[rightAnswer] = 'primary'
    } else {
      that.setData({ worryNum: that.data.worryNum + 1 })
      chooses[rightAnswer] = 'primary'
      chooses[chooseAnswer] = "warn"
    }
    // 表示已回答
    chooses[0] = 1
    console.log(chooses)
    //修改用户的答案集
    var list = that.data.choosedAnswers
    list[qIndex] = chooses
    // console.log(list)
    that.setData({ 
      showResult: true,
      // types : chooses,
      choosedAnswers : list
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 获取科目几
    var cid = (options.cid == null) ? -1:options.cid;
    var type = (options.current==0) ? 1:4;
    var status = (options.status == null) ? "":options.status;
    this.setData({
      type:type,
      cid:cid,
      status:status,
    })
  },
  /**
   * 交卷按钮
   */
  submit_exam: function() {
    wx.showModal({
      title: 'fff',
      content: '  您答对了0题\r\n答错了0题\r\n0题没有答\r\n总分\r\n及格or没及格',
      showCancel: false,
      confirmText:"返回主页",
      success:function() {
        
        wx:wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    // console.log(current)
    var url = ""
    //计时器
    var wxTimer = new timer({
      beginTime: "01:00:00",
      complete: function () {
        wx.showModal({
          title: 'fff',
          content: '  您答对了0题\r\n答错了0题\r\n0题没有答\r\n总分\r\n及格or没及格',
          showCancel: false,
          confirmText: "返回主页",
          success: function () {

            wx: wx.navigateBack({
              delta: 1,
            })
          }
        })
      }
    })
    wxTimer.start(this);
    var data = {}
    if(this.data.cid > -1) {
      url = "http://apicloud.mob.com/tiku/shitiku/query"
      data = {
        key: '2a1e2819ba25c',
        page: that.data.pageIndex,
        size: that.data.pageSize,
        cid: this.data.cid,
      }
    } else if(this.data.status !== "") {
      that.setData({
        pageIndex:1,
        pageSize:100,
      })
      url = "http://localhost:8080/question/getRandom"
      data = {
        pageIndex: that.data.pageIndex,
        pageSize: that.data.pageSize,
        type: that.data.type,
      }
    } else {
      url = "http://localhost:8080/question/getAll"
      data = {
        pageIndex: that.data.pageIndex,
        pageSize: that.data.pageSize,
        type: that.data.type,
      }
    }
    wx.request({
      // url: 'https://apicloud.mob.com/tiku/kemu1/query', // 通过api获得题目
      // data: {
      //   key: '2a1e2819ba25c',
      //   page: '1',
      //   size: '20'
      // },
      url:  url,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' // 默认值
      },
      success(res) {
        var list = []
        console.log(res)
        var pageIndex = that.data.pageIndex;
        var pageSize = that.data.pageSize;
        //初始化用户答题集
        for(var i= pageIndex*pageSize; i < (pageIndex+1)*pageSize; i++) {
          list[i] = [0, 'default', 'default', 'default', 'default']
        }
        if (that.data.cid > -1) {
          that.setData({
            items: res.data.result.list,
            choosedAnswers: list,
            total: res.data.result.total,
          })
        } else if(that.data.status !== ""){
          that.setData({
            items: res.data.data,
            choosedAnswers: list,
            total: 100,
          })
        } else {
          that.setData({
            items: res.data.data,
            choosedAnswers : list,
            total: res.data.total,
          }) 

        }
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