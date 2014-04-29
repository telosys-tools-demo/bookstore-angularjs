'use strict';

/* Module for Synopsis */

var synopsisModule = angular.module('synopsis.module', ['myApp']);

/**
 * Module for synopsis
 */
synopsisModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/synopsis',    {templateUrl: 'partials/synopsis/synopsis_list.html', controller: 'SynopsisCtrl'});
    $routeProvider.when('/synopsis/new', {templateUrl: 'partials/synopsis/synopsis_form.html', controller: 'SynopsisCtrl'});
    $routeProvider.when('/synopsis/:bookId', {templateUrl: 'partials/synopsis/synopsis_form.html', controller: 'SynopsisCtrl'});
}]);
