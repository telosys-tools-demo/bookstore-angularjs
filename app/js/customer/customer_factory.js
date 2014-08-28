'use strict';

/**
 * Factory for Customer
 */
customerModule.factory('Customer', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage customer
    var entityURL = restURL + '/customer';
	
	/**
     * Validate customer
     * @param customer customer
     * @throws validation exception
     */
	var validate = function (customer) {
		var errors = [];
        if( customer.code == null || customer.code == '' ) {
			errors.push('customer.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all customers as list items
         * @return all customers as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/customer');
    	},

        /**
         * Get all customers
         * @return all customers
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get customer
         * @param code code
         * @return customer
         */
    	get: function(code) {
    	    var url = entityURL + '/' + code;
        	return $http.get(url);
    	},

        /**
         * Create a new customer
         * @param customer customer
         * @return customer saved
         */
		create: function(customer) {
			validate(customer)
			var url = entityURL;
			return $http.post(url, customer);
    	},

        /**
         * Update customer
         * @param customer customer
         * @return customer saved
         */
    	update: function(customer) {
			validate(customer)
			var url = entityURL + '/' + customer.code;
			return $http.put(url, customer);
    	},

		/**
         * Delete customer
         * @param code code
         */
    	delete: function(code) {
        	var url = entityURL + '/' + code;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

