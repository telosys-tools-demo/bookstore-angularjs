'use strict';

/* Directives */

var myAppDirectives = angular.module('myApp.directives', []);

myAppDirectives.
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    }
  }]);
