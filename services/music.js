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
