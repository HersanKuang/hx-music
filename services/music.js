import { hxRequest } from './index'

export function getMusicBanner(type = 0) {
	return hxRequest.get({
		url: '/banner',
		data: {
			type
		}
	})
}