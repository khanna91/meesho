;(function() {
    'use strict';

    angular.module('search')
    .controller('SearchController', SearchController);

    function SearchController($scope, $state, $stateParams) {
        var vm = this;

        function init() {
            console.log($stateParams);
        }
        init();
    }
})();
