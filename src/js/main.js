
var Music = function(){
	this.init()
	this.bind()
	this.getChannels()
}
var proto =  Music.prototype
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
	this.lrcCt = document.querySelector('.lrcCt')
	this.preplay = document.querySelector('#preplay')
	this.nextplay = document.querySelector('#nextplay')
	this.playCt = document.querySelector('#pause')
	this.listShowBtn = document.querySelector('#listshow')
	this.musicList = document.querySelector	('.musicList')
	this.perc = document.querySelector('#perc')

	this.songCt = document.querySelector('.songCt')
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

	this.progress = document.querySelector('progress')
	this.curTimeCt = document.querySelector('.curtime')
	this.maxTimeCt	= document.querySelector('.maxTime')

	this.music = document.querySelector('audio')

	this.music.autoPlay = true
	this.music.loop=true
	this.music.volume = 1
	this.music.playing = false
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


	// this.addEvent(this.imgCt, 'click', function(e){
	// 	e.stopPropagation()
	// 	that.imgCt.classList.add('img-hide')
	// 	that.lrcCt.classList.remove('lrc-hide')
	// })
	// this.addEvent(this.lrcCt, 'click', function(e){
	// 	e.stopPropagation()
	// 	that.imgCt.classList.remove('img-hide')
	// 	that.lrcCt.classList.add('lrc-hide')
	// })

	this.addEvent(this.volumeBtn, 'click', function(e){
		that.volumes.classList.toggle('vol-active')
	})

	this.addEvent(this.loopbtn, 'click', function(e){
		if(this.music.loop == true){
			this.music.loop = false
			console.log(this.music.loop)
			this.loopS.classList.add('active')
			this.loopL.classList.remove('active')
		}else{
			this.music.loop = true
			console.log(this.music.loop)
			this.loopS.classList.remove('active')
			this.loopL.classList.add('active')
		}
	})
	this.addEvent(this.songCt, 'click', function(e){
		if(e.target.tagName.toLowerCase() !== 'li') return
		let channelId = e.target.getAttribute('data-channel-id')
		get('http://api.jirengu.com/fm/getSong.php', {channel: channelId}, function(ret){
			// 'http://api.jirengu.com/fm/getSong.php?channel='+'channelId'
			console.log(ret)
			// let obj = JSON.parse(JSON.stringify(ret))
			console.log(ret.song[0].title)
			console.log(ret.song[0].artist)
			// console.log(channelId)
			// renderSong(ret.song)

/*
			this.getLrc(ret.song[0].lrc)
			this.play(ret.song[0].url)
			this.mgShow.classList.add('img-rotate')
*/

		})
	})
	this.addEvent(this.playCt, 'click', function(e){
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
	})

	this.addEvent( this.playPre,'click',function(e){
		that.getSongs()
	})
	this.addEvent( playNext, 'click',function(e){
		that.getSongs()
	})
	this.addEvent(this.music ,'loadedmetadata',function(){
		that.timeRender()
	})
	this.addEvent(this.music ,'timeupdate',function(){
		that.progressRender()
	})


}
proto.get = function(url, data, callback, dataType){
	url += '?' + Object.keys(data).map(function(key){
		return key + '=' + data[key]
	}).join('&')

	let xhr = new XMLHttpRequest()
	xhr.responseType =  dataType||'json'
	xhr.onload = function(){
		callback(xhr.response)
	}
	xhr.open('GET', url, true)
	xhr.send()
}
proto.getChannels = function(){
	let that = this
	get('http://api.jirengu.com/fm/getChannels.php', {}, function(ret){
		renderChanels(ret.channels)
		console.log(ret.channels)
		// play(ret.song[0].url)
		that.imgShow.classList.add('img-rotate')
	})
}
proto.getSongs = function(ret){
	let that = this
	let channelId = e.target.getAttribute('data-channel-id')
	get('http://api.jirengu.com/fm/getSong.php', {}, function(ret){
		console.log(ret)
		// renderSong(ret.songs)
		// getLrc(ret.song[0].sid)
		that.music.play(ret.song[0].url)

		that.imgShow.classList.add('img-rotate')
		that.imgShow.src = ret.song[0].picture
	})
}

proto.renderChanels = function(channels){
	const html = channels.map(function(channel){
		return '<li data-channel_id="'+channel.channel_id + '">' + channel.name + '</li>'
	}).join('')
	this.songCt.innerHTML = html
}

proto.getLrc = function(sid){
	var that = this
	get('http://api.jirengu.com/fm/getLyric.php', {}, function(ret){
		// lrcCt.innerHTML = ret
		console.log(sid)
		that.lrcCt.innerText = lrc
	})
}
proto.play = function(url){
	this.music.src = url
	this.music.play()
}


// function $(selector) {
// 	return document.querySelector(selector)
// }

proto.progressRender = function (){
	var curTime = parseInt(music.currentTime)
	var minute = "00"
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
proto.timeRender = function(){
	let mDuration = parseInt(music.duration)
	let minute = "00"
	let maxTime = progress.getAttribute('max')
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



new Music(document.querySelector('.container'))