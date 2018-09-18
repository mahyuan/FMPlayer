module.exports = class Music {
	constructor({
		selector='div[data-audio]',
		source
	} = {}) {
		this.selector = selector;
		this.source = source;
		this.active = false;
		this.audio = new Audio(this.source);
		this.timer = null;
	}
	init() {
		this.audio.preload = 'auto';
		this.audio.muted = false;
		this.audio.volume = 0;
		this.selector.addEventListener('click', e => {
			e.stopPropagation();
			e.preventDefault();
			if(this.active) this.stop();
			else this.start();
		})
	}
	__fadeIn() {
		this.audio.volume += 0.01;
		if(this.audio.volume >= 0.2) {
			this.audio.volume = 0.2;
			return;
		}
		this.timer = setTimeout(__fadeIn, 100);
	}

	__fadeout() {
		this.audio.volume -= 0.02;
		if(this.audio.volume <= 0.1) {
			this.audio.volume = 0;
			this.audio.pause();
			return;
		}
		this.timer = setTimeout(__fadeOut, 100);
	}

	start() {
		if(this.timer) clearTimeout(this.timer);
		this.active = true;
		this.audio.play();
		this.__fadeIn();
	}

	stop() {
		if(this.timer) clearTimeout(this.timer);
		this.active = false;
		this.__fadeout();
	}

}
