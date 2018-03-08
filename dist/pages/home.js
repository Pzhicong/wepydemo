'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _list = require('./../components/list.js');

var _list2 = _interopRequireDefault(_list);

var _panel = require('./../components/panel.js');

var _panel2 = _interopRequireDefault(_panel);

var _counter = require('./../components/counter.js');

var _counter2 = _interopRequireDefault(_counter);

var _group = require('./../components/group.js');

var _group2 = _interopRequireDefault(_group);

var _wepyComToast = require('./../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

var _test = require('./../mixins/test.js');

var _test2 = _interopRequireDefault(_test);

var _util = require('./../libs/util.js');

var _util2 = _interopRequireDefault(_util);

var _logstat = require('./../libs/logstat.js');

var _logstat2 = _interopRequireDefault(_logstat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // alias example
// alias example


var Home = function (_wepy$page) {
  _inherits(Home, _wepy$page);

  function Home() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Home);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Home.__proto__ || Object.getPrototypeOf(Home)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Home, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var cxtArc = _wepy2.default.createCanvasContext('canvasCircle');
      cxtArc.setLineWidth(10);
      cxtArc.setStrokeStyle('white');
      cxtArc.setLineCap('round');
      cxtArc.beginPath();
      cxtArc.arc(70, 70, 60, 0, 2 * Math.PI, false);
      cxtArc.stroke();
      cxtArc.draw();
      _logstat2.default.logPv({
        'platform': 7,
        'pointCode': '7010100'
      });
      if (options && options.record) {
        this.from = 'message';
      }

      var picNumber = Math.round(Math.random() * 23) + 1;
      var shareImage = _util2.default.remoteImageUrl + 'pictrue/share' + picNumber + '.jpg';
      this.shareImage = shareImage;
    }

    /**
     * 生命周期函数--监听页面显示
     */

  }, {
    key: 'onShow',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.$parent.getOpenId();

              case 2:
                this.openId = _context.sent;
                _context.next = 5;
                return this.$parent.getUserInfo();

              case 5:
                this.userInfo = _context.sent;

                this.hasUserInfo = true;
                _util2.default.get('/swisse-miniapp/miniapp/common/query/cur/sys/time').then(function (res) {
                  if (res.data.code === '100') {
                    var nowDate = res.data.data.split(' ')[0];
                    _this2.nowDate = nowDate;
                    _this2.saveOrUpdateCustInfo(_this2.openId);
                  } else {
                    _util2.default.showErrorTip('查询系统时间出错');
                  }
                });
                this.getRemindState(this.openId);
                this.checkShowRankOne(this.openId);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onShow(_x) {
        return _ref2.apply(this, arguments);
      }

      return onShow;
    }()
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(e) {
      console.log(e);
      this.$parent.globalData.userInfo = e.detail.userInfo;
      _wepy2.default.setStorageSync('userInfo', e.detail.userInfo); // 保存用户数据到storage
      this.userInfo = e.detail.userInfo;
      this.hasUserInfo = true;
      this.onShow();
    }

    /**
     * 获取提示状态
     */

  }, {
    key: 'getRemindState',
    value: function getRemindState(openId) {
      var _this3 = this;

      _util2.default.get('/swisse-miniapp/miniapp/swrun/get/send/msg/flag/' + openId).then(function (res) {
        if (res.data.code === '100') {
          _this3.checked = res.data.data === '1';
        }
      });
    }
    /**
     * 用户点击右上角分享
     */

  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {
      _logstat2.default.logPv({
        'platform': 7,
        'pointCode': '7020107'
      });
      return {
        title: '21天打卡计划',
        path: '/pages/home/home',
        imageUrl: '/images/shareLogo.jpg',
        success: function success(res) {},
        fail: function fail(res) {}
      };
    }

    /**
     * 打开弹窗
     */

  }, {
    key: 'showDownloadPic',
    value: function showDownloadPic() {
      var _this4 = this;

      _logstat2.default.logPv({
        'platform': 7,
        'pointCode': '7020103'
      });
      var openId = this.openId;
      if (!openId) {
        _util2.default.showErrorTip('openId有误');
        return;
      }
      _util2.default.showLoading('');
      _util2.default.get('/swisse-miniapp/miniapp/swrun/person/query/my/total/step/info/' + openId).then(function (res) {
        if (res.data.code === '100') {
          _this4.maskAppear = 'block';
          _this4.showCircleCanvas = 'd_none';
          _this4.personRank = res.data.data.nationTotalOrder;
          _this4.cityTotalOrder = res.data.data.cityTotalOrder;
        } else {
          _util2.default.showLoading('查询排名失败');
        }
      }).catch(function (err) {
        console.log(err);
        _util2.default.showLoading('查询排名失败');
      });
    }

    /**
     * 关闭弹窗
     */

  }, {
    key: 'closeMask',
    value: function closeMask() {
      this.maskAppear = 'none';
      this.showCircleCanvas = '';
    }

    /**
     * 使用canvas绘画并把canvas保存图片到手机相册
     */

  }, {
    key: 'saveCanvasToMobile',
    value: function saveCanvasToMobile(event) {
      var that = this;
      var shareUrl = this.shareImage;
      var codeUrl = _util2.default.remoteImageUrl + 'appCode.jpg';
      var logoUrl = _util2.default.remoteImageUrl + 'swisse.png';
      this.canvasAppear = 'block';
      var ctx = _wepy2.default.createCanvasContext('myCanvas');
      var userInfo = _wepy2.default.getStorageSync('userInfo') || '';
      var stepNum = this.stepNum ? this.stepNum.toString() : '0';
      var allStep = this.allStep ? this.allStep.toString() : '0';
      var personRank = this.personRank ? this.personRank.toString() : '0';
      var cityTotalOrder = this.cityTotalOrder ? this.cityTotalOrder.toString() : '0';
      var city = userInfo.city;
      var nickName = userInfo.nickName;
      if (nickName.length > 5) {
        nickName = nickName.substring(0, 5);
      }
      _util2.default.showLoading('');
      _wepy2.default.downloadFile({
        url: logoUrl,
        success: function success(logoRes) {
          _wepy2.default.downloadFile({
            url: userInfo.avatarUrl,
            success: function success(headRes) {
              _wepy2.default.downloadFile({
                url: shareUrl,
                success: function success(shareRes) {
                  _wepy2.default.downloadFile({
                    url: codeUrl,
                    success: function success(codeRes) {
                      ctx.setFillStyle('white');
                      ctx.fillRect(0, 0, 350, 440);
                      ctx.drawImage(logoRes.tempFilePath, 137.5, 20, 75, 28);
                      ctx.setTextAlign('center');
                      ctx.setFillStyle('black');
                      ctx.setFontSize(14);
                      ctx.fillText('庆祝生活每一天', 175, 65);
                      ctx.fillText('Live Healthy , Be Happy', 175, 85);
                      ctx.setTextAlign('left');
                      ctx.save();
                      ctx.beginPath();
                      ctx.arc(35, 347, 25, 0, 2 * Math.PI);
                      ctx.clip();
                      ctx.drawImage(headRes.tempFilePath, 10, 322, 50, 50);
                      ctx.restore();
                      ctx.drawImage(shareRes.tempFilePath, 10, 100, 330, 202);
                      ctx.setFontSize(12);
                      ctx.setFillStyle('gray');
                      ctx.setTextAlign('center');
                      ctx.fillText(nickName, 35, 392);
                      ctx.setTextAlign('left');
                      // 字12.5,数字8
                      ctx.setFillStyle('gray');
                      ctx.fillText('今天步数', 70, 338);
                      ctx.setFillStyle('red');
                      ctx.fillText(that.data.stepNum, 120, 338);
                      ctx.setFillStyle('gray');
                      ctx.fillText('步', 120 + stepNum.length * 8, 338);
                      ctx.setFillStyle('gray');
                      ctx.fillText('您有', 70, 362);
                      ctx.setFillStyle('red');
                      ctx.fillText(that.data.fullNum, 100, 362);
                      ctx.setFillStyle('gray');
                      ctx.fillText('天步数超过1万步，总步数', 115, 362);
                      ctx.setFillStyle('red');
                      ctx.fillText(that.data.allStep, 70, 377);
                      ctx.setFillStyle('gray');
                      ctx.fillText('步', 70 + allStep.length * 8, 377);

                      ctx.fillText('累计全国排名第', 70, 392);
                      ctx.setFillStyle('red');
                      ctx.fillText(personRank, 145 + 12.5, 392);
                      ctx.setFillStyle('gray');
                      ctx.fillText('名', 145 + 12.5 + personRank.length * 8, 392);
                      if (city) {
                        ctx.fillText('，' + city + '第', 145 + 12.5 * 2 + personRank.length * 8, 392);
                        ctx.setFillStyle('red');
                        ctx.fillText(cityTotalOrder, 145 + personRank.length * 8 + (city.length + 4) * 12.5, 392);
                        ctx.setFillStyle('gray');
                        ctx.fillText('名', 145 + personRank.length * 8 + (city.length + 4) * 12.5 + cityTotalOrder.length * 8, 392);
                      }
                      ctx.drawImage(codeRes.tempFilePath, 270, 322, 60, 60);
                      ctx.fillText('长按识别小程序码', 250, 400);
                      ctx.fillText('一起来参加', 265, 420);
                      ctx.save();
                      ctx.draw(true);
                      setTimeout(function () {
                        _wepy2.default.canvasToTempFilePath({
                          canvasId: 'myCanvas',
                          success: function success(res) {
                            _wepy2.default.saveImageToPhotosAlbum({
                              filePath: res.tempFilePath,
                              success: function success(res1) {
                                console.log(JSON.stringify(res1));
                                that.canvasAppear = 'none';
                                that.maskAppear = 'none';
                                that.showCircleCanvas = '';
                                _util2.default.toastMessage('保存成功');
                              },
                              fail: function fail() {
                                that.canvasAppear = 'none';
                                _util2.default.showLoading('保存到相册失败');
                              },
                              complete: function complete() {}
                            });
                          },
                          fail: function fail(res) {
                            _util2.default.showLoading('保存失败');
                            that.canvasAppear = 'none';
                          }
                        });
                      }, 500);
                    },
                    fail: function fail(err) {
                      console.log(err);
                      that.canvasAppear = 'none';
                      _util2.default.showErrorTip('下载二维码图片失败');
                    }
                  });
                },
                fail: function fail(err) {
                  console.log(err);
                  that.canvasAppear = 'none';
                  _util2.default.showErrorTip('下载分享图片失败');
                }
              });
            },
            fail: function fail(err) {
              console.log(err);
              that.canvasAppear = 'none';
              _util2.default.showErrorTip('下载头像图片失败');
            }
          });
        },
        fail: function fail() {
          that.canvasAppear = 'none';
          _util2.default.showErrorTip('下载logo图片失败');
        }
      });
    }

    /**
     * 下载图片到手机
     */

  }, {
    key: 'downloadPic',
    value: function downloadPic(event) {
      var that = this;
      var mUrl = '';
      if (event.currentTarget.dataset.url != null) {
        mUrl = event.currentTarget.dataset.url;
      }
      _wepy2.default.downloadFile({
        url: mUrl,
        type: 'image',
        success: function success(res) {
          console.log(res);
          _wepy2.default.saveImageToPhotosAlbum({
            // filePath: '../../images/goods.jpg',
            filePath: res.tempFilePath,
            success: function success(res1) {
              console.log(JSON.stringify(res1));
              that.canvasAppear = 'none';
            },
            fail: function fail() {},
            complete: function complete() {}
          });
        },
        fail: function fail(res) {
          console.log('download fail');
        },
        complete: function complete(res) {
          console.log('download complete');
        }
      });
    }

    /**
     * 获取个人步数数据
     */

  }, {
    key: 'getWeiXinSteps',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(openId) {
        var that, lastStep, sessionId;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = this;
                lastStep = _wepy2.default.getStorageSync('lastStep') || '-1';
                sessionId = this.$parent.getOpenId(true);
                // var sessionId = wepy.getStorageSync('sessionId') || ''
                // if (!sessionId) {
                //   setTimeout(function() {
                //     that.getWeiXinSteps(openId)
                //   }, 500)
                //   return
                // }

                if (_wepy2.default.getWeRunData) {
                  _context2.next = 7;
                  break;
                }

                _util2.default.showLoading('版本不支持');
                setTimeout(function () {
                  _wepy2.default.navigateTo({ url: '../rule/rule?show=question' });
                }, 2000);
                return _context2.abrupt('return');

              case 7:
                _wepy2.default.getWeRunData({
                  success: function success(res) {
                    var encryptedData = res.encryptedData;
                    _util2.default.showLoading('');
                    _util2.default.post('/swisse-miniapp/miniapp/swrun/person/update/run/step', {
                      encryptedData: encryptedData,
                      iv: res.iv,
                      openId: openId,
                      sessionId: sessionId,
                      rawData: '',
                      signature: '',
                      lastStep: lastStep
                    }).then(function (res) {
                      if (res.data.code === '100') {
                        var title = '';
                        if (that.data.from === 'message') {
                          title = '已打卡，步数更新成功！';
                        } else {
                          title = '步数更新成功！';
                        }
                        _wepy2.default.showToast({
                          title: title,
                          icon: 'success',
                          duration: 2000
                        });
                        that.queryMyStepInfo(openId);
                      } else if (res.data.code === '6000') {
                        // session过期
                        _util2.default.updateSession(that.getWeiXinSteps);
                      } else if (res.data.code === '-1') {
                        _wepy2.default.showModal({
                          title: '提示',
                          content: '亲，您今天的步数有异常噢！\r\n可联系：4008832490',
                          showCancel: false,
                          confirmText: '知道了',
                          success: function success(res) {
                            // if (res.confirm) {
                            //   wx.makePhoneCall({
                            //     phoneNumber: '4008832490'
                            //   });
                            // } else if (res.cancel) {
                            // }
                          }
                        });
                        that.queryMyStepInfo(openId);
                      } else if (res.data.code === '-2') {
                        that.queryMyStepInfo(openId);
                      } else {
                        // 解密失败
                        _wepy2.default.showToast({
                          title: '步数更新失败',
                          icon: 'loading',
                          duration: 2000
                        });
                        that.queryMyStepInfo(openId);
                        // common.updateSession(that.getWeiXinSteps);
                      }
                    });
                  },

                  fail: function fail() {
                    _util2.default.showLoading('版本太低咯');
                  }
                });

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getWeiXinSteps(_x2) {
        return _ref3.apply(this, arguments);
      }

      return getWeiXinSteps;
    }()

    /**
     * 更新用户信息（头像，昵称）
     */

  }, {
    key: 'saveOrUpdateCustInfo',
    value: function saveOrUpdateCustInfo(openId) {
      var that = this;
      console.log(that.userInfo);
      _util2.default.post('/swisse-miniapp/miniapp/swrun/person/saveOrUpdateCustInfo', {
        headerUrl: that.userInfo.avatarUrl,
        nickName: that.userInfo.nickName,
        city: that.userInfo.city,
        tsno: new Date().getTime(),
        openId: openId
      }).then(function (res) {
        if (res.data.code === '100') {
          that.showPage = 2;
          that.teamId = res.data.teamId;
          that.getWeiXinSteps(openId);
        } else {
          _wepy2.default.showToast({
            title: res.data.desc,
            icon: 'loading',
            duration: 2000
          });
        }
      });
    }

    /**
     * 查询用户个人本期总步数、昨日步数、历史步数列表
     */

  }, {
    key: 'queryMyStepInfo',
    value: function queryMyStepInfo(openId) {
      var that = this;
      _util2.default.get('/swisse-miniapp/miniapp/swrun/person/query/run/info/' + openId).then(function (res) {
        if (res.data.code === '100') {
          var percent = (parseInt(res.data.data.curStep) / 10000).toFixed(2) * 100;
          percent = percent > 100 ? 100 : percent;
          _wepy2.default.setStorageSync('lastStep', res.data.data.curStep);
          that.stepNum = res.data.data.curStep;
          that.allStep = res.data.data.curTimesTotalStep;
          that.$apply();
          if (percent !== 0) {
            that.drawCircle(percent);
          }
          // that.saveCanvasToMobile();
          that.formData(res.data.data.dateStepBeanList);
        } else {
          _util2.default.showErrorTip(res.data.desc);
        }
      });
    }

    /**
     * TODO
     * 提醒坚持开关
     */

  }, {
    key: 'switchChange',
    value: function switchChange(event) {
      var that = this;
      _util2.default.showLoading('');
      _logstat2.default.logPv({
        'platform': 7,
        'pointCode': '7020106'
      });
      var openId = _wepy2.default.getStorageSync('openId') || '';
      var msgFlag = event.currentTarget.dataset.flag;
      // console.log('switch发生 change 事件，携带值为', e.detail.value)
      _util2.default.post('/swisse-miniapp/miniapp/swrun/form/update/msg/flag', {
        openId: openId,
        msgFlag: msgFlag
      }).then(function (res) {
        if (res.data.code === '100') {
          _util2.default.toastMessage('设置成功');
          that.checked = msgFlag === 1;
        } else {
          _util2.default.showLoading('设置失败');
        }
      });
    }

    /**
     * 数据格式化
     */

  }, {
    key: 'formData',
    value: function formData(arr) {
      var thisMonthData = [];
      var exMonthData = [];
      var hasExMonthData = false;
      var thisMoth = '';
      thisMoth = parseInt(this.nowDate.split('-')[1]);
      var monthLen = _util2.default.getDaysInMonth(this.nowDate);
      var monthFirstDay = _util2.default.getwekInMonth(this.nowDate);
      var allLenth = this.getAllLength(monthFirstDay, monthLen);
      var exAllLenth = 0;
      var fullNum = 0;
      this.monthLen = monthLen;
      this.monthFirstDay = monthFirstDay;

      for (var z = 0; z < this.monthLen; z++) {
        thisMonthData.push(null);
      }
      for (var i = 0; i < arr.length; i++) {
        var month = parseInt(arr[i].runDate.split('-')[1]);
        var day = parseInt(arr[i].runDate.split('-')[2]);
        if (month === thisMoth) {
          thisMonthData[day - 1] = parseInt(arr[i].step);
          if (parseInt(arr[i].step) > 10000) {
            fullNum += 1;
          }
        } else {
          if (!hasExMonthData) {
            var exMonthFirstDay = _util2.default.getwekInMonth(arr[i].runDate);
            var exMonthLen = _util2.default.getDaysInMonth(arr[i].runDate);
            exAllLenth = this.getAllLength(exMonthFirstDay, exMonthLen);
            for (var j = 0; j < exMonthLen; j++) {
              exMonthData.push(null);
            }
            this.exMonthLen = exMonthLen;
            this.exMonthFirstDay = exMonthFirstDay;
          }
          hasExMonthData = true;
          exMonthData[day - 1] = parseInt(arr[i].step);
          if (parseInt(arr[i].step) > 10000) {
            fullNum += 1;
          }
        }
      }
      if (hasExMonthData) {
        this.thisMonthData = thisMonthData;
        this.exMonthData = exMonthData;
        this.hasExMonth = true;
        this.allLenth = allLenth;
        this.exAllLenth = exAllLenth;
        this.fullNum = fullNum;
      } else {
        this.thisMonthData = thisMonthData;
        this.hasExMonth = false;
        this.allLenth = allLenth;
        this.exAllLenth = exAllLenth;
        this.fullNum = fullNum;
      }
      var maxLength = 0;
      var swiperHeight = '218rpx';
      if (this.allLenth > this.exAllLenth) {
        maxLength = this.allLenth;
      } else {
        maxLength = this.exAllLenth;
      }
      if (maxLength > 35) {
        swiperHeight = '334rpx';
      } else if (maxLength > 28) {
        swiperHeight = '276rpx';
      }
      this.swiperHeight = swiperHeight;
      this.$apply();
    }
  }, {
    key: 'getAllLength',
    value: function getAllLength(monthFirstDay, monthLen) {
      var allLenth = 0;
      var length = monthFirstDay + monthLen;
      var weeks = parseInt(length / 7);
      var yushu = length % 7;
      if (yushu > 0) {
        allLenth = 7 * (weeks + 1);
      } else {
        allLenth = length;
      }
      return allLenth;
    }

    // 保存formId

  }, {
    key: 'submitInfo',
    value: function submitInfo(e) {
      console.log(e.detail.formId);
      var openId = _wepy2.default.getStorageSync('openId') || '';
      _util2.default.post('/swisse-miniapp/miniapp/swrun/form/saveForm', {
        openId: openId,
        formId: e.detail.formId
      }).then(function (res) {
        if (res.data.code === '100') {
          console.log('保存formId成功');
        } else {
          console.log('保存formId失败');
        }
      });
    }
  }, {
    key: 'drawCircle',
    value: function drawCircle(percent) {
      var ctx = this.ctx;
      function drawArc(s, e) {
        ctx.setFillStyle('white');
        ctx.clearRect(0, 0, 200, 200);
        ctx.draw();
        var x = 70;
        var y = 70;
        var radius = 60;
        ctx.setLineWidth(10);
        ctx.setStrokeStyle('#f62828');
        ctx.setLineCap('round');
        ctx.beginPath();
        ctx.arc(x, y, radius, s, e, false);
        ctx.stroke();
        ctx.draw();
      }
      var startAngle = -0.5 * Math.PI;
      var endAngle = 0;
      // var percent = 50;
      endAngle = 2 * Math.PI * percent / 100 - 0.5 * Math.PI;
      drawArc(startAngle, endAngle);
    }
  }, {
    key: 'closeFirstRankDialog',
    value: function closeFirstRankDialog() {
      this.showFirstRankDialog = false;
      this.showCircleCanvas = '';
    }
  }, {
    key: 'checkShowRankOne',
    value: function checkShowRankOne(openId) {
      var that = this;
      _util2.default.get('/swisse-miniapp/miniapp/swrun/team/query/day/top1/msg/' + openId).then(function (res) {
        if (res.data.code === '100') {
          if (res.data.data) {
            var rankOneTip = res.data.data.split('，');
            that.showFirstRankDialog = true;
            that.rankOneTip = rankOneTip;
            that.showCircleCanvas = 'd_none';
          }
        } else {
          _util2.default.showErrorTip(res.data.desc);
        }
      });
    }
  }]);

  return Home;
}(_wepy2.default.page);

