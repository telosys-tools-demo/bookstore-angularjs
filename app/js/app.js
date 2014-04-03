'use strict';

if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

var baseURL = 'http://localhost:8080/demo/rest';

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
  'ngRoute', 
  'ngResource', 
  'ngCookies',
  'pascalprecht.translate',
  'tmh.dynamicLocale',
  'mgcrea.ngStrap.tooltip',
  'mgcrea.ngStrap.datepicker',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]);

myApp.config(['$routeProvider', '$translateProvider', 'tmhDynamicLocaleProvider', function($routeProvider, $translateProvider, tmhDynamicLocaleProvider) {
  $routeProvider.when('/welcome', {templateUrl: 'partials/welcome.html'});
  $routeProvider.when('/author',    {templateUrl: 'partials/author/author_list.html', controller: 'AuthorCtrl'});
  $routeProvider.when('/author/new', {templateUrl: 'partials/author/author_form.html', controller: 'AuthorCtrl'});
  $routeProvider.when('/author/:id', {templateUrl: 'partials/author/author_form.html', controller: 'AuthorCtrl'});
  $routeProvider.when('/badge',    {templateUrl: 'partials/badge/badge_list.html', controller: 'BadgeCtrl'});
  $routeProvider.when('/badge/new', {templateUrl: 'partials/badge/badge_form.html', controller: 'BadgeCtrl'});
  $routeProvider.when('/badge/:badgeNumber', {templateUrl: 'partials/badge/badge_form.html', controller: 'BadgeCtrl'});
  $routeProvider.when('/book',    {templateUrl: 'partials/book/book_list.html', controller: 'BookCtrl'});
  $routeProvider.when('/book/new', {templateUrl: 'partials/book/book_form.html', controller: 'BookCtrl'});
  $routeProvider.when('/book/:id', {templateUrl: 'partials/book/book_form.html', controller: 'BookCtrl'});
  $routeProvider.when('/bookOrder',    {templateUrl: 'partials/bookorder/bookorder_list.html', controller: 'BookOrderCtrl'});
  $routeProvider.when('/bookOrder/new', {templateUrl: 'partials/bookorder/bookorder_form.html', controller: 'BookOrderCtrl'});
  $routeProvider.when('/bookOrder/:id', {templateUrl: 'partials/bookorder/bookorder_form.html', controller: 'BookOrderCtrl'});
  $routeProvider.when('/bookOrderItem',    {templateUrl: 'partials/bookorderitem/bookorderitem_list.html', controller: 'BookOrderItemCtrl'});
  $routeProvider.when('/bookOrderItem/new', {templateUrl: 'partials/bookorderitem/bookorderitem_form.html', controller: 'BookOrderItemCtrl'});
  $routeProvider.when('/bookOrderItem/:bookOrderId/:bookId', {templateUrl: 'partials/bookorderitem/bookorderitem_form.html', controller: 'BookOrderItemCtrl'});
  $routeProvider.when('/country',    {templateUrl: 'partials/country/country_list.html', controller: 'CountryCtrl'});
  $routeProvider.when('/country/new', {templateUrl: 'partials/country/country_form.html', controller: 'CountryCtrl'});
  $routeProvider.when('/country/:code', {templateUrl: 'partials/country/country_form.html', controller: 'CountryCtrl'});
  $routeProvider.when('/customer',    {templateUrl: 'partials/customer/customer_list.html', controller: 'CustomerCtrl'});
  $routeProvider.when('/customer/new', {templateUrl: 'partials/customer/customer_form.html', controller: 'CustomerCtrl'});
  $routeProvider.when('/customer/:code', {templateUrl: 'partials/customer/customer_form.html', controller: 'CustomerCtrl'});
  $routeProvider.when('/employee',    {templateUrl: 'partials/employee/employee_list.html', controller: 'EmployeeCtrl'});
  $routeProvider.when('/employee/new', {templateUrl: 'partials/employee/employee_form.html', controller: 'EmployeeCtrl'});
  $routeProvider.when('/employee/:code', {templateUrl: 'partials/employee/employee_form.html', controller: 'EmployeeCtrl'});
  $routeProvider.when('/employeeGroup',    {templateUrl: 'partials/employeegroup/employeegroup_list.html', controller: 'EmployeeGroupCtrl'});
  $routeProvider.when('/employeeGroup/new', {templateUrl: 'partials/employeegroup/employeegroup_form.html', controller: 'EmployeeGroupCtrl'});
  $routeProvider.when('/employeeGroup/:employeeCode/:groupId', {templateUrl: 'partials/employeegroup/employeegroup_form.html', controller: 'EmployeeGroupCtrl'});
  $routeProvider.when('/publisher',    {templateUrl: 'partials/publisher/publisher_list.html', controller: 'PublisherCtrl'});
  $routeProvider.when('/publisher/new', {templateUrl: 'partials/publisher/publisher_form.html', controller: 'PublisherCtrl'});
  $routeProvider.when('/publisher/:code', {templateUrl: 'partials/publisher/publisher_form.html', controller: 'PublisherCtrl'});
  $routeProvider.when('/review',    {templateUrl: 'partials/review/review_list.html', controller: 'ReviewCtrl'});
  $routeProvider.when('/review/new', {templateUrl: 'partials/review/review_form.html', controller: 'ReviewCtrl'});
  $routeProvider.when('/review/:customerCode/:bookId', {templateUrl: 'partials/review/review_form.html', controller: 'ReviewCtrl'});
  $routeProvider.when('/shop',    {templateUrl: 'partials/shop/shop_list.html', controller: 'ShopCtrl'});
  $routeProvider.when('/shop/new', {templateUrl: 'partials/shop/shop_form.html', controller: 'ShopCtrl'});
  $routeProvider.when('/shop/:code', {templateUrl: 'partials/shop/shop_form.html', controller: 'ShopCtrl'});
  $routeProvider.when('/synopsis',    {templateUrl: 'partials/synopsis/synopsis_list.html', controller: 'SynopsisCtrl'});
  $routeProvider.when('/synopsis/new', {templateUrl: 'partials/synopsis/synopsis_form.html', controller: 'SynopsisCtrl'});
  $routeProvider.when('/synopsis/:bookId', {templateUrl: 'partials/synopsis/synopsis_form.html', controller: 'SynopsisCtrl'});
  $routeProvider.when('/workgroup',    {templateUrl: 'partials/workgroup/workgroup_list.html', controller: 'WorkgroupCtrl'});
  $routeProvider.when('/workgroup/new', {templateUrl: 'partials/workgroup/workgroup_form.html', controller: 'WorkgroupCtrl'});
  $routeProvider.when('/workgroup/:id', {templateUrl: 'partials/workgroup/workgroup_form.html', controller: 'WorkgroupCtrl'});
  $routeProvider.otherwise({redirectTo: '/welcome'});

  $translateProvider.useStaticFilesLoader({
    prefix: 'i18n/messages_',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('en');
  $translateProvider.fallbackLanguage('en');
  $translateProvider.useLocalStorage();

  tmhDynamicLocaleProvider.localeLocationPattern("lib/angular/i18n/angular-locale_{{locale}}.js");
  tmhDynamicLocaleProvider.useStorage('$cookieStore');
}]);

myApp.controller('TranslateCtrl', ['$scope', '$translate', 'tmhDynamicLocale', '$route', function ($scope, $translate, tmhDynamicLocale, $route) {
  $scope.changeLanguage = function (key) {
    $translate.uses(key);
    tmhDynamicLocale.set(key);
    $route.reload(false);
  }
}]);
