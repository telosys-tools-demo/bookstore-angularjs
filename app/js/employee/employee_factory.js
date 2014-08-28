'use strict';

/**
 * Factory for Employee
 */
employeeModule.factory('Employee', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage employee
    var entityURL = restURL + '/employee';
	
	/**
     * Validate employee
     * @param employee employee
     * @throws validation exception
     */
	var validate = function (employee) {
		var errors = [];
        if( employee.code == null || employee.code == '' ) {
			errors.push('employee.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all employees as list items
         * @return all employees as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/employee');
    	},

        /**
         * Get all employees
         * @return all employees
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get employee
         * @param code code
         * @return employee
         */
    	get: function(code) {
    	    var url = entityURL + '/' + code;
        	return $http.get(url);
    	},

        /**
         * Create a new employee
         * @param employee employee
         * @return employee saved
         */
		create: function(employee) {
			validate(employee)
			var url = entityURL;
			return $http.post(url, employee);
    	},

        /**
         * Update employee
         * @param employee employee
         * @return employee saved
         */
    	update: function(employee) {
			validate(employee)
			var url = entityURL + '/' + employee.code;
			return $http.put(url, employee);
    	},

		/**
         * Delete employee
         * @param code code
         */
    	delete: function(code) {
        	var url = entityURL + '/' + code;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

