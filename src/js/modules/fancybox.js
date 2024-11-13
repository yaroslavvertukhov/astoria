import { Fancybox } from '@fancyapps/ui';

export default class Fancy {
	constructor() {
		this.fancybox = Fancybox;
		this.popupSelector = '.js-popup-trigger[data-fancybox]';
	}

	foundTriggers() {
		this.fancybox.bind(this.popupSelector, Fancy.getOptions());
	}

	static getOptions(backdropClick = 'close') {
		return {
			mainClass: 'js-popup',
			groupAttr: false,
			dragToClose: false,
			autoFocus: false,
			click: false,
			backdropClick: backdropClick,
			defaultType: 'html',
			closeButton: false,
		};
	}

	show(popupId, backdropClick) {
		this.close();
		this.fancybox.show([{ src: popupId }], Fancy.getOptions(backdropClick));
	}

	close() {
		const openedPopup = this.fancybox.getInstance();
		if (openedPopup) {
			openedPopup.close();
		}
	}

	init() {
		this.foundTriggers();
	}
}

export function initFancy() {
	const popup = new Fancy();
	popup.init();
	window.popup = popup;
}

// Открыть попап глобально - передать id блока в метод.
// popup.show('#popup-request');

// Если клик по внешней области не должен закрывать попап, нужно передать в метод вторым аргументом false
// popup.show('#popup-request', false);

// Если уже есть другой открытый попап - открытый попап закроется автоматически.

// Закрыть открытый попап глоабльно
// popup.close();
