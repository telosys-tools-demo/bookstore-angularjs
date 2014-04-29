'use strict';

/* Module for Review */

var reviewModule = angular.module('review.module', ['myApp']);

/**
 * Module for review
 */
reviewModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/review',    {templateUrl: 'partials/review/review_list.html', controller: 'ReviewCtrl'});
    $routeProvider.when('/review/new', {templateUrl: 'partials/review/review_form.html', controller: 'ReviewCtrl'});
    $routeProvider.when('/review/:customerCode/:bookId', {templateUrl: 'partials/review/review_form.html', controller: 'ReviewCtrl'});
}]);
