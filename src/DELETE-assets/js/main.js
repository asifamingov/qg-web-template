/*
* Imports Javascript components for the GLUE
*/

import '../../../node_modules/bootstrap/dist/js/bootstrap.js';

// TODO: Find a new bootstrap accessibility plugin, build one, or figure out how to get  this one working properly
// Disabled because it creates accessibility errors (strangely enough)
import './components/global/bootstrap-accessibility.js';

import './components/autocomplete.js';
import './components/forms.js';
// import mobileNav from './components/nav/mobile-nav.js'
import activeSideNav from './components/nav/current-secondary-nav';
import utils from './components/global/utils.js';
import qgBsExtend from './components/global/bootstrap-extensions.js';
import feedbackForm from './components/feedback-form';
import shareLinks from './components/share-links';

(function () {
    'use strict';
    var qg = qg || {};
    var franchiseTitle = qg && qg.swe && qg.swe.franchiseTitle;

    activeSideNav.highlightNavItem();
    feedbackForm.init(franchiseTitle);
    shareLinks.init();
}());

// temp
import "../lib/qg-glue/carousel/carousel.js";