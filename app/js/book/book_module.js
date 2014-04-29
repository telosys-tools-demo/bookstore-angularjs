'use strict';

/* Module for Book */

var bookModule = angular.module('book.module', ['myApp']);

/**
 * Module for book
 */
bookModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/book',    {templateUrl: 'partials/book/book_list.html', controller: 'BookCtrl'});
    $routeProvider.when('/book/new', {templateUrl: 'partials/book/book_form.html', controller: 'BookCtrl'});
    $routeProvider.when('/book/:id', {templateUrl: 'partials/book/book_form.html', controller: 'BookCtrl'});
}]);
