'use strict';

// const host = 'https://www.mama100.com';
var host = 'http://appa.mama100.cn';
var remoteImageUrl = 'https://img2.mama100.com/site/mobile/img/swisse-wxapp/21Days/images/';
var headers = {
  'content-type': 'application/json' // 默认值
};

//提示信息
function toastMessage(title, icon) {
  wx.showToast({
    title: title,
    icon: icon,
    duration: 1500,
    mask: true
  });
}

//提示信息
function showLoading(title) {
  wx.showLoading({
    title: title || '',
    mask: true
  });
  setTimeout(function () {
    wx.hideLoading();
  }, 1500);
}

//系统出错消息
function showErrorTip(content, title) {
  wx.showModal({
    title: title ? title : '提示',
    content: content,
    showCancel: false,
    success: function success(res) {}
  });
}

//判断对象为空
function isEmptyObject(obj) {
  for (var n in obj) {
    return false;
  }
  return true;
}

function isEmpty(obj) {
  if (obj == null || obj == undefined || obj.toString() == '') {
    return true;
  }
  return false;
}

// get请求
function get(url) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + url,
      method: 'GET',
      header: headers,
      success: resolve,
      fail: reject
    });
  });
}
//post请求
function post(url, data, requestHeaders) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + url,
      method: 'POST',
      header: requestHeaders ? requestHeaders : headers,
      data: data,
      success: resolve,
      fail: reject
    });
  });
}

function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

/**
 * 查看当月有多少天
 */
function getDaysInMonth(params) {
  var year = params.split("-")[0];
  var month = parseInt(params.split("-")[1]);
  if (month == 12) {
    year = year + 1;
    month = 0;
  }
  var temp = new Date(year + "/" + (month + 1) + "/1");
  temp = new Date(temp - 1);
  return temp.getDate();
}

/**
 * 查看当月第一天是星期几
 */
function getwekInMonth(params) {
  var year = params.split("-")[0];
  var month = parseInt(params.split("-")[1]);
  var temp = new Date(year + "/" + month + "/1");
  return temp.getDay();
}

/**
 * 
 * 更新session
 */
function updateSession(cb) {
  wx.login({
    success: function success(res) {
      //初始化sessionId
      get('/swisse-miniapp/miniapp/auth/getSession/' + res.code).then(function (res) {
        var result = false;
        console.log(res.data.desc);
        if (res.data.code == 100) {
          result = true;
          wx.setStorageSync('openId', res.data.data.openId); //保存openId到本地storage
          wx.setStorageSync('sessionId', res.data.data.sessionId);
        }
        typeof cb == "function" && cb(result);
      });
    }
  });
}

