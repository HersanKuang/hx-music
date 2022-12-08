// [02:06.408]所以我爱进剧场

const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export function parseLyric(lrcString) {
	const lyricInfos = []

	const lyricLines = lrcString.split('\n')
	for (const lineString of lyricLines) {
		const res = timeReg.exec(lineString)
		// 跳过空行
		if (!res) continue
		const minute = res[1] * 60 * 1000
		const second = res[2] * 1000
		const mSecond = res[3].length === 2 ? res[3] * 10: res[3] * 1
		const time = minute + second + mSecond
		const text = lineString.replace(timeReg, '')

		lyricInfos.push({ text,	time })
	}

	return lyricInfos
}
