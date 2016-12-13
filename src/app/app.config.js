;(function() {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $httpProvider) {
        $urlRouterProvider
            .otherwise('/home');
        $stateProvider
            .state('404', {
                url: '/404',
                templateUrl: 'app/common/blocks/404.tmpl.html'
            })
            .state('500', {
                url: '/500',
                templateUrl: 'app/common/blocks/500.tmpl.html'
            })
            .state('app', {
                url: '/',
                templateUrl: 'app/app.tmpl.html',
                controller: 'AppController',
                controllerAs: 'App'
            });

        //initialize get if not there
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        // Answer edited to include suggestions from comments
        // because previous version of code introduced browser-related errors

        //disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        // extra
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    }
})();
