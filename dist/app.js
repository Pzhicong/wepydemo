'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _util = require('./libs/util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/guide', 'pages/index', 'pages/home'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      }
    };
    _this.globalData = {
      userInfo: null,
      openId: null,
      ActTimes: null
    };

    _this.use('requestfix');
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {
      // this.testAsync()
      this.getOpenId();
      this.getUserInfo();
      this.getActTimes();
    }
  }, {
    key: 'sleep',
    value: function sleep(s) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve('promise resolved');
        }, s * 1000);
      });
    }
  }, {
    key: 'testAsync',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.sleep(3);

              case 2:
                data = _context.sent;

                console.log(data);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function testAsync() {
        return _ref.apply(this, arguments);
      }

      return testAsync;
    }()
  }, {
    key: 'getOpenId',
    value: function getOpenId(isSession) {
      var _this2 = this;

      // const that = this
      if (this.globalData.openId && !isSession) {
        return this.globalData.openId;
      }
      if (this.globalData.sessionId && isSession) {
        return this.globalData.sessionId;
      }
      return new Promise(function (resolve, reject) {
        _wepy2.default.login({
          success: function success(res) {
            _util2.default.get('/swisse-miniapp/miniapp/auth/getSession/' + res.code).then(function (res) {
              if (res.data.code === '100') {
                _this2.globalData.openId = res.data.data.openId;
                _this2.globalData.sessionId = res.data.data.sessionId;
                if (isSession) {
                  resolve(res.data.data.sessionId);
                } else {
                  resolve(res.data.data.openId);
                }
              } else {
                _util2.default.toastMessage('获取session失败', 'loading');
              }
            });
          }
        });
      });
    }
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(cb) {
      var that = this;
      if (this.globalData.userInfo) {
        return this.globalData.userInfo;
      }
      return new Promise(function (resolve, reject) {
        _wepy2.default.getUserInfo({
          success: function success(res) {
            that.globalData.userInfo = res.userInfo;
            return res.userInfo;
          }
        });
      });
    }
  }, {
    key: 'getActTimes',
    value: function getActTimes(cb) {
      var _this3 = this;

      if (this.globalData.actTimes) {
        return this.globalData.actTimes;
      }
      return new Promise(function (resolve, reject) {
        _util2.default.get('/swisse-miniapp/miniapp/swrun/query/cur/act/times').then(function (res) {
          if (res.data.code === '100') {
            _this3.globalData.actTimes = res.data.data;
            cb && cb(res.data.data);
          }
        });
      });
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJvcGVuSWQiLCJBY3RUaW1lcyIsInVzZSIsImdldE9wZW5JZCIsImdldFVzZXJJbmZvIiwiZ2V0QWN0VGltZXMiLCJzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0Iiwic2xlZXAiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImlzU2Vzc2lvbiIsInNlc3Npb25JZCIsImxvZ2luIiwic3VjY2VzcyIsImdldCIsInJlcyIsImNvZGUiLCJ0aGVuIiwidG9hc3RNZXNzYWdlIiwiY2IiLCJ0aGF0IiwiYWN0VGltZXMiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJFLHNCQUFlO0FBQUE7O0FBQUE7O0FBQUEsVUFwQmZBLE1Bb0JlLEdBcEJOO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBRUwsYUFGSyxFQUdMLFlBSEssQ0FEQTtBQU1QQyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5DLHNDQUE4QixNQUZ4QjtBQUdOQyxnQ0FBd0IsUUFIbEI7QUFJTkMsZ0NBQXdCO0FBSmxCO0FBTkQsS0FvQk07QUFBQSxVQU5mQyxVQU1lLEdBTkY7QUFDWEMsZ0JBQVUsSUFEQztBQUVYQyxjQUFRLElBRkc7QUFHWEMsZ0JBQVU7QUFIQyxLQU1FOztBQUViLFVBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBRmE7QUFHZDs7OzsrQkFFVTtBQUNUO0FBQ0EsV0FBS0MsU0FBTDtBQUNBLFdBQUtDLFdBQUw7QUFDQSxXQUFLQyxXQUFMO0FBQ0Q7OzswQkFFTUMsQyxFQUFHO0FBQ1Is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QVA7QUFRRDs7OztFQXRHMEIsZUFBS2UsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJ1xyXG5pbXBvcnQgY29tbW9uIGZyb20gJy4vbGlicy91dGlsLmpzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgcGFnZXM6IFtcclxuICAgICAgJ3BhZ2VzL2d1aWRlJyxcclxuICAgICAgJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgJ3BhZ2VzL2hvbWUnXHJcbiAgICBdLFxyXG4gICAgd2luZG93OiB7XHJcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICB1c2VySW5mbzogbnVsbCxcclxuICAgIG9wZW5JZDogbnVsbCxcclxuICAgIEFjdFRpbWVzOiBudWxsXHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXHJcbiAgfVxyXG5cclxuICBvbkxhdW5jaCgpIHtcclxuICAgIC8vIHRoaXMudGVzdEFzeW5jKClcclxuICAgIHRoaXMuZ2V0T3BlbklkKClcclxuICAgIHRoaXMuZ2V0VXNlckluZm8oKVxyXG4gICAgdGhpcy5nZXRBY3RUaW1lcygpXHJcbiAgfVxyXG5cclxuICBzbGVlcCAocykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZSgncHJvbWlzZSByZXNvbHZlZCcpXHJcbiAgICAgIH0sIHMgKiAxMDAwKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGFzeW5jIHRlc3RBc3luYyAoKSB7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5zbGVlcCgzKVxyXG4gICAgY29uc29sZS5sb2coZGF0YSlcclxuICB9XHJcblxyXG4gIGdldE9wZW5JZChpc1Nlc3Npb24pIHtcclxuICAgIC8vIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLm9wZW5JZCAmJiAhaXNTZXNzaW9uKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEub3BlbklkXHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnNlc3Npb25JZCAmJiBpc1Nlc3Npb24pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS5zZXNzaW9uSWRcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHdlcHkubG9naW4oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICBjb21tb24uZ2V0KCcvc3dpc3NlLW1pbmlhcHAvbWluaWFwcC9hdXRoL2dldFNlc3Npb24vJyArIHJlcy5jb2RlKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5jb2RlID09PSAnMTAwJykge1xyXG4gICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5vcGVuSWQgPSByZXMuZGF0YS5kYXRhLm9wZW5JZFxyXG4gICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5zZXNzaW9uSWQgPSByZXMuZGF0YS5kYXRhLnNlc3Npb25JZFxyXG4gICAgICAgICAgICAgIGlmIChpc1Nlc3Npb24pIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEuZGF0YS5zZXNzaW9uSWQpXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEuZGF0YS5vcGVuSWQpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbW1vbi50b2FzdE1lc3NhZ2UoJ+iOt+WPlnNlc3Npb27lpLHotKUnLCAnbG9hZGluZycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGdldFVzZXJJbmZvKGNiKSB7XHJcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykge1xyXG4gICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB3ZXB5LmdldFVzZXJJbmZvKHtcclxuICAgICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xyXG4gICAgICAgICAgcmV0dXJuIHJlcy51c2VySW5mb1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBnZXRBY3RUaW1lcyhjYikge1xyXG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS5hY3RUaW1lcykge1xyXG4gICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLmFjdFRpbWVzXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb21tb24uZ2V0KCcvc3dpc3NlLW1pbmlhcHAvbWluaWFwcC9zd3J1bi9xdWVyeS9jdXIvYWN0L3RpbWVzJykudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5jb2RlID09PSAnMTAwJykge1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmFjdFRpbWVzID0gcmVzLmRhdGEuZGF0YVxyXG4gICAgICAgICAgY2IgJiYgY2IocmVzLmRhdGEuZGF0YSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iXX0=