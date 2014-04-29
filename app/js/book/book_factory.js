'use strict';

/* Factory for Book */

myAppServices.factory('Book', ['$http', function($http) {
    var entityURL = baseURL + '/book';
    var $this = {};
    $this.getAll = function() {
        return $http.get(entityURL);
    };
    $this.get = function(id) {
        var url = entityURL + '/' + id;
        return $http.get(url);
    };
	$this.create = function(book) {
		$this.validate(book)
		var url = entityURL;
		return $http.post(url, book);
    };
    $this.update = function(book) {
		$this.validate(book)
		var url = entityURL + '/' + book.id;
		return $http.put(url, book);
    };
    $this.delete = function(id) {
        var url = entityURL + '/' + id;
        return $http.delete(url);
    };
    $this.validate = function(book) {
        var validationErrors = $this.getValidationErrors(book);
		if( validationErrors.length > 0 ) {
			throw validationErrors;
		}
		return true;
    };
	$this.getValidationErrors = function(book) {
		var errors = [];
        if( book.id == null || book.id == '' ) {
			errors.push('id is not defined');
		}
		return errors;
	};
	return $this;
}]);

