// pages/detail-song/detail-song.js
import rankingStore from "../../store/rankingStore"
import recommendStore from "../../store/recommendStore"
import { getPlaylistDetail } from "../../services/music"
import playerStore from "../../store/playerStore"

Page({
  data: {
    type: 'ranking',
    key: 'newRanking',
    id: '',
    songInfo: {}
  },
  onLoad(options) {
    // 1.确定获取数据的类型
    // type: ranking -> 榜单数据
    // type: recommend -> 推荐数据
    const type = options.type
    this.setData({ type })

    // 获取store中榜单数据
    if (type === 'ranking') {
      const key = options.key
      this.data.key = key
      rankingStore.onState(key, this.handleRanking)
    } else if (type === 'recommend') {
      this.data.key = 'recommendSongInfo'
      recommendStore.onState(this.data.key, this.handleRanking)
    } else if (type === 'menu') {
      this.data.id = options.id
      this.fetchMenuSongInfo()
    }
  },

  // 网络请求
  async fetchMenuSongInfo() {
    const res = await getPlaylistDetail(this.data.id)
    this.setData({ songInfo: res.playlist })
  },

  // ======================= wxml事件监听 ==========================
  onSongItemTap() {
    playerStore.setState('playSongList', this.data.songInfo.tracks)
  },

  // ======================= store共享数据 ==========================
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