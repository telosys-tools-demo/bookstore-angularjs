'use strict';

/* Factory for Customer */

myAppServices.factory('Customer', ['$http', function($http) {
    var entityURL = baseURL + '/customer';
    var $this = {};
    $this.getAll = function() {
        return $http.get(entityURL);
    };
    $this.get = function(code) {
        var url = entityURL + '/' + code;
        return $http.get(url);
    };
	$this.create = function(customer) {
		$this.validate(customer)
		var url = entityURL;
		return $http.post(url, customer);
    };
    $this.update = function(customer) {
		$this.validate(customer)
		var url = entityURL + '/' + customer.code;
		return $http.put(url, customer);
    };
    $this.delete = function(code) {
        var url = entityURL + '/' + code;
        return $http.delete(url);
    };
    $this.validate = function(customer) {
        var validationErrors = $this.getValidationErrors(customer);
		if( validationErrors.length > 0 ) {
			throw validationErrors;
		}
		return true;
    };
	$this.getValidationErrors = function(customer) {
		var errors = [];
        if( customer.code == null || customer.code == '' ) {
			errors.push('code is not defined');
		}
		return errors;
	};
	return $this;
}]);