//阿拉伯数字转换为简写汉字
function Arabia_To_SimplifiedChinese(Num) {
  for (var i = Num.length - 1; i >= 0; i--) {
    Num = Num.replace(",", ""); //替换Num中的“,”
    Num = Num.replace(" ", ""); //替换Num中的空格
  }
  if (isNaN(Num)) {
    //验证输入的字符是否为数字
    //alert("请检查小写金额是否正确");
    return;
  }
  //字符处理完毕后开始转换，采用前后两部分分别转换
  var part = String(Num).split(".");
  var newchar = "";
  //小数点前进行转化
  for (i = part[0].length - 1; i >= 0; i--) {
    if (part[0].length > 10) {
      //alert("位数过大，无法计算");
      return "";
    } //若数量超过拾亿单位，提示
    var tmpnewchar = "";
    var perchar = part[0].charAt(i);
    switch (perchar) {
      case "0":
        tmpnewchar = "零" + tmpnewchar;break;
      case "1":
        tmpnewchar = "一" + tmpnewchar;break;
      case "2":
        tmpnewchar = "二" + tmpnewchar;break;
      case "3":
        tmpnewchar = "三" + tmpnewchar;break;
      case "4":
        tmpnewchar = "四" + tmpnewchar;break;
      case "5":
        tmpnewchar = "五" + tmpnewchar;break;
      case "6":
        tmpnewchar = "六" + tmpnewchar;break;
      case "7":
        tmpnewchar = "七" + tmpnewchar;break;
      case "8":
        tmpnewchar = "八" + tmpnewchar;break;
      case "9":
        tmpnewchar = "九" + tmpnewchar;break;
    }
    switch (part[0].length - i - 1) {
      case 0:
        tmpnewchar = tmpnewchar;break;
      case 1:
        if (perchar != 0) tmpnewchar = tmpnewchar + "十";break;
      case 2:
        if (perchar != 0) tmpnewchar = tmpnewchar + "百";break;
      case 3:
        if (perchar != 0) tmpnewchar = tmpnewchar + "千";break;
      case 4:
        tmpnewchar = tmpnewchar + "万";break;
      case 5:
        if (perchar != 0) tmpnewchar = tmpnewchar + "十";break;
      case 6:
        if (perchar != 0) tmpnewchar = tmpnewchar + "百";break;
      case 7:
        if (perchar != 0) tmpnewchar = tmpnewchar + "千";break;
      case 8:
        tmpnewchar = tmpnewchar + "亿";break;
      case 9:
        tmpnewchar = tmpnewchar + "十";break;
    }
    newchar = tmpnewchar + newchar;
  }
  //替换所有无用汉字，直到没有此类无用的数字为止
  while (newchar.search("零零") != -1 || newchar.search("零亿") != -1 || newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
    newchar = newchar.replace("零亿", "亿");
    newchar = newchar.replace("亿万", "亿");
    newchar = newchar.replace("零万", "万");
    newchar = newchar.replace("零零", "零");
  }
  //替换以“一十”开头的，为“十”
  if (newchar.indexOf("一十") == 0) {
    newchar = newchar.substr(1);
  }
  //替换以“零”结尾的，为“”
  if (newchar.lastIndexOf("零") == newchar.length - 1) {
    newchar = newchar.substr(0, newchar.length - 1);
  }
  return newchar;
}

