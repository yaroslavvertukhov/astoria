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
		this.itemBanner =
			this.banner && this.banner.querySelector('.js-banner-item');

		this.delayCheckLoad = 500;
		this.animTransition = 1000;
		this.delayOnFullscreen = 3000;

		this.rect = null;
		this.top = 0;
		this.left = 0;
		this.bottom = 0;

		this.init();
	}

	init() {
		this.bindMethods();
		this.onInit();

		if (this.banner && !this.isMobile) {
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
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);

			this.getVideoPosition();
			this.checkCanPlayVideo();
		} else {
			this.hideLoaderStatic();
		}
	}

	onResize(e) {
		this.getVideoPosition();
		this.setClipPath();
	}

	onCanPlay() {
		if (!this.itemBanner.isPlaying) {
			this.startPlay();
		}
	}

	checkCanPlayVideo() {
		setTimeout(() => {
			if (this.itemBanner.readyState === 4) {
				this.onCanPlay();
			} else {
				this.checkCanPlayVideo();
			}
		}, this.delayCheckLoad);
	}

	startPlay() {
		this.itemBanner.isPlaying = true;
		this.itemBanner.play();
		this.itemBanner.removeAttribute('controls');

		this.hideLoader();

		setTimeout(() => {
			this.setClipPath();
		}, this.delayOnFullscreen);

		setTimeout(() => {
			document.body.style.overflow = '';
			document.body.style.touchAction = '';
			this.banner.classList.add('_visible');
			this.loader.style.display = 'none';
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
				this.loader.style.display = 'none';
			}, this.animTransition);
		}, this.delayCheckLoad);
	}

	setClipPath() {
		this.itemBanner.style.clipPath = `inset(${this.top}px ${this.left}px ${this.bottom}px ${this.left}px)`;
	}

	getVideoPosition() {
		this.rect = this.boxBanner.getBoundingClientRect();
		this.top = this.rect.top;
		this.left = this.rect.left;
		this.bottom =
			+window.getComputedStyle(this.itemBanner).height.replace('px', '') -
			this.rect.bottom;
	}

	get isMobile() {
		const ua = navigator.userAgent.toLowerCase();
		const flag =
			/mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(
				ua
			);

		return flag;
	}
}

export function initPreloader() {
	const selector = document.querySelector('.js-preloader');
	new Preloader(selector);
}