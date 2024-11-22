import '../scss/app.scss';

import { initPreloader } from './modules/preloader';
import { initBodyLock } from './modules/bodyLock';
import { initFancy } from './modules/fancybox';
import { initFilter } from './modules/filter';
import { initForm } from './modules/form-validator/form';
import { initHeader } from './modules/header';
import { initPhoneMasks } from './modules/inputMask';
import { initSwitchTypes } from './modules/switchTypes';
import { initTabs } from './modules/tabs';
import { initOtherEventsSlider } from './modules/sliders/otherEvents';
import { initNavigationCatalog } from './modules/sliders/navigationCatalog';
import { initMobileSlider } from './modules/sliders/mobileSlider';
import { initSpollers } from './modules/spollers';

function initModules() {
	initPreloader();
	initBodyLock();
	initHeader();
	initFancy();
	initForm();
	initSwitchTypes();
	initPhoneMasks();
	initTabs();
	initFilter();
	initOtherEventsSlider();
	initNavigationCatalog();
	initMobileSlider();
	initSpollers();
}

document.addEventListener('DOMContentLoaded', initModules);
