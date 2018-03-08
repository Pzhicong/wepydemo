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
                _context.next = 3;
                return this.$parent.getOpenId();

              case 3:
                this.openId = _context.sent;
                _context.next = 6;
                return this.$parent.getUserInfo();

              case 6:
                this.userInfo = _context.sent;

                this.checkJoinRun(this.openId);
                this.getPersonNumber(this.openId);

              case 9:
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImd1aWRlLmpzIl0sIm5hbWVzIjpbIkd1aWRlIiwibG9nUHYiLCIkcGFyZW50IiwiZ2V0T3BlbklkIiwib3BlbklkIiwiZ2V0VXNlckluZm8iLCJ1c2VySW5mbyIsImNoZWNrSm9pblJ1biIsImdldFBlcnNvbk51bWJlciIsInNob3dMb2FkaW5nIiwiZ2V0IiwidGhlbiIsInJlcyIsImRhdGEiLCJjb2RlIiwicmVkaXJlY3RUbyIsInVybCIsInNldERhdGEiLCJzaG93UGFnZSIsImdldFJhbmtMaXN0IiwiaGFzTWVtYmVyIiwidGl0bGUiLCJwYXRoIiwiaW1hZ2VVcmwiLCJzdWNjZXNzIiwiZmFpbCIsIm1hcmtDbGFzcyIsInBvc3QiLCJ0c25vIiwiRGF0ZSIsImdldFRpbWUiLCJzaG93VG9hc3QiLCJkZXNjIiwiaWNvbiIsImR1cmF0aW9uIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsIm1hc2siLCJhd2FyZE1hc2siLCJtZW1iZXJOdW0iLCJhY3RUaW1lcyIsImdldFN0b3JhZ2VTeW5jIiwiY2hpbmVzZUFjdFRpbWVzIiwiQXJhYmlhX1RvX1NpbXBsaWZpZWRDaGluZXNlIiwicmFua0xpc3QiLCJtb250aEF2Z0xpc3QiLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsImZvcm1JZCIsInBhZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsInBhbmVsIiwiY291bnRlcjEiLCJjb3VudGVyMiIsImxpc3QiLCJncm91cCIsInRvYXN0IiwibWl4aW5zIiwiaW1hZ2VzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ29Ub1BhZ2UiLCJuYXZpZ2F0ZVRvIiwicmVMYXVuY2giLCJldmVudHMiLCIkZXZlbnQiLCJsZW5ndGgiLCIkbmFtZSIsIm5hbWUiLCJzb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7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QUFLdUIsS0FBcEIsaUJBQXFDRixPQUFPRyxJQUE1QyxjQUF5REgsT0FBT0ksTUFBUCxDQUFjRixLQUF2RTtBQUNEO0FBSk0sRzs7O2tCQTNDVXhFLEsiLCJmaWxlIjoiZ3VpZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IExpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9saXN0J1xuICBpbXBvcnQgUGFuZWwgZnJvbSAnQC9jb21wb25lbnRzL3BhbmVsJyAvLyBhbGlhcyBleGFtcGxlXG4gIGltcG9ydCBDb3VudGVyIGZyb20gJ2NvdW50ZXInIC8vIGFsaWFzIGV4YW1wbGVcbiAgaW1wb3J0IEdyb3VwIGZyb20gJy4uL2NvbXBvbmVudHMvZ3JvdXAnXG4gIGltcG9ydCBUb2FzdCBmcm9tICd3ZXB5LWNvbS10b2FzdCdcbiAgaW1wb3J0IHRlc3RNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCdcbiAgaW1wb3J0IGNvbW1vbiBmcm9tICcuLi9saWJzL3V0aWwnXG4gIGltcG9ydCBsb2dzdGF0IGZyb20gJy4uL2xpYnMvbG9nc3RhdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBHdWlkZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ2d1aWRlJ1xuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgcGFuZWw6IFBhbmVsLFxuICAgICAgY291bnRlcjE6IENvdW50ZXIsXG4gICAgICBjb3VudGVyMjogQ291bnRlcixcbiAgICAgIGxpc3Q6IExpc3QsXG4gICAgICBncm91cDogR3JvdXAsXG4gICAgICB0b2FzdDogVG9hc3RcbiAgICB9XG5cbiAgICBtaXhpbnMgPSBbdGVzdE1peGluXVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIGltYWdlczogJycsXG4gICAgICBtZW1iZXJOdW06ICcnLFxuICAgICAgbWFya0NsYXNzOiAncF9ub25lJyxcbiAgICAgIGF3YXJkTWFzazogJ3Bfbm9uZScsXG4gICAgICByYW5rTGlzdDogW10sXG4gICAgICB1c2VySW5mbzoge30sXG4gICAgICBvcGVuSWQ6ICcnLFxuICAgICAgc2hvd1BhZ2U6IGZhbHNlLFxuICAgICAgY2hpbmVzZUFjdFRpbWVzOiAnJ1xuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb1RvUGFnZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsLFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgd2VweS5yZUxhdW5jaCh7XG4gICAgICAgICAgICAgIHVybDogZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgZXZlbnRzID0ge1xuICAgICAgJ2luZGV4LWVtaXQnOiAoLi4uYXJncykgPT4ge1xuICAgICAgICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuJG5hbWV9IHJlY2VpdmUgJHskZXZlbnQubmFtZX0gZnJvbSAkeyRldmVudC5zb3VyY2UuJG5hbWV9YClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBvbkxvYWQoKSB7XG4gICAgICBsb2dzdGF0LmxvZ1B2KHtcbiAgICAgICAgJ3BsYXRmb3JtJzogNyxcbiAgICAgICAgJ3BvaW50Q29kZSc6ICc3MDEwMTAwJ1xuICAgICAgfSlcbiAgICAgIHRoaXMub3BlbklkID0gYXdhaXQgdGhpcy4kcGFyZW50LmdldE9wZW5JZCgpXG4gICAgICB0aGlzLnVzZXJJbmZvID0gYXdhaXQgdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKClcbiAgICAgIHRoaXMuY2hlY2tKb2luUnVuKHRoaXMub3BlbklkKVxuICAgICAgdGhpcy5nZXRQZXJzb25OdW1iZXIodGhpcy5vcGVuSWQpXG4gICAgfVxuICAgIC8qKlxuICAgKiDmmK/lkKblj4LliqDmnKzmnJ/ot5HmraVcbiAgICovXG4gICAgY2hlY2tKb2luUnVuKG9wZW5JZCkge1xuICAgICAgY29tbW9uLnNob3dMb2FkaW5nKCcnKVxuICAgICAgY29tbW9uLmdldCgnL3N3aXNzZS1taW5pYXBwL21pbmlhcHAvc3dydW4vcGVyc29uL2lzL2pvaW4vJyArIG9wZW5JZCkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuY29kZSA9PT0gJzEwMCcpIHtcbiAgICAgICAgICBpZiAocmVzLmRhdGEuZGF0YSA9PT0gJzEnKSB7XG4gICAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe3VybDogJ2hvbWUnfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgc2hvd1BhZ2U6IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLmdldFJhbmtMaXN0KClcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGhhc01lbWJlcjogZmFsc2VcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgKiDnlKjmiLfngrnlh7vlj7PkuIrop5LliIbkuqtcbiAgICovXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogJzIx5aSp5omT5Y2h6K6h5YiSJyxcbiAgICAgICAgcGF0aDogJy9wYWdlcy9ndWlkZS9ndWlkZScsXG4gICAgICAgIGltYWdlVXJsOiAnL2ltYWdlcy9zaGFyZUxvZ28uanBnJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2hvd0d1aWRlTWFzaygpIHtcbiAgICAgIGxvZ3N0YXQubG9nUHYoe1xuICAgICAgICAncGxhdGZvcm0nOiA3LFxuICAgICAgICAncG9pbnRDb2RlJzogJzcwMTAxMDEnXG4gICAgICB9KVxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgbWFya0NsYXNzOiAnJ1xuICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGFydFJ1bigpIHtcbiAgICAgIGxvZ3N0YXQubG9nUHYoe1xuICAgICAgICAncGxhdGZvcm0nOiA3LFxuICAgICAgICAncG9pbnRDb2RlJzogJzcwMTAxMDInXG4gICAgICB9KVxuICAgICAgdmFyIG9wZW5JZCA9IHRoaXMub3BlbklkXG4gICAgICBjb21tb24ucG9zdCgnL3N3aXNzZS1taW5pYXBwL21pbmlhcHAvc3dydW4vcGVyc29uL2pvaW5SdW4nLCB7XG4gICAgICAgIG9wZW5JZDogb3BlbklkLFxuICAgICAgICB0c25vOiBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuY29kZSA9PT0gJzEwMCcpIHtcbiAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe3VybDogJ2hvbWUnfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogcmVzLmRhdGEuZGVzYyxcbiAgICAgICAgICAgIGljb246ICdsb2FkaW5nJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjbG9zZU1hc2soZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubWFzayA9PT0gJ2d1aWRlJykge1xuICAgICAgICB0aGlzLnNldERhdGEoe21hcmtDbGFzczogJ3Bfbm9uZSd9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHthd2FyZE1hc2s6ICdwX25vbmUnfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bmnKzmnJ/lj4LliqDmr5TotZvkurrmlbBcbiAgICAgKi9cbiAgICBnZXRQZXJzb25OdW1iZXIoKSB7XG4gICAgICBjb21tb24uZ2V0KCcvc3dpc3NlLW1pbmlhcHAvbWluaWFwcC9zd3J1bi9wZXJzb24vdG90YWwvam9pbicpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmNvZGUgPT09ICcxMDAnKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHttZW1iZXJOdW06IHJlcy5kYXRhLmRhdGF9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn5p+l6K+i5Lq65pWw5aSx6LSlJyxcbiAgICAgICAgICAgIGljb246ICdsb2FkaW5nJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlm6Lot5FcbiAgICAgKi9cbiAgICB0ZWFtUnVuKCkge1xuICAgICAgbG9nc3RhdC5sb2dQdih7XG4gICAgICAgICdwbGF0Zm9ybSc6IDcsXG4gICAgICAgICdwb2ludENvZGUnOiAnNzAxMDEwMydcbiAgICAgIH0pXG4gICAgICB3ZXB5LnJlZGlyZWN0VG8oe3VybDogJy4uL3RlYW0vdGVhbSd9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4iuacn+iOt+WlluWQjeWNlVxuICAgICAqL1xuICAgIGdldFJhbmtMaXN0KCkge1xuICAgICAgY29tbW9uLmdldCgnL3N3aXNzZS1taW5pYXBwL21pbmlhcHAvc3dydW4vdGVhbS9xdWVyeS9tb250aC9yYW5raW5nL2xpc3QnKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5jb2RlID09PSAnMTAwJykge1xuICAgICAgICAgIGxldCBhY3RUaW1lcyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2FjdFRpbWVzJykgfHwgJydcbiAgICAgICAgICBsZXQgY2hpbmVzZUFjdFRpbWVzID0gY29tbW9uLkFyYWJpYV9Ub19TaW1wbGlmaWVkQ2hpbmVzZShhY3RUaW1lcyAtIDEpXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGF3YXJkTWFzazogJycsXG4gICAgICAgICAgICByYW5rTGlzdDogcmVzLmRhdGEuZGF0YS5tb250aEF2Z0xpc3QsXG4gICAgICAgICAgICBjaGluZXNlQWN0VGltZXM6IGNoaW5lc2VBY3RUaW1lc1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGF3YXJkTWFzazogJ3Bfbm9uZSdcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS/neWtmGZvcm1JZFxuICAgICAqL1xuICAgIHN1Ym1pdEluZm8oZSkge1xuICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwuZm9ybUlkKVxuICAgICAgdmFyIG9wZW5JZCA9IHRoaXMub3BlbklkXG4gICAgICBjb21tb24ucG9zdCgnL3N3aXNzZS1taW5pYXBwL21pbmlhcHAvc3dydW4vZm9ybS9zYXZlRm9ybScsIHtcbiAgICAgICAgb3BlbklkOiBvcGVuSWQsXG4gICAgICAgIGZvcm1JZDogZS5kZXRhaWwuZm9ybUlkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5jb2RlID09PSAnMTAwJykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCfkv53lrZhmb3JtSWTmiJDlip8nKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCfkv53lrZhmb3JtSWTlpLHotKUnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19