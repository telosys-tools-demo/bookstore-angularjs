'use strict';

/* Factory for Country */

myAppServices.factory('Country', ['$http', function($http) {
    var entityURL = baseURL + '/country';
    var $this = {};
    $this.getAll = function() {
        return $http.get(entityURL);
    };
    $this.get = function(code) {
        var url = entityURL + '/' + code;
        return $http.get(url);
    };
	$this.create = function(country) {
		$this.validate(country)
		var url = entityURL;
		return $http.post(url, country);
    };
    $this.update = function(country) {
		$this.validate(country)
		var url = entityURL + '/' + country.code;
		return $http.put(url, country);
    };
    $this.delete = function(code) {
        var url = entityURL + '/' + code;
        return $http.delete(url);
    };
    $this.validate = function(country) {
        var validationErrors = $this.getValidationErrors(country);
		if( validationErrors.length > 0 ) {
			throw validationErrors;
		}
		return true;
    };
	$this.getValidationErrors = function(country) {
		var errors = [];
        if( country.code == null || country.code == '' ) {
			errors.push('code is not defined');
		}
		return errors;
	};
	return $this;
}]);

