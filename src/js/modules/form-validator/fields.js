class Field {
	constructor(field, form) {
		if (!field) {
			return;
		}

		this.names = {
			error: '_error',
		};

		this.field = field;
		this.form = form;

		this.container = this.field.closest('.js-input');
		this.radios = this.field.querySelectorAll('input[type="radio"]');

		this.interaction = this.checkInteraction();
		this.patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		this.isFilled = false;

		this.checkboxToggle = null;

		this.init();
	}

	init() {
		this.bindMethods();
		this.addEventListeners();
		this.checkToggleRequired();
	}

	bindMethods() {
		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onCheckboxToggleChange = this.onCheckboxToggleChange.bind(this);
	}

	addEventListeners() {
		this.field.addEventListener('change', this.onChange);
		if (this.field.dataset.required !== 'file') {
			this.field.addEventListener('focus', this.onFocus);
			this.field.addEventListener('blur', this.onBlur);
		}
	}

	addListenerCheckboxToggle() {
		this.checkboxToggle.addEventListener('change', this.onCheckboxToggleChange);
	}

	onChange(e) {
		this.validation();
		this.removeError();
		this.interaction = true;
	}

	onFocus(e) {
		this.removeError();
	}

	onBlur(e) {
		this.validation();
		this.interaction = true;
	}

	validation() {
		if (!this.fieldlDisabled && this.fieldRequired) {
			switch (this.field.getAttribute('data-required')) {
				case 'text':
					if (this.field.value.trim() !== '') {
						this.removeError();
						return true;
					}
					break;
				case 'tel':
					console.log(this.field.value[this.field.value.length - 1]);
					if (
						this.field.value !== '' &&
						// this.field.value.indexOf('_') === -1 &&
						this.field.value[this.field.value.length - 1] !== ' ' &&
						!this.container.classList.contains(this.names.error)
					) {
						this.removeError();
						return true;
					}
					break;
				case 'email':
					if (this.field.value.toLowerCase().search(this.patternEmail) === 0) {
						this.removeError();
						return true;
					}
					break;
				case 'select':
					const options = this.field.querySelectorAll(
						'option:not([data-placeholder])'
					);
					for (let index = 0; index < options.length; index += 1) {
						const el = options[index];
						if (el.selected) {
							this.removeError();
							return true;
						}
					}
					break;
				case 'checkbox':
					if (this.field.checked) {
						this.removeError();
						return true;
					}
					break;
				case 'radio': {
					if (this.isRadioChecked()) {
						this.removeError();
						return true;
					}
					break;
				}
				default:
					return true;
			}
			this.addError();
			this.isFilled = false;
			return false;
		}
		return true;
	}

	addError() {
		this.container.classList.add(this.names.error);
	}

	removeError() {
		this.container.classList.remove(this.names.error);
		this.isFilled = true;
	}

	checkToggleRequired() {
		if (this.field.hasAttribute('data-input-toggle-required')) {
			const name = this.field.getAttribute('data-input-toggle-required');
			this.checkboxToggle = this.form.querySelector(
				`[data-checkbox-toggle-required="${name}"]`
			);
			this.addListenerCheckboxToggle();
		}
	}

	onCheckboxToggleChange(e) {
		const { target } = e;

		if (target.checked) {
			this.removeError();
			this.field.value = '';
			this.field.setAttribute('disabled', true);
		} else {
			this.field.removeAttribute('disabled');
		}
	}

	checkInteraction() {
		return this.container.hasAttribute('data-no-interaction');
	}

	isRadioChecked() {
		return Array.from(this.radios).reduce((acc, radio) => {
			if (radio.checked) {
				return true;
			}
			return acc;
		}, false);
	}

	get fieldlDisabled() {
		return this.field.hasAttribute('disabled');
	}

	get fieldRequired() {
		return this.field.hasAttribute('data-required');
	}
}

export default Field;
