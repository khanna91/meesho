;(function() {
    'use strict';

    angular.module('home')
    .controller('HomeController', HomeController);

    function HomeController($scope, $state, $timeout) {
        var vm = this;
        vm.place = '';
        vm.placeModel = '';
        vm.searchForResturant = searchForResturant;

        function searchForResturant() {
            $state.go('app.search', {'location' : vm.placeModel.name, placeDto : vm.placeModel});
        }

        function init() {
            var input = (document.getElementById('location-input'));
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
                });
            });
        }
        init();

        // dummy data (in real world this will come through API)
        vm.featuredResturants = [
            {
                image : 'assets/img/resturant1.jpg',
                name : 'Barleyz',
                location : '2/3, Above Pantaloons, Sony World Junction, 80 Feet Road, Koramangala 6th Block, Bangalore'
            },
            {
                image : 'assets/img/resturant2.jpg',
                name : 'Big Brewsky',
                location : 'Behind MK Retail, Before WIPRO Corporate Office, Sarjapur Road'
            },
            {
                image : 'assets/img/resturant3.jpg',
                name : 'Wareabouts Grill & Lounge',
                location : '90/1B, 3rd &amp; 4th Floor, Kings Cross Building, Innovative Multiplex, Outer Ring Road, Marathahalli, Bangalore'
            },
            {
                image : 'assets/img/resturant4.jpg',
                name : 'Toit',
                location : '298, Namma Metro Pillar 62, 100 Feet Road, Indiranagar, Bangalore'
            }
        ]
    }
})();
