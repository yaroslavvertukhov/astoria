import Swiper from 'swiper';

export default class BlogDetailedSlider {
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

export function initBlogDetailedSlider() {
	const selectors = document.querySelectorAll('.js-slider-blog-detailed');

	for (const el of selectors) {
		new BlogDetailedSlider(el);
	}
}
