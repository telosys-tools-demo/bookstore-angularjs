'use strict';

/* Module for Workgroup */

var workgroupModule = angular.module('workgroup.module', ['myApp']);

/**
 * Module for workgroup
 */
workgroupModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/workgroup',    {templateUrl: 'partials/workgroup/workgroup_list.html', controller: 'WorkgroupCtrl'});
    $routeProvider.when('/workgroup/new', {templateUrl: 'partials/workgroup/workgroup_form.html', controller: 'WorkgroupCtrl'});
    $routeProvider.when('/workgroup/:id', {templateUrl: 'partials/workgroup/workgroup_form.html', controller: 'WorkgroupCtrl'});
}]);
