'use strict';

/**
 * Factory for Book
 */
bookModule.factory('Book', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage book
    var entityURL = restURL + '/book';
	
	/**
     * Validate book
     * @param book book
     * @throws validation exception
     */
	var validate = function (book) {
		var errors = [];
        if( book.id == null || book.id == '' ) {
			errors.push('book.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all books as list items
         * @return all books as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/book');
    	},

        /**
         * Get all books
         * @return all books
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get book
         * @param id id
         * @return book
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new book
         * @param book book
         * @return book saved
         */
		create: function(book) {
			validate(book)
			var url = entityURL;
			return $http.post(url, book);
    	},

        /**
         * Update book
         * @param book book
         * @return book saved
         */
    	update: function(book) {
			validate(book)
			var url = entityURL + '/' + book.id;
			return $http.put(url, book);
    	},

		/**
         * Delete book
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

