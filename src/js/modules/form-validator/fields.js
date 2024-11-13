class Field {
	constructor(field, form) {
		this.field = field;
		this.form = form;
		this.label = this.field.closest('.js-input');
		this.radios = this.field.querySelectorAll('input[type="radio"]');
		this.errorClass = '_error';
		this.patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		this.interaction = this.checkInteraction();

		this.isFilled = false;

		this.init();
	}

	init() {
		this.bindMethods();
		this.addEventListeners();
	}

	bindMethods() {
		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	addEventListeners() {
		this.field.addEventListener('change', this.onChange);
		if (this.field.dataset.required !== 'file') {
			this.field.addEventListener('focus', this.onFocus);
			this.field.addEventListener('blur', this.onBlur);
		}
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
					if (
						this.field.value !== '' &&
						this.field.value.indexOf('_') === -1 &&
						!this.label.classList.contains(this.errorClass)
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
		this.label.classList.add(this.errorClass);
	}

	removeError() {
		this.label.classList.remove(this.errorClass);
		this.isFilled = true;
	}

	checkInteraction() {
		return this.label.hasAttribute('data-no-interaction');
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