module.exports = {
  formatNumber: formatNumber,
  formatTime: formatTime,
  get: get,
  post: post,
  toastMessage: toastMessage,
  showLoading: showLoading,
  isEmpty: isEmpty,
  getDaysInMonth: getDaysInMonth,
  getwekInMonth: getwekInMonth,
  updateSession: updateSession,
  showErrorTip: showErrorTip,
  remoteImageUrl: remoteImageUrl,
  Arabia_To_SimplifiedChinese: Arabia_To_SimplifiedChinese
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOlsiaG9zdCIsInJlbW90ZUltYWdlVXJsIiwiaGVhZGVycyIsInRvYXN0TWVzc2FnZSIsInRpdGxlIiwiaWNvbiIsInd4Iiwic2hvd1RvYXN0IiwiZHVyYXRpb24iLCJtYXNrIiwic2hvd0xvYWRpbmciLCJzZXRUaW1lb3V0IiwiaGlkZUxvYWRpbmciLCJzaG93RXJyb3JUaXAiLCJjb250ZW50Iiwic2hvd01vZGFsIiwic2hvd0NhbmNlbCIsInN1Y2Nlc3MiLCJyZXMiLCJpc0VtcHR5T2JqZWN0Iiwib2JqIiwibiIsImlzRW1wdHkiLCJ1bmRlZmluZWQiLCJ0b1N0cmluZyIsImdldCIsInVybCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVxdWVzdCIsIm1ldGhvZCIsImhlYWRlciIsImZhaWwiLCJwb3N0IiwiZGF0YSIsInJlcXVlc3RIZWFkZXJzIiwiZm9ybWF0VGltZSIsImRhdGUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJtb250aCIsImdldE1vbnRoIiwiZGF5IiwiZ2V0RGF0ZSIsImhvdXIiLCJnZXRIb3VycyIsIm1pbnV0ZSIsImdldE1pbnV0ZXMiLCJzZWNvbmQiLCJnZXRTZWNvbmRzIiwibWFwIiwiZm9ybWF0TnVtYmVyIiwiam9pbiIsImdldERheXNJbk1vbnRoIiwicGFyYW1zIiwic3BsaXQiLCJwYXJzZUludCIsInRlbXAiLCJEYXRlIiwiZ2V0d2VrSW5Nb250aCIsImdldERheSIsInVwZGF0ZVNlc3Npb24iLCJjYiIsImxvZ2luIiwiY29kZSIsInRoZW4iLCJyZXN1bHQiLCJjb25zb2xlIiwibG9nIiwiZGVzYyIsInNldFN0b3JhZ2VTeW5jIiwib3BlbklkIiwic2Vzc2lvbklkIiwiQXJhYmlhX1RvX1NpbXBsaWZpZWRDaGluZXNlIiwiTnVtIiwiaSIsImxlbmd0aCIsInJlcGxhY2UiLCJpc05hTiIsInBhcnQiLCJTdHJpbmciLCJuZXdjaGFyIiwidG1wbmV3Y2hhciIsInBlcmNoYXIiLCJjaGFy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UUFBUUosT0FBUixDQUFnQixJQUFoQixFQUFzQixHQUF0QixDQUFWO0FBQ0FJLGNBQVVBLFFBQVFKLE9BQVIsQ0FBZ0IsSUFBaEIsRUFBc0IsR0FBdEIsQ0FBVjtBQUNEO0FBQ0Q7QUFDQSxNQUFJSSxRQUFRSyxPQUFSLENBQWdCLElBQWhCLEtBQXlCLENBQTdCLEVBQWdDO0FBQzlCTCxjQUFVQSxRQUFRTSxNQUFSLENBQWUsQ0FBZixDQUFWO0FBQ0Q7QUFDRDtBQUNBLE1BQUlOLFFBQVFPLFdBQVIsQ0FBb0IsR0FBcEIsS0FBNEJQLFFBQVFMLE1BQVIsR0FBaUIsQ0FBakQsRUFBb0Q7QUFDbERLLGNBQVVBLFFBQVFNLE1BQVIsQ0FBZSxDQUFmLEVBQWtCTixRQUFRTCxNQUFSLEdBQWlCLENBQW5DLENBQVY7QUFDRDtBQUNELFNBQU9LLE9BQVA7QUFDRDs7QUFFRFEsT0FBT0MsT0FBUCxHQUFpQjtBQUNmdkMsZ0JBQWNBLFlBREM7QUFFZmYsY0FBWUEsVUFGRztBQUdmWixPQUFLQSxHQUhVO0FBSWZTLFFBQU1BLElBSlM7QUFLZi9CLGdCQUFjQSxZQUxDO0FBTWZPLGVBQWFBLFdBTkU7QUFPZlksV0FBU0EsT0FQTTtBQVFmZ0Msa0JBQWdCQSxjQVJEO0FBU2ZNLGlCQUFlQSxhQVRBO0FBVWZFLGlCQUFlQSxhQVZBO0FBV2ZqRCxnQkFBY0EsWUFYQztBQVlmWixrQkFBZ0JBLGNBWkQ7QUFhZnlFLCtCQUE2QkE7QUFiZCxDQUFqQiIsImZpbGUiOiJ1dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gY29uc3QgaG9zdCA9ICdodHRwczovL3d3dy5tYW1hMTAwLmNvbSc7XHJcbmNvbnN0IGhvc3QgPSAnaHR0cDovL2FwcGEubWFtYTEwMC5jbic7XHJcbmNvbnN0IHJlbW90ZUltYWdlVXJsID0gJ2h0dHBzOi8vaW1nMi5tYW1hMTAwLmNvbS9zaXRlL21vYmlsZS9pbWcvc3dpc3NlLXd4YXBwLzIxRGF5cy9pbWFnZXMvJztcclxuY29uc3QgaGVhZGVycyA9IHtcclxuICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIC8vIOm7mOiupOWAvFxyXG59O1xyXG5cclxuLy/mj5DnpLrkv6Hmga9cclxuZnVuY3Rpb24gdG9hc3RNZXNzYWdlKHRpdGxlLGljb24pIHtcclxuICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgaWNvbjogaWNvbixcclxuICAgIGR1cmF0aW9uOiAxNTAwLFxyXG4gICAgbWFzazogdHJ1ZVxyXG4gIH0pO1xyXG59XHJcblxyXG4vL+aPkOekuuS/oeaBr1xyXG5mdW5jdGlvbiBzaG93TG9hZGluZyh0aXRsZSkge1xyXG4gIHd4LnNob3dMb2FkaW5nKHtcclxuICAgIHRpdGxlOiB0aXRsZSB8fCAnJyxcclxuICAgIG1hc2s6IHRydWVcclxuICB9KVxyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gIH0sIDE1MDApXHJcbn1cclxuXHJcbi8v57O757uf5Ye66ZSZ5raI5oGvXHJcbiBmdW5jdGlvbiBzaG93RXJyb3JUaXAoY29udGVudCx0aXRsZSkge1xyXG4gIHd4LnNob3dNb2RhbCh7XHJcbiAgICB0aXRsZTogdGl0bGUgPyB0aXRsZSA6ICfmj5DnpLonLFxyXG4gICAgY29udGVudDogY29udGVudCxcclxuICAgIHNob3dDYW5jZWw6IGZhbHNlLFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcblxyXG4gICAgfVxyXG4gIH0pXHJcbiB9XHJcblxyXG4vL+WIpOaWreWvueixoeS4uuepulxyXG5mdW5jdGlvbiBpc0VtcHR5T2JqZWN0KG9iaikge1xyXG4gIGZvciAodmFyIG4gaW4gb2JqKSB7XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzRW1wdHkob2JqKSB7XHJcbiAgaWYgKG9iaiA9PSBudWxsIHx8IG9iaiA9PSB1bmRlZmluZWQgfHwgb2JqLnRvU3RyaW5nKCkgPT0gJycpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbi8vIGdldOivt+axglxyXG5mdW5jdGlvbiBnZXQodXJsKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6IGhvc3QrdXJsLFxyXG4gICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICBoZWFkZXI6IGhlYWRlcnMsXHJcbiAgICAgIHN1Y2Nlc3M6IHJlc29sdmUsXHJcbiAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgfSk7XHJcbiAgfSlcclxufVxyXG4vL3Bvc3Tor7fmsYJcclxuZnVuY3Rpb24gcG9zdCh1cmwsIGRhdGEscmVxdWVzdEhlYWRlcnMpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybDogaG9zdCArIHVybCxcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGhlYWRlcjpyZXF1ZXN0SGVhZGVycz9yZXF1ZXN0SGVhZGVyczogaGVhZGVycyxcclxuICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgc3VjY2VzczogcmVzb2x2ZSxcclxuICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICB9KTtcclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBmb3JtYXRUaW1lKGRhdGUpIHtcclxuICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxyXG4gIHZhciBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDFcclxuICB2YXIgZGF5ID0gZGF0ZS5nZXREYXRlKClcclxuXHJcbiAgdmFyIGhvdXIgPSBkYXRlLmdldEhvdXJzKClcclxuICB2YXIgbWludXRlID0gZGF0ZS5nZXRNaW51dGVzKClcclxuICB2YXIgc2Vjb25kID0gZGF0ZS5nZXRTZWNvbmRzKClcclxuXHJcblxyXG4gIHJldHVybiBbeWVhciwgbW9udGgsIGRheV0ubWFwKGZvcm1hdE51bWJlcikuam9pbignLycpICsgJyAnICsgW2hvdXIsIG1pbnV0ZSwgc2Vjb25kXS5tYXAoZm9ybWF0TnVtYmVyKS5qb2luKCc6JylcclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0TnVtYmVyKG4pIHtcclxuICBuID0gbi50b1N0cmluZygpXHJcbiAgcmV0dXJuIG5bMV0gPyBuIDogJzAnICsgblxyXG59XHJcblxyXG4vKipcclxuICog5p+l55yL5b2T5pyI5pyJ5aSa5bCR5aSpXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXREYXlzSW5Nb250aChwYXJhbXMpe1xyXG4gIHZhciB5ZWFyID0gcGFyYW1zLnNwbGl0KFwiLVwiKVswXTtcclxuICB2YXIgbW9udGggPSBwYXJzZUludChwYXJhbXMuc3BsaXQoXCItXCIpWzFdKTtcclxuICBpZihtb250aCA9PSAxMil7XHJcbiAgICAgIHllYXIgPSB5ZWFyKzE7XHJcbiAgICAgIG1vbnRoID0gMDtcclxuICB9XHJcbiAgdmFyIHRlbXAgPSBuZXcgRGF0ZSh5ZWFyICsgXCIvXCIgKyAobW9udGgrMSkgKyBcIi8xXCIgKTtcclxuICB0ZW1wID0gbmV3IERhdGUodGVtcCAtIDEpXHJcbiAgcmV0dXJuIHRlbXAuZ2V0RGF0ZSgpO1xyXG59XHJcblxyXG4vKipcclxuICog5p+l55yL5b2T5pyI56ys5LiA5aSp5piv5pif5pyf5YegXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXR3ZWtJbk1vbnRoKHBhcmFtcyl7XHJcbiAgdmFyIHllYXIgPSBwYXJhbXMuc3BsaXQoXCItXCIpWzBdO1xyXG4gIHZhciBtb250aCA9IHBhcnNlSW50KHBhcmFtcy5zcGxpdChcIi1cIilbMV0pO1xyXG4gIHZhciB0ZW1wID0gbmV3IERhdGUoeWVhcitcIi9cIittb250aCtcIi8xXCIpO1xyXG4gIHJldHVybiB0ZW1wLmdldERheSgpO1xyXG59XHJcblxyXG4vKipcclxuICogXHJcbiAqIOabtOaWsHNlc3Npb25cclxuICovXHJcbmZ1bmN0aW9uIHVwZGF0ZVNlc3Npb24oY2IpIHtcclxuICB3eC5sb2dpbih7XHJcbiAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAvL+WIneWni+WMlnNlc3Npb25JZFxyXG4gICAgICBnZXQoJy9zd2lzc2UtbWluaWFwcC9taW5pYXBwL2F1dGgvZ2V0U2Vzc2lvbi8nICsgcmVzLmNvZGUpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEuZGVzYyk7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT0gMTAwKSB7XHJcbiAgICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ29wZW5JZCcsIHJlcy5kYXRhLmRhdGEub3BlbklkKTsgIC8v5L+d5a2Yb3Blbklk5Yiw5pys5Zywc3RvcmFnZVxyXG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb25JZCcsIHJlcy5kYXRhLmRhdGEuc2Vzc2lvbklkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHlwZW9mIGNiID09IFwiZnVuY3Rpb25cIiAmJiBjYihyZXN1bHQpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuLy/pmL/mi4nkvK/mlbDlrZfovazmjaLkuLrnroDlhpnmsYnlrZdcclxuZnVuY3Rpb24gQXJhYmlhX1RvX1NpbXBsaWZpZWRDaGluZXNlKE51bSkge1xyXG4gIGZvciAodmFyIGkgPSBOdW0ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgIE51bSA9IE51bS5yZXBsYWNlKFwiLFwiLCBcIlwiKS8v5pu/5o2iTnVt5Lit55qE4oCcLOKAnVxyXG4gICAgTnVtID0gTnVtLnJlcGxhY2UoXCIgXCIsIFwiXCIpLy/mm7/mjaJOdW3kuK3nmoTnqbrmoLxcclxuICB9XHJcbiAgaWYgKGlzTmFOKE51bSkpIHsgLy/pqozor4HovpPlhaXnmoTlrZfnrKbmmK/lkKbkuLrmlbDlrZdcclxuICAgIC8vYWxlcnQoXCLor7fmo4Dmn6XlsI/lhpnph5Hpop3mmK/lkKbmraPnoa5cIik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIC8v5a2X56ym5aSE55CG5a6M5q+V5ZCO5byA5aeL6L2s5o2i77yM6YeH55So5YmN5ZCO5Lik6YOo5YiG5YiG5Yir6L2s5o2iXHJcbiAgdmFyIHBhcnQgPSBTdHJpbmcoTnVtKS5zcGxpdChcIi5cIik7XHJcbiAgdmFyIG5ld2NoYXIgPSBcIlwiO1xyXG4gIC8v5bCP5pWw54K55YmN6L+b6KGM6L2s5YyWXHJcbiAgZm9yIChpID0gcGFydFswXS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgaWYgKHBhcnRbMF0ubGVuZ3RoID4gMTApIHtcclxuICAgICAgLy9hbGVydChcIuS9jeaVsOi/h+Wkp++8jOaXoOazleiuoeeul1wiKTtcclxuICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9Ly/oi6XmlbDph4/otoXov4fmi77kur/ljZXkvY3vvIzmj5DnpLpcclxuICAgIHZhciB0bXBuZXdjaGFyID0gXCJcIlxyXG4gICAgdmFyIHBlcmNoYXIgPSBwYXJ0WzBdLmNoYXJBdChpKTtcclxuICAgIHN3aXRjaCAocGVyY2hhcikge1xyXG4gICAgICBjYXNlIFwiMFwiOiB0bXBuZXdjaGFyID0gXCLpm7ZcIiArIHRtcG5ld2NoYXI7IGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMVwiOiB0bXBuZXdjaGFyID0gXCLkuIBcIiArIHRtcG5ld2NoYXI7IGJyZWFrO1xyXG4gICAgICBjYXNlIFwiMlwiOiB0bXBuZXdjaGFyID0gXCLkuoxcIiArIHRtcG5ld2NoYXI7IGJyZWFrO1xyXG4gICAgICBjYXNlIFwiM1wiOiB0bXBuZXdjaGFyID0gXCLkuIlcIiArIHRtcG5ld2NoYXI7IGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNFwiOiB0bXBuZXdjaGFyID0gXCLlm5tcIiArIHRtcG5ld2NoYXI7IGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNVwiOiB0bXBuZXdjaGFyID0gXCLkupRcIiArIHRtcG5ld2NoYXI7IGJyZWFrO1xyXG4gICAgICBjYXNlIFwiNlwiOiB0bXBuZXdjaGFyID0gXCLlha1cIiArIHRtcG5ld2NoYXI7IGJyZWFrO1xyXG4gICAgICBjYXNlIFwiN1wiOiB0bXBuZXdjaGFyID0gXCLkuINcIiArIHRtcG5ld2NoYXI7IGJyZWFrO1xyXG4gICAgICBjYXNlIFwiOFwiOiB0bXBuZXdjaGFyID0gXCLlhatcIiArIHRtcG5ld2NoYXI7IGJyZWFrO1xyXG4gICAgICBjYXNlIFwiOVwiOiB0bXBuZXdjaGFyID0gXCLkuZ1cIiArIHRtcG5ld2NoYXI7IGJyZWFrO1xyXG4gICAgfVxyXG4gICAgc3dpdGNoIChwYXJ0WzBdLmxlbmd0aCAtIGkgLSAxKSB7XHJcbiAgICAgIGNhc2UgMDogdG1wbmV3Y2hhciA9IHRtcG5ld2NoYXI7IGJyZWFrO1xyXG4gICAgICBjYXNlIDE6IGlmIChwZXJjaGFyICE9IDApIHRtcG5ld2NoYXIgPSB0bXBuZXdjaGFyICsgXCLljYFcIjsgYnJlYWs7XHJcbiAgICAgIGNhc2UgMjogaWYgKHBlcmNoYXIgIT0gMCkgdG1wbmV3Y2hhciA9IHRtcG5ld2NoYXIgKyBcIueZvlwiOyBicmVhaztcclxuICAgICAgY2FzZSAzOiBpZiAocGVyY2hhciAhPSAwKSB0bXBuZXdjaGFyID0gdG1wbmV3Y2hhciArIFwi5Y2DXCI7IGJyZWFrO1xyXG4gICAgICBjYXNlIDQ6IHRtcG5ld2NoYXIgPSB0bXBuZXdjaGFyICsgXCLkuIdcIjsgYnJlYWs7XHJcbiAgICAgIGNhc2UgNTogaWYgKHBlcmNoYXIgIT0gMCkgdG1wbmV3Y2hhciA9IHRtcG5ld2NoYXIgKyBcIuWNgVwiOyBicmVhaztcclxuICAgICAgY2FzZSA2OiBpZiAocGVyY2hhciAhPSAwKSB0bXBuZXdjaGFyID0gdG1wbmV3Y2hhciArIFwi55m+XCI7IGJyZWFrO1xyXG4gICAgICBjYXNlIDc6IGlmIChwZXJjaGFyICE9IDApIHRtcG5ld2NoYXIgPSB0bXBuZXdjaGFyICsgXCLljYNcIjsgYnJlYWs7XHJcbiAgICAgIGNhc2UgODogdG1wbmV3Y2hhciA9IHRtcG5ld2NoYXIgKyBcIuS6v1wiOyBicmVhaztcclxuICAgICAgY2FzZSA5OiB0bXBuZXdjaGFyID0gdG1wbmV3Y2hhciArIFwi5Y2BXCI7IGJyZWFrO1xyXG4gICAgfVxyXG4gICAgbmV3Y2hhciA9IHRtcG5ld2NoYXIgKyBuZXdjaGFyO1xyXG4gIH1cclxuICAvL+abv+aNouaJgOacieaXoOeUqOaxieWtl++8jOebtOWIsOayoeacieatpOexu+aXoOeUqOeahOaVsOWtl+S4uuatolxyXG4gIHdoaWxlIChuZXdjaGFyLnNlYXJjaChcIumbtumbtlwiKSAhPSAtMSB8fCBuZXdjaGFyLnNlYXJjaChcIumbtuS6v1wiKSAhPSAtMSB8fCBuZXdjaGFyLnNlYXJjaChcIuS6v+S4h1wiKSAhPSAtMSB8fCBuZXdjaGFyLnNlYXJjaChcIumbtuS4h1wiKSAhPSAtMSkge1xyXG4gICAgbmV3Y2hhciA9IG5ld2NoYXIucmVwbGFjZShcIumbtuS6v1wiLCBcIuS6v1wiKTtcclxuICAgIG5ld2NoYXIgPSBuZXdjaGFyLnJlcGxhY2UoXCLkur/kuIdcIiwgXCLkur9cIik7XHJcbiAgICBuZXdjaGFyID0gbmV3Y2hhci5yZXBsYWNlKFwi6Zu25LiHXCIsIFwi5LiHXCIpO1xyXG4gICAgbmV3Y2hhciA9IG5ld2NoYXIucmVwbGFjZShcIumbtumbtlwiLCBcIumbtlwiKTtcclxuICB9XHJcbiAgLy/mm7/mjaLku6XigJzkuIDljYHigJ3lvIDlpLTnmoTvvIzkuLrigJzljYHigJ1cclxuICBpZiAobmV3Y2hhci5pbmRleE9mKFwi5LiA5Y2BXCIpID09IDApIHtcclxuICAgIG5ld2NoYXIgPSBuZXdjaGFyLnN1YnN0cigxKTtcclxuICB9XHJcbiAgLy/mm7/mjaLku6XigJzpm7bigJ3nu5PlsL7nmoTvvIzkuLrigJzigJ1cclxuICBpZiAobmV3Y2hhci5sYXN0SW5kZXhPZihcIumbtlwiKSA9PSBuZXdjaGFyLmxlbmd0aCAtIDEpIHtcclxuICAgIG5ld2NoYXIgPSBuZXdjaGFyLnN1YnN0cigwLCBuZXdjaGFyLmxlbmd0aCAtIDEpO1xyXG4gIH1cclxuICByZXR1cm4gbmV3Y2hhcjtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgZm9ybWF0TnVtYmVyOiBmb3JtYXROdW1iZXIsXHJcbiAgZm9ybWF0VGltZTogZm9ybWF0VGltZSxcclxuICBnZXQ6IGdldCxcclxuICBwb3N0OiBwb3N0LFxyXG4gIHRvYXN0TWVzc2FnZTogdG9hc3RNZXNzYWdlLFxyXG4gIHNob3dMb2FkaW5nOiBzaG93TG9hZGluZyxcclxuICBpc0VtcHR5OiBpc0VtcHR5LFxyXG4gIGdldERheXNJbk1vbnRoOiBnZXREYXlzSW5Nb250aCxcclxuICBnZXR3ZWtJbk1vbnRoOiBnZXR3ZWtJbk1vbnRoLFxyXG4gIHVwZGF0ZVNlc3Npb246IHVwZGF0ZVNlc3Npb24sXHJcbiAgc2hvd0Vycm9yVGlwOiBzaG93RXJyb3JUaXAsXHJcbiAgcmVtb3RlSW1hZ2VVcmw6IHJlbW90ZUltYWdlVXJsLFxyXG4gIEFyYWJpYV9Ub19TaW1wbGlmaWVkQ2hpbmVzZTogQXJhYmlhX1RvX1NpbXBsaWZpZWRDaGluZXNlXHJcbn1cclxuIl19