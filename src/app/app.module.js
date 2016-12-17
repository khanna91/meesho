;(function() {
    'use strict';

    var zomatoApi = '${zomatoApiKey}';
    var localZomatoApiKey = '00c4ef8fd362359559f9322de537fb35';

    var mapApi = '${mapApiKey}';
    var localMapApiKey = 'AIzaSyBmjWgtryGkDDWoVgGIHJ5MM_QZDLCJ9kI';

    angular.module('app', [
        'ui.router', 'ngMessages', 'ngSanitize', 'ngAnimate',
        // custom modules
        'utils', 'home', 'search', 'restaurant'
    ]).constant('API_CONFIG', {
        zomatoApiKey: function () {
            return (zomatoApi.indexOf('{zomatoApiKey}') >= 0) ? localZomatoApiKey : zomatoApi;
        }(),
        mapApiKey: function () {
            return (mapApi.indexOf('{mapApiKey}') >= 0) ? localMapApiKey : mapApi;
        }(),
    });
})();
