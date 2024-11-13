export default class BodyLock {
	constructor() {
		this.body = document.body;
		this.class = {
			lock: '_lock',
		};
		this.lockFlag = false;
		this.selectors = null;
	}

	get scrollbarSize() {
		return window.innerWidth - this.body.offsetWidth;
	}

	switchFlag() {
		this.lockFlag = !this.lockFlag;
	}

	lock() {
		if (!this.lockFlag) {
			this.switchFlag();
			this.checkFlag(true);
			this.body.classList.add(this.class.lock);
		}
	}

	unlock() {
		if (this.lockFlag) {
			this.switchFlag();
			this.checkFlag(false);
			this.body.classList.remove(this.class.lock);
		}
	}

	checkFlag(flag) {
		if (flag) {
			this.setPadding(`${this.scrollbarSize}px`);
			return;
		}
		this.setPadding('');
	}

	setPadding(property) {
		this.body.style.paddingRight = property;

		for (const el of this.selectors) {
			el.style.paddingRight = property;
		}
	}

	init() {
		this.selectors = document.querySelectorAll('.js-fixed-element');
	}
}

export function initBodyLock() {
	const bodyLock = new BodyLock();
	bodyLock.init();
	window.bodyLock = bodyLock;
}
