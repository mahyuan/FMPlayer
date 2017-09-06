

	var panel = document.querySelector('.panel-ct')
	var songCt = document.querySelector('#songCt')
	var songItem =  document.querySelector('.songCt>li')
	var  lrcCt = document.querySelector('.lrcCt')

	var pause = document.querySelector('#pause')

	var music = new Audio()

	getChannels()
	function get(url, data, callback, dataType) {
		url += '?' + Object.keys(data).map(function(key){
			return key + '=' + data[key]
		}).join('&')

		var xhr = new XMLHttpRequest()
		xhr.responseType =  dataType||'json'
		xhr.onload = function(){
			callback(xhr.response)
		}
		xhr.open('GET', url, true)
		xhr.send()
	}

	function getChannels(e){
		get('http://api.jirengu.com/fm/getChannels.php', {}, function(ret){
			renderChanels(ret.channels)
			console.log(ret.channels)
		})
	}

	panel.onclick = function(e){
		if(e.target.tagName.toLowerCase() !== 'li') return
		var channelId = e.target.getAttribute('data-channel-id')
		debugger;
		get('http://api.jirengu.com/fm/getSong.php', {channel: channelId}, function(ret){
			// 'http://api.jirengu.com/fm/getSong.php?channel='+'channelId'
			console.log(ret)
			console.log(channelId)
			renderSong(ret.songs)
			getLrc(ret.song[0].lrc)
			play(ret.song[0].url)
			debugger;
		})
	}

	/*
		这一段是测试的，随机获取song并播放
	function getSong(){
		get('http://api.jirengu.com/fm/getSong.php', {}, function(ret){
			console.log(ret)
			// console.log(channel_id)
			renderSong(ret.song[0])
			getLrc(ret.song[0].lrc)
			play(ret.song[0].url)
		})
	}
	*/
	function renderChanels(channels){
		var html1 = channels.map(function(channel){
			return '<li data-channel_id="'+channel.channel_id + '">' + channel.name + '</li>'
		}).join('')
		panel.innerHTML = html1
	}
/*
	function renderSong(song) {
		var html = Object.keys(song).map(function(key){
		return '<dt>' + key + '</dt><dd>' + song[key] + '</dd>'
		}).join('')
		songCt.innerHTML = html
	}
*/
	function renderSong(songs){
		var songs = []
		var html = songs.map(function(song){
			return '<dt>' + key + '</dt><dd>' + song[key] + '</dd>'
			// return '<li><span data-title="song.title" >'+ song.title +'</span><span data-srtist="song.artist">'+ song.artist+'</span></li>'
		}).join('')
		// debugger;
		songCt.innerHtml = html
	}
	function getLrc(lrcUrl){
		get(lrcUrl, {}, function(ret){
			lrcCt.innerHTML = ret
		}, 'text')
	}
	function play(url) {
		music.src = url
		music.play()
	}

	function PlaySong(){
		pause.addEventListener('click',function(){
			music.play()
		},true)
	}

	function $(selector) {
		return document.querySelector(selector)
	}