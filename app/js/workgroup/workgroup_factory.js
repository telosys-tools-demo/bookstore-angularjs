'use strict';

/**
 * Factory for Workgroup
 */
workgroupModule.factory('Workgroup', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage workgroup
    var entityURL = restURL + '/workgroup';
	
	/**
     * Validate workgroup
     * @param workgroup workgroup
     * @throws validation exception
     */
	var validate = function (workgroup) {
		var errors = [];
        if( workgroup.id == null || workgroup.id == '' ) {
			errors.push('workgroup.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all workgroups as list items
         * @return all workgroups as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/workgroup');
    	},

        /**
         * Get all workgroups
         * @return all workgroups
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get workgroup
         * @param id id
         * @return workgroup
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new workgroup
         * @param workgroup workgroup
         * @return workgroup saved
         */
		create: function(workgroup) {
			validate(workgroup)
			var url = entityURL;
			return $http.post(url, workgroup);
    	},

        /**
         * Update workgroup
         * @param workgroup workgroup
         * @return workgroup saved
         */
    	update: function(workgroup) {
			validate(workgroup)
			var url = entityURL + '/' + workgroup.id;
			return $http.put(url, workgroup);
    	},

		/**
         * Delete workgroup
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

