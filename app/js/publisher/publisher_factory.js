'use strict';

/**
 * Factory for Publisher
 */
publisherModule.factory('Publisher', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage publisher
    var entityURL = restURL + '/publisher';
	
	/**
     * Validate publisher
     * @param publisher publisher
     * @throws validation exception
     */
	var validate = function (publisher) {
		var errors = [];
        if( publisher.code == null || publisher.code == '' ) {
			errors.push('publisher.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all publishers as list items
         * @return all publishers as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/publisher');
    	},

        /**
         * Get all publishers
         * @return all publishers
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get publisher
         * @param code code
         * @return publisher
         */
    	get: function(code) {
    	    var url = entityURL + '/' + code;
        	return $http.get(url);
    	},

        /**
         * Create a new publisher
         * @param publisher publisher
         * @return publisher saved
         */
		create: function(publisher) {
			validate(publisher)
			var url = entityURL;
			return $http.post(url, publisher);
    	},

        /**
         * Update publisher
         * @param publisher publisher
         * @return publisher saved
         */
    	update: function(publisher) {
			validate(publisher)
			var url = entityURL + '/' + publisher.code;
			return $http.put(url, publisher);
    	},

		/**
         * Delete publisher
         * @param code code
         */
    	delete: function(code) {
        	var url = entityURL + '/' + code;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

