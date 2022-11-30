// pages/music-player/music-player.js
import { getSongDetail, getSongLyric } from '../../services/player'

const app = getApp()

Page({
  data: {
    pageTitles: ['歌曲', '歌词'],
    currentPage: 0,
    contentHeight: 0,
    id: 0,
    currentSong: {},
    lrcString: ''
  },
  onLoad(options) {
    // 0.获取设备信息
    this.setData({ contentHeight: app.globalData.contentHeight })

    // 1.获取传入的id
    const id = options.id
    this.setData({ id })

    // 2.根据id获取歌曲的详情
    getSongDetail(id).then(res => {
      this.setData({ currentSong: res.songs[0] })
    })

    // 3.根据id获取歌词信息
    getSongLyric(id).then(res => {
      this.setData({ lrcString: res.lrc.lyric })
    })
  },

  // ============================= 事件监听 =============================
  onSwiperChange(event) {
    this.setData({ currentPage: event.detail.current })
  },
  onNavTabItemTap(event) {
    const index = event.currentTarget.dataset.index
    this.setData({ currentPage: index })
  }
})