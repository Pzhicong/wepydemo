// const host = 'https://www.mama100.com';
const host = 'http://appa.mama100.cn';
const remoteImageUrl = 'https://img2.mama100.com/site/mobile/img/swisse-wxapp/21Days/images/';
const headers = {
  'content-type': 'application/json' // 默认值
};

//提示信息
function toastMessage(title,icon) {
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
  })
  setTimeout(function () {
    wx.hideLoading()
  }, 1500)
}

//系统出错消息
 function showErrorTip(content,title) {
  wx.showModal({
    title: title ? title : '提示',
    content: content,
    showCancel: false,
    success: function(res) {

    }
  })
 }

//判断对象为空
function isEmptyObject(obj) {
  for (var n in obj) {
    return false
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
  return new Promise((resolve, reject) => {
    wx.request({
      url: host+url,
      method: 'GET',
      header: headers,
      success: resolve,
      fail: reject
    });
  })
}
//post请求
function post(url, data,requestHeaders) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: 'POST',
      header:requestHeaders?requestHeaders: headers,
      data: data,
      success: resolve,
      fail: reject
    });
  })
}

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 查看当月有多少天
 */
function getDaysInMonth(params){
  var year = params.split("-")[0];
  var month = parseInt(params.split("-")[1]);
  if(month == 12){
      year = year+1;
      month = 0;
  }
  var temp = new Date(year + "/" + (month+1) + "/1" );
  temp = new Date(temp - 1)
  return temp.getDate();
}

/**
 * 查看当月第一天是星期几
 */
function getwekInMonth(params){
  var year = params.split("-")[0];
  var month = parseInt(params.split("-")[1]);
  var temp = new Date(year+"/"+month+"/1");
  return temp.getDay();
}

/**
 * 
 * 更新session
 */
function updateSession(cb) {
  wx.login({
    success: res => {
      //初始化sessionId
      get('/swisse-miniapp/miniapp/auth/getSession/' + res.code).then(res => {
        var result = false;
        console.log(res.data.desc);
        if (res.data.code == 100) {
          result = true;
          wx.setStorageSync('openId', res.data.data.openId);  //保存openId到本地storage
          wx.setStorageSync('sessionId', res.data.data.sessionId);
        }
        typeof cb == "function" && cb(result)
      })
    }
  })
}

//阿拉伯数字转换为简写汉字
function Arabia_To_SimplifiedChinese(Num) {
  for (var i = Num.length - 1; i >= 0; i--) {
    Num = Num.replace(",", "")//替换Num中的“,”
    Num = Num.replace(" ", "")//替换Num中的空格
  }
  if (isNaN(Num)) { //验证输入的字符是否为数字
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
    }//若数量超过拾亿单位，提示
    var tmpnewchar = ""
    var perchar = part[0].charAt(i);
    switch (perchar) {
      case "0": tmpnewchar = "零" + tmpnewchar; break;
      case "1": tmpnewchar = "一" + tmpnewchar; break;
      case "2": tmpnewchar = "二" + tmpnewchar; break;
      case "3": tmpnewchar = "三" + tmpnewchar; break;
      case "4": tmpnewchar = "四" + tmpnewchar; break;
      case "5": tmpnewchar = "五" + tmpnewchar; break;
      case "6": tmpnewchar = "六" + tmpnewchar; break;
      case "7": tmpnewchar = "七" + tmpnewchar; break;
      case "8": tmpnewchar = "八" + tmpnewchar; break;
      case "9": tmpnewchar = "九" + tmpnewchar; break;
    }
    switch (part[0].length - i - 1) {
      case 0: tmpnewchar = tmpnewchar; break;
      case 1: if (perchar != 0) tmpnewchar = tmpnewchar + "十"; break;
      case 2: if (perchar != 0) tmpnewchar = tmpnewchar + "百"; break;
      case 3: if (perchar != 0) tmpnewchar = tmpnewchar + "千"; break;
      case 4: tmpnewchar = tmpnewchar + "万"; break;
      case 5: if (perchar != 0) tmpnewchar = tmpnewchar + "十"; break;
      case 6: if (perchar != 0) tmpnewchar = tmpnewchar + "百"; break;
      case 7: if (perchar != 0) tmpnewchar = tmpnewchar + "千"; break;
      case 8: tmpnewchar = tmpnewchar + "亿"; break;
      case 9: tmpnewchar = tmpnewchar + "十"; break;
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
}
