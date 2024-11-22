import Swiper from 'swiper';

export default class MobileSlider {
	constructor(container) {
		if (!container) {
			return;
		}

		this.container = container;
		this.slider = this.container.querySelector('.swiper');

		this.mediaQuery = window.matchMedia('(max-width: 767px)');

		this.swiperSlider = null;

		this.init();
	}

	init() {
		this.bindMethods();
		this.checkSlider();
		this.addListenerResize();
	}

	bindMethods() {
		this.resizeHandler = this.resizeHandler.bind(this);
	}

	addListenerResize() {
		this.mediaQuery.addEventListener('change', this.resizeHandler);
	}

	checkSlider() {
		if (this.mediaQuery.matches) {
			this.initSlider();
		} else {
			this.destroySlider();
		}
	}

	resizeHandler() {
		this.checkSlider();
	}

	initSlider() {
		if (!this.swiperSlider) {
			this.swiperSlider = new Swiper(this.slider, this.options);
		}
	}

	destroySlider() {
		if (this.swiperSlider) {
			this.swiperSlider.destroy();
			this.swiperSlider = null;
		}
	}

	get options() {
		return {
			speed: 500,
			slidesPerView: 'auto',
		};
	}
}

export function initMobileSlider() {
	const selectors = document.querySelectorAll('.js-slider-mobile');

	for (const el of selectors) {
		new MobileSlider(el);
	}
}
