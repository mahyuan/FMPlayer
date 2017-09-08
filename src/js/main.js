
let Music = function(){
	this.init()
	this.bind()
	this.getChannels()
}
let proto =  Music.prototype
proto.addEvent = function (node, type, handler) {
	if (!node) return false;
	if (node.addEventListener) {
		node.addEventListener(type, handler, false);
		return true;
	} else if (node.attachEvent) {
		node['e' + type + handler] = handler;
		node[type + handler] = function() {
			node['e' + type + handler](window.event);
		};
		node.attachEvent('on' + type, node[type + handler]);
		return true;
	}
	return false;

}

proto.init = function(){
	this.container = document.querySelector('.container')
	this.loginbtn = document.querySelector('#loginbtn')
	this.avatar = document.querySelector('#avatar')
	this.volumeBtn = document.querySelector('.volume')
	this.volumes = document.querySelector('.volume-box-ct')
	this.loginCt = document.querySelector('.loginCt')
	this.thumb = document.querySelector('#thumb-btn')
	this.collect = document.querySelector('#collect-btn')
	this.load = document.querySelector('#load-btn')
	this.review = document.querySelector('#review-btn')
	this.loop = document.querySelector('#loop')
	this.extraCt  = document.querySelector('.extra-btn-ct')
	this.imgCt = document.querySelector('.img-ct')
	this.lyrcCt = document.querySelector('.lyrcCt')
	this.lyrc = document.querySelector('.lyrc')
	this.songTitle = document.querySelector('.info-title')
	this.songArtist = document.querySelector('.info-artist')
	this.preplay = document.querySelector('#preplay')
	this.nextplay = document.querySelector('#nextplay')
	this.playCt = document.querySelector('#pause')
	this.listShowBtn = document.querySelector('#listshow')
	this.musicList = document.querySelector	('.musicList')
	this.perc = document.querySelector('#perc')

	this.songCt = document.querySelector('.songCt')
	this.songChannel = document.querySelector('.songCt>li')
	// this.songItem =  document.querySelector('.songCt>li')

	this.imgShow = document.querySelector('#img-show')
	this.playPre = document.querySelector('#preplay')
	this.playNext = document.querySelector('#nextplay')
	this.playCt = document.querySelector('#pause')
	this.pauseIcon = document.querySelector('.pause')
	this.playIcon = document.querySelector('.play')
	// var imgShow = document.querySelector('#img-show')
	this.loopbtn = document.querySelector('#loop')
	this.loopL = document.querySelector('.icon-mulu')
	this.loopS = document.querySelector('.icon-single')

	this.progress = document.querySelector('.progress')
	this.barNode = document.querySelector('.progress .bar')
	this.NowNode = document.querySelector('.progress-now')


	this.curTimeCt = document.querySelector('.curtime')
	this.maxTimeCt	= document.querySelector('.maxTime')

	this.music = document.querySelector('audio')

	this.autoPlay = this.music.autoPlay = true
	this.loop = this.music.loop=true
	this.volume = this.music.volume = 1
	this.playing = this.playing = false
	let timer
}

proto.bind = function(){
	var that = this
	this.addEvent(this.listShowBtn, 'click', function(e){
		e.stopPropagation();
		that.musicList.style.bottom = '0';
	})
	this.addEvent(this.container, 'click', function(e){
		e.stopPropagation();
		// that.loginCt.style.left = '-62%';
		that.musicList.style.bottom = '-42%';
	})
	this.addEvent(this.musicList, 'click', function(e){
		e.stopPropagation();
		return;
	})
	this.addEvent(this.thumb, 'click', function(){
		that.thumb.classList.toggle('extra-active')
	})
	this.addEvent(this.collect, 'click', function(){
		that.collect.classList.toggle('extra-active')
	})

	this.addEvent(this.volumeBtn, 'click', function(e){
		that.volumes.classList.toggle('vol-active')
	})

	this.addEvent(this.loopbtn, 'click', function(e){
		if(that.loop == true){
			that.loop = false
			that.loopS.classList.add('active')
			that.loopL.classList.remove('active')
		}else{
			that.loop = true
			that.loopS.classList.remove('active')
			that.loopL.classList.add('active')
		}
	})
	this.addEvent(this.songChannel, 'click', function(e){
		if (e.target.tagName.toLowerCase() != "li" || !e.target.hasAttributes("channel_id")) return;
		that.channel_id = e.target.getAttribute('data-channel-id')
		that.getSong()
		console.log('要获取的歌的id：' +channelId )
	})
	this.addEvent(this.playCt, 'click', function(e){
		if(that.playing == true){
			that.music.pause()
			that.playing = false
			that.pauseIcon.classList.add('active')
			that.playIcon.classList.remove('active')
			that.imgCt.classList.remove('img-rotate')
		}else{
			that.music.play()
			that.playing = true
			that.pauseIcon.classList.remove('active')
			that.playIcon.classList.add('active')
			that.imgCt.classList.add('img-rotate')
		}
	})

	this.addEvent(this.playPre,'click',function(e){
		that.getSong()
	})
	this.addEvent(this.playNext, 'click',function(e){
		that.getSong()
	})
	this.addEvent(this.music ,'loadedmetadata',function(){
		that.timeRender()
	})
	this.addEvent(this.music ,'timeupdate',function(){
		that.progressRender()
	})
	this.addEvent(this.music, 'loadedmetadata', function(){
		that.progressRender()
	})

	this.addEvent(this.music, 'timeupdate', function(){
		that.timeRender()
	})

	this.addEvent(this.barNode, 'click', function(){
		var percent = e.offsetX/parseInt(getComputedStyle(this).width)
		that.music.currentTime = percent * that.music.duration
		that.NowNode.style.width = percent*100+"%"
	})
}

