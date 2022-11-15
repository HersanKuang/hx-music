import { hxRequest } from "./index"

export function getTopMv(offset = 0, limit = 20) {
	return hxRequest.get({
		url: '/top/mv',
		data: {
			limit,
			offset
		}
	})
}

export function getMVUrl(id) {
	return hxRequest.get({
		url: '/mv/url',
		data: {
			id
		}
	})
}

export function getMVInfo(mvid) {
	return hxRequest.get({
		url: '/mv/detail',
		data: {
			mvid
		}
	})
}

export function getMVRelated(id) {
	return hxRequest.get({
		url: '/related/allvideo',
		data: {
			id
		}
	})
}