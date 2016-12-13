;(function() {
    'use strict';

    angular.module('app').run(runFunction);

    /* @ngInject */
    function runFunction($rootScope, $window, $state) {
        $rootScope.$on("$stateChangeError", console.log.bind(console));

        $rootScope.$on("$stateChangeError", function(error) {
            $state.go('500');
        });
    }
})();
