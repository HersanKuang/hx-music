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