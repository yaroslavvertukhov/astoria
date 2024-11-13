import '../scss/app.scss';

import { initBodyLock } from './modules/bodyLock';
import { initFancy } from './modules/fancybox';
import { initForm } from './modules/form-validator/form';
import { initHeader } from './modules/header';

function initModules() {
	initBodyLock();
	initHeader();
	initFancy();
	initForm();
}

document.addEventListener('DOMContentLoaded', initModules);
