'use strict';

/**
 * Factory for BookOrder
 */
bookOrderModule.factory('BookOrder', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage bookOrder
    var entityURL = restURL + '/bookOrder';
	
	/**
     * Validate bookOrder
     * @param bookOrder bookOrder
     * @throws validation exception
     */
	var validate = function (bookOrder) {
		var errors = [];
        if( bookOrder.id == null || bookOrder.id == '' ) {
			errors.push('bookOrder.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all bookOrders as list items
         * @return all bookOrders as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/bookOrder');
    	},

        /**
         * Get all bookOrders
         * @return all bookOrders
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get bookOrder
         * @param id id
         * @return bookOrder
         */
    	get: function(id) {
    	    var url = entityURL + '/' + id;
        	return $http.get(url);
    	},

        /**
         * Create a new bookOrder
         * @param bookOrder bookOrder
         * @return bookOrder saved
         */
		create: function(bookOrder) {
			validate(bookOrder)
			var url = entityURL;
			return $http.post(url, bookOrder);
    	},

        /**
         * Update bookOrder
         * @param bookOrder bookOrder
         * @return bookOrder saved
         */
    	update: function(bookOrder) {
			validate(bookOrder)
			var url = entityURL + '/' + bookOrder.id;
			return $http.put(url, bookOrder);
    	},

		/**
         * Delete bookOrder
         * @param id id
         */
    	delete: function(id) {
        	var url = entityURL + '/' + id;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

