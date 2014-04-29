'use strict';

/* Factory for Synopsis */

myAppServices.factory('Synopsis', ['$http', function($http) {
    var entityURL = baseURL + '/synopsis';
    var $this = {};
    $this.getAll = function() {
        return $http.get(entityURL);
    };
    $this.get = function(bookId) {
        var url = entityURL + '/' + bookId;
        return $http.get(url);
    };
	$this.create = function(synopsis) {
		$this.validate(synopsis)
		var url = entityURL;
		return $http.post(url, synopsis);
    };
    $this.update = function(synopsis) {
		$this.validate(synopsis)
		var url = entityURL + '/' + synopsis.bookId;
		return $http.put(url, synopsis);
    };
    $this.delete = function(bookId) {
        var url = entityURL + '/' + bookId;
        return $http.delete(url);
    };
    $this.validate = function(synopsis) {
        var validationErrors = $this.getValidationErrors(synopsis);
		if( validationErrors.length > 0 ) {
			throw validationErrors;
		}
		return true;
    };
	$this.getValidationErrors = function(synopsis) {
		var errors = [];
        if( synopsis.bookId == null || synopsis.bookId == '' ) {
			errors.push('bookId is not defined');
		}
		return errors;
	};
	return $this;
}]);

