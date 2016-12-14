;(function() {
    'use strict';

    angular
        .module('search')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.search', {
                url: 'search/:location',
                params : {
                    location : '',
                    placeModel : null
                },
                authenticate: true,
                templateUrl: 'app/modules/search/views/search.tmpl.html',
                controller: 'SearchController',
                controllerAs: 'vm'
            });
    }
})();
