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
        console.log(event.currentTarget.dataset.url);
        // wepy.navigateTo({
        //   url: event.currentTarget.dataset.url,
        //   fail: function(){
        //     wepy.reLaunch({
        //       url: event.currentTarget.dataset.url
        //     })
        //   }
        // })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuanMiXSwibmFtZXMiOlsidGVzdE1peGluIiwiZGF0YSIsIm1peGluIiwibWV0aG9kcyIsInRhcCIsImNvbnNvbGUiLCJsb2ciLCJnb1RvUGFnZSIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJ1cmwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSSxHQUFPO0FBQ0xDLGFBQU87QUFERixLLFFBR1BDLE8sR0FBVTtBQUNSQyxTQURRLGlCQUNEO0FBQ0wsYUFBS0YsS0FBTCxHQUFhLHdCQUFiO0FBQ0FHLGdCQUFRQyxHQUFSLENBQVksa0JBQVo7QUFDRCxPQUpPO0FBS1JDLGNBTFEsb0JBS0NDLEtBTEQsRUFLUTtBQUNkSCxnQkFBUUMsR0FBUixDQUFZRSxNQUFNQyxhQUFOLENBQW9CQyxPQUFwQixDQUE0QkMsR0FBeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7QUFmTyxLOzs7Ozs2QkFrQkQ7QUFDUE4sY0FBUUMsR0FBUixDQUFZLGNBQVo7QUFDRDs7OzZCQUVRO0FBQ1BELGNBQVFDLEdBQVIsQ0FBWSxjQUFaO0FBQ0Q7Ozs7RUE1Qm9DLGVBQUtKLEs7O2tCQUF2QkYsUyIsImZpbGUiOiJ0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHRlc3RNaXhpbiBleHRlbmRzIHdlcHkubWl4aW4ge1xyXG4gIGRhdGEgPSB7XHJcbiAgICBtaXhpbjogJ1RoaXMgaXMgbWl4aW4gZGF0YS4nXHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICB0YXAgKCkge1xyXG4gICAgICB0aGlzLm1peGluID0gJ21peGluIGRhdGEgd2FzIGNoYW5nZWQnXHJcbiAgICAgIGNvbnNvbGUubG9nKCdtaXhpbiBtZXRob2QgdGFwJylcclxuICAgIH0sXHJcbiAgICBnb1RvUGFnZShldmVudCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsKVxyXG4gICAgICAvLyB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAvLyAgIHVybDogZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybCxcclxuICAgICAgLy8gICBmYWlsOiBmdW5jdGlvbigpe1xyXG4gICAgICAvLyAgICAgd2VweS5yZUxhdW5jaCh7XHJcbiAgICAgIC8vICAgICAgIHVybDogZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybFxyXG4gICAgICAvLyAgICAgfSlcclxuICAgICAgLy8gICB9XHJcbiAgICAgIC8vIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblNob3coKSB7XHJcbiAgICBjb25zb2xlLmxvZygnbWl4aW4gb25TaG93JylcclxuICB9XHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdtaXhpbiBvbkxvYWQnKVxyXG4gIH1cclxufVxyXG4iXX0=