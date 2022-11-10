// pages/main-video/main-video.js
import { getTopMv } from "../../services/vedio"

Page({
  data: {
    videoList: []
  },
  onLoad() {
    // 发送网络请求
    this.fetchTopMV()
  },
  
  // 发送网络请求的方法
  fetchTopMV() {
    // 发送网络请求
    getTopMv().then(res => {
      this.setData({ videoList: res.data })
    })
  }
})