'use strict';

/* Factory for EmployeeGroup */

myAppServices.factory('EmployeeGroup', ['$http', function($http) {
    var entityURL = baseURL + '/employeeGroup';
    var $this = {};
    $this.getAll = function() {
        return $http.get(entityURL);
    };
    $this.get = function(employeeCode, groupId) {
        var url = entityURL + '/' + employeeCode + '/' + groupId;
        return $http.get(url);
    };
	$this.create = function(employeeGroup) {
		$this.validate(employeeGroup)
		var url = entityURL;
		return $http.post(url, employeeGroup);
    };
    $this.update = function(employeeGroup) {
		$this.validate(employeeGroup)
		var url = entityURL + '/' + employeeGroup.employeeCode + '/' + employeeGroup.groupId;
		return $http.put(url, employeeGroup);
    };
    $this.delete = function(employeeCode, groupId) {
        var url = entityURL + '/' + employeeCode + '/' + groupId;
        return $http.delete(url);
    };
    $this.validate = function(employeeGroup) {
        var validationErrors = $this.getValidationErrors(employeeGroup);
		if( validationErrors.length > 0 ) {
			throw validationErrors;
		}
		return true;
    };
	$this.getValidationErrors = function(employeeGroup) {
		var errors = [];
        if( employeeGroup.employeeCode == null || employeeGroup.employeeCode == '' ) {
			errors.push('employeeCode is not defined');
		}
        if( employeeGroup.groupId == null || employeeGroup.groupId == '' ) {
			errors.push('groupId is not defined');
		}
		return errors;
	};
	return $this;
}]);

