'use strict';

/* Factory for BookOrderItem */

myAppServices.factory('BookOrderItem', ['$http', function($http) {
    var entityURL = baseURL + '/bookOrderItem';
    var $this = {};
    $this.getAll = function() {
        return $http.get(entityURL);
    };
    $this.get = function(bookOrderId, bookId) {
        var url = entityURL + '/' + bookOrderId + '/' + bookId;
        return $http.get(url);
    };
	$this.create = function(bookOrderItem) {
		$this.validate(bookOrderItem)
		var url = entityURL;
		return $http.post(url, bookOrderItem);
    };
    $this.update = function(bookOrderItem) {
		$this.validate(bookOrderItem)
		var url = entityURL + '/' + bookOrderItem.bookOrderId + '/' + bookOrderItem.bookId;
		return $http.put(url, bookOrderItem);
    };
    $this.delete = function(bookOrderId, bookId) {
        var url = entityURL + '/' + bookOrderId + '/' + bookId;
        return $http.delete(url);
    };
    $this.validate = function(bookOrderItem) {
        var validationErrors = $this.getValidationErrors(bookOrderItem);
		if( validationErrors.length > 0 ) {
			throw validationErrors;
		}
		return true;
    };
	$this.getValidationErrors = function(bookOrderItem) {
		var errors = [];
        if( bookOrderItem.bookOrderId == null || bookOrderItem.bookOrderId == '' ) {
			errors.push('bookOrderId is not defined');
		}
        if( bookOrderItem.bookId == null || bookOrderItem.bookId == '' ) {
			errors.push('bookId is not defined');
		}
		return errors;
	};
	return $this;
}]);

