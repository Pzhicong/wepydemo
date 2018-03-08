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
          _this4.$apply();
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
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(openId) {
        var that, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                that = this;
                _context3.next = 3;
                return new Promise(function (resolve, reject) {
                  _util2.default.post('/swisse-miniapp/miniapp/swrun/person/saveOrUpdateCustInfo', {
                    headerUrl: that.userInfo.avatarUrl,
                    nickName: that.userInfo.nickName,
                    city: that.userInfo.city,
                    tsno: new Date().getTime(),
                    openId: openId
                  }).then(function (res) {
                    resolve(res);
                  });
                });

              case 3:
                response = _context3.sent;

                if (response.data.code === '100') {
                  this.showPage = 2;
                  this.teamId = response.data.teamId;
                  this.getWeiXinSteps(openId);
                } else {
                  _wepy2.default.showToast({
                    title: response.data.desc,
                    icon: 'loading',
                    duration: 2000
                  });
                }

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function saveOrUpdateCustInfo(_x3) {
        return _ref4.apply(this, arguments);
      }

      return saveOrUpdateCustInfo;
    }()

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
      var _this5 = this;

      var that = this;
      _util2.default.showLoading('');
      _logstat2.default.logPv({
        'platform': 7,
        'pointCode': '7020106'
      });
      var msgFlag = event.currentTarget.dataset.flag;
      _util2.default.post('/swisse-miniapp/miniapp/swrun/form/update/msg/flag', {
        openId: this.openId,
        msgFlag: msgFlag
      }).then(function (res) {
        if (res.data.code === '100') {
          _util2.default.toastMessage('设置成功');
          that.checked = msgFlag === '1';
          _this5.$apply();
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
      _util2.default.post('/swisse-miniapp/miniapp/swrun/form/saveForm', {
        openId: this.openId,
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
  var _this6 = this;

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
      var _ref5;

      var $event = (_ref5 = arguments.length - 1, arguments.length <= _ref5 ? undefined : arguments[_ref5]);
      console.log(_this6.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    }
  };
};


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Home , 'pages/home'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSG9tZSIsIm9wdGlvbnMiLCJjeHRBcmMiLCJjcmVhdGVDYW52YXNDb250ZXh0Iiwic2V0TGluZVdpZHRoIiwic2V0U3Ryb2tlU3R5bGUiLCJzZXRMaW5lQ2FwIiwiYmVnaW5QYXRoIiwiYXJjIiwiTWF0aCIsIlBJIiwic3Ryb2tlIiwiZHJhdyIsImxvZ1B2IiwicmVjb3JkIiwiZnJvbSIsInBpY051bWJlciIsInJvdW5kIiwicmFuZG9tIiwic2hhcmVJbWFnZSIsInJlbW90ZUltYWdlVXJsIiwiJHBhcmVudCIsImdldE9wZW5JZCIsIm9wZW5JZCIsImdldFVzZXJJbmZvIiwidXNlckluZm8iLCJoYXNVc2VySW5mbyIsImdldCIsInRoZW4iLCJyZXMiLCJkYXRhIiwiY29kZSIsIm5vd0RhdGUiLCJzcGxpdCIsInNhdmVPclVwZGF0ZUN1c3RJbmZvIiwic2hvd0Vycm9yVGlwIiwiZ2V0UmVtaW5kU3RhdGUiLCJjaGVja1Nob3dSYW5rT25lIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJnbG9iYWxEYXRhIiwiZGV0YWlsIiwic2V0U3RvcmFnZVN5bmMiLCJvblNob3ciLCJjaGVja2VkIiwidGl0bGUiLCJwYXRoIiwiaW1hZ2VVcmwiLCJzdWNjZXNzIiwiZmFpbCIsInNob3dMb2FkaW5nIiwibWFza0FwcGVhciIsInNob3dDaXJjbGVDYW52YXMiLCJwZXJzb25SYW5rIiwibmF0aW9uVG90YWxPcmRlciIsImNpdHlUb3RhbE9yZGVyIiwiJGFwcGx5IiwiY2F0Y2giLCJlcnIiLCJldmVudCIsInRoYXQiLCJzaGFyZVVybCIsImNvZGVVcmwiLCJsb2dvVXJsIiwiY2FudmFzQXBwZWFyIiwiY3R4IiwiZ2V0U3RvcmFnZVN5bmMiLCJzdGVwTnVtIiwidG9TdHJpbmciLCJhbGxTdGVwIiwiY2l0eSIsIm5pY2tOYW1lIiwibGVuZ3RoIiwic3Vic3RyaW5nIiwiZG93bmxvYWRGaWxlIiwidXJsIiwibG9nb1JlcyIsImF2YXRhclVybCIsImhlYWRSZXMiLCJzaGFyZVJlcyIsImNvZGVSZXMiLCJzZXRGaWxsU3R5bGUiLCJmaWxsUmVjdCIsImRyYXdJbWFnZSIsInRlbXBGaWxlUGF0aCIsInNldFRleHRBbGlnbiIsInNldEZvbnRTaXplIiwiZmlsbFRleHQiLCJzYXZlIiwiY2xpcCIsInJlc3RvcmUiLCJmdWxsTnVtIiwic2V0VGltZW91dCIsImNhbnZhc1RvVGVtcEZpbGVQYXRoIiwiY2FudmFzSWQiLCJzYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtIiwiZmlsZVBhdGgiLCJyZXMxIiwiSlNPTiIsInN0cmluZ2lmeSIsInRvYXN0TWVzc2FnZSIsImNvbXBsZXRlIiwibVVybCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwidHlwZSIsImxhc3RTdGVwIiwic2Vzc2lvbklkIiwiZ2V0V2VSdW5EYXRhIiwibmF2aWdhdGVUbyIsImVuY3J5cHRlZERhdGEiLCJwb3N0IiwiaXYiLCJyYXdEYXRhIiwic2lnbmF0dXJlIiwic2hvd1RvYXN0IiwiaWNvbiIsImR1cmF0aW9uIiwicXVlcnlNeVN0ZXBJbmZvIiwidXBkYXRlU2Vzc2lvbiIsImdldFdlaVhpblN0ZXBzIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJjb25maXJtVGV4dCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiaGVhZGVyVXJsIiwidHNubyIsIkRhdGUiLCJnZXRUaW1lIiwicmVzcG9uc2UiLCJzaG93UGFnZSIsInRlYW1JZCIsImRlc2MiLCJwZXJjZW50IiwicGFyc2VJbnQiLCJjdXJTdGVwIiwidG9GaXhlZCIsImN1clRpbWVzVG90YWxTdGVwIiwiZHJhd0NpcmNsZSIsImZvcm1EYXRhIiwiZGF0ZVN0ZXBCZWFuTGlzdCIsIm1zZ0ZsYWciLCJmbGFnIiwiYXJyIiwidGhpc01vbnRoRGF0YSIsImV4TW9udGhEYXRhIiwiaGFzRXhNb250aERhdGEiLCJ0aGlzTW90aCIsIm1vbnRoTGVuIiwiZ2V0RGF5c0luTW9udGgiLCJtb250aEZpcnN0RGF5IiwiZ2V0d2VrSW5Nb250aCIsImFsbExlbnRoIiwiZ2V0QWxsTGVuZ3RoIiwiZXhBbGxMZW50aCIsInoiLCJwdXNoIiwiaSIsIm1vbnRoIiwicnVuRGF0ZSIsImRheSIsInN0ZXAiLCJleE1vbnRoRmlyc3REYXkiLCJleE1vbnRoTGVuIiwiaiIsImhhc0V4TW9udGgiLCJtYXhMZW5ndGgiLCJzd2lwZXJIZWlnaHQiLCJ3ZWVrcyIsInl1c2h1IiwiZm9ybUlkIiwiZHJhd0FyYyIsInMiLCJjbGVhclJlY3QiLCJ4IiwieSIsInJhZGl1cyIsInN0YXJ0QW5nbGUiLCJlbmRBbmdsZSIsInNob3dGaXJzdFJhbmtEaWFsb2ciLCJyYW5rT25lVGlwIiwicGFnZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwicGFuZWwiLCJjb3VudGVyMSIsImNvdW50ZXIyIiwibGlzdCIsImdyb3VwIiwidG9hc3QiLCJtaXhpbnMiLCJpbWFnZXMiLCJmaXJzdFRyYW5zZm9ybSIsInNlY29uZFRyYW5zZm9ybSIsImJvcmRlckNvbG9yIiwiY2lyY2xlQ2xhc3MiLCJyaWdodENsYXNzIiwicm90YXRlTnVuIiwiY2FuSVVzZSIsImNvbXB1dGVkIiwibWV0aG9kcyIsImV2ZW50cyIsIiRldmVudCIsIiRuYW1lIiwibmFtZSIsInNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7K2VBTnVDO0FBQ1Q7OztJQU9UQSxJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJCQWtFWkMsTyxFQUFTO0FBQ2QsVUFBSUMsU0FBUyxlQUFLQyxtQkFBTCxDQUF5QixjQUF6QixDQUFiO0FBQ0FELGFBQU9FLFlBQVAsQ0FBb0IsRUFBcEI7QUFDQUYsYUFBT0csY0FBUCxDQUFzQixPQUF0QjtBQUNBSCxhQUFPSSxVQUFQLENBQWtCLE9BQWxCO0FBQ0FKLGFBQU9LLFNBQVA7QUFDQUwsYUFBT00s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Rzs7O2tCQTNEVWhOLEkiLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgTGlzdCBmcm9tICcuLi9jb21wb25lbnRzL2xpc3QnXG4gIGltcG9ydCBQYW5lbCBmcm9tICdAL2NvbXBvbmVudHMvcGFuZWwnIC8vIGFsaWFzIGV4YW1wbGVcbiAgaW1wb3J0IENvdW50ZXIgZnJvbSAnY291bnRlcicgLy8gYWxpYXMgZXhhbXBsZVxuICBpbXBvcnQgR3JvdXAgZnJvbSAnLi4vY29tcG9uZW50cy9ncm91cCdcbiAgaW1wb3J0IFRvYXN0IGZyb20gJ3dlcHktY29tLXRvYXN0J1xuICBpbXBvcnQgdGVzdE1peGluIGZyb20gJy4uL21peGlucy90ZXN0J1xuICBpbXBvcnQgY29tbW9uIGZyb20gJy4uL2xpYnMvdXRpbCdcbiAgaW1wb3J0IGxvZ3N0YXQgZnJvbSAnLi4vbGlicy9sb2dzdGF0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdob21lJ1xuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgcGFuZWw6IFBhbmVsLFxuICAgICAgY291bnRlcjE6IENvdW50ZXIsXG4gICAgICBjb3VudGVyMjogQ291bnRlcixcbiAgICAgIGxpc3Q6IExpc3QsXG4gICAgICBncm91cDogR3JvdXAsXG4gICAgICB0b2FzdDogVG9hc3RcbiAgICB9XG5cbiAgICBtaXhpbnMgPSBbdGVzdE1peGluXVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIGltYWdlczogJycsXG4gICAgICBzdGVwTnVtOiAnJywgLy8g5LuK5aSp5q2l5pWwXG4gICAgICBhbGxTdGVwOiAnJywgLy8g5pys5pyf5oC75q2l5pWwXG4gICAgICBmdWxsTnVtOiAwLCAvLyDlnZrmjIEx5LiH5q2l5aSp5pWwXG4gICAgICBjaGVja2VkOiB0cnVlLCAvLyDmmK/lkKbmj5DnpLpcbiAgICAgIGZpcnN0VHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJyxcbiAgICAgIHNlY29uZFRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKScsXG4gICAgICBib3JkZXJDb2xvcjogJ3doaXRlIHdoaXRlIHdoaXRlIHRyYW5zcGFyZW50JyxcbiAgICAgIHVzZXJJbmZvOiB7fSxcbiAgICAgIGNhbnZhc0FwcGVhcjogJ25vbmUnLFxuICAgICAgbWFza0FwcGVhcjogJ25vbmUnLFxuICAgICAgY2lyY2xlQ2xhc3M6ICcnLFxuICAgICAgcmlnaHRDbGFzczogJ3d0aDAnLFxuICAgICAgcm90YXRlTnVuOiAnJyxcbiAgICAgIG1vbnRoRmlyc3REYXk6ICcnLFxuICAgICAgZXhNb250aEZpcnN0RGF5OiAnJyxcbiAgICAgIG1vbnRoTGVuOiAnJyxcbiAgICAgIGV4TW9udGhMZW46ICcnLFxuICAgICAgYWxsTGVudGg6IDAsXG4gICAgICBleEFsbExlbnRoOiAwLFxuICAgICAgdGhpc01vbnRoRGF0YTogW10sXG4gICAgICBleE1vbnRoRGF0YTogW10sXG4gICAgICBmcm9tOiAnJyxcbiAgICAgIGhhc0V4TW9udGg6IGZhbHNlLFxuICAgICAgbm93RGF0ZTogJycsXG4gICAgICBzd2lwZXJIZWlnaHQ6ICcyMThycHgnLFxuICAgICAgc2hhcmVJbWFnZTogJycsXG4gICAgICBoYXNVc2VySW5mbzogZmFsc2UsXG4gICAgICBwZXJzb25SYW5rOiAwLCAvLyDlhajlm73mjpLlkI1cbiAgICAgIGNpdHlUb3RhbE9yZGVyOiAwLCAvLyDluILmjpLlkI1cbiAgICAgIGNhbklVc2U6IHdlcHkuY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpLFxuICAgICAgc2hvd0NpcmNsZUNhbnZhczogJycsXG4gICAgICBzaG93Rmlyc3RSYW5rRGlhbG9nOiBmYWxzZSwgLy8g5pi+56S65q+P5pel5Zui6Zif56ys5LiA5ZCN5o+Q56S6XG4gICAgICByYW5rT25lVGlwOiBbXSxcbiAgICAgIGN0eDogd2VweS5jcmVhdGVDYW52YXNDb250ZXh0KCdjYW52YXNBcmNDaXInKVxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgfVxuXG4gICAgZXZlbnRzID0ge1xuICAgICAgJ2luZGV4LWVtaXQnOiAoLi4uYXJncykgPT4ge1xuICAgICAgICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuJG5hbWV9IHJlY2VpdmUgJHskZXZlbnQubmFtZX0gZnJvbSAkeyRldmVudC5zb3VyY2UuJG5hbWV9YClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxvYWQob3B0aW9ucykge1xuICAgICAgbGV0IGN4dEFyYyA9IHdlcHkuY3JlYXRlQ2FudmFzQ29udGV4dCgnY2FudmFzQ2lyY2xlJylcbiAgICAgIGN4dEFyYy5zZXRMaW5lV2lkdGgoMTApXG4gICAgICBjeHRBcmMuc2V0U3Ryb2tlU3R5bGUoJ3doaXRlJylcbiAgICAgIGN4dEFyYy5zZXRMaW5lQ2FwKCdyb3VuZCcpXG4gICAgICBjeHRBcmMuYmVnaW5QYXRoKClcbiAgICAgIGN4dEFyYy5hcmMoNzAsIDcwLCA2MCwgMCwgMiAqIE1hdGguUEksIGZhbHNlKVxuICAgICAgY3h0QXJjLnN0cm9rZSgpXG4gICAgICBjeHRBcmMuZHJhdygpXG4gICAgICBsb2dzdGF0LmxvZ1B2KHtcbiAgICAgICAgJ3BsYXRmb3JtJzogNyxcbiAgICAgICAgJ3BvaW50Q29kZSc6ICc3MDEwMTAwJ1xuICAgICAgfSlcbiAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMucmVjb3JkKSB7XG4gICAgICAgIHRoaXMuZnJvbSA9ICdtZXNzYWdlJ1xuICAgICAgfVxuXG4gICAgICBsZXQgcGljTnVtYmVyID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMjMpICsgMVxuICAgICAgbGV0IHNoYXJlSW1hZ2UgPSBjb21tb24ucmVtb3RlSW1hZ2VVcmwgKyAncGljdHJ1ZS9zaGFyZScgKyBwaWNOdW1iZXIgKyAnLmpwZydcbiAgICAgIHRoaXMuc2hhcmVJbWFnZSA9IHNoYXJlSW1hZ2VcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgICAqL1xuICAgIGFzeW5jIG9uU2hvdyhvcHRpb25zKSB7XG4gICAgICB0aGlzLm9wZW5JZCA9IGF3YWl0IHRoaXMuJHBhcmVudC5nZXRPcGVuSWQoKVxuICAgICAgdGhpcy51c2VySW5mbyA9IGF3YWl0IHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbygpXG4gICAgICB0aGlzLmhhc1VzZXJJbmZvID0gdHJ1ZVxuICAgICAgY29tbW9uLmdldCgnL3N3aXNzZS1taW5pYXBwL21pbmlhcHAvY29tbW9uL3F1ZXJ5L2N1ci9zeXMvdGltZScpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT09ICcxMDAnKSB7XG4gICAgICAgICAgbGV0IG5vd0RhdGUgPSByZXMuZGF0YS5kYXRhLnNwbGl0KCcgJylbMF1cbiAgICAgICAgICB0aGlzLm5vd0RhdGUgPSBub3dEYXRlXG4gICAgICAgICAgdGhpcy5zYXZlT3JVcGRhdGVDdXN0SW5mbyh0aGlzLm9wZW5JZClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21tb24uc2hvd0Vycm9yVGlwKCfmn6Xor6Lns7vnu5/ml7bpl7Tlh7rplJknKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy5nZXRSZW1pbmRTdGF0ZSh0aGlzLm9wZW5JZClcbiAgICAgIHRoaXMuY2hlY2tTaG93UmFua09uZSh0aGlzLm9wZW5JZClcbiAgICB9XG5cbiAgICBnZXRVc2VySW5mbyhlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygndXNlckluZm8nLCBlLmRldGFpbC51c2VySW5mbykgIC8vIOS/neWtmOeUqOaIt+aVsOaNruWIsHN0b3JhZ2VcbiAgICAgIHRoaXMudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgICAgdGhpcy5oYXNVc2VySW5mbyA9IHRydWVcbiAgICAgIHRoaXMub25TaG93KClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bmj5DnpLrnirbmgIFcbiAgICAgKi9cbiAgICBnZXRSZW1pbmRTdGF0ZShvcGVuSWQpIHtcbiAgICAgIGNvbW1vbi5nZXQoJy9zd2lzc2UtbWluaWFwcC9taW5pYXBwL3N3cnVuL2dldC9zZW5kL21zZy9mbGFnLycgKyBvcGVuSWQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT09ICcxMDAnKSB7XG4gICAgICAgICAgdGhpcy5jaGVja2VkID0gcmVzLmRhdGEuZGF0YSA9PT0gJzEnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIC8qKlxuICAgICAqIOeUqOaIt+eCueWHu+WPs+S4iuinkuWIhuS6q1xuICAgICAqL1xuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgICAgbG9nc3RhdC5sb2dQdih7XG4gICAgICAgICdwbGF0Zm9ybSc6IDcsXG4gICAgICAgICdwb2ludENvZGUnOiAnNzAyMDEwNydcbiAgICAgIH0pXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogJzIx5aSp5omT5Y2h6K6h5YiSJyxcbiAgICAgICAgcGF0aDogJy9wYWdlcy9ob21lL2hvbWUnLFxuICAgICAgICBpbWFnZVVybDogJy9pbWFnZXMvc2hhcmVMb2dvLmpwZycsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaJk+W8gOW8ueeql1xuICAgICAqL1xuICAgIHNob3dEb3dubG9hZFBpYygpIHtcbiAgICAgIGxvZ3N0YXQubG9nUHYoe1xuICAgICAgICAncGxhdGZvcm0nOiA3LFxuICAgICAgICAncG9pbnRDb2RlJzogJzcwMjAxMDMnXG4gICAgICB9KVxuICAgICAgdmFyIG9wZW5JZCA9IHRoaXMub3BlbklkXG4gICAgICBpZiAoIW9wZW5JZCkge1xuICAgICAgICBjb21tb24uc2hvd0Vycm9yVGlwKCdvcGVuSWTmnInor68nKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbW1vbi5zaG93TG9hZGluZygnJylcbiAgICAgIGNvbW1vbi5nZXQoJy9zd2lzc2UtbWluaWFwcC9taW5pYXBwL3N3cnVuL3BlcnNvbi9xdWVyeS9teS90b3RhbC9zdGVwL2luZm8vJyArIG9wZW5JZCkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuY29kZSA9PT0gJzEwMCcpIHtcbiAgICAgICAgICB0aGlzLm1hc2tBcHBlYXIgPSAnYmxvY2snXG4gICAgICAgICAgdGhpcy5zaG93Q2lyY2xlQ2FudmFzID0gJ2Rfbm9uZSdcbiAgICAgICAgICB0aGlzLnBlcnNvblJhbmsgPSByZXMuZGF0YS5kYXRhLm5hdGlvblRvdGFsT3JkZXJcbiAgICAgICAgICB0aGlzLmNpdHlUb3RhbE9yZGVyID0gcmVzLmRhdGEuZGF0YS5jaXR5VG90YWxPcmRlclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21tb24uc2hvd0xvYWRpbmcoJ+afpeivouaOkuWQjeWksei0pScpXG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgY29tbW9uLnNob3dMb2FkaW5nKCfmn6Xor6LmjpLlkI3lpLHotKUnKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl63lvLnnqpdcbiAgICAgKi9cbiAgICBjbG9zZU1hc2soKSB7XG4gICAgICB0aGlzLm1hc2tBcHBlYXIgPSAnbm9uZSdcbiAgICAgIHRoaXMuc2hvd0NpcmNsZUNhbnZhcyA9ICcnXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5L2/55SoY2FudmFz57uY55S75bm25oqKY2FudmFz5L+d5a2Y5Zu+54mH5Yiw5omL5py655u45YaMXG4gICAgICovXG4gICAgc2F2ZUNhbnZhc1RvTW9iaWxlKGV2ZW50KSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgIHZhciBzaGFyZVVybCA9IHRoaXMuc2hhcmVJbWFnZVxuICAgICAgdmFyIGNvZGVVcmwgPSBjb21tb24ucmVtb3RlSW1hZ2VVcmwgKyAnYXBwQ29kZS5qcGcnXG4gICAgICB2YXIgbG9nb1VybCA9IGNvbW1vbi5yZW1vdGVJbWFnZVVybCArICdzd2lzc2UucG5nJ1xuICAgICAgdGhpcy5jYW52YXNBcHBlYXIgPSAnYmxvY2snXG4gICAgICBjb25zdCBjdHggPSB3ZXB5LmNyZWF0ZUNhbnZhc0NvbnRleHQoJ215Q2FudmFzJylcbiAgICAgIHZhciB1c2VySW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJykgfHwgJydcbiAgICAgIHZhciBzdGVwTnVtID0gdGhpcy5zdGVwTnVtID8gdGhpcy5zdGVwTnVtLnRvU3RyaW5nKCkgOiAnMCdcbiAgICAgIHZhciBhbGxTdGVwID0gdGhpcy5hbGxTdGVwID8gdGhpcy5hbGxTdGVwLnRvU3RyaW5nKCkgOiAnMCdcbiAgICAgIHZhciBwZXJzb25SYW5rID0gdGhpcy5wZXJzb25SYW5rID8gdGhpcy5wZXJzb25SYW5rLnRvU3RyaW5nKCkgOiAnMCdcbiAgICAgIHZhciBjaXR5VG90YWxPcmRlciA9IHRoaXMuY2l0eVRvdGFsT3JkZXIgPyB0aGlzLmNpdHlUb3RhbE9yZGVyLnRvU3RyaW5nKCkgOiAnMCdcbiAgICAgIHZhciBjaXR5ID0gdXNlckluZm8uY2l0eVxuICAgICAgdmFyIG5pY2tOYW1lID0gdXNlckluZm8ubmlja05hbWVcbiAgICAgIGlmIChuaWNrTmFtZS5sZW5ndGggPiA1KSB7XG4gICAgICAgIG5pY2tOYW1lID0gbmlja05hbWUuc3Vic3RyaW5nKDAsIDUpXG4gICAgICB9XG4gICAgICBjb21tb24uc2hvd0xvYWRpbmcoJycpXG4gICAgICB3ZXB5LmRvd25sb2FkRmlsZSh7XG4gICAgICAgIHVybDogbG9nb1VybCxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24obG9nb1Jlcykge1xuICAgICAgICAgIHdlcHkuZG93bmxvYWRGaWxlKHtcbiAgICAgICAgICAgIHVybDogdXNlckluZm8uYXZhdGFyVXJsLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oaGVhZFJlcykge1xuICAgICAgICAgICAgICB3ZXB5LmRvd25sb2FkRmlsZSh7XG4gICAgICAgICAgICAgICAgdXJsOiBzaGFyZVVybCxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihzaGFyZVJlcykge1xuICAgICAgICAgICAgICAgICAgd2VweS5kb3dubG9hZEZpbGUoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IGNvZGVVcmwsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGNvZGVSZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjdHguc2V0RmlsbFN0eWxlKCd3aGl0ZScpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIDM1MCwgNDQwKVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UobG9nb1Jlcy50ZW1wRmlsZVBhdGgsIDEzNy41LCAyMCwgNzUsIDI4KVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5zZXRUZXh0QWxpZ24oJ2NlbnRlcicpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgnYmxhY2snKVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5zZXRGb250U2l6ZSgxNClcbiAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ+W6huelneeUn+a0u+avj+S4gOWkqScsIDE3NSwgNjUpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdMaXZlIEhlYWx0aHkgLCBCZSBIYXBweScsIDE3NSwgODUpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnNldFRleHRBbGlnbignbGVmdCcpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnNhdmUoKVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5hcmMoMzUsIDM0NywgMjUsIDAsIDIgKiBNYXRoLlBJKVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5jbGlwKClcbiAgICAgICAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGhlYWRSZXMudGVtcEZpbGVQYXRoLCAxMCwgMzIyLCA1MCwgNTApXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnJlc3RvcmUoKVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2Uoc2hhcmVSZXMudGVtcEZpbGVQYXRoLCAxMCwgMTAwLCAzMzAsIDIwMilcbiAgICAgICAgICAgICAgICAgICAgICBjdHguc2V0Rm9udFNpemUoMTIpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgnZ3JheScpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnNldFRleHRBbGlnbignY2VudGVyJylcbiAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQobmlja05hbWUsIDM1LCAzOTIpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnNldFRleHRBbGlnbignbGVmdCcpXG4gICAgICAgICAgICAgICAgICAgICAgLy8g5a2XMTIuNSzmlbDlrZc4XG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgnZ3JheScpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCfku4rlpKnmraXmlbAnLCA3MCwgMzM4KVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJ3JlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoYXQuZGF0YS5zdGVwTnVtLCAxMjAsIDMzOClcbiAgICAgICAgICAgICAgICAgICAgICBjdHguc2V0RmlsbFN0eWxlKCdncmF5JylcbiAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ+atpScsIDEyMCArIHN0ZXBOdW0ubGVuZ3RoICogOCwgMzM4KVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJ2dyYXknKVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCgn5oKo5pyJJywgNzAsIDM2MilcbiAgICAgICAgICAgICAgICAgICAgICBjdHguc2V0RmlsbFN0eWxlKCdyZWQnKVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGF0LmRhdGEuZnVsbE51bSwgMTAwLCAzNjIpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgnZ3JheScpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCflpKnmraXmlbDotoXov4cx5LiH5q2l77yM5oC75q2l5pWwJywgMTE1LCAzNjIpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgncmVkJylcbiAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQodGhhdC5kYXRhLmFsbFN0ZXAsIDcwLCAzNzcpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgnZ3JheScpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCfmraUnLCA3MCArIGFsbFN0ZXAubGVuZ3RoICogOCwgMzc3KVxuXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCfntK/orqHlhajlm73mjpLlkI3nrKwnLCA3MCwgMzkyKVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJ3JlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHBlcnNvblJhbmssIDE0NSArIDEyLjUsIDM5MilcbiAgICAgICAgICAgICAgICAgICAgICBjdHguc2V0RmlsbFN0eWxlKCdncmF5JylcbiAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ+WQjScsIDE0NSArIDEyLjUgKyBwZXJzb25SYW5rLmxlbmd0aCAqIDgsIDM5MilcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoY2l0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCfvvIwnICsgY2l0eSArICfnrKwnLCAxNDUgKyAxMi41ICogMiArIHBlcnNvblJhbmsubGVuZ3RoICogOCwgMzkyKVxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgncmVkJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChjaXR5VG90YWxPcmRlciwgMTQ1ICsgcGVyc29uUmFuay5sZW5ndGggKiA4ICsgKGNpdHkubGVuZ3RoICsgNCkgKiAxMi41LCAzOTIpXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguc2V0RmlsbFN0eWxlKCdncmF5JylcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCgn5ZCNJywgMTQ1ICsgcGVyc29uUmFuay5sZW5ndGggKiA4ICsgKGNpdHkubGVuZ3RoICsgNCkgKiAxMi41ICsgY2l0eVRvdGFsT3JkZXIubGVuZ3RoICogOCwgMzkyKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGNvZGVSZXMudGVtcEZpbGVQYXRoLCAyNzAsIDMyMiwgNjAsIDYwKVxuICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCgn6ZW/5oyJ6K+G5Yir5bCP56iL5bqP56CBJywgMjUwLCA0MDApXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCfkuIDotbfmnaXlj4LliqAnLCAyNjUsIDQyMClcbiAgICAgICAgICAgICAgICAgICAgICBjdHguc2F2ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXcodHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5jYW52YXNUb1RlbXBGaWxlUGF0aCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc0lkOiAnbXlDYW52YXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVBhdGg6IHJlcy50ZW1wRmlsZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMxKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYW52YXNBcHBlYXIgPSAnbm9uZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tYXNrQXBwZWFyID0gJ25vbmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0NpcmNsZUNhbnZhcyA9ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1vbi50b2FzdE1lc3NhZ2UoJ+S/neWtmOaIkOWKnycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbnZhc0FwcGVhciA9ICdub25lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tb24uc2hvd0xvYWRpbmcoJ+S/neWtmOWIsOebuOWGjOWksei0pScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tb24uc2hvd0xvYWRpbmcoJ+S/neWtmOWksei0pScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYW52YXNBcHBlYXIgPSAnbm9uZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICB9LCA1MDApXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbnZhc0FwcGVhciA9ICdub25lJ1xuICAgICAgICAgICAgICAgICAgICAgIGNvbW1vbi5zaG93RXJyb3JUaXAoJ+S4i+i9veS6jOe7tOeggeWbvueJh+Wksei0pScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICAgIHRoYXQuY2FudmFzQXBwZWFyID0gJ25vbmUnXG4gICAgICAgICAgICAgICAgICBjb21tb24uc2hvd0Vycm9yVGlwKCfkuIvovb3liIbkuqvlm77niYflpLHotKUnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgICB0aGF0LmNhbnZhc0FwcGVhciA9ICdub25lJ1xuICAgICAgICAgICAgICBjb21tb24uc2hvd0Vycm9yVGlwKCfkuIvovb3lpLTlg4/lm77niYflpLHotKUnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoYXQuY2FudmFzQXBwZWFyID0gJ25vbmUnXG4gICAgICAgICAgY29tbW9uLnNob3dFcnJvclRpcCgn5LiL6L29bG9nb+WbvueJh+Wksei0pScpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LiL6L295Zu+54mH5Yiw5omL5py6XG4gICAgICovXG4gICAgZG93bmxvYWRQaWMoZXZlbnQpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgdmFyIG1VcmwgPSAnJ1xuICAgICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmwgIT0gbnVsbCkge1xuICAgICAgICBtVXJsID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybFxuICAgICAgfVxuICAgICAgd2VweS5kb3dubG9hZEZpbGUoe1xuICAgICAgICB1cmw6IG1VcmwsXG4gICAgICAgIHR5cGU6ICdpbWFnZScsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgd2VweS5zYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtKHtcbiAgICAgICAgICAgIC8vIGZpbGVQYXRoOiAnLi4vLi4vaW1hZ2VzL2dvb2RzLmpwZycsXG4gICAgICAgICAgICBmaWxlUGF0aDogcmVzLnRlbXBGaWxlUGF0aCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMxKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlczEpKVxuICAgICAgICAgICAgICB0aGF0LmNhbnZhc0FwcGVhciA9ICdub25lJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnZG93bmxvYWQgZmFpbCcpXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2Rvd25sb2FkIGNvbXBsZXRlJylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bkuKrkurrmraXmlbDmlbDmja5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRXZWlYaW5TdGVwcyhvcGVuSWQpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgdmFyIGxhc3RTdGVwID0gd2VweS5nZXRTdG9yYWdlU3luYygnbGFzdFN0ZXAnKSB8fCAnLTEnXG4gICAgICBsZXQgc2Vzc2lvbklkID0gdGhpcy4kcGFyZW50LmdldE9wZW5JZCh0cnVlKVxuICAgICAgLy8gdmFyIHNlc3Npb25JZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Nlc3Npb25JZCcpIHx8ICcnXG4gICAgICAvLyBpZiAoIXNlc3Npb25JZCkge1xuICAgICAgLy8gICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgLy8gICAgIHRoYXQuZ2V0V2VpWGluU3RlcHMob3BlbklkKVxuICAgICAgLy8gICB9LCA1MDApXG4gICAgICAvLyAgIHJldHVyblxuICAgICAgLy8gfVxuICAgICAgaWYgKCF3ZXB5LmdldFdlUnVuRGF0YSkge1xuICAgICAgICBjb21tb24uc2hvd0xvYWRpbmcoJ+eJiOacrOS4jeaUr+aMgScpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnLi4vcnVsZS9ydWxlP3Nob3c9cXVlc3Rpb24nfSlcbiAgICAgICAgfSwgMjAwMClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB3ZXB5LmdldFdlUnVuRGF0YSh7XG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgY29uc3QgZW5jcnlwdGVkRGF0YSA9IHJlcy5lbmNyeXB0ZWREYXRhXG4gICAgICAgICAgY29tbW9uLnNob3dMb2FkaW5nKCcnKVxuICAgICAgICAgIGNvbW1vbi5wb3N0KCcvc3dpc3NlLW1pbmlhcHAvbWluaWFwcC9zd3J1bi9wZXJzb24vdXBkYXRlL3J1bi9zdGVwJywge1xuICAgICAgICAgICAgZW5jcnlwdGVkRGF0YTogZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICAgIGl2OiByZXMuaXYsXG4gICAgICAgICAgICBvcGVuSWQ6IG9wZW5JZCxcbiAgICAgICAgICAgIHNlc3Npb25JZDogc2Vzc2lvbklkLFxuICAgICAgICAgICAgcmF3RGF0YTogJycsXG4gICAgICAgICAgICBzaWduYXR1cmU6ICcnLFxuICAgICAgICAgICAgbGFzdFN0ZXA6IGxhc3RTdGVwXG4gICAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT09ICcxMDAnKSB7XG4gICAgICAgICAgICAgIHZhciB0aXRsZSA9ICcnXG4gICAgICAgICAgICAgIGlmICh0aGF0LmRhdGEuZnJvbSA9PT0gJ21lc3NhZ2UnKSB7XG4gICAgICAgICAgICAgICAgdGl0bGUgPSAn5bey5omT5Y2h77yM5q2l5pWw5pu05paw5oiQ5Yqf77yBJ1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRpdGxlID0gJ+atpeaVsOabtOaWsOaIkOWKn++8gSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB0aGF0LnF1ZXJ5TXlTdGVwSW5mbyhvcGVuSWQpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5kYXRhLmNvZGUgPT09ICc2MDAwJykge1xuICAgICAgICAgICAgICAvLyBzZXNzaW9u6L+H5pyfXG4gICAgICAgICAgICAgIGNvbW1vbi51cGRhdGVTZXNzaW9uKHRoYXQuZ2V0V2VpWGluU3RlcHMpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5kYXRhLmNvZGUgPT09ICctMScpIHtcbiAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn5Lqy77yM5oKo5LuK5aSp55qE5q2l5pWw5pyJ5byC5bi45Zmi77yBXFxyXFxu5Y+v6IGU57O777yaNDAwODgzMjQ5MCcsXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlybVRleHQ6ICfnn6XpgZPkuoYnLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgLy8gaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAvLyAgIHd4Lm1ha2VQaG9uZUNhbGwoe1xuICAgICAgICAgICAgICAgICAgLy8gICAgIHBob25lTnVtYmVyOiAnNDAwODgzMjQ5MCdcbiAgICAgICAgICAgICAgICAgIC8vICAgfSk7XG4gICAgICAgICAgICAgICAgICAvLyB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIHRoYXQucXVlcnlNeVN0ZXBJbmZvKG9wZW5JZClcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmRhdGEuY29kZSA9PT0gJy0yJykge1xuICAgICAgICAgICAgICB0aGF0LnF1ZXJ5TXlTdGVwSW5mbyhvcGVuSWQpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyDop6Plr4blpLHotKVcbiAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5q2l5pWw5pu05paw5aSx6LSlJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnbG9hZGluZycsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgdGhhdC5xdWVyeU15U3RlcEluZm8ob3BlbklkKVxuICAgICAgICAgICAgICAvLyBjb21tb24udXBkYXRlU2Vzc2lvbih0aGF0LmdldFdlaVhpblN0ZXBzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb21tb24uc2hvd0xvYWRpbmcoJ+eJiOacrOWkquS9juWSrycpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pu05paw55So5oi35L+h5oGv77yI5aS05YOP77yM5pi156ew77yJXG4gICAgICovXG4gICAgYXN5bmMgc2F2ZU9yVXBkYXRlQ3VzdEluZm8ob3BlbklkKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29tbW9uLnBvc3QoJy9zd2lzc2UtbWluaWFwcC9taW5pYXBwL3N3cnVuL3BlcnNvbi9zYXZlT3JVcGRhdGVDdXN0SW5mbycsIHtcbiAgICAgICAgICBoZWFkZXJVcmw6IHRoYXQudXNlckluZm8uYXZhdGFyVXJsLFxuICAgICAgICAgIG5pY2tOYW1lOiB0aGF0LnVzZXJJbmZvLm5pY2tOYW1lLFxuICAgICAgICAgIGNpdHk6IHRoYXQudXNlckluZm8uY2l0eSxcbiAgICAgICAgICB0c25vOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICBvcGVuSWQ6IG9wZW5JZFxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShyZXMpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuY29kZSA9PT0gJzEwMCcpIHtcbiAgICAgICAgdGhpcy5zaG93UGFnZSA9IDJcbiAgICAgICAgdGhpcy50ZWFtSWQgPSByZXNwb25zZS5kYXRhLnRlYW1JZFxuICAgICAgICB0aGlzLmdldFdlaVhpblN0ZXBzKG9wZW5JZClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogcmVzcG9uc2UuZGF0YS5kZXNjLFxuICAgICAgICAgIGljb246ICdsb2FkaW5nJyxcbiAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOafpeivoueUqOaIt+S4quS6uuacrOacn+aAu+atpeaVsOOAgeaYqOaXpeatpeaVsOOAgeWOhuWPsuatpeaVsOWIl+ihqFxuICAgICAqL1xuICAgIHF1ZXJ5TXlTdGVwSW5mbyhvcGVuSWQpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgY29tbW9uLmdldCgnL3N3aXNzZS1taW5pYXBwL21pbmlhcHAvc3dydW4vcGVyc29uL3F1ZXJ5L3J1bi9pbmZvLycgKyBvcGVuSWQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT09ICcxMDAnKSB7XG4gICAgICAgICAgdmFyIHBlcmNlbnQgPSAocGFyc2VJbnQocmVzLmRhdGEuZGF0YS5jdXJTdGVwKSAvIDEwMDAwKS50b0ZpeGVkKDIpICogMTAwXG4gICAgICAgICAgcGVyY2VudCA9IHBlcmNlbnQgPiAxMDAgPyAxMDAgOiBwZXJjZW50XG4gICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnbGFzdFN0ZXAnLCByZXMuZGF0YS5kYXRhLmN1clN0ZXApXG4gICAgICAgICAgdGhhdC5zdGVwTnVtID0gcmVzLmRhdGEuZGF0YS5jdXJTdGVwXG4gICAgICAgICAgdGhhdC5hbGxTdGVwID0gcmVzLmRhdGEuZGF0YS5jdXJUaW1lc1RvdGFsU3RlcFxuICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgICBpZiAocGVyY2VudCAhPT0gMCkge1xuICAgICAgICAgICAgdGhhdC5kcmF3Q2lyY2xlKHBlcmNlbnQpXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHRoYXQuc2F2ZUNhbnZhc1RvTW9iaWxlKCk7XG4gICAgICAgICAgdGhhdC5mb3JtRGF0YShyZXMuZGF0YS5kYXRhLmRhdGVTdGVwQmVhbkxpc3QpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29tbW9uLnNob3dFcnJvclRpcChyZXMuZGF0YS5kZXNjKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRPRE9cbiAgICAgKiDmj5DphpLlnZrmjIHlvIDlhbNcbiAgICAgKi9cbiAgICBzd2l0Y2hDaGFuZ2UoZXZlbnQpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgY29tbW9uLnNob3dMb2FkaW5nKCcnKVxuICAgICAgbG9nc3RhdC5sb2dQdih7XG4gICAgICAgICdwbGF0Zm9ybSc6IDcsXG4gICAgICAgICdwb2ludENvZGUnOiAnNzAyMDEwNidcbiAgICAgIH0pXG4gICAgICB2YXIgbXNnRmxhZyA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5mbGFnXG4gICAgICBjb21tb24ucG9zdCgnL3N3aXNzZS1taW5pYXBwL21pbmlhcHAvc3dydW4vZm9ybS91cGRhdGUvbXNnL2ZsYWcnLCB7XG4gICAgICAgIG9wZW5JZDogdGhpcy5vcGVuSWQsXG4gICAgICAgIG1zZ0ZsYWc6IG1zZ0ZsYWdcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT09ICcxMDAnKSB7XG4gICAgICAgICAgY29tbW9uLnRvYXN0TWVzc2FnZSgn6K6+572u5oiQ5YqfJylcbiAgICAgICAgICB0aGF0LmNoZWNrZWQgPSBtc2dGbGFnID09PSAnMSdcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29tbW9uLnNob3dMb2FkaW5nKCforr7nva7lpLHotKUnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaVsOaNruagvOW8j+WMllxuICAgICAqL1xuICAgIGZvcm1EYXRhKGFycikge1xuICAgICAgbGV0IHRoaXNNb250aERhdGEgPSBbXVxuICAgICAgbGV0IGV4TW9udGhEYXRhID0gW11cbiAgICAgIGxldCBoYXNFeE1vbnRoRGF0YSA9IGZhbHNlXG4gICAgICBsZXQgdGhpc01vdGggPSAnJ1xuICAgICAgdGhpc01vdGggPSBwYXJzZUludCh0aGlzLm5vd0RhdGUuc3BsaXQoJy0nKVsxXSlcbiAgICAgIHZhciBtb250aExlbiA9IGNvbW1vbi5nZXREYXlzSW5Nb250aCh0aGlzLm5vd0RhdGUpXG4gICAgICB2YXIgbW9udGhGaXJzdERheSA9IGNvbW1vbi5nZXR3ZWtJbk1vbnRoKHRoaXMubm93RGF0ZSlcbiAgICAgIHZhciBhbGxMZW50aCA9IHRoaXMuZ2V0QWxsTGVuZ3RoKG1vbnRoRmlyc3REYXksIG1vbnRoTGVuKVxuICAgICAgbGV0IGV4QWxsTGVudGggPSAwXG4gICAgICBsZXQgZnVsbE51bSA9IDBcbiAgICAgIHRoaXMubW9udGhMZW4gPSBtb250aExlblxuICAgICAgdGhpcy5tb250aEZpcnN0RGF5ID0gbW9udGhGaXJzdERheVxuXG4gICAgICBmb3IgKHZhciB6ID0gMDsgeiA8IHRoaXMubW9udGhMZW47IHorKykge1xuICAgICAgICB0aGlzTW9udGhEYXRhLnB1c2gobnVsbClcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBtb250aCA9IHBhcnNlSW50KGFycltpXS5ydW5EYXRlLnNwbGl0KCctJylbMV0pXG4gICAgICAgIHZhciBkYXkgPSBwYXJzZUludChhcnJbaV0ucnVuRGF0ZS5zcGxpdCgnLScpWzJdKVxuICAgICAgICBpZiAobW9udGggPT09IHRoaXNNb3RoKSB7XG4gICAgICAgICAgdGhpc01vbnRoRGF0YVtkYXkgLSAxXSA9IHBhcnNlSW50KGFycltpXS5zdGVwKVxuICAgICAgICAgIGlmIChwYXJzZUludChhcnJbaV0uc3RlcCkgPiAxMDAwMCkge1xuICAgICAgICAgICAgZnVsbE51bSArPSAxXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghaGFzRXhNb250aERhdGEpIHtcbiAgICAgICAgICAgIHZhciBleE1vbnRoRmlyc3REYXkgPSBjb21tb24uZ2V0d2VrSW5Nb250aChhcnJbaV0ucnVuRGF0ZSlcbiAgICAgICAgICAgIHZhciBleE1vbnRoTGVuID0gY29tbW9uLmdldERheXNJbk1vbnRoKGFycltpXS5ydW5EYXRlKVxuICAgICAgICAgICAgZXhBbGxMZW50aCA9IHRoaXMuZ2V0QWxsTGVuZ3RoKGV4TW9udGhGaXJzdERheSwgZXhNb250aExlbilcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZXhNb250aExlbjsgaisrKSB7XG4gICAgICAgICAgICAgIGV4TW9udGhEYXRhLnB1c2gobnVsbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZXhNb250aExlbiA9IGV4TW9udGhMZW5cbiAgICAgICAgICAgIHRoaXMuZXhNb250aEZpcnN0RGF5ID0gZXhNb250aEZpcnN0RGF5XG4gICAgICAgICAgfVxuICAgICAgICAgIGhhc0V4TW9udGhEYXRhID0gdHJ1ZVxuICAgICAgICAgIGV4TW9udGhEYXRhW2RheSAtIDFdID0gcGFyc2VJbnQoYXJyW2ldLnN0ZXApXG4gICAgICAgICAgaWYgKHBhcnNlSW50KGFycltpXS5zdGVwKSA+IDEwMDAwKSB7XG4gICAgICAgICAgICBmdWxsTnVtICs9IDFcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChoYXNFeE1vbnRoRGF0YSkge1xuICAgICAgICB0aGlzLnRoaXNNb250aERhdGEgPSB0aGlzTW9udGhEYXRhXG4gICAgICAgIHRoaXMuZXhNb250aERhdGEgPSBleE1vbnRoRGF0YVxuICAgICAgICB0aGlzLmhhc0V4TW9udGggPSB0cnVlXG4gICAgICAgIHRoaXMuYWxsTGVudGggPSBhbGxMZW50aFxuICAgICAgICB0aGlzLmV4QWxsTGVudGggPSBleEFsbExlbnRoXG4gICAgICAgIHRoaXMuZnVsbE51bSA9IGZ1bGxOdW1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudGhpc01vbnRoRGF0YSA9IHRoaXNNb250aERhdGFcbiAgICAgICAgdGhpcy5oYXNFeE1vbnRoID0gZmFsc2VcbiAgICAgICAgdGhpcy5hbGxMZW50aCA9IGFsbExlbnRoXG4gICAgICAgIHRoaXMuZXhBbGxMZW50aCA9IGV4QWxsTGVudGhcbiAgICAgICAgdGhpcy5mdWxsTnVtID0gZnVsbE51bVxuICAgICAgfVxuICAgICAgdmFyIG1heExlbmd0aCA9IDBcbiAgICAgIHZhciBzd2lwZXJIZWlnaHQgPSAnMjE4cnB4J1xuICAgICAgaWYgKHRoaXMuYWxsTGVudGggPiB0aGlzLmV4QWxsTGVudGgpIHtcbiAgICAgICAgbWF4TGVuZ3RoID0gdGhpcy5hbGxMZW50aFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWF4TGVuZ3RoID0gdGhpcy5leEFsbExlbnRoXG4gICAgICB9XG4gICAgICBpZiAobWF4TGVuZ3RoID4gMzUpIHtcbiAgICAgICAgc3dpcGVySGVpZ2h0ID0gJzMzNHJweCdcbiAgICAgIH0gZWxzZSBpZiAobWF4TGVuZ3RoID4gMjgpIHtcbiAgICAgICAgc3dpcGVySGVpZ2h0ID0gJzI3NnJweCdcbiAgICAgIH1cbiAgICAgIHRoaXMuc3dpcGVySGVpZ2h0ID0gc3dpcGVySGVpZ2h0XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuXG4gICAgZ2V0QWxsTGVuZ3RoKG1vbnRoRmlyc3REYXksIG1vbnRoTGVuKSB7XG4gICAgICB2YXIgYWxsTGVudGggPSAwXG4gICAgICB2YXIgbGVuZ3RoID0gbW9udGhGaXJzdERheSArIG1vbnRoTGVuXG4gICAgICB2YXIgd2Vla3MgPSBwYXJzZUludChsZW5ndGggLyA3KVxuICAgICAgdmFyIHl1c2h1ID0gbGVuZ3RoICUgN1xuICAgICAgaWYgKHl1c2h1ID4gMCkge1xuICAgICAgICBhbGxMZW50aCA9IDcgKiAod2Vla3MgKyAxKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxsTGVudGggPSBsZW5ndGhcbiAgICAgIH1cbiAgICAgIHJldHVybiBhbGxMZW50aFxuICAgIH1cblxuICAgIC8vIOS/neWtmGZvcm1JZFxuICAgIHN1Ym1pdEluZm8oZSkge1xuICAgICAgY29tbW9uLnBvc3QoJy9zd2lzc2UtbWluaWFwcC9taW5pYXBwL3N3cnVuL2Zvcm0vc2F2ZUZvcm0nLCB7XG4gICAgICAgIG9wZW5JZDogdGhpcy5vcGVuSWQsXG4gICAgICAgIGZvcm1JZDogZS5kZXRhaWwuZm9ybUlkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5jb2RlID09PSAnMTAwJykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCfkv53lrZhmb3JtSWTmiJDlip8nKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCfkv53lrZhmb3JtSWTlpLHotKUnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGRyYXdDaXJjbGUocGVyY2VudCkge1xuICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgICBmdW5jdGlvbiBkcmF3QXJjKHMsIGUpIHtcbiAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgnd2hpdGUnKVxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIDIwMCwgMjAwKVxuICAgICAgICBjdHguZHJhdygpXG4gICAgICAgIGxldCB4ID0gNzBcbiAgICAgICAgbGV0IHkgPSA3MFxuICAgICAgICBsZXQgcmFkaXVzID0gNjBcbiAgICAgICAgY3R4LnNldExpbmVXaWR0aCgxMClcbiAgICAgICAgY3R4LnNldFN0cm9rZVN0eWxlKCcjZjYyODI4JylcbiAgICAgICAgY3R4LnNldExpbmVDYXAoJ3JvdW5kJylcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgIGN0eC5hcmMoeCwgeSwgcmFkaXVzLCBzLCBlLCBmYWxzZSlcbiAgICAgICAgY3R4LnN0cm9rZSgpXG4gICAgICAgIGN0eC5kcmF3KClcbiAgICAgIH1cbiAgICAgIGxldCBzdGFydEFuZ2xlID0gLTAuNSAqIE1hdGguUElcbiAgICAgIGxldCBlbmRBbmdsZSA9IDBcbiAgICAgIC8vIHZhciBwZXJjZW50ID0gNTA7XG4gICAgICBlbmRBbmdsZSA9IDIgKiBNYXRoLlBJICogcGVyY2VudCAvIDEwMCAtIDAuNSAqIE1hdGguUElcbiAgICAgIGRyYXdBcmMoc3RhcnRBbmdsZSwgZW5kQW5nbGUpXG4gICAgfVxuXG4gICAgY2xvc2VGaXJzdFJhbmtEaWFsb2coKSB7XG4gICAgICB0aGlzLnNob3dGaXJzdFJhbmtEaWFsb2cgPSBmYWxzZVxuICAgICAgdGhpcy5zaG93Q2lyY2xlQ2FudmFzID0gJydcbiAgICB9XG5cbiAgICBjaGVja1Nob3dSYW5rT25lKG9wZW5JZCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICBjb21tb24uZ2V0KCcvc3dpc3NlLW1pbmlhcHAvbWluaWFwcC9zd3J1bi90ZWFtL3F1ZXJ5L2RheS90b3AxL21zZy8nICsgb3BlbklkKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5jb2RlID09PSAnMTAwJykge1xuICAgICAgICAgIGlmIChyZXMuZGF0YS5kYXRhKSB7XG4gICAgICAgICAgICB2YXIgcmFua09uZVRpcCA9IHJlcy5kYXRhLmRhdGEuc3BsaXQoJ++8jCcpXG4gICAgICAgICAgICB0aGF0LnNob3dGaXJzdFJhbmtEaWFsb2cgPSB0cnVlXG4gICAgICAgICAgICB0aGF0LnJhbmtPbmVUaXAgPSByYW5rT25lVGlwXG4gICAgICAgICAgICB0aGF0LnNob3dDaXJjbGVDYW52YXMgPSAnZF9ub25lJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21tb24uc2hvd0Vycm9yVGlwKHJlcy5kYXRhLmRlc2MpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4iXX0=