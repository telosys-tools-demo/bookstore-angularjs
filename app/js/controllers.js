'use strict';

/* Controllers */

var myAppControllers = angular.module('myApp.controllers', []);

/*
myAppControllers.controller('TranslateCtrl', ['$cookies', '$scope', function ($cookies, $scope) {
	  $scope.changeLanguage = function (langKey) {
		  $cookies.lang = langKey;
		  $.getScript( "lib/angular/i18n/angular-locale_"+langKey+".js" )
		  .done(function( script, textStatus ) {
		  console.log( textStatus );
		  })
		  .fail(function( jqxhr, settings, exception ) {
		  alert("locale settings not loaded : "+"lib/angular/i18n/angular-locale_"+langKey+".js");
		  });
	  };
	}]);
*/