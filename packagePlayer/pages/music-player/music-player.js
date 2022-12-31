// pages/music-player/music-player.js
import playerStore, { audioContext } from "../../../store/playerStore"
import { hxthrottle } from '../../../utils/throttle'

const app = getApp()
const modeNames = ['order', 'repeat', 'random']

Page({
  data: {
    stateKeys: ['id', 'currentSong', 'durationTime', 'currentTime', 'lyricInfos', 'currentLyricText', 'currentLyricIndex', 'isPlaying', 'playModeIndex'],

    sliderValue: 0,
    isSliderChanging: false,
    isWaiting: false,

    playModeName: 'order',

    pageTitles: ['歌曲', '歌词'],
    currentPage: 0,
    contentHeight: 0,
    lyricScrollTop: 0,
  },
  onLoad(options) {
    // 0.获取设备信息
    this.setData({ contentHeight: app.globalData.contentHeight })

    // 1.获取传入的id
    const id = options.id

    // 2.根据id播放歌曲    
    if (id) {
      playerStore.dispatch('playMusicWithSongIdAction', id)
    }
    
    // 3.获取store的共享数据
    playerStore.onStates(['playSongList', 'playSongIndex'], this.getPlaySongInfosHandler)
    playerStore.onStates(this.data.stateKeys, this.getPlayerInfosHandler)
  },
  updateProgress: hxthrottle(function(currentTime) {
    if (this.data.isSliderChanging) return
    // 1.记录当前的时间
    // 2.修改滑块的时间进度sliderValue
    const sliderValue = currentTime / this.data.durationTime * 100
    this.setData({ currentTime, sliderValue })
  }, 500, { leading: false }),

  // ============================= 事件监听 =============================
  onNavBackTap() {
    wx.navigateBack()
  },
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
  // 使用节流函数防止滑块频繁滑动造成的页面卡顿
  onSliderChanging: hxthrottle(function(event) {
    // 1.获取滑动到的位置的value
    const value = event.detail.value

    // 2.根据当前的值，计算出对应的时间
    const currentTime = value / 100 * this.data.durationTime
    this.setData({ currentTime })

    // 3.当前正在滑动
    this.data.isSliderChanging = true
  }, 100, { leading: true, trailing: true }),

  onPlayOrPauseTap() {
    playerStore.dispatch('changeMusicStatusAction')
  },
  onPrevBtnTap() {
    playerStore.dispatch('playNewMusicAction', false)
  },
  onNextBtnTap() {
    playerStore.dispatch('playNewMusicAction')
  },

  onModeBtnTap() {
    playerStore.dispatch('changePlayModeAction')
  },

  // ========================= store共享数据 =====================
  getPlaySongInfosHandler({ playSongList, playSongIndex }) {
    if (playSongList) {
      this.setData({ playSongList })
    }
    if (playSongIndex !== undefined) {
      this.setData({ playSongIndex })
    }
  },
  getPlayerInfosHandler({
    id, currentSong, durationTime, currentTime,
    lyricInfos, currentLyricText, currentLyricIndex,
    isPlaying, playModeIndex
  }) {
    if (id !== undefined) {
      this.setData({ id })
    }
    if (currentSong) {
      this.setData({ currentSong })
    }
    if (durationTime !== undefined) {
      this.setData({ durationTime })
    }
    if (currentTime !== undefined) {
      // 根据当前时间改变进度
      this.updateProgress(currentTime)
    }
    if (lyricInfos) {
      this.setData({ lyricInfos })
    }
    if (currentLyricText) {
      this.setData({ currentLyricText })
    }
    if (currentLyricIndex !== undefined) {
      // 修改lyricScrollTop
      this.setData({ currentLyricIndex, lyricScrollTop: currentLyricIndex * 35 })
    }
    if (isPlaying !== undefined) {
      this.setData({ isPlaying })
    }
    if (playModeIndex !== undefined) {
      this.setData({ playModeName: modeNames[playModeIndex] })
    }
  },

  onUnload() {
    playerStore.offStates(['playSongList', 'playSongIndex'], this.getPlaySongInfosHandler)
    playerStore.offStates(this.data.stateKeys, this.getPlayerInfosHandler)
  }
})