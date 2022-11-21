import { HXEventStore } from 'htils'
import { getPlaylistDetail } from "../services/music"

const recommendStore = new HXEventStore({
	state: {
		recommendSongs: []
	},
	actions: {
		fetchRecommendSongsAction(ctx) {
			getPlaylistDetail(3778678).then(res => {
				ctx.recommendSongs = res.playlist.tracks
			})
		}
	}
})

export default recommendStore
