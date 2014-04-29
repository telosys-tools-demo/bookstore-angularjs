'use strict';

/* Factory for Publisher */

myAppServices.factory('Publisher', ['$http', function($http) {
    var entityURL = baseURL + '/publisher';
    var $this = {};
    $this.getAll = function() {
        return $http.get(entityURL);
    };
    $this.get = function(code) {
        var url = entityURL + '/' + code;
        return $http.get(url);
    };
	$this.create = function(publisher) {
		$this.validate(publisher)
		var url = entityURL;
		return $http.post(url, publisher);
    };
    $this.update = function(publisher) {
		$this.validate(publisher)
		var url = entityURL + '/' + publisher.code;
		return $http.put(url, publisher);
    };
    $this.delete = function(code) {
        var url = entityURL + '/' + code;
        return $http.delete(url);
    };
    $this.validate = function(publisher) {
        var validationErrors = $this.getValidationErrors(publisher);
		if( validationErrors.length > 0 ) {
			throw validationErrors;
		}
		return true;
    };
	$this.getValidationErrors = function(publisher) {
		var errors = [];
        if( publisher.code == null || publisher.code == '' ) {
			errors.push('code is not defined');
		}
		return errors;
	};
	return $this;
}]);

