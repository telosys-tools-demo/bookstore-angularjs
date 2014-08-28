'use strict';

/**
 * Factory for Author
 */
authorModule.factory('Author', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage author
    var entityURL = restURL + '/author';
	
	/**
     * Validate author
     * @param author author
     * @throws validation exception
     */
	var validate = function (author) {
		var errors = [];
        if( author.id == null || author.id == '' ) {
			errors.push('author.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all authors as list items
         * @return all authors as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/author');
    	},

        /**
         * Get all authors
         * @return all authors
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get author
         * @param id id
         * @return author
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new author
         * @param author author
         * @return author saved
         */
		create: function(author) {
			validate(author)
			var url = entityURL;
			return $http.post(url, author);
    	},

        /**
         * Update author
         * @param author author
         * @return author saved
         */
    	update: function(author) {
			validate(author)
			var url = entityURL + '/' + author.id;
			return $http.put(url, author);
    	},

		/**
         * Delete author
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

