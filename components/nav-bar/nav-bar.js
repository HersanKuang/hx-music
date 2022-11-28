// components/nav-bar/nav-bar.js
const app = getApp()

Component({
  options: {
    multipleSlots: true
  },
  properties: {
    title: {
      type: String,
      value: '导航标题'
    }
  },
  data: {
    statusHeight: 20
  },
  lifetimes: {
    attached() {
      // 0.获取设备信息：状态栏高度
      this.setData({ statusHeight: app.globalData.statusHeight })
    }
  }
})
