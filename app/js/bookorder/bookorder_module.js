'use strict';

/* Module for BookOrder */

var bookOrderModule = angular.module('bookOrder.module', ['myApp']);

/**
 * Module for bookOrder
 */
bookOrderModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/bookOrder',    {templateUrl: 'partials/bookorder/bookorder_list.html', controller: 'BookOrderCtrl'});
    $routeProvider.when('/bookOrder/new', {templateUrl: 'partials/bookorder/bookorder_form.html', controller: 'BookOrderCtrl'});
    $routeProvider.when('/bookOrder/:id', {templateUrl: 'partials/bookorder/bookorder_form.html', controller: 'BookOrderCtrl'});
}]);
