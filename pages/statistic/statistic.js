var wxCharts = require('../../utils/wxcharts-min.js');
var app = getApp();
var pieChart = null;
Page({
  data: {
  },
  touchHandler: function (e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },
  onLoad: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    var data;
    wx:wx.request({
      url: 'http://localhost:8080/question/getStatistic',
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res.data)
        pieChart = new wxCharts({
          animation: true,
          canvasId: 'pieCanvas',
          type: 'pie',
          series: res.data.data,
          width: windowWidth,
          height: 300,
          dataLabel: true,
        });
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    
  }
});