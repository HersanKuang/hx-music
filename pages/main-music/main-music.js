// pages/main-music/main-music.js
import { getMusicBanner } from "../../services/music"
import { querySelect } from "../../utils/query-select"
import { hxthrottle } from "../../utils/throttle"

const querySelectThrottle = hxthrottle(querySelect)

Page({
  data: {
    searchValue: '',
    banners: [],
    bannerHeight: 150
  },
  onLoad() {
    this.fetchMusicBanner()
  },
  // 网络请求的封装
  async fetchMusicBanner() {
    const res = await getMusicBanner()
    this.setData({ banners: res.banners })
  },
  // 分享功能
  onShareAppMessage() {
    return {
      title: '啾咪音乐',
      path: 'pages/main-music/main-music',
      imageUrl: 'https://hersan.cn/%E5%9B%BE%E7%89%87/%E7%B2%BE%E7%BE%8E%E5%9B%BE%E7%89%87/%E4%B8%87%E5%9C%A3.jpg'
    }
  },
  onShareTimeline() {
    return {
      title: '啾咪音乐',
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
  }
})