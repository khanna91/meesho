;(function() {
    'use strict';

    angular
        .module('restaurant')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.restaurant', {
                url: 'restaurant/:restaurantId',
                authenticate: true,
                templateUrl: 'app/modules/restaurant/views/restaurant.tmpl.html',
                controller: 'RestaurantController',
                controllerAs: 'vm'
            });
    }
})();
