;(function () {
    'use strict';

    angular
        .module('utils')
        .factory('Utils', Utils);

    function Utils ($timeout, $window, $location) {
        var service = {
            getNumberOrDefault: function (number, defaultValue) {
                if (this.isUndefinedOrNull(defaultValue)) {
                    defaultValue = 0;
                }
                return this.isUndefinedOrNullOrEmpty(number) || isNaN(number) ? defaultValue : parseFloat(number);
            },
            undefinedKeyToEmpty: function (obj) {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key) && typeof obj[key] === 'undefined') {
                        obj[key] = '';
                    }
                }
                return obj;
            },
            isStringAndNotEmpty: function (obj) {
                return (typeof obj === 'string') && (obj !== '');
            },
            isStringAndEmpty: function (obj) {
                return (typeof obj === 'string') && (obj === '');
            },
            isEmptyObject: function (obj) {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop))
                        return false;
                }

                return true;
            },
            isUndefined: function (obj) {
                return (typeof obj === 'undefined');
            },
            isUndefinedOrNull: function (obj) {
                return (typeof obj === 'undefined') || (obj === null);
            },
            isUndefinedOrNullOrEmpty: function (obj) {
                return (typeof obj === 'undefined') || (obj === null) || (obj === '')/* || (this.isEmptyObject(obj))*/;
            },
            isUndefinedOrNullOrEmptyObject: function (obj) {
                return (typeof obj === 'undefined') || (obj === null) || (obj === '') || (this.isEmptyObject(obj));
            },
            isUndefinedOrNullOrEmptyList: function (obj) {
                return (typeof obj === 'undefined') || (obj === null) || (typeof obj.length === 'undefined') || (obj.length == 0);
            },
            isUndefinedOrNullOrEmptySet: function (obj) {
                return (typeof obj === 'undefined') || (obj === null) || (typeof obj.size === 'undefined') || (obj.size == 0);
            },
            isNonZero: function(obj) {
                return !(this.isUndefinedOrNullOrEmpty(obj) || obj == 0)
            },
            isFunction: function (func) {
                if (typeof func === "function") {
                    return true;
                }
                return false;
            }
        };
        return service;
    }
})();
