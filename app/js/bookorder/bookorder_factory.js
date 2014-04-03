'use strict';

/* Factory for BookOrder */

myAppServices.factory('BookOrder', ['$http', function($http) {
    var entityURL = baseURL + '/bookOrder';
    var $this = {};
    $this.getAll = function() {
        return $http.get(entityURL);
    };
    $this.get = function(id) {
        var url = entityURL + '/' + id;
        return $http.get(url);
    };
	$this.create = function(bookOrder) {
		$this.validate(bookOrder)
		var url = entityURL;
		return $http.post(url, bookOrder);
    };
    $this.update = function(bookOrder) {
		$this.validate(bookOrder)
		var url = entityURL + '/' + bookOrder.id;
		return $http.put(url, bookOrder);
    };
    $this.delete = function(id) {
        var url = entityURL + '/' + id;
        return $http.delete(url);
    };
    $this.validate = function(bookOrder) {
        var validationErrors = $this.getValidationErrors(bookOrder);
		if( validationErrors.length > 0 ) {
			throw validationErrors;
		}
		return true;
    };
	$this.getValidationErrors = function(bookOrder) {
		var errors = [];
        if( bookOrder.id == null || bookOrder.id == '' ) {
			errors.push('id is not defined');
		}
		return errors;
	};
	return $this;
}]);

