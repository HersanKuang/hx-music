import { HXEventStore } from 'htils'
import { getPlaylistDetail } from "../services/music"

const recommendStore = new HXEventStore({
	state: {
		recommendSongInfo: {}
	},
	actions: {
		fetchRecommendSongsAction(ctx) {
			getPlaylistDetail(3778678).then(res => {
				ctx.recommendSongInfo = res.playlist
			})
		}
	}
})

export default recommendStore
