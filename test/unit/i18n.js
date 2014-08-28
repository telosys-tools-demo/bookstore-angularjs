'use strict';

angular.module('i18n', [])
  .factory('$translateStaticFilesLoader', function ($q) {
    return function () {
      var deferred = $q.defer();
      deferred.resolve({});
      return deferred.promise;
    };
  });
