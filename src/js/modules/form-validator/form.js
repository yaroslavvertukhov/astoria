import Field from './fields';

export default class Form {
	constructor(form) {
		if (!form) {
			return;
		}

		this.names = {
			error: '_error',
		};

		this.form = form;

		this.fieldsSelectors = this.form.querySelectorAll(
			'input[data-required], textarea[data-required], select[data-required], [data-required="radio"]'
		);

		this.fields = [];

		this.init();
	}

	init() {
		this.bindMethods();
		this.initFields();
		this.addListenerSubmitForm();
	}

	bindMethods() {
		this.submitHandler = this.submitHandler.bind(this);
	}

	addListenerSubmitForm() {
		this.form.addEventListener('submit', this.submitHandler);
	}

	submitHandler(e) {
		this.onSubmit(e);
	}

	initFields() {
		this.fieldsSelectors.forEach((el) =>
			this.fields.push(new Field(el, this.form))
		);
	}

	validationForm() {
		return this.fields.reduce((acc, field) => {
			const result = field.validation();
			return acc ? result : false;
		}, true);
	}

	onSubmit(e) {
		if (!this.validationForm()) {
			e.preventDefault();

			this.form.classList.add(this.names.error);

			return;
		}
	}
}

export function initForm() {
	const selectors = document.querySelectorAll('.js-form');

	for (const el of selectors) {
		new Form(el);
	}
}
