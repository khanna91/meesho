;(function () {
    'use strict';

    angular
    .module('search')
    .factory('SearchService', SearchService);

    function SearchService($http, Utils, API_CONFIG) {
        var service = {};

        service.fetchLocation = fetchLocation;
        service.listResturants = listResturants;
        service.getRestaurant = getRestaurant;
        service.listReviews = listReviews;

        return service;

        function getResponse(response) {
            return response.data;
        }

        function getError(error) {
            console.log('XHR Failed');
            return error.data;
        }

        function fetchLocation(location) {
            var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=' + API_CONFIG.mapApiKey
            return $http({
                url: url,
                method: 'GET',
                headers: {
                    // adding these headers to bypass cors issue
                    'Pragma': undefined, 'Cache-Control': undefined, 'X-Requested-With': undefined, 'If-Modified-Since': undefined
                },
            }).then(getResponse).catch(getError);
        }

        function listResturants(lat, lon) {
            var url = 'https://developers.zomato.com/api/v2.1/search?lat=' + lat + '&lon=' + lon + '&sort=rating&order=desc';
            return $http({
                url: url,
                method: 'GET',
                headers: {
                    'user-key': API_CONFIG.zomatoApiKey,
                    // adding these headers to bypass cors issue
                    'Pragma': undefined,
                    'Cache-Control': undefined,
                    'X-Requested-With': undefined,
                    'If-Modified-Since': undefined
                },
            }).then(getResponse).catch(getError);
        }

        function getRestaurant(restaurantId) {
            var url = 'https://developers.zomato.com/api/v2.1/restaurant?res_id=' + restaurantId;
            return $http({
                url: url,
                method: 'GET',
                headers: {
                    'user-key': API_CONFIG.zomatoApiKey,
                    // adding these headers to bypass cors issue
                    'Pragma': undefined,
                    'Cache-Control': undefined,
                    'X-Requested-With': undefined,
                    'If-Modified-Since': undefined
                },
            }).then(getResponse).catch(getError);
        }

        function listReviews(restaurantId) {
            var url = 'https://developers.zomato.com/api/v2.1/reviews?res_id=' + restaurantId;
            return $http({
                url: url,
                method: 'GET',
                headers: {
                    'user-key': API_CONFIG.zomatoApiKey,
                    // adding these headers to bypass cors issue
                    'Pragma': undefined,
                    'Cache-Control': undefined,
                    'X-Requested-With': undefined,
                    'If-Modified-Since': undefined
                },
            }).then(getResponse).catch(getError);
        }
    }
})();
