'use strict';

/* Services */

var myAppServices = angular.module('myApp.services', ['ngResource', 'ngCookies']);

// Demonstrate how to register services
// In this case it is a simple value service.
myAppServices.value('version', '0.1');

/*
myAppServices.service('translationService', ['$resource', '$cookies', function($resource, $cookies) {
    this.getTranslation = function($scope) {
    	var language = $cookies.lang;
    	$.getScript('lib/angular/i18n/angular-locale_' + language + '.js');
        var languageFilePath = 'i18n/messages_' + language + '.json';
        $resource(languageFilePath).get(function (data) {
            $scope.translation = data;
        });
    };
}]);
*/

angular.module('App.I18N', [], function($provide) {
    $provide.factory('I18N', I18NFactory);
});

function I18NFactory() {
    var labels = {
        'init.start': "Initialisation de l'application.",
        'init.footer': "Texte de bas de page en français.",
        'global.backToList': "Retour à la liste",
        'global.loading': "Chargement des données..."
    };
    return {
        translate: function (id, text) {
            var text = labels[id];
            return text ? text : '*Traduction introuvable*';
        }
    };
}
