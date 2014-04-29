'use strict';

/**
 * Factory for Review
 */
reviewModule.factory('Review', ['$http', function($http) {

	// REST Service URL to manage review
    var entityURL = baseURL + '/review';
	
	/**
     * Validate review
     * @param review review
     * @throws validation exception
     */
	var validate = function (review) {
		var errors = [];
        if( review.customerCode == null || review.customerCode == '' ) {
			errors.push('review.id.not.defined');
		}
        if( review.bookId == null || review.bookId == '' ) {
			errors.push('review.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all reviews
         * @return all reviews
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get review
         * @param customerCode customerCode
         * @param bookId bookId
         * @return review
         */
    	get: function(customerCode, bookId) {
    	    var url = entityURL + '/' + customerCode + '/' + bookId;
        	return $http.get(url);
    	},

        /**
         * Create a new review
         * @param review review
         * @return review saved
         */
		create: function(review) {
			validate(review)
			var url = entityURL;
			return $http.post(url, review);
    	},

        /**
         * Update review
         * @param review review
         * @return review saved
         */
    	update: function(review) {
			validate(review)
			var url = entityURL + '/' + review.customerCode + '/' + review.bookId;
			return $http.put(url, review);
    	},

		/**
         * Delete review
         * @param customerCode customerCode
         * @param bookId bookId
         */
    	delete: function(customerCode, bookId) {
        	var url = entityURL + '/' + customerCode + '/' + bookId;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

