'use strict';

/**
 * Factory for Synopsis
 */
synopsisModule.factory('Synopsis', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage synopsis
    var entityURL = restURL + '/synopsis';
	
	/**
     * Validate synopsis
     * @param synopsis synopsis
     * @throws validation exception
     */
	var validate = function (synopsis) {
		var errors = [];
        if( synopsis.bookId == null || synopsis.bookId == '' ) {
			errors.push('synopsis.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all synopsiss as list items
         * @return all synopsiss as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/synopsis');
    	},

        /**
         * Get all synopsiss
         * @return all synopsiss
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get synopsis
         * @param bookId bookId
         * @return synopsis
         */
    	get: function(bookId) {
    	    var url = entityURL + '/' + bookId;
        	return $http.get(url);
    	},

        /**
         * Create a new synopsis
         * @param synopsis synopsis
         * @return synopsis saved
         */
		create: function(synopsis) {
			validate(synopsis)
			var url = entityURL;
			return $http.post(url, synopsis);
    	},

        /**
         * Update synopsis
         * @param synopsis synopsis
         * @return synopsis saved
         */
    	update: function(synopsis) {
			validate(synopsis)
			var url = entityURL + '/' + synopsis.bookId;
			return $http.put(url, synopsis);
    	},

		/**
         * Delete synopsis
         * @param bookId bookId
         */
    	delete: function(bookId) {
        	var url = entityURL + '/' + bookId;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

