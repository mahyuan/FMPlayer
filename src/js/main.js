
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
	this.lrcCt = document.querySelector('.lrcCt')
	that.lrc = document.querySelector('.lrc')
	this.songTitle = document.querySelector('.info-title')
	this.songArtist = document.querySelector('.info-artist')
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
	this.addEvent(this.songCt, 'click', function(e){
		if(e.target.tagName.toLowerCase() !== 'li') return
		let channelId = e.target.getAttribute('data-channel-id')
		that.get('http://api.jirengu.com/fm/getSong.php', {channel: channelId}, function(ret){
			// 'http://api.jirengu.com/fm/getSong.php?channel='+'channelId'
			console.log(ret)
			console.log(ret.song[0].title)
			console.log(ret.song[0].artist)
		})
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
		that.getSongs()
	})
	this.addEvent(this.playNext, 'click',function(e){
		that.getSongs()
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

//以下
proto.getChannels = function(){
	let that = this
	// var  xhr = createXHR()
	xhr = new XMLHttpRequest();
	xhr.open('get', 'http://api.jirengu.com/fm/getChannels.php',true)
	// xhr.setRequestHeader(myHeader, myValue)
	xhr.send()
	// if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
		console.log(response)
		let channel = ret.channels
		let num = channel.lenght
		console.log(channel[num])
		that.getSong(channel[num])

	// }else{
	// 	console.log('获取列表是败!')
	// }
}
proto.getSong = function(){
	let that =  this
	// var  xhr = createXHR();
	$.ajax({
		url: http://api.jirengu.com/fm/getSong.php,
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
								that.lrc.empty()
								that.getLyric()

	}).fail(function(){
		that.getSong()
	})
	/*
	xhr = new XMLHttpRequest();
	xhr.open('get', 'http://api.jirengu.com/fm/getSong.php', true);//异步请求
	// xhr.setRequestHeader(myHeader,myValue)
	xhr.send();
	// if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
		console.log(response)
		let	songList = song.song[index]
		let songURL = songList.url
		let songTitle = songList.title
		let songArtist = songList.artist
		let songImg = songList.picture
		let songId = songList.sid
		that.music.setAttribute('src', songURL)
		that.imgShow.setAttribute('src', songImg)
		that.songArtist.innerText = songArtist
		that.songTitle.innerText = songTitle
		that.music.Play()
		*/
	// }else{
	// 	console.log('获取歌单失败!')
	// }
}

proto.playSong = function(){

}

//以上
/*
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
	this.get('http://api.jirengu.com/fm/getChannels.php', {}, function(ret){
		that.renderChanels(ret.channels)
		console.log(ret.channels)
		// play(ret.song[0].url)
		that.imgShow.classList.add('img-rotate')
	})
}
proto.getSongs = function(ret){
	let that = this
	let channelId = e.target.getAttribute('data-channel-id')
	this.get('http://api.jirengu.com/fm/getSong.php', {}, function(ret){
		console.log(ret)
		renderSong(ret.songs)
		getLrc(ret.song[0].sid)
		that.play(ret.song[0].url)
		that.imgShow.classList.add('img-rotate')
		that.imgShow.src = ret.song[0].picture

		that.songRender(title, artist, lrc)
	})
}
//
				proto.getLrc = function(sid){
					var that = this
					this.get('http://api.jirengu.com/fm/getLyric.php', {}, function(ret){
						// lrcCt.innerHTML = ret
						console.log(sid)
						that.lrcCt.innerText = lrc
					})
				}
//
				proto.playNext = function(){
					this.play()
				}
				proto.playPre = function(){
					this.play()
				}
				proto.play = function(url){

					this.getSongs(url)
					this.music.play()
				}
//
*/
/*
var getSongMessage=function(data){
	$.ajax({
		  url: 'http://api.jirengu.com/fm/getSong.php',
		  type:'get',
		  dataType: 'json',
		  data: {
			'channel':'data.channel_id'
		  }
	 }).done(function(song){
		  console.dir(song);
		  $song=song.song[0];
		  // console.dir(data.name);
		  songURL=$song.url;
		  songImg=$song.picture;
		  songArtist=$song.artist;
		  songTitle=$song.title;
		  songId=$song.sid;
		  $audio.attr('src',songURL);
		  $background.attr('src',songImg);
		  $musicName.text(songTitle);
		  $singer.text(songArtist);
		  console.dir(songURL);
		  console.log(audio);
	 });

}
function getChannel(){

	$.ajax({
		  url: 'http://api.jirengu.com/fm/getChannels.php',
		  type:'get',
		  dataType: 'json'

	 }).done(function(response){
		  console.dir(response);
		  $channel=response.channels;
		  var num=Math.floor(Math.random()*$channel.length);
		  console.log($channel[num]);
		  console.log($channel[num].channel_id);
		  getSongMessage($channel[num]);
	 });

};
*/



//
proto.renderChanels = function(channels){
	const html = channels.map(function(channel){
		return '<li data-channel_id="'+channel.channel_id + '">' + channel.name + '</li>'
	}).join('')
	this.songCt.innerHTML = html
}
proto.songRender = function(title, artist, lrc){
	this.songTitle.append(title)
	this.songArtist.append(artist)

							this.lrcCt.append(lrc)
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

//////////////////
/*
		function loadMusic(songObj){
			this.music.src = songObj.src
			this.songTitle.innerText = songObj.title
			this.songArtist.innerText = songObj.auther
		}

		function loadNextMusic(){
			musicIndex++
			musicIndex = musicIndex%musicList.length
			loadMusic(musicList[musicIndex])
		}

		function loadLastMusic(){
			musicIndex--
			musicIndex = (musicIndex + musicList.length)%musicList.length
			loadMusic(musicList[musicIndex])
		}
		*/

new Music(document.querySelector('.container'))