export default class Filter {
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
		this.ddTriggers = this.container.querySelectorAll('[data-dd-trigger]');
		this.inputs = this.container.querySelectorAll('[data-input]');
		this.countEls = this.container.querySelectorAll('[data-count-type]');
		this.countTotalEl = this.container.querySelector('[data-count-total]');
		this.cols = this.container.querySelectorAll('[data-col]');

		this.media = window.matchMedia('(max-width: 1023px)');

		this.countTotal = 0;

		this.init();
	}

	init() {
		this.bindMethods();
		this.addListenerTriggersClick();
		this.addListenerInputChange();
		this.addListenerDocClick();
		this.addListenerResize();
		this.onInit();
	}

	bindMethods() {
		this.clickTriggerHandler = this.clickTriggerHandler.bind(this);
		this.clickDdTriggerHandler = this.clickDdTriggerHandler.bind(this);
		this.changeInputHandler = this.changeInputHandler.bind(this);
		this.docClickHandler = this.docClickHandler.bind(this);
		this.onResize = this.onResize.bind(this);
	}

	addListenerTriggersClick() {
		for (const el of this.triggers) {
			el.addEventListener('click', this.clickTriggerHandler);
		}
		for (const el of this.ddTriggers) {
			el.addEventListener('click', this.clickDdTriggerHandler);
		}
	}

	addListenerInputChange() {
		for (const el of this.inputs) {
			el.addEventListener('change', this.changeInputHandler);
		}
	}

	addListenerDocClick() {
		document.addEventListener('click', this.docClickHandler);
	}

	addListenerResize() {
		this.media.addEventListener('change', this.onResize);
	}

	clickTriggerHandler(e) {
		e.preventDefault();

		this.onTriggerClick();
	}

	clickDdTriggerHandler(e) {
		e.preventDefault();

		this.onDdTriggerClick(e);
	}

	changeInputHandler(e) {
		this.onInputChange(e);
	}

	docClickHandler(e) {
		this.onDocClick(e);
	}

	onInit() {
		for (const el of this.inputs) {
			this.onInputChange(undefined, el);
		}
	}

	onTriggerClick(e) {
		this.container.classList.toggle(this.names.active);

		if (this.isOpen) {
			window.bodyLock.lock();
		} else {
			window.bodyLock.unlock();
		}
	}

	onDdTriggerClick(e) {
		const { target } = e;
		const container = target.closest('[data-col]');

		container.classList.toggle(this.names.active);
	}

	onInputChange(event, el) {
		const target = event ? event.target : el;

		const container = target.closest('[data-col]');
		const countEl = container.querySelector('[data-count]');

		if (countEl.dataset.countType === 'checkbox') {
			let index = +countEl.dataset.count;

			if (target.checked) {
				index += 1;
			} else if (event) {
				index -= 1;
			}

			countEl.setAttribute('data-count', index);

			countEl.innerHTML = index > 0 ? `(${index})` : '';
		}

		if (countEl.dataset.countType === 'radio') {
			const field = target.closest('.field-filter');
			const text = field.querySelector('[data-text]');

			if (target.checked) {
				countEl.innerHTML = `(${text.innerHTML})`;
				countEl.setAttribute('data-count', '1');
			} else if (event) {
				countEl.innerHTML = '';
			}
		}

		this.setCountTotal();
	}

	onDocClick(e) {
		const { target } = e;

		if (!target.closest('.filter__wrapper')) {
			this.closeAllDropdowns();
		}
	}

	onResize(e) {
		if (!this.media.matches) {
			this.container.classList.remove(this.names.active);
			bodyLock.unlock();
		}
	}

	setCountTotal() {
		let countSum = 0;

		for (const el of this.countEls) {
			const count = +el.dataset.count;
			countSum += count;
		}

		this.countTotal = countSum;

		this.countTotalEl.innerHTML =
			this.countTotal > 0 ? `(${this.countTotal})` : '';
	}

	closeAllDropdowns() {
		for (const el of this.cols) {
			el.classList.remove(this.names.active);
		}
	}

	get isOpen() {
		return this.container.classList.contains(this.names.active);
	}
}

export function initFilter() {
	const selector = document.querySelector('.js-filter');

	new Filter(selector);
}
