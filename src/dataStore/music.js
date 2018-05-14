import axios from 'axios'
let URL = 'http://localhost:3000'

//排行榜榜单
export function getToplistDetail() {
	const url = URL + '/toplist/detail'
	return axios.get(url)
}

//排行榜详情
export function topList(idx) {
	let url = URL + '/top/list'
	return axios.get(url, {
		params: {
			idx
		}
	})
}
// 搜索
export function search(keywords) {
	let url = URL + '/search'
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
	let url = URL + '/playlist/detail'
	return axios.get(url, {
		params: {
			id: id
		}
	})
}

//获取歌曲详情
export function getMusicDetail(id) {
	let url = URL + '/song/detail'
	return axios.get(url, {
		params: {
			id: id
		}
	})
}


//获取音乐地址
export function getMusicUrl(id) {
    let url = URL+'/music/url';
    return axios.get(url, {
        params: {
            id: id
        }
    })
}

//获取歌词
export function getLyric(id) {
    let url = URL+'/lyric';
    return axios.get(url, {
        params: {
            id: id
        }
    })
}

//下载
export function download(id,name) {
    let url = URL+'/download';
    return axios.get(url, {
        params: {
            id: id,
            name: name
        }
    })
}

