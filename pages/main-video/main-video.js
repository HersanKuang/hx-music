// pages/main-video/main-video.js
import { hxRequest } from "../../services/index"

Page({
  data: {
    videoList: []
  },
  onLoad() {
    // 发送网络请求
    hxRequest.get({
      url: '/top/mv',
      data: {
        limit: 20,
        offset: 0
      }
    }).then(res => {
      this.setData({ videoList: res.data })
    })
  }
})