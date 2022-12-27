// pages/main-music/main-music.js
import { getMusicBanner, getSongMenuList } from "../../services/music"
import recommendStore from "../../store/recommendStore"
import rankingStore, { rankingsMap } from "../../store/rankingStore"
import playerStore from "../../store/playerStore"
import { querySelect } from "../../utils/query-select"
import { hxthrottle } from "../../utils/throttle"

const querySelectThrottle = hxthrottle(querySelect)

Page({
  data: {
    searchValue: '',
    banners: [],
    bannerHeight: 0,
    recommendSongs: [],
    // 歌单数据
    hotMenuList: [],
    recMenuList: [],
    // 巅峰榜数据
    isRankingData: false,
    rankingInfos: {},

    // 当前正在播放的歌曲信息
    currentSong: {},
    isPlaying: false
  },
  onLoad() {
    this.fetchMusicBanner()
    this.fetchSongMenuList()

    // 发起action
    recommendStore.onState('recommendSongInfo', this.handleRecommendSongs)
    recommendStore.dispatch('fetchRecommendSongsAction')

    for (const key in rankingsMap) {
      rankingStore.onState(key, this.getRankingHanlder(key))
    }
    // rankingStore.onState('newRanking', this.getRankingHanlder('newRanking'))
    // rankingStore.onState('originRanking', this.getRankingHanlder('originRanking'))
    // rankingStore.onState('upRanking', this.getRankingHanlder('upRanking'))

    rankingStore.dispatch('fetchRankingDataAction')

    playerStore.onStates(['currentSong', 'isPlaying'], this.handlePlayInfos)
  },
  // 网络请求的封装
  async fetchMusicBanner() {
    const res = await getMusicBanner()
    this.setData({ banners: res.banners })
  },
  async fetchSongMenuList() {
    getSongMenuList().then(res => {
      this.setData({ hotMenuList: res.playlists })
    })
    getSongMenuList('华语').then(res => {
      this.setData({ recMenuList: res.playlists })
    })
  },
  // 分享功能
  onShareAppMessage() {
    return {
      title: '解忧杂货铺',
      path: 'pages/main-music/main-music',
      imageUrl: 'https://hersan.cn/%E5%9B%BE%E7%89%87/%E7%B2%BE%E7%BE%8E%E5%9B%BE%E7%89%87/%E4%B8%87%E5%9C%A3.jpg'
    }
  },
  onShareTimeline() {
    return {
      title: '解忧杂货铺',
      path: 'pages/main-music/main-music',
      imageUrl: 'https://hersan.cn/%E5%9B%BE%E7%89%87/%E7%B2%BE%E7%BE%8E%E5%9B%BE%E7%89%87/%E4%B8%87%E5%9C%A3.jpg'
    }
  },
  // 界面的事件监听方法
  onSearchClick() {
    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  },
  async onBannerImageLoad () {
    // 获取Image组件的高度
    const res = await querySelectThrottle('.banner-image')
    this.setData({ bannerHeight: res[0].height })
  },
  onRecommendMoreClick() {
    wx.navigateTo({
      url: '/pages/detail-song/detail-song?type=recommend',
    })
  },
  onSongItemTap(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState('playSongList', this.data.recommendSongs)
    playerStore.setState('playSongIndex', index)
  },
  onPlayOrPauseBtnTap() {
    playerStore.dispatch('changeMusicStatusAction')
  },

  // ============================= 从Store中获取数据 =============================
  handleRecommendSongs(value) {
    if (!value.tracks) return
    this.setData({ recommendSongs: value.tracks.slice(0, 6) })
  },

  getRankingHanlder(ranking) {
    return value => {
      if (!value.name) return
      const newRankingInfos = { ...this.data.rankingInfos, [ranking]: value }
      this.setData({
        rankingInfos: newRankingInfos,
        isRankingData: true
      })
    }
  },
  handlePlayInfos({ currentSong, isPlaying }) {
    if (currentSong) {
      this.setData({ currentSong })
    }
    if (isPlaying !== undefined) {
      this.setData({ isPlaying })
    }
  },

  onUnload() {
    recommendStore.offState('recommendSongInfo', this.handleRecommendSongs)
    rankingStore.offState('newRanking', this.getRankingHanlder)
    rankingStore.offState('originRanking', this.getRankingHanlder)
    rankingStore.offState('upRanking', this.getRankingHanlder)
    playerStore.offStates(['currentSong', 'isPlaying'], this.handlePlayInfos)
  }
})