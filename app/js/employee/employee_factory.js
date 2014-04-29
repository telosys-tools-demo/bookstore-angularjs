'use strict';

/* Factory for Employee */

myAppServices.factory('Employee', ['$http', function($http) {
    var entityURL = baseURL + '/employee';
    var $this = {};
    $this.getAll = function() {
        return $http.get(entityURL);
    };
    $this.get = function(code) {
        var url = entityURL + '/' + code;
        return $http.get(url);
    };
	$this.create = function(employee) {
		$this.validate(employee)
		var url = entityURL;
		return $http.post(url, employee);
    };
    $this.update = function(employee) {
		$this.validate(employee)
		var url = entityURL + '/' + employee.code;
		return $http.put(url, employee);
    };
    $this.delete = function(code) {
        var url = entityURL + '/' + code;
        return $http.delete(url);
    };
    $this.validate = function(employee) {
        var validationErrors = $this.getValidationErrors(employee);
		if( validationErrors.length > 0 ) {
			throw validationErrors;
		}
		return true;
    };
	$this.getValidationErrors = function(employee) {
		var errors = [];
        if( employee.code == null || employee.code == '' ) {
			errors.push('code is not defined');
		}
		return errors;
	};
	return $this;
}]);

