export default class Preloader {
	constructor(selector) {
        if (!selector) {
            return;
        }
        this.loader = selector;
		this.countCur = this.loader.querySelector('.js-preloader-count');
		this.countTotal = this.loader.querySelector('.js-preloader-count-total');

		this.banner = document.querySelector('.js-banner');
		this.boxBanner = this.banner && this.banner.querySelector('.js-banner-box');
		this.itemBanner = this.banner && this.banner.querySelector('.js-banner-item');

		this.delayCheckLoad = 500;
		this.animTransition = 1000;
		this.delayOnFullscreen = 3000;

		this.init();
	}

	init() {
		this.bindMethods();
		this.onInit();

		if (this.banner) {
			this.addListenerResize();
		}
	}

	bindMethods() {
		this.onResize = this.onResize.bind(this);
	}

	addListenerResize() {
		window.addEventListener('resize', this.onResize);
	}

	onInit() {
		if (this.banner) {
			this.getVideoPosition();
			this.checkCanPlayVideo(this.top, this.left, this.bottom);
		} else {
			this.hideLoaderStatic();
		}
	}

	onResize(e) {
		this.getVideoPosition();
		this.setClipPath(this.top, this.left, this.bottom);
	}

	checkCanPlayVideo(top, left, bottom) {
		setTimeout(() => {
			if (this.itemBanner.canVideoPlay && !this.itemBanner.isPlaying) {
				this.startPlay(top, left, bottom);
			} else {
				this.checkCanPlayVideo(top, left, bottom);
			}
		}, this.delayCheckLoad);
	}

	startPlay(top, left, bottom) {
		this.itemBanner.isPlaying = true;
		this.itemBanner.play();

		this.hideLoader();

		setTimeout(() => {
			this.setClipPath(top, left, bottom);
		}, this.delayOnFullscreen);

		setTimeout(() => {
			document.body.style.overflow = '';
			document.body.style.touchAction = '';
			this.banner.classList.add('_visible');
		}, this.delayOnFullscreen + this.animTransition);
	}

	hideLoader() {
		this.loader.classList.add('_hide');
		this.countCur.style.display = 'none';
		this.countTotal.style.display = '';
	}

	hideLoaderStatic() {
		setTimeout(() => {
			this.hideLoader();
			setTimeout(() => {
				document.body.style.overflow = '';
				document.body.style.touchAction = '';
			}, this.animTransition);
		}, this.delayCheckLoad);
	}

	setClipPath(top, left, bottom) {
		this.itemBanner.style.clipPath = `inset(${top}px ${left}px ${bottom}px ${left}px)`;
	}

	getVideoPosition() {
		this.rect = this.boxBanner.getBoundingClientRect();
		this.top = this.rect.top;
		this.left = this.rect.left;
		this.bottom = window.innerHeight - this.rect.bottom;
	}
}

export function initPreloader() {
    const selector = document.querySelector('.js-preloader');
	new Preloader(selector);
}
