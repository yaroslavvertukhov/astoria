import Swiper from 'swiper';

export default class PlatformSlider {
	constructor(container) {
		if (!container) {
			return;
		}

		this.container = container;

		this.slider = this.container.querySelector('.swiper');

		this.swiperSlider = null;

		this.init();
	}

	init() {
		this.initSlider();
	}

	initSlider() {
		this.swiperSlider = new Swiper(this.slider, this.options);
	}

	get options() {
		return {
			speed: 500,
			slidesPerView: 'auto',
			spaceBetween: 0,
		};
	}
}

export function initPlatformSlider() {
	const selectors = document.querySelectorAll('.js-slider-platform');

	for (const el of selectors) {
		new PlatformSlider(el);
	}
}
