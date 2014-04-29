'use strict';

// REST services base URL
var baseURL = 'http://localhost:8080/bookstore/rest';

// Add "endsWith" function to the String object
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
   'ngRoute'
  ,'ngResource' 
  ,'ngCookies'
  ,'pascalprecht.translate'
  ,'tmh.dynamicLocale'
  ,'mgcrea.ngStrap.tooltip'
  ,'mgcrea.ngStrap.datepicker'
  ,'myApp.filters'
  ,'myApp.services'
  ,'myApp.directives'
  ,'myApp.controllers'
  ,'messageHandler.module'
  ,'author.module'
  ,'badge.module'
  ,'book.module'
  ,'bookOrder.module'
  ,'bookOrderItem.module'
  ,'country.module'
  ,'customer.module'
  ,'employee.module'
  ,'employeeGroup.module'
  ,'publisher.module'
  ,'review.module'
  ,'shop.module'
  ,'synopsis.module'
  ,'workgroup.module'
]);

/**
 * Main configuration
 */
myApp.config(['$routeProvider', '$translateProvider', 'tmhDynamicLocaleProvider', function($routeProvider, $translateProvider, tmhDynamicLocaleProvider) {
  $routeProvider.when('/welcome', {templateUrl: 'partials/welcome.html'});
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

/**
 * Controller for I18N
 */
myApp.controller('TranslateCtrl', ['$scope', '$translate', 'tmhDynamicLocale', '$route', function ($scope, $translate, tmhDynamicLocale, $route) {
  $scope.changeLanguage = function (key) {
    $translate.uses(key);
    tmhDynamicLocale.set(key);
    $route.reload(false);
  }
}]);
