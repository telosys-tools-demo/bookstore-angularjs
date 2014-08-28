'use strict';

/**
 * Factory for Badge
 */
badgeModule.factory('Badge', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage badge
    var entityURL = restURL + '/badge';
	
	/**
     * Validate badge
     * @param badge badge
     * @throws validation exception
     */
	var validate = function (badge) {
		var errors = [];
        if( badge.badgeNumber == null || badge.badgeNumber == '' ) {
			errors.push('badge.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all badges as list items
         * @return all badges as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/badge');
    	},

        /**
         * Get all badges
         * @return all badges
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get badge
         * @param badgeNumber badgeNumber
         * @return badge
         */
    	get: function(badgeNumber) {
    	    var url = entityURL + '/' + badgeNumber;
        	return $http.get(url);
    	},

        /**
         * Create a new badge
         * @param badge badge
         * @return badge saved
         */
		create: function(badge) {
			validate(badge)
			var url = entityURL;
			return $http.post(url, badge);
    	},

        /**
         * Update badge
         * @param badge badge
         * @return badge saved
         */
    	update: function(badge) {
			validate(badge)
			var url = entityURL + '/' + badge.badgeNumber;
			return $http.put(url, badge);
    	},

		/**
         * Delete badge
         * @param badgeNumber badgeNumber
         */
    	delete: function(badgeNumber) {
        	var url = entityURL + '/' + badgeNumber;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

