'use strict';

/* Module for Country */

var countryModule = angular.module('country.module', ['myApp']);

/**
 * Module for country
 */
countryModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/country',    {templateUrl: 'partials/country/country_list.html', controller: 'CountryCtrl'});
    $routeProvider.when('/country/new', {templateUrl: 'partials/country/country_form.html', controller: 'CountryCtrl'});
    $routeProvider.when('/country/:code', {templateUrl: 'partials/country/country_form.html', controller: 'CountryCtrl'});
}]);
