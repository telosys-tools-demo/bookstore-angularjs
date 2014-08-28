'use strict';

/* Module for Publisher */

var publisherModule = angular.module('publisher.module', ['myApp']);

/**
 * Module for publisher
 */
publisherModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/publisher',    {templateUrl: 'partials/publisher/publisher_list.html', controller: 'PublisherCtrl'});
    $routeProvider.when('/publisher/new', {templateUrl: 'partials/publisher/publisher_form.html', controller: 'PublisherCtrl'});
    $routeProvider.when('/publisher/:code', {templateUrl: 'partials/publisher/publisher_form.html', controller: 'PublisherCtrl'});
}]);
