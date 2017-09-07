	var loginbtn = document.querySelector('#loginbtn')
	var listShowBtn = document.querySelector('#listshow')
	var musicList = document.querySelector	('.musicList')

	var navbar = document.querySelector('#s-list')
	var panel = document.querySelector('.panel-ct')
	var songCt = document.querySelector('.songCt')

	var songItem =  document.querySelector('.songCt>li')
	var lrcCt = document.querySelector('.lrcCt')

	var pause = document.querySelector('#pause')

	var music = new Audio()
	// var myAudio = document.querySelector('audio')

	var progress = document.querySelector('progress')
	var curTIME = document.querySelector('.curtime')


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
	loginbtn.onclick = function(e){
		e.stopPropagation()
		getChannels()
	}
	panel.onclick = function(e){
		if(e.target.tagName.toLowerCase() !== 'li') return
		var channelId = e.target.getAttribute('data-channel-id')
		get('http://api.jirengu.com/fm/getSong.php', {channel: channelId}, function(ret){
			// 'http://api.jirengu.com/fm/getSong.php?channel='+'channelId'
			console.log(ret)
			var obj = JSON.parse(JSON.stringify(ret))
			console.log(ret.song[0].title)
			console.log(ret.song[0].artist)
			// console.log(channelId)
			renderSong(ret.song)
			getLrc(ret.song[0].lrc)
			play(ret.song[0].url)

		})
	}
	pause.onclick = function (e){
		// if(e.target.tagName.toLowerCase() !== 'li') return
			// var channelId = e.target.getAttribute('data-channel-id')
			e.stopPropagation()
			get('http://api.jirengu.com/fm/getSong.php', {}, function(ret){
			console.log(ret)
			renderSong(ret.songs)
			getLrc(ret.song[0].lrc)
			play(ret.song[0].url)
			debugger;
		})
		music.play()
		// myAudio.play()
	}
	listShowBtn.onclick = function(e){
		e.stopPropagation()
		renderSong(e)
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
		var html = channels.map(function(channel){
			return '<li data-channel_id="'+channel.channel_id + '">' + channel.name + '</li>'
		}).join('')
		panel.innerHTML = html
		songCt.innerHTML = html
		navbar.innerHTML = html
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

		var html = songs.map(function(song){
			return '<dt>' + key + '</dt><dd>' + song[key] + '</dd>'
			return '<li><span data-title="song.title" >'+ song.title +'</span><span data-srtist="song.artist">'+ song.artist+'</span></li>'
		}).join('')
		// var html = '<li><span data-title="song.title" >'+ song.title +'</span><span data-srtist="song.artist">'+ song.artist+'</span></li>'


		// debugger;
		// songCt.innerHtml = html
		console.log(html)
		console.log("songCt")
		songCt.appendChild(html)

		var html = '<li><span data-title="song.title" >'+ song.title +'</span><span data-srtist="song.artist">'+ song.artist+'</span></li>'
		get('http://api.jirengu.com/fm/getSong.php', {}, function(ret){
			console.log(html)
			console.log("songCt")
			songCt.appendChild(html)

		})
	}



	function getLrc(lrcUrl){
		get(lrcUrl, {}, function(ret){
			lrcCt.innerHTML = ret
		}, 'text')
	}

	function play(url) {
		music.src = url
		music.play()
		// music.progressRender()
		// myAudio.src = url
		// myAudio.play()
		// myAudio.progressRender()
	}

	function PlaySong(){
		pause.addEventListener('click',function(e){
			e.stopPropagation()
			// if()
			// music.play(url)
			myAudio.play()

		},true)
	}

	function $(selector) {
		return document.querySelector(selector)
	}
	function progressRender(){
		var curTime = parseInt(music.currentTime)
		var minute = "00"
		progress.getAttribute({'value': curTime})
		if(curTime<10){
			curTime = "0" + curTime
		}
		if(curTime>60){
			minute = parseInt(curTime%60)
			if(minute<10){
				minute = "0" + minute
			}
			if(curTime<10){
				curTime = "0" + curTime
			}
		}
		curTIME.innerHTML = (minute + ':' + curTime)
	}

