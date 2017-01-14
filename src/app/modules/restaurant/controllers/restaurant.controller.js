;(function() {
    'use strict';

    angular.module('restaurant')
    .controller('RestaurantController', RestaurantController);

    function RestaurantController($scope, $state, $stateParams, Utils, SearchService) {
        var vm = this;
        vm.ratingSet = [1,2,3,4,5];
        vm.restaurant = {};
        vm.relatedSearch = [];
        vm.reviews = [];
        vm.loading = true;
        vm.openResturant = openResturant;

        function openResturant(id) {
            $state.go('app.restaurant', {restaurantId : id});
        }

        function init() {
            if(Utils.isUndefinedOrNullOrEmpty($stateParams.restaurantId)) {
                $state.go('app.home');
            } else {
                $scope.setLoading();
                SearchService.getRestaurant($stateParams.restaurantId).then(function(response) {
                    vm.restaurant = response;
                    vm.loading = true;
                    // below code is just to get related restaurants
                    SearchService.listResturants(vm.restaurant.location.latitude, vm.restaurant.location.longitude).then(function(response) {
                        // Remove resturant with same id (childish way, but what can be done...limited API support)
                        var count = 1;
                        angular.forEach(response.restaurants, function(restaurant, index) {
                            if(restaurant.restaurant.id != vm.restaurant.id && count < 10) {
                                vm.relatedSearch.push(restaurant.restaurant);
                                count++;
                            }
                        });
                        vm.loading = false;
                        $scope.clearLoading();
                    }).catch(function(error) {
                        console.log(error);
                    });
                }).catch(function(error) {
                    console.log(error);
                });
                // fetch restaurant reviews
                SearchService.listReviews($stateParams.restaurantId).then(function(response) {
                    vm.reviews = response;
                }).catch(function(error) {
                    console.log(error);
                });
            }
        }
        init();
    }
})();
