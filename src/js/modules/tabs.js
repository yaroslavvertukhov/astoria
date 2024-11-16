export default class Tabs {
	constructor(selector) {
		if (!selector) {
			return;
		}

		this.container = selector;

		this.data = {
			active: '_active',
			opening: '_opening',
			closing: '_closing',
			duration: 300,
		};

		this.triggers = this.container.querySelectorAll('.js-tabs-trigger');

		this.blocks = this.container.querySelectorAll('.js-tabs-block');

		this.curTrigger = this.container.querySelector(
			`.js-tabs-trigger.${this.data.active}`
		);

		this.inProggress = false;

		this.curBlocks = null;

		this.init();
	}

	init() {
		this.bindEvents();
		this.setOptions();
		this.addListenerClick();
	}

	bindEvents() {
		this.onClosingEnd = this.onClosingEnd.bind(this);
		this.onOpeningEnd = this.onOpeningEnd.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	addListenerClick() {
		for (const el of this.triggers) {
			el.addEventListener('click', this.onClick);
		}
	}

	onClick(e) {
		e.preventDefault();

		if (e.target === this.curTrigger || this.inProggress) {
			return;
		}

		if (this.curTrigger) {
			this.curTrigger.classList.remove(this.data.active);
			this.curTrigger = null;
		}

		this.curIndex = e.target.dataset.tab;
		this.curTrigger = e.target;
		this.curTrigger.classList.add(this.data.active);

		this.toggleTab();
	}

	toggleTab() {
		if (!this.inProggress) {
			this.onClosingStart();
		}
	}

	onClosingStart() {
		this.inProggress = true;
		for (const el of this.curBlocks) {
			el.classList.add(this.data.closing);
		}
		setTimeout(this.onClosingEnd, this.data.duration);
	}

	onClosingEnd() {
		for (const el of this.curBlocks) {
			el.classList.remove(this.data.closing, this.data.active);
		}
		this.curBlocks = null;

		this.onOpeningStart();
	}

	onOpeningStart() {
		this.curBlocks = this.container.querySelectorAll(
			`.js-tabs-block[data-tab="${this.curIndex}"]`
		);
		for (const el of this.curBlocks) {
			el.classList.add(this.data.opening, this.data.active);
		}

		setTimeout(this.onOpeningEnd, this.data.duration);
	}

	onOpeningEnd() {
		for (const el of this.curBlocks) {
			el.classList.remove(this.data.opening);
		}
		this.inProggress = false;
	}

	setOptions() {
		for (const el of this.blocks) {
			el.style.animationDuration = `${this.data.duration * 0.001}s`;
		}

		this.setCurIndexDefault();

		this.curBlocks = this.container.querySelectorAll(
			`.js-tabs-block[data-tab="${this.curIndex}"]`
		);

		for (const el of this.curBlocks) {
			el.classList.add(this.data.active);
		}
	}

	setCurIndexDefault() {
		this.curIndex = this.curTrigger.dataset.tab;
	}
}

export function initTabs() {
	const selectors = document.querySelectorAll('.js-tabs');

	for (const el of selectors) {
		new Tabs(el);
	}
}
