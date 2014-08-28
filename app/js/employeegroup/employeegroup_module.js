'use strict';

/* Module for EmployeeGroup */

var employeeGroupModule = angular.module('employeeGroup.module', ['myApp']);

/**
 * Module for employeeGroup
 */
employeeGroupModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/employeeGroup',    {templateUrl: 'partials/employeegroup/employeegroup_list.html', controller: 'EmployeeGroupCtrl'});
    $routeProvider.when('/employeeGroup/new', {templateUrl: 'partials/employeegroup/employeegroup_form.html', controller: 'EmployeeGroupCtrl'});
    $routeProvider.when('/employeeGroup/:employeeCode/:groupId', {templateUrl: 'partials/employeegroup/employeegroup_form.html', controller: 'EmployeeGroupCtrl'});
}]);
