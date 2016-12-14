;(function() {
    'use strict';

    angular.module('app', [
        'ui.router', 'ngMessages', 'ngSanitize', 'ngAnimate',
        // custom modules
        'utils', 'home', 'search'
    ]);
})();
