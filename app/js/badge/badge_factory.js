'use strict';

/* Factory for Badge */

myAppServices.factory('Badge', ['$http', function($http) {
    var entityURL = baseURL + '/badge';
    var $this = {};
    $this.getAll = function() {
        return $http.get(entityURL);
    };
    $this.get = function(badgeNumber) {
        var url = entityURL + '/' + badgeNumber;
        return $http.get(url);
    };
	$this.create = function(badge) {
		$this.validate(badge)
		var url = entityURL;
		return $http.post(url, badge);
    };
    $this.update = function(badge) {
		$this.validate(badge)
		var url = entityURL + '/' + badge.badgeNumber;
		return $http.put(url, badge);
    };
    $this.delete = function(badgeNumber) {
        var url = entityURL + '/' + badgeNumber;
        return $http.delete(url);
    };
    $this.validate = function(badge) {
        var validationErrors = $this.getValidationErrors(badge);
		if( validationErrors.length > 0 ) {
			throw validationErrors;
		}
		return true;
    };
	$this.getValidationErrors = function(badge) {
		var errors = [];
        if( badge.badgeNumber == null || badge.badgeNumber == '' ) {
			errors.push('badgeNumber is not defined');
		}
		return errors;
	};
	return $this;
}]);

