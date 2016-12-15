;(function () {
    'use strict';

    angular
        .module('search')
        .factory('SearchService', SearchService);

    function SearchService($http, Utils, API_CONFIG) {
        var service = {};

        service.fetchLocation = fetchLocation;
        service.listResturants = listResturants;

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
                     'Pragma': undefined, 'Cache-Control': undefined, 'X-Requested-With': undefined, 'If-Modified-Since': undefined
                },
            }).then(getResponse).catch(getError);
        }

        function listResturants(lat, lon) {
            var url = 'https://developers.zomato.com/api/v2.1/search?lat=' + lat + '&lon=' + lon;
            return $http({
                url: url,
                method: 'GET',
                headers: {
                     'Pragma': undefined,
                     'Cache-Control': undefined,
                     'X-Requested-With': undefined,
                     'If-Modified-Since': undefined,
                     'user-key': API_CONFIG.zomatoApiKey
                },
            }).then(getResponse).catch(getError);
        }
    }
})();
