'use strict';

/* Factory for Workgroup */

myAppServices.factory('Workgroup', ['$http', function($http) {
    var entityURL = baseURL + '/workgroup';
    var $this = {};
    $this.getAll = function() {
        return $http.get(entityURL);
    };
    $this.get = function(id) {
        var url = entityURL + '/' + id;
        return $http.get(url);
    };
	$this.create = function(workgroup) {
		$this.validate(workgroup)
		var url = entityURL;
		return $http.post(url, workgroup);
    };
    $this.update = function(workgroup) {
		$this.validate(workgroup)
		var url = entityURL + '/' + workgroup.id;
		return $http.put(url, workgroup);
    };
    $this.delete = function(id) {
        var url = entityURL + '/' + id;
        return $http.delete(url);
    };
    $this.validate = function(workgroup) {
        var validationErrors = $this.getValidationErrors(workgroup);
		if( validationErrors.length > 0 ) {
			throw validationErrors;
		}
		return true;
    };
	$this.getValidationErrors = function(workgroup) {
		var errors = [];
        if( workgroup.id == null || workgroup.id == '' ) {
			errors.push('id is not defined');
		}
		return errors;
	};
	return $this;
}]);

