'use strict';

/* Factory for Author */

myAppServices.factory('Author', ['$http', function($http) {
    var entityURL = baseURL + '/author';
    var $this = {};
    $this.getAll = function() {
        return $http.get(entityURL);
    };
    $this.get = function(id) {
        var url = entityURL + '/' + id;
        return $http.get(url);
    };
	$this.create = function(author) {
		$this.validate(author)
		var url = entityURL;
		return $http.post(url, author);
    };
    $this.update = function(author) {
		$this.validate(author)
		var url = entityURL + '/' + author.id;
		return $http.put(url, author);
    };
    $this.delete = function(id) {
        var url = entityURL + '/' + id;
        return $http.delete(url);
    };
    $this.validate = function(author) {
        var validationErrors = $this.getValidationErrors(author);
		if( validationErrors.length > 0 ) {
			throw validationErrors;
		}
		return true;
    };
	$this.getValidationErrors = function(author) {
		var errors = [];
        if( author.id == null || author.id == '' ) {
			errors.push('id is not defined');
		}
		return errors;
	};
	return $this;
}]);

