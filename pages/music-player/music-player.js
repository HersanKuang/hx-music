// pages/music-player/music-player.js
import { getSongDetail, getSongLyric } from '../../services/player'
import { hxthrottle } from '../../utils/throttle'

const app = getApp()

// 创建播放器
const audioContext = wx.createInnerAudioContext()

Page({
  data: {
    pageTitles: ['歌曲', '歌词'],
    currentPage: 0,
    contentHeight: 0,
    id: 0,
    currentSong: {},
    lrcString: '',

    currentTime: 0,
    durationTime: 0,
    sliderValue: 0,
    isSliderChanging: false,
    isWaiting: false
  },
  onLoad(options) {
    // 0.获取设备信息
    this.setData({ contentHeight: app.globalData.contentHeight })

    // 1.获取传入的id
    const id = options.id
    this.setData({ id })

    // 2.请求歌曲相关的数据
    // 2.1.根据id获取歌曲的详情
    getSongDetail(id).then(res => {
      this.setData({
        currentSong: res.songs[0],
        durationTime: res.songs[0].dt
      })
    })

    // 2.2.根据id获取歌词信息
    getSongLyric(id).then(res => {
      this.setData({ lrcString: res.lrc.lyric })
    })

    // 3.播放当前的歌曲
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    audioContext.autoplay = true

    // 4.监听播放的进度
    const throttleUpdateProgress = hxthrottle(this.updateProgress, 500, { leading: false })
    audioContext.onTimeUpdate(() => {
      if (!this.data.isSliderChanging && !this.data.isWaiting) {
        throttleUpdateProgress()
      }
    })
    // 解决拖动进度条之后没有继续监听的bug
    audioContext.onWaiting(() => {
      audioContext.pause()
    })
    audioContext.onCanplay(() => {
      audioContext.play()
    })
  },
  updateProgress() {
    // 1.记录当前的时间
    this.setData({ currentTime: audioContext.currentTime * 1000 })

    // 2.修改滑块的时间进度sliderValue
    const sliderValue = this.data.currentTime / this.data.durationTime * 100
    this.setData({ sliderValue })
  },

  // ============================= 事件监听 =============================
  onSwiperChange(event) {
    this.setData({ currentPage: event.detail.current })
  },
  onNavTabItemTap(event) {
    const index = event.currentTarget.dataset.index
    this.setData({ currentPage: index })
  },
  onSliderChange(event) {
    this.data.isWaiting = true
    setTimeout(() => {
      this.data.isWaiting = false
    }, 1500)
    // 1.获取点击滑块位置对应的value
    const value = event.detail.value

    // 2.计算出要播放的位置的时间
    const currentTime = value / 100 * this.data.durationTime

    // 3.设置播放器，播放计算出的时间
    audioContext.seek(currentTime / 1000)
    this.setData({ currentTime, isSliderChanging: false, sliderValue: value })
  },
  onSliderChanging(event) {
    // 1.获取滑动到的位置的value
    const value = event.detail.value

    // 2.根据当前的值，计算出对应的时间
    const currentTime = value / 100 * this.data.durationTime
    this.setData({ currentTime })

    // 3.当前正在滑动
    this.data.isSliderChanging = true
  }
})