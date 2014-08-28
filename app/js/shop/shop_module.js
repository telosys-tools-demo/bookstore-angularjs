'use strict';

/* Module for Shop */

var shopModule = angular.module('shop.module', ['myApp']);

/**
 * Module for shop
 */
shopModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/shop',    {templateUrl: 'partials/shop/shop_list.html', controller: 'ShopCtrl'});
    $routeProvider.when('/shop/new', {templateUrl: 'partials/shop/shop_form.html', controller: 'ShopCtrl'});
    $routeProvider.when('/shop/:code', {templateUrl: 'partials/shop/shop_form.html', controller: 'ShopCtrl'});
}]);
