'use strict';

/* Factory for Review */

myAppServices.factory('Review', ['$http', function($http) {
    var entityURL = baseURL + '/review';
    var $this = {};
    $this.getAll = function() {
        return $http.get(entityURL);
    };
    $this.get = function(customerCode, bookId) {
        var url = entityURL + '/' + customerCode + '/' + bookId;
        return $http.get(url);
    };
	$this.create = function(review) {
		$this.validate(review)
		var url = entityURL;
		return $http.post(url, review);
    };
    $this.update = function(review) {
		$this.validate(review)
		var url = entityURL + '/' + review.customerCode + '/' + review.bookId;
		return $http.put(url, review);
    };
    $this.delete = function(customerCode, bookId) {
        var url = entityURL + '/' + customerCode + '/' + bookId;
        return $http.delete(url);
    };
    $this.validate = function(review) {
        var validationErrors = $this.getValidationErrors(review);
		if( validationErrors.length > 0 ) {
			throw validationErrors;
		}
		return true;
    };
	$this.getValidationErrors = function(review) {
		var errors = [];
        if( review.customerCode == null || review.customerCode == '' ) {
			errors.push('customerCode is not defined');
		}
        if( review.bookId == null || review.bookId == '' ) {
			errors.push('bookId is not defined');
		}
		return errors;
	};
	return $this;
}]);

