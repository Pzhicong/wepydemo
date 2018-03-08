'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var testMixin = function (_wepy$mixin) {
  _inherits(testMixin, _wepy$mixin);

  function testMixin() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, testMixin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = testMixin.__proto__ || Object.getPrototypeOf(testMixin)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      mixin: 'This is mixin data.'
    }, _this.methods = {
      tap: function tap() {
        this.mixin = 'mixin data was changed';
        console.log('mixin method tap');
      },
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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(testMixin, [{
    key: 'onShow',
    value: function onShow() {
      console.log('mixin onShow');
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      console.log('mixin onLoad');
    }
  }]);

  return testMixin;
}(_wepy2.default.mixin);

exports.default = testMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuanMiXSwibmFtZXMiOlsidGVzdE1peGluIiwiZGF0YSIsIm1peGluIiwibWV0aG9kcyIsInRhcCIsImNvbnNvbGUiLCJsb2ciLCJnb1RvUGFnZSIsImV2ZW50IiwibmF2aWdhdGVUbyIsInVybCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiZmFpbCIsInJlTGF1bmNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLEksR0FBTztBQUNMQyxhQUFPO0FBREYsSyxRQUdQQyxPLEdBQVU7QUFDUkMsU0FEUSxpQkFDRDtBQUNMLGFBQUtGLEtBQUwsR0FBYSx3QkFBYjtBQUNBRyxnQkFBUUMsR0FBUixDQUFZLGtCQUFaO0FBQ0QsT0FKTztBQUtSQyxjQUxRLG9CQUtDQyxLQUxELEVBS1E7QUFDZCx1QkFBS0MsVUFBTCxDQUFnQjtBQUNkQyxlQUFLRixNQUFNRyxhQUFOLENBQW9CQyxPQUFwQixDQUE0QkYsR0FEbkI7QUFFZEcsZ0JBQU0sZ0JBQVU7QUFDZCwyQkFBS0MsUUFBTCxDQUFjO0FBQ1pKLG1CQUFLRixNQUFNRyxhQUFOLENBQW9CQyxPQUFwQixDQUE0QkY7QUFEckIsYUFBZDtBQUdEO0FBTmEsU0FBaEI7QUFRRDtBQWRPLEs7Ozs7OzZCQWlCRDtBQUNQTCxjQUFRQyxHQUFSLENBQVksY0FBWjtBQUNEOzs7NkJBRVE7QUFDUEQsY0FBUUMsR0FBUixDQUFZLGNBQVo7QUFDRDs7OztFQTNCb0MsZUFBS0osSzs7a0JBQXZCRixTIiwiZmlsZSI6InRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdGVzdE1peGluIGV4dGVuZHMgd2VweS5taXhpbiB7XHJcbiAgZGF0YSA9IHtcclxuICAgIG1peGluOiAnVGhpcyBpcyBtaXhpbiBkYXRhLidcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIHRhcCAoKSB7XHJcbiAgICAgIHRoaXMubWl4aW4gPSAnbWl4aW4gZGF0YSB3YXMgY2hhbmdlZCdcclxuICAgICAgY29uc29sZS5sb2coJ21peGluIG1ldGhvZCB0YXAnKVxyXG4gICAgfSxcclxuICAgIGdvVG9QYWdlKGV2ZW50KSB7XHJcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOiBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsLFxyXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHtcclxuICAgICAgICAgICAgdXJsOiBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uU2hvdygpIHtcclxuICAgIGNvbnNvbGUubG9nKCdtaXhpbiBvblNob3cnKVxyXG4gIH1cclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgY29uc29sZS5sb2coJ21peGluIG9uTG9hZCcpXHJcbiAgfVxyXG59XHJcbiJdfQ==