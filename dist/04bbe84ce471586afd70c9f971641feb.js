// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({11:[function(require,module,exports) {

let Music = function(){
	this.init()
	this.bind()
	this.getChannels()
	this.resize()
	// this.onplay()
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
	this.volumeCt = document.querySelector('.volume-pro')
	this.volumes = document.querySelector('.volume-box-ct')
	this.volumeBox = document.querySelector('.volume-box')
	this.volumeBar = document.querySelector('.volume-bar')
	this.loginCt = document.querySelector('.loginCt')
	this.thumb = document.querySelector('#thumb-btn')
	this.collect = document.querySelector('#collect-btn')
	this.load = document.querySelector('#load-btn')
	this.review = document.querySelector('#review-btn')
	this.loop = document.querySelector('#loop')
	this.extraCt  = document.querySelector('.extra-btn-ct')
	this.imgCt = document.querySelector('.img-ct')
	this.lyricCt = document.querySelector('.lyricCt')
	// this.lyric = document.querySelector('.lyric')
	this.songTitle = document.querySelector('.info-title')
	this.songArtist = document.querySelector('.info-artist')
	this.preplay = document.querySelector('#preplay')
	this.nextplay = document.querySelector('#nextplay')
	this.playCt = document.querySelector('#pause')
	this.listShowBtn = document.querySelector('#listshow')
	this.musicList = document.querySelector	('.musicList')

	this.songCt = document.querySelector('.songCt')
	this.songItem = document.querySelector('.channelitem')

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

	this.perc = document.querySelector('#perc')
	this.progressCt = document.querySelector('.progress')
	this.barNode = document.querySelector('.bar')
	this.barBox= document.querySelector('.progress-bar')
	this.nowNode = document.querySelector('.progress-now')


	this.curTimeCt = document.querySelector('.curtime')
	this.maxTimeCt	= document.querySelector('.maxTime')
	this.progressCtWidth = this.progressCt.style.width
	this.music = document.querySelector('audio')

	this.autoPlay = this.music.autoPlay = true
	this.loop = this.music.loop = true
	this.volume = this.music.volume = 0.5
	this.playing = this.playing = false
	let timer
}

