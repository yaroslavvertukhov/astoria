import IMask from 'imask';

/**
 * Маски полей ввода
 */
export default class Mask {
	constructor(selector) {
		if (!selector) {
			return;
		}

		this.selector = selector;

		this.curMask = null;
		this.pattern = null;

		this.init();
	}

	init() {
		this.bind();
		this.addListeners();
	}

	bind() {
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	addListeners() {
		this.selector.addEventListener('focus', this.onFocus);
		this.selector.addEventListener('blur', this.onBlur);
	}

	setPhoneMask() {
		this.pattern = this.selector.dataset.mask;

		this.curMask = new IMask(this.selector, {
			mask: this.pattern,
			placeholderChar: ' ',
		});
	}

	onFocus() {
		this.curMask.updateOptions({
			lazy: false,
		});
	}

	onBlur() {
		if (this.curMask.unmaskedValue === '') {
			this.curMask.updateOptions({
				lazy: true,
			});
		}
	}
}

export function initPhoneMasks() {
	const selectors = document.querySelectorAll('.js-mask-phone');

	for (const el of selectors) {
		const instance = new Mask(el);
		instance.setPhoneMask();
	}
}
