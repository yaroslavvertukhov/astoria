export default class Header {
	constructor(selector) {
		if (!selector) {
			return;
		}

		this.data = {
			menuOpen: '_menu-open',
		};

		this.header = selector;
		this.triggerMenu = this.header.querySelector('.js-trigger-menu');
		this.media = window.matchMedia(
			`(max-width: ${this.triggerMenu.dataset.showOn}px)`
		);

		this.init();
	}

	init() {
		this.bindMethods();
		this.addListeners();
	}

	bindMethods() {
		this.clickHandler = this.clickHandler.bind(this);
		this.resizeHandler = this.resizeHandler.bind(this);
	}

	addListeners() {
		this.addListenerClick();
		this.addListenerResize();
	}

	addListenerClick() {
		this.triggerMenu.addEventListener('click', this.clickHandler);
	}

	addListenerResize() {
		this.media.addEventListener('change', this.resizeHandler);
	}

	clickHandler(e) {
		e.preventDefault();

		this.onClick();
	}

	resizeHandler(e) {
		this.onResize();
	}

	onClick() {
		this.header.classList.toggle(this.data.menuOpen);

		if (this.isOpen) {
			window.bodyLock.lock();
		} else {
			window.bodyLock.unlock();
		}
	}

	onResize() {
		if (!this.media.matches) {
			this.header.classList.remove(this.data.menuOpen);
			bodyLock.unlock();
		}
	}

	get isOpen() {
		return this.header.classList.contains(this.data.menuOpen);
	}
}

export function initHeader() {
	const selector = document.querySelector('.js-header');
	new Header(selector);
}
