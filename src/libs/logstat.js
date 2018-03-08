const md5 = require('./md5.min.js');
const logHost = 'https://test-01.biostime.us/';
// const logHost = 'https://pv.mama100.com';

const headers = {
  'content-type': 'application/json' // 默认值
};

//MD5哈希加密
function hashCode(ops,params){
  var hashStr = '';
  ops.created_time = (new Date()).getTime();
  ops.customer_id = params.customer_id;
  ops.user_mark = params.user_mark;
  for (var op in ops) {
    if ((ops[op] == void 0) && ops.hasOwnProperty(op)) {
      delete ops[op];
    }
    else {
      hashStr += ops[op].toString();
    }
  }
  return md5(hashStr);
}

/**
 * 埋点
 */
function logPv(params) {
  var openId = wx.getStorageSync('openId') || '';
  var customer_id = wx.getStorageSync('customerId') || '';
  // var data = Object.assign(params, {user_mark:openId,customer_id:customer_id});
  var signValue = hashCode(params,{user_mark:openId,customer_id:customer_id});
  wx.request({
    url: logHost + '/pointstats/eventpv?random=' + new Date().getTime(),
    method: 'POST',
    header: headers,
    data: {
      platform: params.platform,
      point_code: params.pointCode,
      created_time: params.created_time,
      customer_id: customer_id,
      user_mark: openId,
      sign: signValue
    },
    success: function (res) {
      console.log(res, '埋点成功');
    },
    fail: function (err) {
      console.log(res, '埋点失败');
    }
  });
}

module.exports = {
  logPv: logPv
}