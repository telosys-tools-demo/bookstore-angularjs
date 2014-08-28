'use strict';

/* Module for Author */

var authorModule = angular.module('author.module', ['myApp']);

/**
 * Module for author
 */
authorModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/author',    {templateUrl: 'partials/author/author_list.html', controller: 'AuthorCtrl'});
    $routeProvider.when('/author/new', {templateUrl: 'partials/author/author_form.html', controller: 'AuthorCtrl'});
    $routeProvider.when('/author/:id', {templateUrl: 'partials/author/author_form.html', controller: 'AuthorCtrl'});
}]);
