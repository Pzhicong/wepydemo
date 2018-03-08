import wepy from 'wepy'

export default class testMixin extends wepy.mixin {
  data = {
    mixin: 'This is mixin data.'
  }
  methods = {
    tap () {
      this.mixin = 'mixin data was changed'
      console.log('mixin method tap')
    },
    goToPage(event) {
      console.log(event.currentTarget.dataset.url)
      // wepy.navigateTo({
      //   url: event.currentTarget.dataset.url,
      //   fail: function(){
      //     wepy.reLaunch({
      //       url: event.currentTarget.dataset.url
      //     })
      //   }
      // })
    }
  }

  onShow() {
    console.log('mixin onShow')
  }

  onLoad() {
    console.log('mixin onLoad')
  }
}
