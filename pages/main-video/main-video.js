// pages/main-video/main-video.js
import { getTopMv } from "../../services/video"

Page({
  data: {
    videoList: [],
    hasMore: true
  },
  onLoad() {
    // 发送网络请求
    this.fetchTopMV()
  },
  
  // 发送网络请求的方法
  async fetchTopMV() {
    // 发送网络请求
    // getTopMv().then(res => {
    //   this.setData({ videoList: res.data })
    // })
    const res = await getTopMv(this.data.videoList.length)
    const newVideoList = [...this.data.videoList, ...res.data]
    this.setData({ videoList: newVideoList })
    this.data.hasMore = res.hasMore
  },

  // 监听上拉和下拉功能
  onReachBottom() {
    // 判断是否有更多的数据，最多50条
    if (!this.data.hasMore) return
    this.fetchTopMV()
  }
})