'use strict';

/**
 * Factory for EmployeeGroup
 */
employeeGroupModule.factory('EmployeeGroup', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage employeeGroup
    var entityURL = restURL + '/employeeGroup';
	
	/**
     * Validate employeeGroup
     * @param employeeGroup employeeGroup
     * @throws validation exception
     */
	var validate = function (employeeGroup) {
		var errors = [];
        if( employeeGroup.employeeCode == null || employeeGroup.employeeCode == '' ) {
			errors.push('employeeGroup.id.not.defined');
		}
        if( employeeGroup.groupId == null || employeeGroup.groupId == '' ) {
			errors.push('employeeGroup.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all employeeGroups as list items
         * @return all employeeGroups as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/employeeGroup');
    	},

        /**
         * Get all employeeGroups
         * @return all employeeGroups
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get employeeGroup
         * @param employeeCode employeeCode
         * @param groupId groupId
         * @return employeeGroup
         */
    	get: function(employeeCode, groupId) {
    	    var url = entityURL + '/' + employeeCode + '/' + groupId;
        	return $http.get(url);
    	},

        /**
         * Create a new employeeGroup
         * @param employeeGroup employeeGroup
         * @return employeeGroup saved
         */
		create: function(employeeGroup) {
			validate(employeeGroup)
			var url = entityURL;
			return $http.post(url, employeeGroup);
    	},

        /**
         * Update employeeGroup
         * @param employeeGroup employeeGroup
         * @return employeeGroup saved
         */
    	update: function(employeeGroup) {
			validate(employeeGroup)
			var url = entityURL + '/' + employeeGroup.employeeCode + '/' + employeeGroup.groupId;
			return $http.put(url, employeeGroup);
    	},

		/**
         * Delete employeeGroup
         * @param employeeCode employeeCode
         * @param groupId groupId
         */
    	delete: function(employeeCode, groupId) {
        	var url = entityURL + '/' + employeeCode + '/' + groupId;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

