'use strict';

/* Module for Employee */

var employeeModule = angular.module('employee.module', ['myApp']);

/**
 * Module for employee
 */
employeeModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/employee',    {templateUrl: 'partials/employee/employee_list.html', controller: 'EmployeeCtrl'});
    $routeProvider.when('/employee/new', {templateUrl: 'partials/employee/employee_form.html', controller: 'EmployeeCtrl'});
    $routeProvider.when('/employee/:code', {templateUrl: 'partials/employee/employee_form.html', controller: 'EmployeeCtrl'});
}]);