proto.getSong = function(){
	let that =  this
	$.ajax({
		url: 'http://api.jirengu.com/fm/getSong.php',
		method: 'get',
		dataType: 'json',
		data: {
			'channel': 'data.channel_id'
		}
	}).done(function(song){
		let ret = song.song[0]
		console.log(ret)
		let songURL = ret.url
		let songTitle = ret.title
		let songArtist = ret.artist
		let songImg = ret.picture
		let songId = ret.sid


		that.music.setAttribute('src', songURL)
		that.imgShow.setAttribute('src', songImg)
		that.songArtist.innerText = songArtist
		that.songTitle.innerText = songTitle


								that.music.playSong()
								that.lyrc.empty()
								that.getLyric()

	}).fail(function(){
		that.getSong()
	})




}
proto.getChannels = function(){
	let that = this
	$.ajax({
		url: 'http://api.jirengu.com/fm/getChannels.php',
		method: 'get',
		dataType: 'json'
	}).done(function(response){
		console.log(response)
		let channels = response.channels
		that.renderChanels(channels)
	}).fail(function(){
		that.songCt.innerText('获取清单失败')
	})
}

proto.getLyric = function(){
	var that = this
	$.ajax({
		url: 'http://api.jirengu.com/fm/getLyric.php',
		method: 'get',
		dataType: 'json',
		data: {sid : songId}, //是否可以获取到该变量，请核对

	}).done(function(ret){
		that.renderLyric(ret.lyric)
	}).dail(function(){
		that.lyrc.innerText = "这首歌没有歌词！"
	})
}
proto.playSong = function(){

}
proto.renderLyric = function(){

}



proto.renderChanels = function(channels){
	const html = channels.map(function(channel){
		return '<li data-channel_id="'+channel.channel_id + '">' + channel.name + '</li>'
	}).join('')
	this.songCt.innerHTML = html
}
proto.songRender = function(title, artist, lyrc){
	this.songTitle.append(title)
	this.songArtist.append(artist)

							this.lyrcCt.append(lyrc)
							//歌词要分解开时间
}


proto.progressRender = function (){
	let curTime = parseInt(this.music.currentTime)
	let minute = "00"
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

	this.curTimeCt.innerHTML = minute + ':' + curTime
}

proto.timeRender = function(){
	let mDuration = parseInt(this.music.duration)
	let minute = "00"
	let maxTime = this.progress.getAttribute('max')
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
	this.maxTimeCt.innerHTML = minute+ ':' + mDuration
}

proto.updateProgress = function(){
	let percent = (this.music.currentTime/this.music.duration)*100+'%'
	progressNowNode.style.width = percent

	let minutes = parseInt(this.music.currentTime/60)
	let seconds = parseInt(this.music.currentTime%60)+''
	seconds = seconds.length == 2? seconds : '0'+seconds
	this.curTimeCt.innerText = minutes + ':' + seconds
}
proto.onplaying = function(){
	this.timer = setInterval(function(){
		updateProgress()
	}, 1000)
	console.log('play')
}
proto.onpause = function(){
	console.log('pause')
	clearInterval(timer)
}

new Music(document.querySelector('.container'))