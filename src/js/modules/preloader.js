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

		this.rect = null;
		this.top = 0;
		this.left = 0;
		this.bottom = 0;

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

	checkCanPlayVideoMobile() {
		setTimeout(() => {
			if (this.itemBanner.readyState === 4) {
				this.onCanPlayMobile();
			} else {
				this.checkCanPlayVideoMobile();
			}
		}, this.delayCheckLoad);
	}

	onInit() {
		if (this.banner) {
			this.getVideoPosition();

			if (this.isMobile) {
				this.checkCanPlayVideoMobile();
			} else {
				this.checkCanPlayVideo();
			}
		} else {
			this.hideLoaderStatic();
		}
	}

	onResize(e) {
		this.getVideoPosition();
		this.setClipPath();
	}

	onCanPlayMobile() {
		if (!this.itemBanner.isPlaying) {
			this.startPlay();
		}
	}

	checkCanPlayVideo() {
		setTimeout(() => {
			if (this.itemBanner.canVideoPlay && !this.itemBanner.isPlaying) {
				this.startPlay();
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

	setClipPath() {
		this.itemBanner.style.clipPath = `inset(${this.top}px ${this.left}px ${this.bottom}px ${this.left}px)`;
	}

	getVideoPosition() {
		this.rect = this.boxBanner.getBoundingClientRect();
		this.top = this.rect.top;
		this.left = this.rect.left;
		this.bottom = window.innerHeight - this.rect.bottom;
	}

	get isMobile() {
		const ua = navigator.userAgent.toLowerCase();
		const flag = /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua);

		return flag;
	  }
}

export function initPreloader() {
    const selector = document.querySelector('.js-preloader');
	new Preloader(selector);
}
