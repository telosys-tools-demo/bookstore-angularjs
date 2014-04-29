'use strict';

/* Directives */

var myAppDirectives = angular.module('myApp.directives', []);

myAppDirectives.
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

myAppDirectives.
  directive('i18n', ['I18N', function (I18N) {
    return {
        priority: 0,
        restrict: 'A',
        scope: false,
        compile: function compile(tElement, tAttrs, transclude) {
            if (tAttrs.i18n) {
                tElement.text(I18N.translate(tAttrs.i18n));
            }
            return {
                pre: function preLink(scope, iElement, iAttrs, controller) {},
                post: function postLink(scope, iElement, iAttrs, controller) {}
            };
        }
    };
}]);

myAppDirectives.
  directive('i18nTitle', ['I18N', function (I18N) {
    return {
        priority: 0,
        restrict: 'A',
        scope: false,
        compile: function compile(tElement, tAttrs, transclude) {
            if (tAttrs.i18nTitle) {
                tAttrs.$set('title', I18N.translate(tAttrs.i18nTitle));
            }
            return {
                pre: function preLink(scope, iElement, iAttrs, controller) {},
                post: function postLink(scope, iElement, iAttrs, controller) {}
            };
        }
    };
}]);
