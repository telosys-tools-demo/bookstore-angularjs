'use strict';

/* Module for Badge */

var badgeModule = angular.module('badge.module', ['myApp']);

/**
 * Module for badge
 */
badgeModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/badge',    {templateUrl: 'partials/badge/badge_list.html', controller: 'BadgeCtrl'});
    $routeProvider.when('/badge/new', {templateUrl: 'partials/badge/badge_form.html', controller: 'BadgeCtrl'});
    $routeProvider.when('/badge/:badgeNumber', {templateUrl: 'partials/badge/badge_form.html', controller: 'BadgeCtrl'});
}]);
