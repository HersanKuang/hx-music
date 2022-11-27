// pages/music-player/music-player.js
import { getSongDetail, getSongLyric } from '../../services/player'

Page({
  data: {
    id: 0,
    currentSong: {},
    lrcString: ''
  },
  onLoad(options) {
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
  }
})