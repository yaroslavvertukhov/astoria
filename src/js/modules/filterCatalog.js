export default class FilterCatalog {
	constructor(selector) {
		if (!selector) {
			return;
		}

		this.names = {
			active: '_active',
		};

		this.container = selector;
		this.container.instanceFilter = this;

		this.triggers = this.container.querySelectorAll('[data-trigger]');

		this.media = window.matchMedia('(max-width: 1023px)');

		this.init();
	}

	init() {
		this.bindMethods();
		this.addListenerTriggersClick();
		this.addListenerResize();
	}

	bindMethods() {
		this.clickTriggerHandler = this.clickTriggerHandler.bind(this);
		this.onResize = this.onResize.bind(this);
	}

	addListenerTriggersClick() {
		for (const el of this.triggers) {
			el.addEventListener('click', this.clickTriggerHandler);
		}
	}

	addListenerResize() {
		this.media.addEventListener('change', this.onResize);
	}

	clickTriggerHandler(e) {
		e.preventDefault();

		this.onTriggerClick();
	}

	onTriggerClick(e) {
		this.container.classList.toggle(this.names.active);

		if (this.isOpen) {
			window.bodyLock.lock();
		} else {
			window.bodyLock.unlock();
		}
	}

	onResize(e) {
		if (!this.media.matches) {
			this.container.classList.remove(this.names.active);
			bodyLock.unlock();
		}
	}

	get isOpen() {
		return this.container.classList.contains(this.names.active);
	}
}

export function initFilterCatalog() {
	const selector = document.querySelector('.js-filter-catalog');

	new FilterCatalog(selector);
}
