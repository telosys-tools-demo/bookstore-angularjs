'use strict';

/* Module for BookOrderItem */

var bookOrderItemModule = angular.module('bookOrderItem.module', ['myApp']);

/**
 * Module for bookOrderItem
 */
bookOrderItemModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/bookOrderItem',    {templateUrl: 'partials/bookorderitem/bookorderitem_list.html', controller: 'BookOrderItemCtrl'});
    $routeProvider.when('/bookOrderItem/new', {templateUrl: 'partials/bookorderitem/bookorderitem_form.html', controller: 'BookOrderItemCtrl'});
    $routeProvider.when('/bookOrderItem/:bookOrderId/:bookId', {templateUrl: 'partials/bookorderitem/bookorderitem_form.html', controller: 'BookOrderItemCtrl'});
}]);
