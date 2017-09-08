
	var listShowBtn = document.querySelector('#listshow')
	var musicList = document.querySelector	('.musicList')

	var navbar = document.querySelector('#s-list')
	var songCt = document.querySelector('.songCt')

	var songItem =  document.querySelector('.songCt>li')
	var lrcCt = document.querySelector('.lrcCt')
	var imgShow = document.querySelector('#img-show')

	var playPre = document.querySelector('#preplay')
	var playNext = document.querySelector('#nextplay')

	var playCt = document.querySelector('#pause')
	var pauseIcon = document.querySelector('.pause')
	var playIcon = document.querySelector('.play')
	var img_rotate = document.querySelector('#img-show')

	var loopbtn = document.querySelector('#loop')
	var loopL = document.querySelector('.icon-mulu')
	var loopS = document.querySelector('.icon-single')

	var music = new Audio()
	music.autoPlay = true
	music.loop=true
	music.volume = 1
	music.playing = false


	var progress = document.querySelector('progress')
	var curTimeCt = document.querySelector('.curtime')
	var maxTimeCt	= document.querySelector('.maxTime')


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
	getChannels()
	function getChannels(e){
		get('http://api.jirengu.com/fm/getChannels.php', {}, function(ret){
			renderChanels(ret.channels)
			console.log(ret.channels)
			// play(ret.song[0].url)
			img_rotate.classList.add('img-rotate')
		})
	}


	songCt.onclick = function(e){
		if(e.target.tagName.toLowerCase() !== 'li') return

		var channelId = e.target.getAttribute('data-channel-id')
		get('http://api.jirengu.com/fm/getSong.php', {channel: channelId}, function(ret){
			// 'http://api.jirengu.com/fm/getSong.php?channel='+'channelId'
			console.log(ret)
			var obj = JSON.parse(JSON.stringify(ret))
			console.log(ret.song[0].title)
			console.log(ret.song[0].artist)
			// console.log(channelId)
			// renderSong(ret.song)
			getLrc(ret.song[0].lrc)
			play(ret.song[0].url)
			img_rotate.classList.add('img-rotate')

		})
	}
	function getSongs(ret){
		var channelId = e.target.getAttribute('data-channel-id')
		get('http://api.jirengu.com/fm/getSong.php', {}, function(ret){
			console.log(ret)
			// renderSong(ret.songs)
			// getLrc(ret.song[0].sid)
			play(ret.song[0].url)
			img_rotate.classList.add('img-rotate')
			imgShow.src = ret.song[0].picture
		})
	}

	playCt.onclick = function (e){
		if(music.playing == true){
			music.pause()
			music.playing = false
			pauseIcon.classList.add('active')
			playIcon.classList.remove('active')
			img_rotate.classList.remove('img-rotate')
		}else{
			music.play()
			music.playing = true
			pauseIcon.classList.remove('active')
			playIcon.classList.add('active')
			img_rotate.classList.add('img-rotate')
		}
	}
	playPre.onclick = function(){
		getSongs()
	}
	playNext.onclick = function(){
		getSongs()
	}

	function renderChanels(channels){
		var html = channels.map(function(channel){
			return '<li data-channel_id="'+channel.channel_id + '">' + channel.name + '</li>'
		}).join('')
		songCt.innerHTML = html
	}

	function getLrc(sid){
		get('http://api.jirengu.com/fm/getLyric.php', {}, function(ret){
			// lrcCt.innerHTML = ret
			console.log(sid)
			lrcCt.innerText = lrc
		})
	}

	function play(url) {
		music.src = url
		music.play()
	}

	function PlaySong(){
		pause.addEventListener('click',function(e){
			e.stopPropagation()
			music.play(url)
		},true)
	}

	function $(selector) {
		return document.querySelector(selector)
	}


	var progressRender = function(){
		var curTime = parseInt(music.currentTime)
		var minute = "00"
		// progress.setAttribute(curTime)
		// console.log(progress.getAttribute(curTime))
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

		curTimeCt.innerHTML = minute + ':' + curTime
	}
	var timeRender =function(){
		var mDuration = parseInt(music.duration)
		var minute = "00"
		var maxTime = progress.getAttribute('max')
		if(mDuration < 10){
			mDuration = "0" +mDuration
		}
		if(mDuration>60){
			minute = parseInt(mDuration/60)
			mDuration = parseInt(mDuration%60)
			if(minute<10){
				minute = "0" + minute
			}
			if(mDuration<10){
				mDuration = "0" + mDuration
			}
		}
		maxTimeCt.innerHTML = minute+ ':' + mDuration
	}
	music.addEventListener("loadedmetadata", timeRender)
	music.addEventListener("timeupdate", progressRender)
	// timeRender()

	loopbtn.onclick = function(){

		if(music.loop == true){
			music.loop = false
			console.log(music.loop)
			loopS.classList.add('active')
			loopL.classList.remove('active')
			debugger
		}else{
			music.loop = true
			console.log(music.loop)
			loopS.classList.remove('active')
			loopL.classList.add('active')
			debugger
		}
	}



