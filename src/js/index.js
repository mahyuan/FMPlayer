/*
var Music = function(){
	this.init()
	this.bind()
}
var proto =  Music.prototype
proto.init = function(){
	this.container = document.querySelector('.container')
	this.loginbtn = document.querySelector('#loginbtn')
	this.avatar = document.querySelector('#avatar')

	this.volumeBtn = document.querySelector('.volume>.icon-vol')
	this.volumes = document.querySelector('.volume-box-ct')

	this.loginCt = document.querySelector('.loginCt')
	// this.panelItem = document.querySelector('.panel-ct li')

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
	this.pause = document.querySelector('#pause')
	this.listShowBtn = document.querySelector('#listshow')
	this.musicList = document.querySelector	('.musicList')

	this.perc = document.querySelector('#perc')

}

proto.bind = function(){
	var that = this
	this.addEvent(this.loginbtn, 'click', function(e){
		e.stopPropagation();
		that.musicList.style.bottom = '-42%';
		that.loginCt.style.left = '0';
	})
	this.addEvent(this.listShowBtn, 'click', function(e){
		e.stopPropagation();
		that.loginCt.style.left = '-62%';
		that.musicList.style.bottom = '0';
	})

	this.addEvent(this.container, 'click', function(e){
		e.stopPropagation();
		that.loginCt.style.left = '-62%';
		that.musicList.style.bottom = '-42%';
	})
	this.addEvent(this.loginCt, 'click', function(e){
		e.stopPropagation();
		return ;
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


	this.addEvent(this.imgCt, 'click', function(e){
		e.stopPropagation()
		that.imgCt.classList.add('img-hide')
		that.lrcCt.classList.remove('lrc-hide')
	})
	this.addEvent(this.lrcCt, 'click', function(e){
		e.stopPropagation()
		that.imgCt.classList.remove('img-hide')
		that.lrcCt.classList.add('lrc-hide')
	})
	this.addEvent(this.volumeBtn, 'click', function(e){
		e.stopPropagation()
		that.volumes.classList.toggle('vol-active')
	})

}

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
new Music(document.querySelector('.container'))
*/