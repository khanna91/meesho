;(function() {
    'use strict';

    angular.module('search')
    .controller('SearchController', SearchController);

    function SearchController($scope, $state, $stateParams, Utils, SearchService) {
        var vm = this;
        var lat = '12.9857943415';
        var lng = '77.6057951152';

        function getResturantList(lat, lng) {
            SearchService.listResturants(lat, lng).then(function(response) {
                console.log(response);
            });
        }

        function init() {
            if(Utils.isUndefinedOrNullOrEmpty($stateParams.placeModel)) {
                SearchService.fetchLocation($stateParams.location).then(function(response) {
                    if(response.status == 'OK') {
                        var place = response.results[0];
                        var lat = place.geometry.location.lat;
                        var lng = place.geometry.location.lng;
                    }
                    getResturantList(lat, lng);
                }).catch(function(error) {
                    console.log(error);
                })
            } else {
                var place = $stateParams.placeModel;
                var lat = place.geometry.location.lat;
                var lng = place.geometry.location.lng;
                getResturantList(lat, lng);
            }
        }
        // init();
    }
})();