var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.config = {
    navigationBarTitleText: 'home'
  };
  this.components = {
    panel: _panel2.default,
    counter1: _counter2.default,
    counter2: _counter2.default,
    list: _list2.default,
    group: _group2.default,
    toast: _wepyComToast2.default
  };
  this.mixins = [_test2.default];
  this.data = {
    images: '',
    stepNum: '', // 今天步数
    allStep: '', // 本期总步数
    fullNum: 0, // 坚持1万步天数
    checked: true, // 是否提示
    firstTransform: 'rotate(0deg)',
    secondTransform: 'rotate(0deg)',
    borderColor: 'white white white transparent',
    userInfo: {},
    canvasAppear: 'none',
    maskAppear: 'none',
    circleClass: '',
    rightClass: 'wth0',
    rotateNun: '',
    monthFirstDay: '',
    exMonthFirstDay: '',
    monthLen: '',
    exMonthLen: '',
    allLenth: 0,
    exAllLenth: 0,
    thisMonthData: [],
    exMonthData: [],
    from: '',
    hasExMonth: false,
    nowDate: '',
    swiperHeight: '218rpx',
    shareImage: '',
    hasUserInfo: false,
    personRank: 0, // 全国排名
    cityTotalOrder: 0, // 市排名
    canIUse: _wepy2.default.canIUse('button.open-type.getUserInfo'),
    showCircleCanvas: '',
    showFirstRankDialog: false, // 显示每日团队第一名提示
    rankOneTip: [],
    ctx: _wepy2.default.createCanvasContext('canvasArcCir')
  };
  this.computed = {};
  this.methods = {};
  this.events = {
    'index-emit': function indexEmit() {
      var _ref4;

      var $event = (_ref4 = arguments.length - 1, arguments.length <= _ref4 ? undefined : arguments[_ref4]);
      console.log(_this5.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    }
  };
};


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Home , 'pages/home'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSG9tZSIsIm9wdGlvbnMiLCJjeHRBcmMiLCJjcmVhdGVDYW52YXNDb250ZXh0Iiwic2V0TGluZVdpZHRoIiwic2V0U3Ryb2tlU3R5bGUiLCJzZXRMaW5lQ2FwIiwiYmVnaW5QYXRoIiwiYXJjIiwiTWF0aCIsIlBJIiwic3Ryb2tlIiwiZHJhdyIsImxvZ1B2IiwicmVjb3JkIiwiZnJvbSIsInBpY051bWJlciIsInJvdW5kIiwicmFuZG9tIiwic2hhcmVJbWFnZSIsInJlbW90ZUltYWdlVXJsIiwiJHBhcmVudCIsImdldE9wZW5JZCIsIm9wZW5JZCIsImdldFVzZXJJbmZvIiwidXNlckluZm8iLCJoYXNVc2VySW5mbyIsImdldCIsInRoZW4iLCJyZXMiLCJkYXRhIiwiY29kZSIsIm5vd0RhdGUiLCJzcGxpdCIsInNhdmVPclVwZGF0ZUN1c3RJbmZvIiwic2hvd0Vycm9yVGlwIiwiZ2V0UmVtaW5kU3RhdGUiLCJjaGVja1Nob3dSYW5rT25lIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJnbG9iYWxEYXRhIiwiZGV0YWlsIiwic2V0U3RvcmFnZVN5bmMiLCJvblNob3ciLCJjaGVja2VkIiwidGl0bGUiLCJwYXRoIiwiaW1hZ2VVcmwiLCJzdWNjZXNzIiwiZmFpbCIsInNob3dMb2FkaW5nIiwibWFza0FwcGVhciIsInNob3dDaXJjbGVDYW52YXMiLCJwZXJzb25SYW5rIiwibmF0aW9uVG90YWxPcmRlciIsImNpdHlUb3RhbE9yZGVyIiwiY2F0Y2giLCJlcnIiLCJldmVudCIsInRoYXQiLCJzaGFyZVVybCIsImNvZGVVcmwiLCJsb2dvVXJsIiwiY2FudmFzQXBwZWFyIiwiY3R4IiwiZ2V0U3RvcmFnZVN5bmMiLCJzdGVwTnVtIiwidG9TdHJpbmciLCJhbGxTdGVwIiwiY2l0eSIsIm5pY2tOYW1lIiwibGVuZ3RoIiwic3Vic3RyaW5nIiwiZG93bmxvYWRGaWxlIiwidXJsIiwibG9nb1JlcyIsImF2YXRhclVybCIsImhlYWRSZXMiLCJzaGFyZVJlcyIsImNvZGVSZXMiLCJzZXRGaWxsU3R5bGUiLCJmaWxsUmVjdCIsImRyYXdJbWFnZSIsInRlbXBGaWxlUGF0aCIsInNldFRleHRBbGlnbiIsInNldEZvbnRTaXplIiwiZmlsbFRleHQiLCJzYXZlIiwiY2xpcCIsInJlc3RvcmUiLCJmdWxsTnVtIiwic2V0VGltZW91dCIsImNhbnZhc1RvVGVtcEZpbGVQYXRoIiwiY2FudmFzSWQiLCJzYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtIiwiZmlsZVBhdGgiLCJyZXMxIiwiSlNPTiIsInN0cmluZ2lmeSIsInRvYXN0TWVzc2FnZSIsImNvbXBsZXRlIiwibVVybCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwidHlwZSIsImxhc3RTdGVwIiwic2Vzc2lvbklkIiwiZ2V0V2VSdW5EYXRhIiwibmF2aWdhdGVUbyIsImVuY3J5cHRlZERhdGEiLCJwb3N0IiwiaXYiLCJyYXdEYXRhIiwic2lnbmF0dXJlIiwic2hvd1RvYXN0IiwiaWNvbiIsImR1cmF0aW9uIiwicXVlcnlNeVN0ZXBJbmZvIiwidXBkYXRlU2Vzc2lvbiIsImdldFdlaVhpblN0ZXBzIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJjb25maXJtVGV4dCIsImhlYWRlclVybCIsInRzbm8iLCJEYXRlIiwiZ2V0VGltZSIsInNob3dQYWdlIiwidGVhbUlkIiwiZGVzYyIsInBlcmNlbnQiLCJwYXJzZUludCIsImN1clN0ZXAiLCJ0b0ZpeGVkIiwiY3VyVGltZXNUb3RhbFN0ZXAiLCIkYXBwbHkiLCJkcmF3Q2lyY2xlIiwiZm9ybURhdGEiLCJkYXRlU3RlcEJlYW5MaXN0IiwibXNnRmxhZyIsImZsYWciLCJhcnIiLCJ0aGlzTW9udGhEYXRhIiwiZXhNb250aERhdGEiLCJoYXNFeE1vbnRoRGF0YSIsInRoaXNNb3RoIiwibW9udGhMZW4iLCJnZXREYXlzSW5Nb250aCIsIm1vbnRoRmlyc3REYXkiLCJnZXR3ZWtJbk1vbnRoIiwiYWxsTGVudGgiLCJnZXRBbGxMZW5ndGgiLCJleEFsbExlbnRoIiwieiIsInB1c2giLCJpIiwibW9udGgiLCJydW5EYXRlIiwiZGF5Iiwic3RlcCIsImV4TW9udGhGaXJzdERheSIsImV4TW9udGhMZW4iLCJqIiwiaGFzRXhNb250aCIsIm1heExlbmd0aCIsInN3aXBlckhlaWdodCIsIndlZWtzIiwieXVzaHUiLCJmb3JtSWQiLCJkcmF3QXJjIiwicyIsImNsZWFyUmVjdCIsIngiLCJ5IiwicmFkaXVzIiwic3RhcnRBbmdsZSIsImVuZEFuZ2xlIiwic2hvd0ZpcnN0UmFua0RpYWxvZyIsInJhbmtPbmVUaXAiLCJwYWdlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJwYW5lbCIsImNvdW50ZXIxIiwiY291bnRlcjIiLCJsaXN0IiwiZ3JvdXAiLCJ0b2FzdCIsIm1peGlucyIsImltYWdlcyIsImZpcnN0VHJhbnNmb3JtIiwic2Vjb25kVHJhbnNmb3JtIiwiYm9yZGVyQ29sb3IiLCJjaXJjbGVDbGFzcyIsInJpZ2h0Q2xhc3MiLCJyb3RhdGVOdW4iLCJjYW5JVXNlIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZXZlbnRzIiwiJGV2ZW50IiwiJG5hbWUiLCJuYW1lIiwic291cmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OzsrZUFOdUM7QUFDVDs7O0lBT1RBLEk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkJBa0VaQyxPLEVBQVM7QUFDZCxVQUFJQyxTQUFTLGVBQUtDLG1CQUFMLENBQXlCLGNBQXpCLENBQWI7QUFDQUQsYUFBT0UsWUFBUCxDQUFvQixFQUFwQjtBQUNBRixhQUFPRyxjQUFQLENBQXNCLE9BQXRCO0FBQ0FILGFBQU9JLFVBQVAsQ0FBa0IsT0FBbEI7QUFDQUosYUFBT0ssU0FBUDtBQUNBTCxhQUFPTSxHQUFQLENBQVcsRUFBWCxFQUFlLEVBQWYsRUFBbUIsRUFBbkIsRUFB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RFU1TSxJIiwiZmlsZSI6ImhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IExpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9saXN0J1xuICBpbXBvcnQgUGFuZWwgZnJvbSAnQC9jb21wb25lbnRzL3BhbmVsJyAvLyBhbGlhcyBleGFtcGxlXG4gIGltcG9ydCBDb3VudGVyIGZyb20gJ2NvdW50ZXInIC8vIGFsaWFzIGV4YW1wbGVcbiAgaW1wb3J0IEdyb3VwIGZyb20gJy4uL2NvbXBvbmVudHMvZ3JvdXAnXG4gIGltcG9ydCBUb2FzdCBmcm9tICd3ZXB5LWNvbS10b2FzdCdcbiAgaW1wb3J0IHRlc3RNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcbiAgaW1wb3J0IGNvbW1vbiBmcm9tICcuLi9saWJzL3V0aWwnXG4gIGltcG9ydCBsb2dzdGF0IGZyb20gJy4uL2xpYnMvbG9nc3RhdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnaG9tZSdcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIHBhbmVsOiBQYW5lbCxcbiAgICAgIGNvdW50ZXIxOiBDb3VudGVyLFxuICAgICAgY291bnRlcjI6IENvdW50ZXIsXG4gICAgICBsaXN0OiBMaXN0LFxuICAgICAgZ3JvdXA6IEdyb3VwLFxuICAgICAgdG9hc3Q6IFRvYXN0XG4gICAgfVxuXG4gICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cblxuICAgIGRhdGEgPSB7XG4gICAgICBpbWFnZXM6ICcnLFxuICAgICAgc3RlcE51bTogJycsIC8vIOS7iuWkqeatpeaVsFxuICAgICAgYWxsU3RlcDogJycsIC8vIOacrOacn+aAu+atpeaVsFxuICAgICAgZnVsbE51bTogMCwgLy8g5Z2a5oyBMeS4h+atpeWkqeaVsFxuICAgICAgY2hlY2tlZDogdHJ1ZSwgLy8g5piv5ZCm5o+Q56S6XG4gICAgICBmaXJzdFRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKScsXG4gICAgICBzZWNvbmRUcmFuc2Zvcm06ICdyb3RhdGUoMGRlZyknLFxuICAgICAgYm9yZGVyQ29sb3I6ICd3aGl0ZSB3aGl0ZSB3aGl0ZSB0cmFuc3BhcmVudCcsXG4gICAgICB1c2VySW5mbzoge30sXG4gICAgICBjYW52YXNBcHBlYXI6ICdub25lJyxcbiAgICAgIG1hc2tBcHBlYXI6ICdub25lJyxcbiAgICAgIGNpcmNsZUNsYXNzOiAnJyxcbiAgICAgIHJpZ2h0Q2xhc3M6ICd3dGgwJyxcbiAgICAgIHJvdGF0ZU51bjogJycsXG4gICAgICBtb250aEZpcnN0RGF5OiAnJyxcbiAgICAgIGV4TW9udGhGaXJzdERheTogJycsXG4gICAgICBtb250aExlbjogJycsXG4gICAgICBleE1vbnRoTGVuOiAnJyxcbiAgICAgIGFsbExlbnRoOiAwLFxuICAgICAgZXhBbGxMZW50aDogMCxcbiAgICAgIHRoaXNNb250aERhdGE6IFtdLFxuICAgICAgZXhNb250aERhdGE6IFtdLFxuICAgICAgZnJvbTogJycsXG4gICAgICBoYXNFeE1vbnRoOiBmYWxzZSxcbiAgICAgIG5vd0RhdGU6ICcnLFxuICAgICAgc3dpcGVySGVpZ2h0OiAnMjE4cnB4JyxcbiAgICAgIHNoYXJlSW1hZ2U6ICcnLFxuICAgICAgaGFzVXNlckluZm86IGZhbHNlLFxuICAgICAgcGVyc29uUmFuazogMCwgLy8g5YWo5Zu95o6S5ZCNXG4gICAgICBjaXR5VG90YWxPcmRlcjogMCwgLy8g5biC5o6S5ZCNXG4gICAgICBjYW5JVXNlOiB3ZXB5LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcbiAgICAgIHNob3dDaXJjbGVDYW52YXM6ICcnLFxuICAgICAgc2hvd0ZpcnN0UmFua0RpYWxvZzogZmFsc2UsIC8vIOaYvuekuuavj+aXpeWboumYn+esrOS4gOWQjeaPkOekulxuICAgICAgcmFua09uZVRpcDogW10sXG4gICAgICBjdHg6IHdlcHkuY3JlYXRlQ2FudmFzQ29udGV4dCgnY2FudmFzQXJjQ2lyJylcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgIH1cblxuICAgIGV2ZW50cyA9IHtcbiAgICAgICdpbmRleC1lbWl0JzogKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXG4gICAgICB9XG4gICAgfVxuXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICAgIGxldCBjeHRBcmMgPSB3ZXB5LmNyZWF0ZUNhbnZhc0NvbnRleHQoJ2NhbnZhc0NpcmNsZScpXG4gICAgICBjeHRBcmMuc2V0TGluZVdpZHRoKDEwKVxuICAgICAgY3h0QXJjLnNldFN0cm9rZVN0eWxlKCd3aGl0ZScpXG4gICAgICBjeHRBcmMuc2V0TGluZUNhcCgncm91bmQnKVxuICAgICAgY3h0QXJjLmJlZ2luUGF0aCgpXG4gICAgICBjeHRBcmMuYXJjKDcwLCA3MCwgNjAsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSlcbiAgICAgIGN4dEFyYy5zdHJva2UoKVxuICAgICAgY3h0QXJjLmRyYXcoKVxuICAgICAgbG9nc3RhdC5sb2dQdih7XG4gICAgICAgICdwbGF0Zm9ybSc6IDcsXG4gICAgICAgICdwb2ludENvZGUnOiAnNzAxMDEwMCdcbiAgICAgIH0pXG4gICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJlY29yZCkge1xuICAgICAgICB0aGlzLmZyb20gPSAnbWVzc2FnZSdcbiAgICAgIH1cblxuICAgICAgbGV0IHBpY051bWJlciA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDIzKSArIDFcbiAgICAgIGxldCBzaGFyZUltYWdlID0gY29tbW9uLnJlbW90ZUltYWdlVXJsICsgJ3BpY3RydWUvc2hhcmUnICsgcGljTnVtYmVyICsgJy5qcGcnXG4gICAgICB0aGlzLnNoYXJlSW1hZ2UgPSBzaGFyZUltYWdlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLmmL7npLpcbiAgICAgKi9cbiAgICBhc3luYyBvblNob3cob3B0aW9ucykge1xuICAgICAgdGhpcy5vcGVuSWQgPSBhd2FpdCB0aGlzLiRwYXJlbnQuZ2V0T3BlbklkKClcbiAgICAgIHRoaXMudXNlckluZm8gPSBhd2FpdCB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oKVxuICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWVcbiAgICAgIGNvbW1vbi5nZXQoJy9zd2lzc2UtbWluaWFwcC9taW5pYXBwL2NvbW1vbi9xdWVyeS9jdXIvc3lzL3RpbWUnKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5jb2RlID09PSAnMTAwJykge1xuICAgICAgICAgIGxldCBub3dEYXRlID0gcmVzLmRhdGEuZGF0YS5zcGxpdCgnICcpWzBdXG4gICAgICAgICAgdGhpcy5ub3dEYXRlID0gbm93RGF0ZVxuICAgICAgICAgIHRoaXMuc2F2ZU9yVXBkYXRlQ3VzdEluZm8odGhpcy5vcGVuSWQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29tbW9uLnNob3dFcnJvclRpcCgn5p+l6K+i57O757uf5pe26Ze05Ye66ZSZJylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuZ2V0UmVtaW5kU3RhdGUodGhpcy5vcGVuSWQpXG4gICAgICB0aGlzLmNoZWNrU2hvd1JhbmtPbmUodGhpcy5vcGVuSWQpXG4gICAgfVxuXG4gICAgZ2V0VXNlckluZm8oZSkge1xuICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJywgZS5kZXRhaWwudXNlckluZm8pICAvLyDkv53lrZjnlKjmiLfmlbDmja7liLBzdG9yYWdlXG4gICAgICB0aGlzLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICAgIHRoaXMuaGFzVXNlckluZm8gPSB0cnVlXG4gICAgICB0aGlzLm9uU2hvdygpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5o+Q56S654q25oCBXG4gICAgICovXG4gICAgZ2V0UmVtaW5kU3RhdGUob3BlbklkKSB7XG4gICAgICBjb21tb24uZ2V0KCcvc3dpc3NlLW1pbmlhcHAvbWluaWFwcC9zd3J1bi9nZXQvc2VuZC9tc2cvZmxhZy8nICsgb3BlbklkKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5jb2RlID09PSAnMTAwJykge1xuICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHJlcy5kYXRhLmRhdGEgPT09ICcxJ1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDnlKjmiLfngrnlh7vlj7PkuIrop5LliIbkuqtcbiAgICAgKi9cbiAgICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICAgIGxvZ3N0YXQubG9nUHYoe1xuICAgICAgICAncGxhdGZvcm0nOiA3LFxuICAgICAgICAncG9pbnRDb2RlJzogJzcwMjAxMDcnXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGU6ICcyMeWkqeaJk+WNoeiuoeWIkicsXG4gICAgICAgIHBhdGg6ICcvcGFnZXMvaG9tZS9ob21lJyxcbiAgICAgICAgaW1hZ2VVcmw6ICcvaW1hZ2VzL3NoYXJlTG9nby5qcGcnLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmiZPlvIDlvLnnqpdcbiAgICAgKi9cbiAgICBzaG93RG93bmxvYWRQaWMoKSB7XG4gICAgICBsb2dzdGF0LmxvZ1B2KHtcbiAgICAgICAgJ3BsYXRmb3JtJzogNyxcbiAgICAgICAgJ3BvaW50Q29kZSc6ICc3MDIwMTAzJ1xuICAgICAgfSlcbiAgICAgIHZhciBvcGVuSWQgPSB0aGlzLm9wZW5JZFxuICAgICAgaWYgKCFvcGVuSWQpIHtcbiAgICAgICAgY29tbW9uLnNob3dFcnJvclRpcCgnb3Blbklk5pyJ6K+vJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb21tb24uc2hvd0xvYWRpbmcoJycpXG4gICAgICBjb21tb24uZ2V0KCcvc3dpc3NlLW1pbmlhcHAvbWluaWFwcC9zd3J1bi9wZXJzb24vcXVlcnkvbXkvdG90YWwvc3RlcC9pbmZvLycgKyBvcGVuSWQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT09ICcxMDAnKSB7XG4gICAgICAgICAgdGhpcy5tYXNrQXBwZWFyID0gJ2Jsb2NrJ1xuICAgICAgICAgIHRoaXMuc2hvd0NpcmNsZUNhbnZhcyA9ICdkX25vbmUnXG4gICAgICAgICAgdGhpcy5wZXJzb25SYW5rID0gcmVzLmRhdGEuZGF0YS5uYXRpb25Ub3RhbE9yZGVyXG4gICAgICAgICAgdGhpcy5jaXR5VG90YWxPcmRlciA9IHJlcy5kYXRhLmRhdGEuY2l0eVRvdGFsT3JkZXJcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21tb24uc2hvd0xvYWRpbmcoJ+afpeivouaOkuWQjeWksei0pScpXG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgY29tbW9uLnNob3dMb2FkaW5nKCfmn6Xor6LmjpLlkI3lpLHotKUnKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl63lvLnnqpdcbiAgICAgKi9cbiAgICBjbG9zZU1hc2soKSB7XG4gICAgICB0aGlzLm1hc2tBcHBlYXIgPSAnbm9uZSdcbiAgICAgIHRoaXMuc2hvd0NpcmNsZUNhbnZhcyA9ICcnXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5L2/55SoY2FudmFz57uY55S75bm25oqKY2FudmFz5L+d5a2Y5Zu+54mH5Yiw5omL5py655u45YaMXG4gICAgICovXG4gICAgc2F2ZUNhbnZhc1RvTW9iaWxlKGV2ZW50KSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgIHZhciBzaGFyZVVybCA9IHRoaXMuc2hhcmVJbWFnZVxuICAgICAgdmFyIGNvZGVVcmwgPSBjb21tb24ucmVtb3RlSW1hZ2VVcmwgKyAnYXBwQ29kZS5qcGcnXG4gICAgICB2YXIgbG9nb1VybCA9IGNvbW1vbi5yZW1vdGVJbWFnZVVybCArICdzd2lzc2UucG5nJ1xuICAgICAgdGhpcy5jYW52YXNBcHBlYXIgPSAnYmxvY2snXG4gICAgICBjb25zdCBjdHggPSB3ZXB5LmNyZWF0ZUNhbnZhc0NvbnRleHQoJ215Q2FudmFzJylcbiAgICAgIHZhciB1c2VySW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJykgfHwgJydcbiAgICAgIHZhciBzdGVwTnVtID0gdGhpcy5zdGVwTnVtID8gdGhpcy5zdGVwTnVtLnRvU3RyaW5nKCkgOiAnMCdcbiAgICAgIHZhciBhbGxTdGVwID0gdGhpcy5hbGxTdGVwID8gdGhpcy5hbGxTdGVwLnRvU3RyaW5nKCkgOiAnMCdcbiAgICAgIHZhciBwZXJzb25SYW5rID0gdGhpcy5wZXJzb25SYW5rID8gdGhpcy5wZXJzb25SYW5rLnRvU3RyaW5nKCkgOiAnMCdcbiAgICAgIHZhciBjaXR5VG90YWxPcmRlciA9IHRoaXMuY2l0eVRvdGFsT3JkZXIgPyB0aGlzLmNpdHlUb3RhbE9yZGVyLnRvU3RyaW5nKCkgOiAnMCdcbiAgICAgIHZhciBjaXR5ID0gdXNlckluZm8uY2l0eVxuICAgICAgdmFyIG5pY2tOYW1lID0gdXNlckluZm8ubmlja05hbWVcbiAgICAgIGlmIChuaWNrTmFtZS5sZW5ndGggPiA1KSB7XG4gICAgICAgIG5pY2tOYW1lID0gbmlja05hbWUuc3Vic3RyaW5nKDAsIDUpXG4gICAgICB9XG4gICAgICBjb21tb24uc2hvd0xvYWRpbmcoJycpXG4gICAgICB3ZXB5LmRvd25sb2FkRmlsZSh7XG4gICAgICAgIHVybDogbG9nb1VybCxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24obG9nb1Jlcykge1xuICAgICAgICAgIHdlcHkuZG93bmxvYWRGaWxlKHtcbiAgICAgICAgICAgIHVybDogdXNlckluZm8uYXZhdGFyVXJsLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oaGVhZFJlcykge1xuICAgICAgICAgICAgICB3ZXB5LmRvd25sb2FkRmlsZSh7XG4gICAgICAgICAgICAgICAgdXJsOiBzaGFyZVVybCxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihzaGFyZVJlcykge1xuICAgICAgICAgICAgICAgICAgd2VweS5kb3dubG9hZEZpbGUoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IGNvZGVVcmwsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGNvZGVSZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjdHguc2V0RmlsbFN0eWxlKCd3aGl0ZScpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIDM1MCwgNDQwKVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UobG9nb1Jlcy50ZW1wRmlsZVBhdGgsIDEzNy41LCAyMCwgNzUsIDI4KVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5zZXRUZXh0QWxpZ24oJ2NlbnRlcicpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgnYmxhY2snKVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5zZXRGb250U2l6ZSgxNClcbiAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ+W6huelneeUn+a0u+avj+S4gOWkqScsIDE3NSwgNjUpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdMaXZlIEhlYWx0aHkgLCBCZSBIYXBweScsIDE3NSwgODUpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnNldFRleHRBbGlnbignbGVmdCcpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnNhdmUoKVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5hcmMoMzUsIDM0NywgMjUsIDAsIDIgKiBNYXRoLlBJKVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5jbGlwKClcbiAgICAgICAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGhlYWRSZXMudGVtcEZpbGVQYXRoLCAxMCwgMzIyLCA1MCwgNTApXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnJlc3RvcmUoKVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2Uoc2hhcmVSZXMudGVtcEZpbGVQYXRoLCAxMCwgMTAwLCAzMzAsIDIwMilcbiAgICAgICAgICAgICAgICAgICAgICBjdHguc2V0Rm9udFNpemUoMTIpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgnZ3JheScpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnNldFRleHRBbGlnbignY2VudGVyJylcbiAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQobmlja05hbWUsIDM1LCAzOTIpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnNldFRleHRBbGlnbignbGVmdCcpXG4gICAgICAgICAgICAgICAgICAgICAgLy8g5a2XMTIuNSzmlbDlrZc4XG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgnZ3JheScpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCfku4rlpKnmraXmlbAnLCA3MCwgMzM4KVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJ3JlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoYXQuZGF0YS5zdGVwTnVtLCAxMjAsIDMzOClcbiAgICAgICAgICAgICAgICAgICAgICBjdHguc2V0RmlsbFN0eWxlKCdncmF5JylcbiAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ+atpScsIDEyMCArIHN0ZXBOdW0ubGVuZ3RoICogOCwgMzM4KVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJ2dyYXknKVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCgn5oKo5pyJJywgNzAsIDM2MilcbiAgICAgICAgICAgICAgICAgICAgICBjdHguc2V0RmlsbFN0eWxlKCdyZWQnKVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGF0LmRhdGEuZnVsbE51bSwgMTAwLCAzNjIpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgnZ3JheScpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCflpKnmraXmlbDotoXov4cx5LiH5q2l77yM5oC75q2l5pWwJywgMTE1LCAzNjIpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgncmVkJylcbiAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQodGhhdC5kYXRhLmFsbFN0ZXAsIDcwLCAzNzcpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgnZ3JheScpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCfmraUnLCA3MCArIGFsbFN0ZXAubGVuZ3RoICogOCwgMzc3KVxuXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCfntK/orqHlhajlm73mjpLlkI3nrKwnLCA3MCwgMzkyKVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJ3JlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHBlcnNvblJhbmssIDE0NSArIDEyLjUsIDM5MilcbiAgICAgICAgICAgICAgICAgICAgICBjdHguc2V0RmlsbFN0eWxlKCdncmF5JylcbiAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ+WQjScsIDE0NSArIDEyLjUgKyBwZXJzb25SYW5rLmxlbmd0aCAqIDgsIDM5MilcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoY2l0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCfvvIwnICsgY2l0eSArICfnrKwnLCAxNDUgKyAxMi41ICogMiArIHBlcnNvblJhbmsubGVuZ3RoICogOCwgMzkyKVxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgncmVkJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChjaXR5VG90YWxPcmRlciwgMTQ1ICsgcGVyc29uUmFuay5sZW5ndGggKiA4ICsgKGNpdHkubGVuZ3RoICsgNCkgKiAxMi41LCAzOTIpXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguc2V0RmlsbFN0eWxlKCdncmF5JylcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCgn5ZCNJywgMTQ1ICsgcGVyc29uUmFuay5sZW5ndGggKiA4ICsgKGNpdHkubGVuZ3RoICsgNCkgKiAxMi41ICsgY2l0eVRvdGFsT3JkZXIubGVuZ3RoICogOCwgMzkyKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGNvZGVSZXMudGVtcEZpbGVQYXRoLCAyNzAsIDMyMiwgNjAsIDYwKVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCgn6ZW/5oyJ6K+G5Yir5bCP56iL5bqP56CBJywgMjUwLCA0MDApXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCfkuIDotbfmnaXlj4LliqAnLCAyNjUsIDQyMClcbiAgICAgICAgICAgICAgICAgICAgICBjdHguc2F2ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXcodHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5jYW52YXNUb1RlbXBGaWxlUGF0aCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc0lkOiAnbXlDYW52YXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVBhdGg6IHJlcy50ZW1wRmlsZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMxKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYW52YXNBcHBlYXIgPSAnbm9uZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tYXNrQXBwZWFyID0gJ25vbmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0NpcmNsZUNhbnZhcyA9ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1vbi50b2FzdE1lc3NhZ2UoJ+S/neWtmOaIkOWKnycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbnZhc0FwcGVhciA9ICdub25lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tb24uc2hvd0xvYWRpbmcoJ+S/neWtmOWIsOebuOWGjOWksei0pScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tb24uc2hvd0xvYWRpbmcoJ+S/neWtmOWksei0pScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYW52YXNBcHBlYXIgPSAnbm9uZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICB9LCA1MDApXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbnZhc0FwcGVhciA9ICdub25lJ1xuICAgICAgICAgICAgICAgICAgICAgIGNvbW1vbi5zaG93RXJyb3JUaXAoJ+S4i+i9veS6jOe7tOeggeWbvueJh+Wksei0pScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICAgIHRoYXQuY2FudmFzQXBwZWFyID0gJ25vbmUnXG4gICAgICAgICAgICAgICAgICBjb21tb24uc2hvd0Vycm9yVGlwKCfkuIvovb3liIbkuqvlm77niYflpLHotKUnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgICB0aGF0LmNhbnZhc0FwcGVhciA9ICdub25lJ1xuICAgICAgICAgICAgICBjb21tb24uc2hvd0Vycm9yVGlwKCfkuIvovb3lpLTlg4/lm77niYflpLHotKUnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoYXQuY2FudmFzQXBwZWFyID0gJ25vbmUnXG4gICAgICAgICAgY29tbW9uLnNob3dFcnJvclRpcCgn5LiL6L29bG9nb+WbvueJh+Wksei0pScpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LiL6L295Zu+54mH5Yiw5omL5py6XG4gICAgICovXG4gICAgZG93bmxvYWRQaWMoZXZlbnQpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgdmFyIG1VcmwgPSAnJ1xuICAgICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmwgIT0gbnVsbCkge1xuICAgICAgICBtVXJsID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybFxuICAgICAgfVxuICAgICAgd2VweS5kb3dubG9hZEZpbGUoe1xuICAgICAgICB1cmw6IG1VcmwsXG4gICAgICAgIHR5cGU6ICdpbWFnZScsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgd2VweS5zYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtKHtcbiAgICAgICAgICAgIC8vIGZpbGVQYXRoOiAnLi4vLi4vaW1hZ2VzL2dvb2RzLmpwZycsXG4gICAgICAgICAgICBmaWxlUGF0aDogcmVzLnRlbXBGaWxlUGF0aCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMxKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlczEpKVxuICAgICAgICAgICAgICB0aGF0LmNhbnZhc0FwcGVhciA9ICdub25lJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnZG93bmxvYWQgZmFpbCcpXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2Rvd25sb2FkIGNvbXBsZXRlJylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bkuKrkurrmraXmlbDmlbDmja5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRXZWlYaW5TdGVwcyhvcGVuSWQpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgdmFyIGxhc3RTdGVwID0gd2VweS5nZXRTdG9yYWdlU3luYygnbGFzdFN0ZXAnKSB8fCAnLTEnXG4gICAgICBsZXQgc2Vzc2lvbklkID0gdGhpcy4kcGFyZW50LmdldE9wZW5JZCh0cnVlKVxuICAgICAgLy8gdmFyIHNlc3Npb25JZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb25JZCcpIHx8ICcnXG4gICAgICAvLyBpZiAoIXNlc3Npb25JZCkge1xuICAgICAgLy8gICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgLy8gICAgIHRoYXQuZ2V0V2VpWGluU3RlcHMob3BlbklkKVxuICAgICAgLy8gICB9LCA1MDApXG4gICAgICAvLyAgIHJldHVyblxuICAgICAgLy8gfVxuICAgICAgaWYgKCF3ZXB5LmdldFdlUnVuRGF0YSkge1xuICAgICAgICBjb21tb24uc2hvd0xvYWRpbmcoJ+eJiOacrOS4jeaUr+aMgScpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnLi4vcnVsZS9ydWxlP3Nob3c9cXVlc3Rpb24nfSlcbiAgICAgICAgfSwgMjAwMClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB3ZXB5LmdldFdlUnVuRGF0YSh7XG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgY29uc3QgZW5jcnlwdGVkRGF0YSA9IHJlcy5lbmNyeXB0ZWREYXRhXG4gICAgICAgICAgY29tbW9uLnNob3dMb2FkaW5nKCcnKVxuICAgICAgICAgIGNvbW1vbi5wb3N0KCcvc3dpc3NlLW1pbmlhcHAvbWluaWFwcC9zd3J1bi9wZXJzb24vdXBkYXRlL3J1bi9zdGVwJywge1xuICAgICAgICAgICAgZW5jcnlwdGVkRGF0YTogZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICAgIGl2OiByZXMuaXYsXG4gICAgICAgICAgICBvcGVuSWQ6IG9wZW5JZCxcbiAgICAgICAgICAgIHNlc3Npb25JZDogc2Vzc2lvbklkLFxuICAgICAgICAgICAgcmF3RGF0YTogJycsXG4gICAgICAgICAgICBzaWduYXR1cmU6ICcnLFxuICAgICAgICAgICAgbGFzdFN0ZXA6IGxhc3RTdGVwXG4gICAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT09ICcxMDAnKSB7XG4gICAgICAgICAgICAgIHZhciB0aXRsZSA9ICcnXG4gICAgICAgICAgICAgIGlmICh0aGF0LmRhdGEuZnJvbSA9PT0gJ21lc3NhZ2UnKSB7XG4gICAgICAgICAgICAgICAgdGl0bGUgPSAn5bey5omT5Y2h77yM5q2l5pWw5pu05paw5oiQ5Yqf77yBJ1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRpdGxlID0gJ+atpeaVsOabtOaWsOaIkOWKn++8gSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB0aGF0LnF1ZXJ5TXlTdGVwSW5mbyhvcGVuSWQpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5kYXRhLmNvZGUgPT09ICc2MDAwJykge1xuICAgICAgICAgICAgICAvLyBzZXNzaW9u6L+H5pyfXG4gICAgICAgICAgICAgIGNvbW1vbi51cGRhdGVTZXNzaW9uKHRoYXQuZ2V0V2VpWGluU3RlcHMpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5kYXRhLmNvZGUgPT09ICctMScpIHtcbiAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn5Lqy77yM5oKo5LuK5aSp55qE5q2l5pWw5pyJ5byC5bi45Zmi77yBXFxyXFxu5Y+v6IGU57O777yaNDAwODgzMjQ5MCcsXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlybVRleHQ6ICfnn6XpgZPkuoYnLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgLy8gaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAvLyAgIHd4Lm1ha2VQaG9uZUNhbGwoe1xuICAgICAgICAgICAgICAgICAgLy8gICAgIHBob25lTnVtYmVyOiAnNDAwODgzMjQ5MCdcbiAgICAgICAgICAgICAgICAgIC8vICAgfSk7XG4gICAgICAgICAgICAgICAgICAvLyB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIHRoYXQucXVlcnlNeVN0ZXBJbmZvKG9wZW5JZClcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmRhdGEuY29kZSA9PT0gJy0yJykge1xuICAgICAgICAgICAgICB0aGF0LnF1ZXJ5TXlTdGVwSW5mbyhvcGVuSWQpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyDop6Plr4blpLHotKVcbiAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5q2l5pWw5pu05paw5aSx6LSlJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnbG9hZGluZycsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgdGhhdC5xdWVyeU15U3RlcEluZm8ob3BlbklkKVxuICAgICAgICAgICAgICAvLyBjb21tb24udXBkYXRlU2Vzc2lvbih0aGF0LmdldFdlaVhpblN0ZXBzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb21tb24uc2hvd0xvYWRpbmcoJ+eJiOacrOWkquS9juWSrycpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pu05paw55So5oi35L+h5oGv77yI5aS05YOP77yM5pi156ew77yJXG4gICAgICovXG4gICAgc2F2ZU9yVXBkYXRlQ3VzdEluZm8ob3BlbklkKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgIGNvbnNvbGUubG9nKHRoYXQudXNlckluZm8pXG4gICAgICBjb21tb24ucG9zdCgnL3N3aXNzZS1taW5pYXBwL21pbmlhcHAvc3dydW4vcGVyc29uL3NhdmVPclVwZGF0ZUN1c3RJbmZvJywge1xuICAgICAgICBoZWFkZXJVcmw6IHRoYXQudXNlckluZm8uYXZhdGFyVXJsLFxuICAgICAgICBuaWNrTmFtZTogdGhhdC51c2VySW5mby5uaWNrTmFtZSxcbiAgICAgICAgY2l0eTogdGhhdC51c2VySW5mby5jaXR5LFxuICAgICAgICB0c25vOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgb3BlbklkOiBvcGVuSWRcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT09ICcxMDAnKSB7XG4gICAgICAgICAgdGhhdC5zaG93UGFnZSA9IDJcbiAgICAgICAgICB0aGF0LnRlYW1JZCA9IHJlcy5kYXRhLnRlYW1JZFxuICAgICAgICAgIHRoYXQuZ2V0V2VpWGluU3RlcHMob3BlbklkKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiByZXMuZGF0YS5kZXNjLFxuICAgICAgICAgICAgaWNvbjogJ2xvYWRpbmcnLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOafpeivoueUqOaIt+S4quS6uuacrOacn+aAu+atpeaVsOOAgeaYqOaXpeatpeaVsOOAgeWOhuWPsuatpeaVsOWIl+ihqFxuICAgICAqL1xuICAgIHF1ZXJ5TXlTdGVwSW5mbyhvcGVuSWQpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgY29tbW9uLmdldCgnL3N3aXNzZS1taW5pYXBwL21pbmlhcHAvc3dydW4vcGVyc29uL3F1ZXJ5L3J1bi9pbmZvLycgKyBvcGVuSWQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT09ICcxMDAnKSB7XG4gICAgICAgICAgdmFyIHBlcmNlbnQgPSAocGFyc2VJbnQocmVzLmRhdGEuZGF0YS5jdXJTdGVwKSAvIDEwMDAwKS50b0ZpeGVkKDIpICogMTAwXG4gICAgICAgICAgcGVyY2VudCA9IHBlcmNlbnQgPiAxMDAgPyAxMDAgOiBwZXJjZW50XG4gICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnbGFzdFN0ZXAnLCByZXMuZGF0YS5kYXRhLmN1clN0ZXApXG4gICAgICAgICAgdGhhdC5zdGVwTnVtID0gcmVzLmRhdGEuZGF0YS5jdXJTdGVwXG4gICAgICAgICAgdGhhdC5hbGxTdGVwID0gcmVzLmRhdGEuZGF0YS5jdXJUaW1lc1RvdGFsU3RlcFxuICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgICBpZiAocGVyY2VudCAhPT0gMCkge1xuICAgICAgICAgICAgdGhhdC5kcmF3Q2lyY2xlKHBlcmNlbnQpXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHRoYXQuc2F2ZUNhbnZhc1RvTW9iaWxlKCk7XG4gICAgICAgICAgdGhhdC5mb3JtRGF0YShyZXMuZGF0YS5kYXRhLmRhdGVTdGVwQmVhbkxpc3QpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29tbW9uLnNob3dFcnJvclRpcChyZXMuZGF0YS5kZXNjKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRPRE9cbiAgICAgKiDmj5DphpLlnZrmjIHlvIDlhbNcbiAgICAgKi9cbiAgICBzd2l0Y2hDaGFuZ2UoZXZlbnQpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgY29tbW9uLnNob3dMb2FkaW5nKCcnKVxuICAgICAgbG9nc3RhdC5sb2dQdih7XG4gICAgICAgICdwbGF0Zm9ybSc6IDcsXG4gICAgICAgICdwb2ludENvZGUnOiAnNzAyMDEwNidcbiAgICAgIH0pXG4gICAgICB2YXIgb3BlbklkID0gd2VweS5nZXRTdG9yYWdlU3luYygnb3BlbklkJykgfHwgJydcbiAgICAgIHZhciBtc2dGbGFnID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmZsYWdcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdzd2l0Y2jlj5HnlJ8gY2hhbmdlIOS6i+S7tu+8jOaQuuW4puWAvOS4uicsIGUuZGV0YWlsLnZhbHVlKVxuICAgICAgY29tbW9uLnBvc3QoJy9zd2lzc2UtbWluaWFwcC9taW5pYXBwL3N3cnVuL2Zvcm0vdXBkYXRlL21zZy9mbGFnJywge1xuICAgICAgICBvcGVuSWQ6IG9wZW5JZCxcbiAgICAgICAgbXNnRmxhZzogbXNnRmxhZ1xuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuY29kZSA9PT0gJzEwMCcpIHtcbiAgICAgICAgICBjb21tb24udG9hc3RNZXNzYWdlKCforr7nva7miJDlip8nKVxuICAgICAgICAgIHRoYXQuY2hlY2tlZCA9IG1zZ0ZsYWcgPT09IDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21tb24uc2hvd0xvYWRpbmcoJ+iuvue9ruWksei0pScpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pWw5o2u5qC85byP5YyWXG4gICAgICovXG4gICAgZm9ybURhdGEoYXJyKSB7XG4gICAgICBsZXQgdGhpc01vbnRoRGF0YSA9IFtdXG4gICAgICBsZXQgZXhNb250aERhdGEgPSBbXVxuICAgICAgbGV0IGhhc0V4TW9udGhEYXRhID0gZmFsc2VcbiAgICAgIGxldCB0aGlzTW90aCA9ICcnXG4gICAgICB0aGlzTW90aCA9IHBhcnNlSW50KHRoaXMubm93RGF0ZS5zcGxpdCgnLScpWzFdKVxuICAgICAgdmFyIG1vbnRoTGVuID0gY29tbW9uLmdldERheXNJbk1vbnRoKHRoaXMubm93RGF0ZSlcbiAgICAgIHZhciBtb250aEZpcnN0RGF5ID0gY29tbW9uLmdldHdla0luTW9udGgodGhpcy5ub3dEYXRlKVxuICAgICAgdmFyIGFsbExlbnRoID0gdGhpcy5nZXRBbGxMZW5ndGgobW9udGhGaXJzdERheSwgbW9udGhMZW4pXG4gICAgICBsZXQgZXhBbGxMZW50aCA9IDBcbiAgICAgIGxldCBmdWxsTnVtID0gMFxuICAgICAgdGhpcy5tb250aExlbiA9IG1vbnRoTGVuXG4gICAgICB0aGlzLm1vbnRoRmlyc3REYXkgPSBtb250aEZpcnN0RGF5XG5cbiAgICAgIGZvciAodmFyIHogPSAwOyB6IDwgdGhpcy5tb250aExlbjsgeisrKSB7XG4gICAgICAgIHRoaXNNb250aERhdGEucHVzaChudWxsKVxuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIG1vbnRoID0gcGFyc2VJbnQoYXJyW2ldLnJ1bkRhdGUuc3BsaXQoJy0nKVsxXSlcbiAgICAgICAgdmFyIGRheSA9IHBhcnNlSW50KGFycltpXS5ydW5EYXRlLnNwbGl0KCctJylbMl0pXG4gICAgICAgIGlmIChtb250aCA9PT0gdGhpc01vdGgpIHtcbiAgICAgICAgICB0aGlzTW9udGhEYXRhW2RheSAtIDFdID0gcGFyc2VJbnQoYXJyW2ldLnN0ZXApXG4gICAgICAgICAgaWYgKHBhcnNlSW50KGFycltpXS5zdGVwKSA+IDEwMDAwKSB7XG4gICAgICAgICAgICBmdWxsTnVtICs9IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFoYXNFeE1vbnRoRGF0YSkge1xuICAgICAgICAgICAgdmFyIGV4TW9udGhGaXJzdERheSA9IGNvbW1vbi5nZXR3ZWtJbk1vbnRoKGFycltpXS5ydW5EYXRlKVxuICAgICAgICAgICAgdmFyIGV4TW9udGhMZW4gPSBjb21tb24uZ2V0RGF5c0luTW9udGgoYXJyW2ldLnJ1bkRhdGUpXG4gICAgICAgICAgICBleEFsbExlbnRoID0gdGhpcy5nZXRBbGxMZW5ndGgoZXhNb250aEZpcnN0RGF5LCBleE1vbnRoTGVuKVxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBleE1vbnRoTGVuOyBqKyspIHtcbiAgICAgICAgICAgICAgZXhNb250aERhdGEucHVzaChudWxsKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5leE1vbnRoTGVuID0gZXhNb250aExlblxuICAgICAgICAgICAgdGhpcy5leE1vbnRoRmlyc3REYXkgPSBleE1vbnRoRmlyc3REYXlcbiAgICAgICAgICB9XG4gICAgICAgICAgaGFzRXhNb250aERhdGEgPSB0cnVlXG4gICAgICAgICAgZXhNb250aERhdGFbZGF5IC0gMV0gPSBwYXJzZUludChhcnJbaV0uc3RlcClcbiAgICAgICAgICBpZiAocGFyc2VJbnQoYXJyW2ldLnN0ZXApID4gMTAwMDApIHtcbiAgICAgICAgICAgIGZ1bGxOdW0gKz0gMVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGhhc0V4TW9udGhEYXRhKSB7XG4gICAgICAgIHRoaXMudGhpc01vbnRoRGF0YSA9IHRoaXNNb250aERhdGFcbiAgICAgICAgdGhpcy5leE1vbnRoRGF0YSA9IGV4TW9udGhEYXRhXG4gICAgICAgIHRoaXMuaGFzRXhNb250aCA9IHRydWVcbiAgICAgICAgdGhpcy5hbGxMZW50aCA9IGFsbExlbnRoXG4gICAgICAgIHRoaXMuZXhBbGxMZW50aCA9IGV4QWxsTGVudGhcbiAgICAgICAgdGhpcy5mdWxsTnVtID0gZnVsbE51bVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50aGlzTW9udGhEYXRhID0gdGhpc01vbnRoRGF0YVxuICAgICAgICB0aGlzLmhhc0V4TW9udGggPSBmYWxzZVxuICAgICAgICB0aGlzLmFsbExlbnRoID0gYWxsTGVudGhcbiAgICAgICAgdGhpcy5leEFsbExlbnRoID0gZXhBbGxMZW50aFxuICAgICAgICB0aGlzLmZ1bGxOdW0gPSBmdWxsTnVtXG4gICAgICB9XG4gICAgICB2YXIgbWF4TGVuZ3RoID0gMFxuICAgICAgdmFyIHN3aXBlckhlaWdodCA9ICcyMThycHgnXG4gICAgICBpZiAodGhpcy5hbGxMZW50aCA+IHRoaXMuZXhBbGxMZW50aCkge1xuICAgICAgICBtYXhMZW5ndGggPSB0aGlzLmFsbExlbnRoXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXhMZW5ndGggPSB0aGlzLmV4QWxsTGVudGhcbiAgICAgIH1cbiAgICAgIGlmIChtYXhMZW5ndGggPiAzNSkge1xuICAgICAgICBzd2lwZXJIZWlnaHQgPSAnMzM0cnB4J1xuICAgICAgfSBlbHNlIGlmIChtYXhMZW5ndGggPiAyOCkge1xuICAgICAgICBzd2lwZXJIZWlnaHQgPSAnMjc2cnB4J1xuICAgICAgfVxuICAgICAgdGhpcy5zd2lwZXJIZWlnaHQgPSBzd2lwZXJIZWlnaHRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG5cbiAgICBnZXRBbGxMZW5ndGgobW9udGhGaXJzdERheSwgbW9udGhMZW4pIHtcbiAgICAgIHZhciBhbGxMZW50aCA9IDBcbiAgICAgIHZhciBsZW5ndGggPSBtb250aEZpcnN0RGF5ICsgbW9udGhMZW5cbiAgICAgIHZhciB3ZWVrcyA9IHBhcnNlSW50KGxlbmd0aCAvIDcpXG4gICAgICB2YXIgeXVzaHUgPSBsZW5ndGggJSA3XG4gICAgICBpZiAoeXVzaHUgPiAwKSB7XG4gICAgICAgIGFsbExlbnRoID0gNyAqICh3ZWVrcyArIDEpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGxMZW50aCA9IGxlbmd0aFxuICAgICAgfVxuICAgICAgcmV0dXJuIGFsbExlbnRoXG4gICAgfVxuXG4gICAgLy8g5L+d5a2YZm9ybUlkXG4gICAgc3VibWl0SW5mbyhlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlLmRldGFpbC5mb3JtSWQpXG4gICAgICB2YXIgb3BlbklkID0gd2VweS5nZXRTdG9yYWdlU3luYygnb3BlbklkJykgfHwgJydcbiAgICAgIGNvbW1vbi5wb3N0KCcvc3dpc3NlLW1pbmlhcHAvbWluaWFwcC9zd3J1bi9mb3JtL3NhdmVGb3JtJywge1xuICAgICAgICBvcGVuSWQ6IG9wZW5JZCxcbiAgICAgICAgZm9ybUlkOiBlLmRldGFpbC5mb3JtSWRcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT09ICcxMDAnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ+S/neWtmGZvcm1JZOaIkOWKnycpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ+S/neWtmGZvcm1JZOWksei0pScpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZHJhd0NpcmNsZShwZXJjZW50KSB7XG4gICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAgIGZ1bmN0aW9uIGRyYXdBcmMocywgZSkge1xuICAgICAgICBjdHguc2V0RmlsbFN0eWxlKCd3aGl0ZScpXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMjAwLCAyMDApXG4gICAgICAgIGN0eC5kcmF3KClcbiAgICAgICAgbGV0IHggPSA3MFxuICAgICAgICBsZXQgeSA9IDcwXG4gICAgICAgIGxldCByYWRpdXMgPSA2MFxuICAgICAgICBjdHguc2V0TGluZVdpZHRoKDEwKVxuICAgICAgICBjdHguc2V0U3Ryb2tlU3R5bGUoJyNmNjI4MjgnKVxuICAgICAgICBjdHguc2V0TGluZUNhcCgncm91bmQnKVxuICAgICAgICBjdHguYmVnaW5QYXRoKClcbiAgICAgICAgY3R4LmFyYyh4LCB5LCByYWRpdXMsIHMsIGUsIGZhbHNlKVxuICAgICAgICBjdHguc3Ryb2tlKClcbiAgICAgICAgY3R4LmRyYXcoKVxuICAgICAgfVxuICAgICAgbGV0IHN0YXJ0QW5nbGUgPSAtMC41ICogTWF0aC5QSVxuICAgICAgbGV0IGVuZEFuZ2xlID0gMFxuICAgICAgLy8gdmFyIHBlcmNlbnQgPSA1MDtcbiAgICAgIGVuZEFuZ2xlID0gMiAqIE1hdGguUEkgKiBwZXJjZW50IC8gMTAwIC0gMC41ICogTWF0aC5QSVxuICAgICAgZHJhd0FyYyhzdGFydEFuZ2xlLCBlbmRBbmdsZSlcbiAgICB9XG5cbiAgICBjbG9zZUZpcnN0UmFua0RpYWxvZygpIHtcbiAgICAgIHRoaXMuc2hvd0ZpcnN0UmFua0RpYWxvZyA9IGZhbHNlXG4gICAgICB0aGlzLnNob3dDaXJjbGVDYW52YXMgPSAnJ1xuICAgIH1cblxuICAgIGNoZWNrU2hvd1JhbmtPbmUob3BlbklkKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgIGNvbW1vbi5nZXQoJy9zd2lzc2UtbWluaWFwcC9taW5pYXBwL3N3cnVuL3RlYW0vcXVlcnkvZGF5L3RvcDEvbXNnLycgKyBvcGVuSWQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT09ICcxMDAnKSB7XG4gICAgICAgICAgaWYgKHJlcy5kYXRhLmRhdGEpIHtcbiAgICAgICAgICAgIHZhciByYW5rT25lVGlwID0gcmVzLmRhdGEuZGF0YS5zcGxpdCgn77yMJylcbiAgICAgICAgICAgIHRoYXQuc2hvd0ZpcnN0UmFua0RpYWxvZyA9IHRydWVcbiAgICAgICAgICAgIHRoYXQucmFua09uZVRpcCA9IHJhbmtPbmVUaXBcbiAgICAgICAgICAgIHRoYXQuc2hvd0NpcmNsZUNhbnZhcyA9ICdkX25vbmUnXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbW1vbi5zaG93RXJyb3JUaXAocmVzLmRhdGEuZGVzYylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==