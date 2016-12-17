;(function() {
    'use strict';

    angular
        .module('home')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.home', {
                url: 'home',
                authenticate: true,
                templateUrl: 'app/modules/home/views/home.tmpl.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            });
    }
})();
