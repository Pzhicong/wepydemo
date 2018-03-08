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


var Guide = function (_wepy$page) {
  _inherits(Guide, _wepy$page);

  function Guide() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Guide);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Guide.__proto__ || Object.getPrototypeOf(Guide)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Guide, [{
    key: 'onLoad',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _logstat2.default.logPv({
                  'platform': 7,
                  'pointCode': '7010100'
                });

                if (this.$parent.globalData.openId) {
                  _context.next = 5;
                  break;
                }

                _context.next = 4;
                return this.$parent.getOpenId();

              case 4:
                this.openId = _context.sent;

              case 5:
                if (this.$parent.globalData.userInfo) {
                  _context.next = 9;
                  break;
                }

                _context.next = 8;
                return this.$parent.getUserInfo();

              case 8:
                this.userInfo = _context.sent;

              case 9:
                this.checkJoinRun(this.openId);
                this.getPersonNumber(this.openId);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onLoad() {
        return _ref2.apply(this, arguments);
      }

      return onLoad;
    }()
    /**
    * 是否参加本期跑步
    */

  }, {
    key: 'checkJoinRun',
    value: function checkJoinRun(openId) {
      var _this2 = this;

      _util2.default.showLoading('');
      _util2.default.get('/swisse-miniapp/miniapp/swrun/person/is/join/' + openId).then(function (res) {
        if (res.data.code === '100') {
          if (res.data.data === '1') {
            _wepy2.default.redirectTo({ url: 'home' });
          } else {
            _this2.setData({
              showPage: true
            });
            _this2.getRankList();
          }
        } else {
          _this2.setData({
            hasMember: false
          });
        }
      });
    }

    /**
    * 用户点击右上角分享
    */

  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {
      return {
        title: '21天打卡计划',
        path: '/pages/guide/guide',
        imageUrl: '/images/shareLogo.jpg',
        success: function success(res) {},
        fail: function fail(res) {}
      };
    }
  }, {
    key: 'showGuideMask',
    value: function showGuideMask() {
      _logstat2.default.logPv({
        'platform': 7,
        'pointCode': '7010101'
      });
      this.setData({
        markClass: ''
      });
    }
  }, {
    key: 'startRun',
    value: function startRun() {
      _logstat2.default.logPv({
        'platform': 7,
        'pointCode': '7010102'
      });
      var openId = this.openId;
      _util2.default.post('/swisse-miniapp/miniapp/swrun/person/joinRun', {
        openId: openId,
        tsno: new Date().getTime()
      }).then(function (res) {
        if (res.data.code === '100') {
          _wepy2.default.redirectTo({ url: 'home' });
        } else {
          _wepy2.default.showToast({
            title: res.data.desc,
            icon: 'loading',
            duration: 2000
          });
        }
      });
    }
  }, {
    key: 'closeMask',
    value: function closeMask(event) {
      if (event.currentTarget.dataset.mask === 'guide') {
        this.setData({ markClass: 'p_none' });
      } else {
        this.setData({ awardMask: 'p_none' });
      }
    }

    /**
     * 获取本期参加比赛人数
     */

  }, {
    key: 'getPersonNumber',
    value: function getPersonNumber() {
      var _this3 = this;

      _util2.default.get('/swisse-miniapp/miniapp/swrun/person/total/join').then(function (res) {
        if (res.data.code === '100') {
          _this3.setData({ memberNum: res.data.data });
        } else {
          _wepy2.default.showToast({
            title: '查询人数失败',
            icon: 'loading',
            duration: 2000
          });
        }
      });
    }

    /**
     * 团跑
     */

  }, {
    key: 'teamRun',
    value: function teamRun() {
      _logstat2.default.logPv({
        'platform': 7,
        'pointCode': '7010103'
      });
      _wepy2.default.redirectTo({ url: '../team/team' });
    }

    /**
     * 上期获奖名单
     */

  }, {
    key: 'getRankList',
    value: function getRankList() {
      var _this4 = this;

      _util2.default.get('/swisse-miniapp/miniapp/swrun/team/query/month/ranking/list').then(function (res) {
        if (res.data.code === '100') {
          var actTimes = _wepy2.default.getStorageSync('actTimes') || '';
          var chineseActTimes = _util2.default.Arabia_To_SimplifiedChinese(actTimes - 1);
          _this4.setData({
            awardMask: '',
            rankList: res.data.data.monthAvgList,
            chineseActTimes: chineseActTimes
          });
        } else {
          _this4.setData({
            awardMask: 'p_none'
          });
        }
      });
    }

    /**
     * 保存formId
     */

  }, {
    key: 'submitInfo',
    value: function submitInfo(e) {
      console.log(e.detail.formId);
      var openId = this.openId;
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
  }]);

  return Guide;
}(_wepy2.default.page);

