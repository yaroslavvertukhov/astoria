import Swiper, { FreeMode }from 'swiper';
import 'swiper/scss/free-mode';

export default class NavigationCatalog {
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
			modules: [FreeMode],
			speed: 500,
			slidesPerView: 'auto',
			spaceBetween: 0,
			freeMode: {
				enabled: true,
			}
		};
	}
}

export function initNavigationCatalog() {
	const selectors = document.querySelectorAll('.js-nav-catalog');

	for (const el of selectors) {
		new NavigationCatalog(el);
	}
}
