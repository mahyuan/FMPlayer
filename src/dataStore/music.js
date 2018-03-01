import axios from 'axios'
const URL = 'http://localhost:3000'

//排行榜榜单
export function getToplistDetail() {
	const url = URL + '/toplist/detail'
	return axios.get(url)
}

//排行榜详情
export function topList(idx) {
	const url = URL + '/top/list'
	return axios.get(url, {
		params: {
			idx
		}
	})
}
// 搜索
export function search(keywords) {
	const url = URL + '/search'
	return axios.get(url, {
		params: {
			keywords
		}
	})
}

// 热门歌手
export function getTopArtists( offset = 0, limit = 50 ) {
	const url = URL = '/top/artists'
	return axios.get(url, {
		params: {
			offset: offset,
			limit: limit
		}
	})
}

// 获取歌单详情
export function getPlaylistdetail(id) {
	const url = URL + '/playlist/detail'
	return axios.get(url, {
		params: {
			id: id
		}
	})
}

//获取歌曲详情
export function getMusicDetail(id) {
	const url = URL + '/song/detail'
	return axios.get(url, {
		params: {
			id: id
		}
	})
}


//获取音乐地址
export function getMusicUrl(id) {
    const url = URL+'/music/url';
    return axios.get(url, {
        params: {
            id: id
        }
    })
}

//获取歌词
export function getLyric(id) {
    const url = URL+'/lyric';
    return axios.get(url, {
        params: {
            id: id
        }
    })
}

//下载
export function download(id,name) {
    const url = URL+'/download';
    return axios.get(url, {
        params: {
            id: id,
            name: name
        }
    })
}