var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.config = {
    navigationBarTitleText: 'guide'
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
    memberNum: '',
    markClass: 'p_none',
    awardMask: 'p_none',
    rankList: [],
    userInfo: {},
    openId: '',
    showPage: false,
    chineseActTimes: ''
  };
  this.computed = {};
  this.methods = {
    goToPage: function goToPage(event) {
      _wepy2.default.navigateTo({
        url: event.currentTarget.dataset.url,
        fail: function fail() {
          _wepy2.default.reLaunch({
            url: event.currentTarget.dataset.url
          });
        }
      });
    }
  };
  this.events = {
    'index-emit': function indexEmit() {
      var _ref3;

      var $event = (_ref3 = arguments.length - 1, arguments.length <= _ref3 ? undefined : arguments[_ref3]);
      console.log(_this5.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    }
  };
};


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Guide , 'pages/guide'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImd1aWRlLmpzIl0sIm5hbWVzIjpbIkd1aWRlIiwibG9nUHYiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIm9wZW5JZCIsImdldE9wZW5JZCIsInVzZXJJbmZvIiwiZ2V0VXNlckluZm8iLCJjaGVja0pvaW5SdW4iLCJnZXRQZXJzb25OdW1iZXIiLCJzaG93TG9hZGluZyIsImdldCIsInRoZW4iLCJyZXMiLCJkYXRhIiwiY29kZSIsInJlZGlyZWN0VG8iLCJ1cmwiLCJzZXREYXRhIiwic2hvd1BhZ2UiLCJnZXRSYW5rTGlzdCIsImhhc01lbWJlciIsInRpdGxlIiwicGF0aCIsImltYWdlVXJsIiwic3VjY2VzcyIsImZhaWwiLCJtYXJrQ2xhc3MiLCJwb3N0IiwidHNubyIsIkRhdGUiLCJnZXRUaW1lIiwic2hvd1RvYXN0IiwiZGVzYyIsImljb24iLCJkdXJhdGlvbiIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJtYXNrIiwiYXdhcmRNYXNrIiwibWVtYmVyTnVtIiwiYWN0VGltZXMiLCJnZXRTdG9yYWdlU3luYyIsImNoaW5lc2VBY3RUaW1lcyIsIkFyYWJpYV9Ub19TaW1wbGlmaWVkQ2hpbmVzZSIsInJhbmtMaXN0IiwibW9udGhBdmdMaXN0IiwiZSIsImNvbnNvbGUiLCJsb2ciLCJkZXRhaWwiLCJmb3JtSWQiLCJwYWdlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJwYW5lbCIsImNvdW50ZXIxIiwiY291bnRlcjIiLCJsaXN0IiwiZ3JvdXAiLCJ0b2FzdCIsIm1peGlucyIsImltYWdlcyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImdvVG9QYWdlIiwibmF2aWdhdGVUbyIsInJlTGF1bmNoIiwiZXZlbnRzIiwiJGV2ZW50IiwibGVuZ3RoIiwiJG5hbWUiLCJuYW1lIiwic291cmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OzsrZUFOdUM7QUFDVDs7O0lBT1RBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtRGpCLGtDQUFRQyxLQUFSLENBQWM7QUFDWiw4QkFBWSxDQURBO0FBRVosK0JBQWE7QUFGRCxpQkFBZDs7b0JBSUssS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxNOzs7Ozs7dUJBQ1AsS0FBS0YsT0FBTCxDQUFhRyxTQUFiLEU7OztBQUFwQixxQkFBS0QsTTs7O29CQUVGLEtBQUtGLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkcsUTs7Ozs7O3VCQUNMLEtBQUtKLE9BQUwsQ0FBYUssV0FBYixFOzs7QUFBdEIscUJBQUtELFE7OztBQUVQLHFCQUFLRSxZQUFMLENBQWtCLEtBQUtKLE1BQXZCO0FBQ0EscUJBQUtLLGVBQUwsQ0FBcUIsS0FBS0wsTUFBMUI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRjs7Ozs7O2lDQUdhQSxNLEVBQVE7QUFBQTs7QUFDbkIscUJBQU9NLFdBQVAsQ0FBbUIsRUFBbkI7QUFDQSxxQkFBT0MsR0FBUCxDQUFXLGtEQUFrRFAsTUFBN0QsRUFBcUVRLElBQXJFLENBQTBFLGVBQU87QUFDL0UsWUFBSUMsSUFBSUMsSUFBSixDQUFTQyxJQUFULEtBQWtCLEtBQXRCLEVBQTZCO0FBQzNCLGNBQUlGLElBQUlDLElBQUosQ0FBU0EsSUFBVCxLQUFrQixHQUF0QixFQUEyQjtBQUN6QiwyQkFBS0UsVUFBTCxDQUFnQixFQUFDQyxLQUFLLE1BQU4sRUFBaEI7QUFDRCxXQUZELE1BRU87QUFDTCxtQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLHdCQUFVO0FBREMsYUFBYjtBQUdBLG1CQUFLQyxXQUFMO0FBQ0Q7QUFDRixTQVRELE1BU087QUFDTCxpQkFBS0YsT0FBTCxDQUFhO0FBQ1hHLHVCQUFXO0FBREEsV0FBYjtBQUdEO0FBQ0YsT0FmRDtBQWdCRDs7QUFFRDs7Ozs7O3dDQUdvQjtBQUNsQixhQUFPO0FBQ0xDLGVBQU8sU0FERjtBQUVMQyxjQUFNLG9CQUZEO0FBR0xDLGtCQUFVLHVCQUhMO0FBSUxDLGlCQUFTLGlCQUFTWixHQUFULEVBQWMsQ0FDdEIsQ0FMSTtBQU1MYSxjQUFNLGNBQVNiLEdBQVQsRUFBYyxDQUNuQjtBQVBJLE9BQVA7QUFTRDs7O29DQUVlO0FBQ2Qsd0JBQVFaLEtBQVIsQ0FBYztBQUNaLG9CQUFZLENBREE7QUFFWixxQkFBYTtBQUZELE9BQWQ7QUFJQSxXQUFLaUIsT0FBTCxDQUFhO0FBQ1hTLG1CQUFXO0FBREEsT0FBYjtBQUdEOzs7K0JBRVU7QUFDVCx3QkFBUTFCLEtBQVIsQ0FBYztBQUNaLG9CQUFZLENBREE7QUFFWixxQkFBYTtBQUZELE9BQWQ7QUFJQSxVQUFJRyxTQUFTLEtBQUtBLE1BQWxCO0FBQ0EscUJBQU93QixJQUFQLENBQVksOENBQVosRUFBNEQ7QUFDMUR4QixnQkFBUUEsTUFEa0Q7QUFFMUR5QixjQUFNLElBQUlDLElBQUosR0FBV0MsT0FBWDtBQUZvRCxPQUE1RCxFQUdHbkIsSUFISCxDQUdRLGVBQU87QUFDYixZQUFJQyxJQUFJQyxJQUFKLENBQVNDLElBQVQsS0FBa0IsS0FBdEIsRUFBNkI7QUFDM0IseUJBQUtDLFVBQUwsQ0FBZ0IsRUFBQ0MsS0FBSyxNQUFOLEVBQWhCO0FBQ0QsU0FGRCxNQUVPO0FBQ0wseUJBQUtlLFNBQUwsQ0FBZTtBQUNiVixtQkFBT1QsSUFBSUMsSUFBSixDQUFTbUIsSUFESDtBQUViQyxrQkFBTSxTQUZPO0FBR2JDLHNCQUFVO0FBSEcsV0FBZjtBQUtEO0FBQ0YsT0FiRDtBQWNEOzs7OEJBRVNDLEssRUFBTztBQUNmLFVBQUlBLE1BQU1DLGFBQU4sQ0FBb0JDLE9BQXBCLENBQTRCQyxJQUE1QixLQUFxQyxPQUF6QyxFQUFrRDtBQUNoRCxhQUFLckIsT0FBTCxDQUFhLEVBQUNTLFdBQVcsUUFBWixFQUFiO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBS1QsT0FBTCxDQUFhLEVBQUNzQixXQUFXLFFBQVosRUFBYjtBQUNEO0FBQ0Y7O0FBRUQ7Ozs7OztzQ0FHa0I7QUFBQTs7QUFDaEIscUJBQU83QixHQUFQLENBQVcsaURBQVgsRUFBOERDLElBQTlELENBQW1FLGVBQU87QUFDeEUsWUFBSUMsSUFBSUMsSUFBSixDQUFTQyxJQUFULEtBQWtCLEtBQXRCLEVBQTZCO0FBQzNCLGlCQUFLRyxPQUFMLENBQWEsRUFBQ3VCLFdBQVc1QixJQUFJQyxJQUFKLENBQVNBLElBQXJCLEVBQWI7QUFDRCxTQUZELE1BRU87QUFDTCx5QkFBS2tCLFNBQUwsQ0FBZTtBQUNiVixtQkFBTyxRQURNO0FBRWJZLGtCQUFNLFNBRk87QUFHYkMsc0JBQVU7QUFIRyxXQUFmO0FBS0Q7QUFDRixPQVZEO0FBV0Q7O0FBRUQ7Ozs7Ozs4QkFHVTtBQUNSLHdCQUFRbEMsS0FBUixDQUFjO0FBQ1osb0JBQVksQ0FEQTtBQUVaLHFCQUFhO0FBRkQsT0FBZDtBQUlBLHFCQUFLZSxVQUFMLENBQWdCLEVBQUNDLEtBQUssY0FBTixFQUFoQjtBQUNEOztBQUVEOzs7Ozs7a0NBR2M7QUFBQTs7QUFDWixxQkFBT04sR0FBUCxDQUFXLDZEQUFYLEVBQTBFQyxJQUExRSxDQUErRSxlQUFPO0FBQ3BGLFlBQUlDLElBQUlDLElBQUosQ0FBU0MsSUFBVCxLQUFrQixLQUF0QixFQUE2QjtBQUMzQixjQUFJMkIsV0FBVyxlQUFLQyxjQUFMLENBQW9CLFVBQXBCLEtBQW1DLEVBQWxEO0FBQ0EsY0FBSUMsa0JBQWtCLGVBQU9DLDJCQUFQLENBQW1DSCxXQUFXLENBQTlDLENBQXRCO0FBQ0EsaUJBQUt4QixPQUFMLENBQWE7QUFDWHNCLHVCQUFXLEVBREE7QUFFWE0sc0JBQVVqQyxJQUFJQyxJQUFKLENBQVNBLElBQVQsQ0FBY2lDLFlBRmI7QUFHWEgsNkJBQWlCQTtBQUhOLFdBQWI7QUFLRCxTQVJELE1BUU87QUFDTCxpQkFBSzFCLE9BQUwsQ0FBYTtBQUNYc0IsdUJBQVc7QUFEQSxXQUFiO0FBR0Q7QUFDRixPQWREO0FBZUQ7O0FBRUQ7Ozs7OzsrQkFHV1EsQyxFQUFHO0FBQ1pDLGNBQVFDLEdBQVIsQ0FBWUYsRUFBRUcsTUFBRixDQUFTQyxNQUFyQjtBQUNBLFVBQUloRCxTQUFTLEtBQUtBLE1BQWxCO0FBQ0EscUJBQU93QixJQUFQLENBQVksNkNBQVosRUFBMkQ7QUFDekR4QixnQkFBUUEsTUFEaUQ7QUFFekRnRCxnQkFBUUosRUFBRUcsTUFBRixDQUFTQztBQUZ3QyxPQUEzRCxFQUdHeEMsSUFISCxDQUdRLGVBQU87QUFDYixZQUFJQyxJQUFJQyxJQUFKLENBQVNDLElBQVQsS0FBa0IsS0FBdEIsRUFBNkI7QUFDM0JrQyxrQkFBUUMsR0FBUixDQUFZLFlBQVo7QUFDRCxTQUZELE1BRU87QUFDTEQsa0JBQVFDLEdBQVIsQ0FBWSxZQUFaO0FBQ0Q7QUFDRixPQVREO0FBVUQ7Ozs7RUEvTWdDLGVBQUtHLEk7Ozs7O09BQ3RDQyxNLEdBQVM7QUFDUEMsNEJBQXdCO0FBRGpCLEc7T0FHVEMsVSxHQUFhO0FBQ1hDLDBCQURXO0FBRVhDLCtCQUZXO0FBR1hDLCtCQUhXO0FBSVhDLHdCQUpXO0FBS1hDLDBCQUxXO0FBTVhDO0FBTlcsRztPQVNiQyxNLEdBQVMsZ0I7T0FFVGpELEksR0FBTztBQUNMa0QsWUFBUSxFQURIO0FBRUx2QixlQUFXLEVBRk47QUFHTGQsZUFBVyxRQUhOO0FBSUxhLGVBQVcsUUFKTjtBQUtMTSxjQUFVLEVBTEw7QUFNTHhDLGNBQVUsRUFOTDtBQU9MRixZQUFRLEVBUEg7QUFRTGUsY0FBVSxLQVJMO0FBU0x5QixxQkFBaUI7QUFUWixHO09BWVBxQixRLEdBQVcsRTtPQUdYQyxPLEdBQVU7QUFDUkMsY0FBVSxrQkFBVS9CLEtBQVYsRUFBaUI7QUFDekIscUJBQUtnQyxVQUFMLENBQWdCO0FBQ2RuRCxhQUFLbUIsTUFBTUMsYUFBTixDQUFvQkMsT0FBcEIsQ0FBNEJyQixHQURuQjtBQUVkUyxjQUFNLGdCQUFXO0FBQ2YseUJBQUsyQyxRQUFMLENBQWM7QUFDWnBELGlCQUFLbUIsTUFBTUMsYUFBTixDQUFvQkMsT0FBcEIsQ0FBNEJyQjtBQURyQixXQUFkO0FBR0Q7QUFOYSxPQUFoQjtBQVFEO0FBVk8sRztPQWFWcUQsTSxHQUFTO0FBQ1Asa0JBQWMscUJBQWE7QUFBQTs7QUFDekIsVUFBSUMsa0JBQWMsVUFBS0MsTUFBTCxHQUFjLENBQTVCLDJEQUFKO0FBQ0F2QixjQUFRQyxHQUFSLENBQWUsT0FBS3VCLEtBQXBCLGlCQUFxQ0YsT0FBT0csSUFBNUMsY0FBeURILE9BQU9JLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRDtBQUpNLEc7OztrQkEzQ1V6RSxLIiwiZmlsZSI6Imd1aWRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvbGlzdCdcbiAgaW1wb3J0IFBhbmVsIGZyb20gJ0AvY29tcG9uZW50cy9wYW5lbCcgLy8gYWxpYXMgZXhhbXBsZVxuICBpbXBvcnQgQ291bnRlciBmcm9tICdjb3VudGVyJyAvLyBhbGlhcyBleGFtcGxlXG4gIGltcG9ydCBHcm91cCBmcm9tICcuLi9jb21wb25lbnRzL2dyb3VwJ1xuICBpbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXG4gIGltcG9ydCB0ZXN0TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXG4gIGltcG9ydCBjb21tb24gZnJvbSAnLi4vbGlicy91dGlsJ1xuICBpbXBvcnQgbG9nc3RhdCBmcm9tICcuLi9saWJzL2xvZ3N0YXQnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VpZGUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdndWlkZSdcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIHBhbmVsOiBQYW5lbCxcbiAgICAgIGNvdW50ZXIxOiBDb3VudGVyLFxuICAgICAgY291bnRlcjI6IENvdW50ZXIsXG4gICAgICBsaXN0OiBMaXN0LFxuICAgICAgZ3JvdXA6IEdyb3VwLFxuICAgICAgdG9hc3Q6IFRvYXN0XG4gICAgfVxuXG4gICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cblxuICAgIGRhdGEgPSB7XG4gICAgICBpbWFnZXM6ICcnLFxuICAgICAgbWVtYmVyTnVtOiAnJyxcbiAgICAgIG1hcmtDbGFzczogJ3Bfbm9uZScsXG4gICAgICBhd2FyZE1hc2s6ICdwX25vbmUnLFxuICAgICAgcmFua0xpc3Q6IFtdLFxuICAgICAgdXNlckluZm86IHt9LFxuICAgICAgb3BlbklkOiAnJyxcbiAgICAgIHNob3dQYWdlOiBmYWxzZSxcbiAgICAgIGNoaW5lc2VBY3RUaW1lczogJydcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29Ub1BhZ2U6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybCxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHdlcHkucmVMYXVuY2goe1xuICAgICAgICAgICAgICB1cmw6IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGV2ZW50cyA9IHtcbiAgICAgICdpbmRleC1lbWl0JzogKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXG4gICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgb25Mb2FkKCkge1xuICAgICAgbG9nc3RhdC5sb2dQdih7XG4gICAgICAgICdwbGF0Zm9ybSc6IDcsXG4gICAgICAgICdwb2ludENvZGUnOiAnNzAxMDEwMCdcbiAgICAgIH0pXG4gICAgICBpZiAoIXRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLm9wZW5JZCkge1xuICAgICAgICB0aGlzLm9wZW5JZCA9IGF3YWl0IHRoaXMuJHBhcmVudC5nZXRPcGVuSWQoKVxuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbykge1xuICAgICAgICB0aGlzLnVzZXJJbmZvID0gYXdhaXQgdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKClcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hlY2tKb2luUnVuKHRoaXMub3BlbklkKVxuICAgICAgdGhpcy5nZXRQZXJzb25OdW1iZXIodGhpcy5vcGVuSWQpXG4gICAgfVxuICAgIC8qKlxuICAgKiDmmK/lkKblj4LliqDmnKzmnJ/ot5HmraVcbiAgICovXG4gICAgY2hlY2tKb2luUnVuKG9wZW5JZCkge1xuICAgICAgY29tbW9uLnNob3dMb2FkaW5nKCcnKVxuICAgICAgY29tbW9uLmdldCgnL3N3aXNzZS1taW5pYXBwL21pbmlhcHAvc3dydW4vcGVyc29uL2lzL2pvaW4vJyArIG9wZW5JZCkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuY29kZSA9PT0gJzEwMCcpIHtcbiAgICAgICAgICBpZiAocmVzLmRhdGEuZGF0YSA9PT0gJzEnKSB7XG4gICAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe3VybDogJ2hvbWUnfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgc2hvd1BhZ2U6IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLmdldFJhbmtMaXN0KClcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGhhc01lbWJlcjogZmFsc2VcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgKiDnlKjmiLfngrnlh7vlj7PkuIrop5LliIbkuqtcbiAgICovXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogJzIx5aSp5omT5Y2h6K6h5YiSJyxcbiAgICAgICAgcGF0aDogJy9wYWdlcy9ndWlkZS9ndWlkZScsXG4gICAgICAgIGltYWdlVXJsOiAnL2ltYWdlcy9zaGFyZUxvZ28uanBnJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2hvd0d1aWRlTWFzaygpIHtcbiAgICAgIGxvZ3N0YXQubG9nUHYoe1xuICAgICAgICAncGxhdGZvcm0nOiA3LFxuICAgICAgICAncG9pbnRDb2RlJzogJzcwMTAxMDEnXG4gICAgICB9KVxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgbWFya0NsYXNzOiAnJ1xuICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGFydFJ1bigpIHtcbiAgICAgIGxvZ3N0YXQubG9nUHYoe1xuICAgICAgICAncGxhdGZvcm0nOiA3LFxuICAgICAgICAncG9pbnRDb2RlJzogJzcwMTAxMDInXG4gICAgICB9KVxuICAgICAgdmFyIG9wZW5JZCA9IHRoaXMub3BlbklkXG4gICAgICBjb21tb24ucG9zdCgnL3N3aXNzZS1taW5pYXBwL21pbmlhcHAvc3dydW4vcGVyc29uL2pvaW5SdW4nLCB7XG4gICAgICAgIG9wZW5JZDogb3BlbklkLFxuICAgICAgICB0c25vOiBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuY29kZSA9PT0gJzEwMCcpIHtcbiAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe3VybDogJ2hvbWUnfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogcmVzLmRhdGEuZGVzYyxcbiAgICAgICAgICAgIGljb246ICdsb2FkaW5nJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjbG9zZU1hc2soZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubWFzayA9PT0gJ2d1aWRlJykge1xuICAgICAgICB0aGlzLnNldERhdGEoe21hcmtDbGFzczogJ3Bfbm9uZSd9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHthd2FyZE1hc2s6ICdwX25vbmUnfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bmnKzmnJ/lj4LliqDmr5TotZvkurrmlbBcbiAgICAgKi9cbiAgICBnZXRQZXJzb25OdW1iZXIoKSB7XG4gICAgICBjb21tb24uZ2V0KCcvc3dpc3NlLW1pbmlhcHAvbWluaWFwcC9zd3J1bi9wZXJzb24vdG90YWwvam9pbicpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT09ICcxMDAnKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHttZW1iZXJOdW06IHJlcy5kYXRhLmRhdGF9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn5p+l6K+i5Lq65pWw5aSx6LSlJyxcbiAgICAgICAgICAgIGljb246ICdsb2FkaW5nJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlm6Lot5FcbiAgICAgKi9cbiAgICB0ZWFtUnVuKCkge1xuICAgICAgbG9nc3RhdC5sb2dQdih7XG4gICAgICAgICdwbGF0Zm9ybSc6IDcsXG4gICAgICAgICdwb2ludENvZGUnOiAnNzAxMDEwMydcbiAgICAgIH0pXG4gICAgICB3ZXB5LnJlZGlyZWN0VG8oe3VybDogJy4uL3RlYW0vdGVhbSd9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4iuacn+iOt+WlluWQjeWNlVxuICAgICAqL1xuICAgIGdldFJhbmtMaXN0KCkge1xuICAgICAgY29tbW9uLmdldCgnL3N3aXNzZS1taW5pYXBwL21pbmlhcHAvc3dydW4vdGVhbS9xdWVyeS9tb250aC9yYW5raW5nL2xpc3QnKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5jb2RlID09PSAnMTAwJykge1xuICAgICAgICAgIGxldCBhY3RUaW1lcyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2FjdFRpbWVzJykgfHwgJydcbiAgICAgICAgICBsZXQgY2hpbmVzZUFjdFRpbWVzID0gY29tbW9uLkFyYWJpYV9Ub19TaW1wbGlmaWVkQ2hpbmVzZShhY3RUaW1lcyAtIDEpXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGF3YXJkTWFzazogJycsXG4gICAgICAgICAgICByYW5rTGlzdDogcmVzLmRhdGEuZGF0YS5tb250aEF2Z0xpc3QsXG4gICAgICAgICAgICBjaGluZXNlQWN0VGltZXM6IGNoaW5lc2VBY3RUaW1lc1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGF3YXJkTWFzazogJ3Bfbm9uZSdcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS/neWtmGZvcm1JZFxuICAgICAqL1xuICAgIHN1Ym1pdEluZm8oZSkge1xuICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwuZm9ybUlkKVxuICAgICAgdmFyIG9wZW5JZCA9IHRoaXMub3BlbklkXG4gICAgICBjb21tb24ucG9zdCgnL3N3aXNzZS1taW5pYXBwL21pbmlhcHAvc3dydW4vZm9ybS9zYXZlRm9ybScsIHtcbiAgICAgICAgb3BlbklkOiBvcGVuSWQsXG4gICAgICAgIGZvcm1JZDogZS5kZXRhaWwuZm9ybUlkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5jb2RlID09PSAnMTAwJykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCfkv53lrZhmb3JtSWTmiJDlip8nKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCfkv53lrZhmb3JtSWTlpLHotKUnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19