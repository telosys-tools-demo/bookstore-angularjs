'use strict';

/**
 * Factory for Country
 */
countryModule.factory('Country', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage country
    var entityURL = restURL + '/country';
	
	/**
     * Validate country
     * @param country country
     * @throws validation exception
     */
	var validate = function (country) {
		var errors = [];
        if( country.code == null || country.code == '' ) {
			errors.push('country.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all countrys as list items
         * @return all countrys as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/country');
    	},

        /**
         * Get all countrys
         * @return all countrys
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get country
         * @param code code
         * @return country
         */
    	get: function(code) {
    	    var url = entityURL + '/' + code;
        	return $http.get(url);
    	},

        /**
         * Create a new country
         * @param country country
         * @return country saved
         */
		create: function(country) {
			validate(country)
			var url = entityURL;
			return $http.post(url, country);
    	},

        /**
         * Update country
         * @param country country
         * @return country saved
         */
    	update: function(country) {
			validate(country)
			var url = entityURL + '/' + country.code;
			return $http.put(url, country);
    	},

		/**
         * Delete country
         * @param code code
         */
    	delete: function(code) {
        	var url = entityURL + '/' + code;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

