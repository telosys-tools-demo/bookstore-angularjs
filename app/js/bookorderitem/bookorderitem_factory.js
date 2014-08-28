'use strict';

/**
 * Factory for BookOrderItem
 */
bookOrderItemModule.factory('BookOrderItem', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage bookOrderItem
    var entityURL = restURL + '/bookOrderItem';
	
	/**
     * Validate bookOrderItem
     * @param bookOrderItem bookOrderItem
     * @throws validation exception
     */
	var validate = function (bookOrderItem) {
		var errors = [];
        if( bookOrderItem.bookOrderId == null || bookOrderItem.bookOrderId == '' ) {
			errors.push('bookOrderItem.id.not.defined');
		}
        if( bookOrderItem.bookId == null || bookOrderItem.bookId == '' ) {
			errors.push('bookOrderItem.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all bookOrderItems as list items
         * @return all bookOrderItems as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/bookOrderItem');
    	},

        /**
         * Get all bookOrderItems
         * @return all bookOrderItems
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get bookOrderItem
         * @param bookOrderId bookOrderId
         * @param bookId bookId
         * @return bookOrderItem
         */
    	get: function(bookOrderId, bookId) {
    	    var url = entityURL + '/' + bookOrderId + '/' + bookId;
        	return $http.get(url);
    	},

        /**
         * Create a new bookOrderItem
         * @param bookOrderItem bookOrderItem
         * @return bookOrderItem saved
         */
		create: function(bookOrderItem) {
			validate(bookOrderItem)
			var url = entityURL;
			return $http.post(url, bookOrderItem);
    	},

        /**
         * Update bookOrderItem
         * @param bookOrderItem bookOrderItem
         * @return bookOrderItem saved
         */
    	update: function(bookOrderItem) {
			validate(bookOrderItem)
			var url = entityURL + '/' + bookOrderItem.bookOrderId + '/' + bookOrderItem.bookId;
			return $http.put(url, bookOrderItem);
    	},

		/**
         * Delete bookOrderItem
         * @param bookOrderId bookOrderId
         * @param bookId bookId
         */
    	delete: function(bookOrderId, bookId) {
        	var url = entityURL + '/' + bookOrderId + '/' + bookId;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

