import { HXEventStore } from 'htils'

const playerStore = new HXEventStore({
	state: {
		playSongList: [],
		playSongIndex: 0
	}
})

export default playerStore
