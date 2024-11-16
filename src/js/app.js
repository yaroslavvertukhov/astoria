import '../scss/app.scss';

import { initBodyLock } from './modules/bodyLock';
import { initFancy } from './modules/fancybox';
import { initForm } from './modules/form-validator/form';
import { initHeader } from './modules/header';
import { initPhoneMasks } from './modules/inputMask';
import { initSwitchTypes } from './modules/switchTypes';
import { initTabs } from './modules/tabs';

function initModules() {
	initBodyLock();
	initHeader();
	initFancy();
	initForm();
	initSwitchTypes();
	initPhoneMasks();
	initTabs();
}

document.addEventListener('DOMContentLoaded', initModules);
