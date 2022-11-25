// pages/detail-song/detail-song.js
import rankingStore from "../../store/rankingStore"
import recommendStore from "../../store/recommendStore"

Page({
  data: {
    type: 'ranking',
    key: 'newRanking',
    songInfo: {}
  },
  onLoad(options) {
    // 1.确定获取数据的类型
    // type: ranking -> 榜单数据
    // type: recommend -> 推荐数据
    const type = options.type
    this.data.type = type

    // 获取store中榜单数据
    if (type === 'ranking') {
      const key = options.key
      this.data.key = key
      rankingStore.onState(key, this.handleRanking)
    } else if (type === 'recommend') {
      this.data.key = 'recommendSongInfo'
      recommendStore.onState(this.data.key, this.handleRanking)
    }
  },
  handleRanking(value) {
    this.setData({ songInfo: value })
    wx.setNavigationBarTitle({
      title: value.name,
    })
  },
  onUnload() {
    if (this.data.type === 'ranking') {
      rankingStore.offState(this.data.key, this.handleRanking)
    } else if (this.data.type === 'recommend') {
      recommendStore.offState(this.data.key, this.handleRanking)
    }
  }
})