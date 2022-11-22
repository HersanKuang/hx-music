import { hxRequest } from './index'

export function getMusicBanner(type = 0) {
	return hxRequest.get({
		url: '/banner',
		data: {
			type
		}
	})
}

export function getPlaylistDetail(id) {
  return hxRequest.get({
    url: '/playlist/detail',
    data: {
      id
    }
  })
}

export function getSongMenuList(cat = '全部', limit = 6, offset = 0) {
  return hxRequest.get({
    url: '/top/playlist',
    data: {
			cat,
			limit,
			offset
    }
  })
}

export function getSongMenuTag() {
  return hxRequest.get({
    url: '/playlist/hot'
  })
}
