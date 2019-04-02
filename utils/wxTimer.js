var wxtimer = function (initObj) {
  initObj = initObj || {};
  this.beginTime = initObj.beginTime || "00:00:00";
  this.interval = initObj.interval || 0;
  this.complete = initObj.complete;
  this.intervalFn = initObj.intervalFn;

  this.startTime
}

wxtimer.prototype = {
  // 开始
  start: function (self) {
    this.endTime = new Date("1970/01/01 " + this.beginTime).getTime();//1970 年 1 月 1 日的 00：00：00 的字符串日期
    this.endSystemTime = new Date(Date.now() + this.endTime);
    // 开始倒计时
    var that = this;
    var count = 0;// 这个 count 在这里应该是表示 s 数，js 中获得时间是 ms，所以下面 * 1000 都换成 ms
    function begin() {
      var tmpTime = new Date(that.endTime - 1000 * count++);
      // 把 2011 年 1 月 1 日日 00：00：00 换成数字型，这样就可以直接 1s，1s 的减，就变成了倒计时，为了看的更明确，又用 new date 把字符串换回来了
      var tmpTimeStr = tmpTime.toString().substr(16, 8);// 去掉前面的年月日就剩时分秒了
      var wxTimerSecond = (tmpTime.getTime() - new Date("1970/01/01 00:00:00").getTime()) / 1000;
      self.setData({
        wxTimer: tmpTimeStr,
        wxTimerSecond: wxTimerSecond,
      });
      // 时间间隔执行函数
      if (0 == (count - 1) % that.interval && that.intervalFn) {
        that.intervalFn();
      }
      // 结束执行函数
      if (wxTimerSecond <= 0) {
        if (that.complete) {
          that.complete();
        }
        that.stop();
      }
    }
    begin();
    this.intervarID = setInterval(begin, 1000);
  },
  // 结束
  stop: function () {
    clearInterval(this.intervarID);
  },
  // 校准
  calibration: function () {
    this.endTime = this.endSystemTime - Date.now();
  }
}

module.exports = wxtimer;