proto.bind = function(){
	var that = this
	this.addEvent(this.listShowBtn, 'click', function(e){
		e.stopPropagation();
		that.musicList.style.bottom = '0';
		that.volumeCt.classList.remove('vol-active')
	})
	this.addEvent(this.container, 'click', function(e){
		// e.stopPropagation();
		that.musicList.style.bottom = '-42%';
		that.volumeCt.classList.remove('vol-active')
	})
	this.addEvent(this.musicList, 'click', function(e){
		e.stopPropagation();
		return;
	})
	this.addEvent(this.thumb, 'click', function(e){
		e.stopPropagation();
		that.thumb.classList.toggle('extra-active')
	})
	this.addEvent(this.collect, 'click', function(e){
		e.stopPropagation();
		that.collect.classList.toggle('extra-active')
	})

	this.addEvent(this.volumeBtn, 'click', function(e){
		e.stopPropagation();
		that.volumeCt.classList.toggle('vol-active')
	})

	this.addEvent(this.loopbtn, 'click', function(e){
		e.stopPropagation();
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
		e.stopPropagation();
		if (e.target.tagName.toLowerCase() != "li") return;
		that.getSong(that.channelId)
	})
	this.addEvent(this.playCt, 'click', function(e){
		e.stopPropagation();

		if(that.playing == true){
			that.music.pause()
			that.playing = false
			// console.log("that.playing == true"+ that.playing)
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
		e.stopPropagation();
		that.getSong()
		// that.playing = true
		that.pauseIcon.classList.remove('active')
		that.playIcon.classList.add('active')
		that.imgCt.classList.add('img-rotate')
	})
	this.addEvent(this.playNext, 'click',function(e){
		e.stopPropagation();
		that.getSong()
		// that.playing = true
		that.pauseIcon.classList.remove('active')
		that.playIcon.classList.add('active')
		that.imgCt.classList.add('img-rotate')
	})

	this.addEvent(this.music ,'loadedmetadata',function(e){
		e.stopPropagation();
		that.timeRender()
	})
	this.addEvent(this.music ,'timeupdate',function(e){
		e.stopPropagation();
		that.progressRender()
	})
	this.addEvent(this.music, 'loadedmetadata', function(e){
		e.stopPropagation();
		that.progressRender()
	})
	this.addEvent(this.music, 'timeupdate', function(e){
		e.stopPropagation();
		that.timeRender()

		// let liH = $(".lyric li").eq(1).outerHeight() - 3;             //每行高度
		// for (var i = 0; i < lyric.length; i++) {                          //遍历歌词下所有的li
		// 	var curT = $(".lyric li").eq(i).attr("dataTime");      //获取当前li存入的当前一排歌词时间
		// 	var nexT = $(".lyric li").eq(i + 1).attr("dataTime");
		// 	var curTime = that.myAudio.currentTime;
		// 	if ((curTime > curT) && (curT < nexT)) {                //当前时间在下一句时间和歌曲当前时间之间的时候 就渲染 并滚动
		// 		$(".lyric li").removeClass("lyric-active");
		// 		$(".lyric li").eq(i).addClass("lyric-active");
		// 		$('.lyric ul').css({
		// 			'top': -liH * (i - 2),
		// 			"transition": "1s"
		// 		});
		// 	}
		// }

	})

	this.addEvent(this.barBox, 'click', function(e){
		e.stopPropagation();
		let percent = e.offsetX/parseInt(getComputedStyle(this).width)
		that.music.currentTime = percent * that.music.duration
		that.barNode.style.width = percent*100+"%"
	})
	this.addEvent(this.volumeBar, 'click', function(e){
		e.stopPropagation();
		// console.log("percent :")
		let percent = 1 - (e.offsetY/parseInt(getComputedStyle(this).height))
		// console.log(percent)
		that.music.volume = percent
		that.volumeBox.style.height = percent*100+"%"
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
		// console.log(ret)
		let songURL = ret.url
		let songTitle = ret.title
		let songArtist = ret.artist
		let songImg = ret.picture
		let songId = ret.sid


		that.music.setAttribute('src', songURL)
		that.imgShow.setAttribute('src', songImg)
		that.songArtist.innerText = songArtist
		that.songTitle.innerText = songTitle
		that.playing = true

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
		// console.log(response)
		let channels = response.channels
		that.renderChanels(channels)
		that.getSong(channels[0])
		that.playing = true
		that.pauseIcon.classList.remove('active')
		that.playIcon.classList.add('active')
		that.imgCt.classList.add('img-rotate')

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
		that.lyric.innerText = "这首歌没有歌词！"
	})
}
proto.playSong = function(){
	this.music.play()
}
proto.renderLyric = function(e){  //解析歌词,返回一个二维数组
	let that = this
	let lines = e.split("\n")
	let pattern = /^\[\d{2}\:\d{2}\.\d{2}\]/
	let lyricArr = []
	let item = ""
	lines.forEach(function(i){
		if(!pattern.test(i)){  //剔除收到数据中没有时间的部分
			lines.splice(i,1)
			return
		}
		let time = i.match(pattern) //把歌词分为：时间和歌词两个部分
		let lyric = i.split(time)
		let seconds = time[0][1]*600 + time[0][2]*10 + time[0][5]*1  //将时间换算为秒
		lyricArr.push([seconds, lyric[1]])   //将整个歌词保存至二维数组中，形式为[时间，歌词]；
	})

	lyricArr.forEach(function(i){
		item += '<li dataTime ="'+i[0]+'">'+i[1]+'</li>'
	})
	this.lyricCt.innerHTML = item
}

proto.renderChanels = function(channels){
	const html = channels.map(function(channel){
		return '<li class="channelitem" data-channel_id="'+channel.channel_id + '">' + channel.name + '</li>'
	}).join('')
	this.songCt.innerHTML = html
}
proto.songRender = function(title, artist, lyric){
	this.songTitle.append(title)
	this.songArtist.append(artist)

							// this.lyricCt.append(lyric)

}


proto.progressRender = function (){
	var that = this
	let curTime = parseInt(this.music.currentTime)
	let mDuration = parseInt(this.music.duration) || '00:00'
	let currentTime = parseInt(this.music.currentTime);

	let percent = (currentTime/mDuration)*100+'%'

	this.barNode.style.width = percent
	let minutes = parseInt(curTime/60) || 0
	let seconds = parseInt(curTime%60)

	minutes = (minutes <10 ? '0' : '') + minutes
	seconds = (seconds <10 ? '0' : '') + seconds

	this.curTimeCt.innerHTML = `${minutes}:${seconds}`

}

proto.timeRender = function(){

	let mDuration = parseInt(this.music.duration) || 0
	let minutes = parseInt(mDuration/60)
	let seconds = parseInt(mDuration%60)

	minutes = (minutes < 10 ? '0' : '') + minutes
	seconds = (seconds < 10 ? '0' : '') + seconds
 	
	this.maxTimeCt.innerHTML = `${minutes}:${seconds}`
}

proto.onplay = function(){
	let that = this
	let percent = currentTime/mDuration*100
	this.timer = setInterval(function(){
		that.updateProgress()
	}, 1000)
	if( this.loop == true && percent == 1){  //自动切歌
		
		that.getSong();

	}
}
proto.resize = function(){
	var cH = window.screen.height
	// var ch = document.querySelector('.container')
	this.container.style.height= cH +'px'
}
proto.onpause = function(){
	// console.log('pause')
	clearInterval(timer)
}
new Music(document.querySelector('.container'))

},{}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var ws = new WebSocket('ws://localhost:55511/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        window.location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,11])