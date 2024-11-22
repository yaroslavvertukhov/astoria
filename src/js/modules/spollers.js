export default class Spoller {
	constructor(el) {
		if (el.instanceSpoller) {
			return;
		}

		this.el = el;
		this.el.instanceSpoller = this;

		this.data = {
			duration: 500,
			active: '_active',
			slide: '_slide',
			activeSelector: '.js-spoller-trigger._active',
		};

		this.trigger = this.el.querySelector('.js-spoller-trigger');
		this.block = this.el.querySelector('.js-spoller-block');
		this.container = this.el.closest('.js-spollers-container');
		this.triggers = this.container.querySelectorAll('.js-spoller-trigger');
		this.curTrigger = this.container.querySelector(this.data.activeSelector);
		this.oneToShow = this.container.classList.contains('_one');
		this.initOnSize = this.trigger.hasAttribute('data-init-on')
			? this.trigger.dataset.initOn
			: false;
		this.inProgress = false;
		this.inited = false;

		this.init();
	}

	init() {
		this.bindEvents();
		this.create();
		this.checkCurDefault();

		if (this.initOnSize) {
			this.onResize();
			this.addListenerResize();
		}
	}

	bindEvents() {
		this.setHeight = this.setHeight.bind(this);
		this.removeStyle = this.removeStyle.bind(this);
		this.checkProgress = this.checkProgress.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onResize = this.onResize.bind(this);
	}

	addListenerClick() {
		this.trigger.addEventListener('click', this.onClick);
	}

	addListenerResize() {
		window.addEventListener('resize', this.onResize);
	}

	removeListenerLick() {
		this.trigger.removeEventListener('click', this.onClick);
	}

	onClick(e) {
		e.preventDefault();

		if (!this.inProgress) {
			this.curTrigger = this.trigger;
			this.toggle();
		}
	}

	checkProgress() {
		this.inProgress = !this.inProgress;
	}

	checkInited() {
		this.inited = !this.inited;
	}

	up() {
		this.trigger.classList.remove(this.data.active);
		this.block.classList.add(this.data.slide);
		this.addStyleFirst();
		this.height = this.curBlockHeight;
		this.block.style.height = `${this.height}px`;
		this.height = this.curBlockHeight;
		this.addStyleSecond();
		setTimeout(() => {
			this.block.style.display = 'none';
			this.removeStyle();
		}, this.data.duration);
	}

	down() {
		this.trigger.classList.add(this.data.active);
		this.block.classList.add(this.data.slide);

		this.block.style.removeProperty('display');
		this.block.style.display = this.blockStyle;
		this.height = this.curBlockHeight;
		this.addStyleFirst();
		this.addStyleSecond();
		setTimeout(this.setHeight, 1);
		setTimeout(this.removeStyle, this.data.duration);
	}

	toggle() {
		if (this.oneToShow) {
			this.triggers.forEach((el) => {
				if (el.classList.contains(this.data.active) && el !== this.curTrigger) {
					el.click();
					el.classList.remove(this.data.active);
				}
			});
		}

		this.checkProgress();

		if (this.turnDown) {
			this.down();
		} else {
			this.up();
		}

		setTimeout(this.checkProgress, this.data.duration);
	}

	addStyleFirst() {
		this.block.style.transitionProperty = 'height, margin, padding';
		this.block.style.transitionDuration = `${this.data.duration}ms`;
	}

	addStyleSecond() {
		this.block.style.overflow = 'hidden';
		this.block.style.height = 0;
	}

	removeStyle() {
		this.block.style.removeProperty('height');
		this.block.style.removeProperty('overflow');
		this.block.style.removeProperty('transition-duration');
		this.block.style.removeProperty('transition-property');
		this.block.classList.remove(this.data.slide);
	}

	checkCurDefault() {
		if (this.curTrigger && this.inited) {
			const triggers = this.container.querySelectorAll(
				this.data.activeSelector
			);
			triggers.forEach((el) => {
				const spoller = el.closest('.js-spoller');
				const block = spoller.querySelector('.js-spoller-block');
				block.style.display = 'block';
			});
		}
	}

	onResize() {
		if (window.innerWidth > this.initOnSize) {
			this.destroy();
		} else {
			this.create();
		}
	}

	destroy() {
		if (this.inited) {
			this.checkInited();
			this.removeListenerLick();
			this.trigger.classList.remove(this.data.active);
			this.block.style.cssText = '';
			this.block.style.display = 'none';
		}
	}

	create() {
		if (!this.inited) {
			this.addListenerClick();
			this.checkInited();
		}
	}

	get blockStyle() {
		if (this.turnDown) {
			return 'block';
		}
		return false;
	}

	setHeight() {
		this.block.style.height = `${this.height}px`;
	}

	get curBlockHeight() {
		return this.block.offsetHeight;
	}

	get turnDown() {
		return window.getComputedStyle(this.block).display === 'none';
	}
}

export function initSpollers() {
	const selectors = document.querySelectorAll('.js-spoller');

	for (const el of selectors) {
		new Spoller(el);
	}
}
