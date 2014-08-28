'use strict';

/* Module for Customer */

var customerModule = angular.module('customer.module', ['myApp']);

/**
 * Module for customer
 */
customerModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/customer',    {templateUrl: 'partials/customer/customer_list.html', controller: 'CustomerCtrl'});
    $routeProvider.when('/customer/new', {templateUrl: 'partials/customer/customer_form.html', controller: 'CustomerCtrl'});
    $routeProvider.when('/customer/:code', {templateUrl: 'partials/customer/customer_form.html', controller: 'CustomerCtrl'});
}]);
