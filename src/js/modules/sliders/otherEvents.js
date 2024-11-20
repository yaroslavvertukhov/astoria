import Swiper, { Navigation }from 'swiper';

export default class OtherEventsSlider {
	constructor(container) {
		if (!container) {
			return;
		}

		this.container = container;

		this.slider = this.container.querySelector('.swiper');

		this.prev = this.container.querySelector('.js-btn-prev');
		this.next = this.container.querySelector('.js-btn-next');

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
			modules: [Navigation],
			speed: 500,
			slidesPerView: 'auto',
			spaceBetween: 0,
			navigation: {
				nextEl: this.next,
				prevEl: this.prev,
			},
		};
	}
}

export function initOtherEventsSlider() {
	const navigations = document.querySelectorAll('.js-slider-other-events');

	for (const el of navigations) {
		new OtherEventsSlider(el);
	}
}
