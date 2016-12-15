;(function() {
    'use strict';

    angular.module('search')
    .controller('SearchController', SearchController);

    function SearchController($scope, $state, $stateParams, $timeout, Utils, SearchService) {
        var vm = this;
        vm.openResturant = openResturant;
        vm.restaurants = [];
        vm.place = '';
        var map, infoWindow;
        vm.lat = 12.9857943415;
        vm.lng = 77.6057951152;

        function openResturant(id) {
            $state.go('app.restaurant', {restaurantId : id});
        }

        function formatResponse(data) {
            var _data = [];
            angular.forEach(data, function(res, index) {
                var temp = res.restaurant;
                temp.rating = parseFloat(temp.user_rating.aggregate_rating);
                _data.push(temp);
            });
            return _data;
        }

        function getResturantList(lat, lng) {
            $scope.setLoading();
            SearchService.listResturants(lat, lng).then(function(response) {
                vm.restaurants = formatResponse(response.restaurants);
                setMap(lat, lng);
                $scope.clearLoading();
            });
        }

        function createMarker(latlng, name, address) {
            var marker = new google.maps.Marker({
                map: map,
                position: latlng,
                title: name,
                // icon : 'assets/img/marker.png'
            });

            google.maps.event.addListener(marker, 'click', function() {
                var iwContent = '<div id="iw_container">' +
                '<div class="iw_title">' + name + '</div>' +
                '<div class="iw_content">' + address + '</div></div>';

                infoWindow.setContent(iwContent);

                infoWindow.open(map, marker);
            });
        }

        function displayMarkers() {
            for (var i = 0; i < vm.restaurants.length; i++){
                var latlng = new google.maps.LatLng(vm.restaurants[i].location.latitude, vm.restaurants[i].location.longitude);
                var name = vm.restaurants[i].name;
                var address = vm.restaurants[i].location.address;

                createMarker(latlng, name, address);
            }
        }

        function setMap(lat, lng) {
            var mapLocation = new google.maps.LatLng(lat, lng);
            map = new google.maps.Map(document.getElementById("map"), {
                zoom: 14,
                center: mapLocation,
                scrollwheel: false
            });

            infoWindow = new google.maps.InfoWindow();

            google.maps.event.addListener(map, 'click', function() {
                infoWindow.close();
            });

            displayMarkers();

            // set user location
            var bounds = new google.maps.LatLngBounds();
            var marker = new google.maps.Marker({
                map: map,
                position: mapLocation,
                title: 'Your location',
                icon : 'assets/img/position.png'
            });
            google.maps.event.addListener(marker, 'click', function() {
                var iwContent = '<div id="iw_container">' +
                '<div class="iw_title">Location you searched for : '+ vm.place +'</div></div>';

                infoWindow.setContent(iwContent);

                infoWindow.open(map, marker);
            });
            bounds.extend(mapLocation);
        }

        function init() {
            if(Utils.isUndefinedOrNullOrEmpty($stateParams.location)) {
                $state.go('app.home');
            }
            if(Utils.isUndefinedOrNullOrEmpty($stateParams.placeModel)) {
                SearchService.fetchLocation($stateParams.location).then(function(response) {
                    if(response.status == 'OK') {
                        var place = response.results[0];
                        var latitude = place.geometry.location.lat;
                        var longitude = place.geometry.location.lng;
                        vm.place = place.formatted_address;
                        getResturantList(latitude, longitude);
                    } else {
                        console.log(response);
                    }
                }).catch(function(error) {
                    console.log(error);
                })
            } else {
                var place = $stateParams.placeModel;
                var latitude = place.geometry.location.lat();
                var longitude = place.geometry.location.lng();
                vm.place = place.formatted_address;
                getResturantList(latitude, longitude);
            }
            // bind input
            var input = (document.getElementById('location-search-input'));
            var autocomplete = new google.maps.places.Autocomplete(input, {
                componentRestrictions : {
                    country : 'in'
                }
            });

            autocomplete.addListener('place_changed', function() {
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    console.log("Autocomplete's returned place contains no geometry");
                    vm.placeModel = '';
                    return;
                }
                $timeout(function () {
                    vm.placeModel = place;
                    $state.go('app.search', {'location' : vm.placeModel.name.toLowerCase(), 'placeModel' : vm.placeModel});
                });
            });
        }
        init();
    }
})();
