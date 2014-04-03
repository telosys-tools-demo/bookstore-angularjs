'use strict';

/* Factory for Shop */

myAppServices.factory('Shop', ['$http', function($http) {
    var entityURL = baseURL + '/shop';
    var $this = {};
    $this.getAll = function() {
        return $http.get(entityURL);
    };
    $this.get = function(code) {
        var url = entityURL + '/' + code;
        return $http.get(url);
    };
	$this.create = function(shop) {
		$this.validate(shop)
		var url = entityURL;
		return $http.post(url, shop);
    };
    $this.update = function(shop) {
		$this.validate(shop)
		var url = entityURL + '/' + shop.code;
		return $http.put(url, shop);
    };
    $this.delete = function(code) {
        var url = entityURL + '/' + code;
        return $http.delete(url);
    };
    $this.validate = function(shop) {
        var validationErrors = $this.getValidationErrors(shop);
		if( validationErrors.length > 0 ) {
			throw validationErrors;
		}
		return true;
    };
	$this.getValidationErrors = function(shop) {
		var errors = [];
        if( shop.code == null || shop.code == '' ) {
			errors.push('code is not defined');
		}
		return errors;
	};
	return $this;
}]);

