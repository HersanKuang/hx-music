import { hxRequest } from "./index"

export function getSongDetail(ids) {
	return hxRequest.get({
		url: '/song/detail',
		data: {
			ids
		}
	})
}

export function getSongLyric(id) {
	return hxRequest.get({
		url: '/lyric',
		data: {
			id
		}
	})
}
