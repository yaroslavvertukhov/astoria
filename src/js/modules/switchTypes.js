export default class SwitchTypes {
	constructor(selector) {
		if (!selector) {
			return;
		}

		this.names = {
			active: '_active',
		};

		this.container = selector;

		this.radios = this.container.querySelectorAll('[data-switch-type]');
		this.box = this.container.querySelector('.js-switch-types-box');

		this.curBlock = null;

		this.init();
	}

	init() {
		this.bindMethods();
		this.addListenerChange();
		this.onInit();
	}

	bindMethods() {
		this.changeHandler = this.changeHandler.bind(this);
	}

	addListenerChange() {
		for (const el of this.radios) {
			el.addEventListener('change', this.changeHandler);
		}
	}

	onInit() {
		for (const el of this.radios) {
			if (el.checked) {
				this.onChange(el);
			}
		}
	}

	changeHandler(e) {
		const { target } = e;

		this.onChange(target, e);
	}

	onChange(target, e) {
		const name = target.dataset.switchType;

		if (name === 'telegram') {
			this.box.classList.add(this.names.active);

			this.curBlock = this.container.querySelector(
				`[data-switch-block="${name}"]`
			);
			this.curBlock.style.display = '';
			this.enableFields(this.curBlock);

			if (e) {
				this.dispatchInnerRadios();
			}
		}

		if (name === 'phone' || name === 'whatsapp') {
			this.box.classList.remove(this.names.active);

			this.curBlock = this.container.querySelector(
				`[data-switch-block="telegram"]`
			);
			this.disableFields(this.curBlock);

			this.curBlock = this.container.querySelector(
				`[data-switch-block="telegram-tel"]`
			);
			this.enableFields(this.curBlock);

			this.curBlock = this.container.querySelector(
				`[data-switch-block="telegram-name"]`
			);
			this.disableFields(this.curBlock);
		}

		if (name === 'telegram-tel') {
			this.curBlock = this.container.querySelector(
				`[data-switch-block="${name}"]`
			);
			this.enableFields(this.curBlock);

			this.curBlock = this.container.querySelector(
				`[data-switch-block="telegram-name"]`
			);
			this.disableFields(this.curBlock);
		}

		if (name === 'telegram-name') {
			this.curBlock = this.container.querySelector(
				`[data-switch-block="${name}"]`
			);
			this.enableFields(this.curBlock);

			this.curBlock = this.container.querySelector(
				`[data-switch-block="telegram-tel"]`
			);
			this.disableFields(this.curBlock);
		}
	}

	dispatchInnerRadios() {
		const event = new Event('change', { bubbles: true });

		for (const el of this.radios) {
			if (
				el.checked &&
				(el.dataset.switchType === 'telegram-tel' ||
					el.dataset.switchType === 'telegram-name')
			) {
				el.dispatchEvent(event);
			}
		}
	}

	disableFields(block) {
		block.style.display = 'none';

		const inputs = block.querySelectorAll('input');

		for (const el of inputs) {
			el.setAttribute('disabled', true);
		}
	}

	enableFields(block) {
		block.style.display = '';

		const inputs = block.querySelectorAll('input');

		for (const el of inputs) {
			el.removeAttribute('disabled');
		}
	}
}

export function initSwitchTypes() {
	const selectors = document.querySelectorAll('.js-switch-types');
	for (const el of selectors) {
		new SwitchTypes(el);
	}
}
