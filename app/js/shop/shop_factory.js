'use strict';

/**
 * Factory for Shop
 */
shopModule.factory('Shop', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage shop
    var entityURL = restURL + '/shop';
	
	/**
     * Validate shop
     * @param shop shop
     * @throws validation exception
     */
	var validate = function (shop) {
		var errors = [];
        if( shop.code == null || shop.code == '' ) {
			errors.push('shop.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all shops as list items
         * @return all shops as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/shop');
    	},

        /**
         * Get all shops
         * @return all shops
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get shop
         * @param code code
         * @return shop
         */
    	get: function(code) {
    	    var url = entityURL + '/' + code;
        	return $http.get(url);
    	},

        /**
         * Create a new shop
         * @param shop shop
         * @return shop saved
         */
		create: function(shop) {
			validate(shop)
			var url = entityURL;
			return $http.post(url, shop);
    	},

        /**
         * Update shop
         * @param shop shop
         * @return shop saved
         */
    	update: function(shop) {
			validate(shop)
			var url = entityURL + '/' + shop.code;
			return $http.put(url, shop);
    	},

		/**
         * Delete shop
         * @param code code
         */
    	delete: function(code) {
        	var url = entityURL + '/' + code;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

