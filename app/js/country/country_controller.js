'use strict';

/**
 * Controller for Country
 **/
countryModule.controller('CountryCtrl', ['Country',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Country, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of countrys
    $scope.countrys = [];
	// country to edit
    $scope.country = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh countrys list
     */
    $scope.refreshCountryList = function() {
    	try {
			$scope.countrys = [];
        	Country.getAll().then(
				function(success) {
        	        $scope.countrys = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh country
     */
    $scope.refreshCountry = function(code) {
    	try {
        	$scope.country = null;
	        Country.get(code).then(
				function(success) {
        	        $scope.country = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the countrys list page
     */
    $scope.goToCountryList = function() {
        $scope.refreshCountryList();
        $location.path('/country');
    }
    /**
     * Go to the country edit page
     */
    $scope.goToCountry = function(code) {
        $scope.refreshCountry(code);
        $location.path('/country/'+code);
    }

    // Actions

    /**
     * Save country
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Country.create;
			} else {
				save = Country.update;
			}
			save($scope.country).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.country = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete country
     */
    $scope.delete = function(code) {
	    try {
			MessageHandler.cleanMessage();
    	    Country.delete(code).then(
				function(success) {
                	$scope.goToCountryList();
            	}, 
                MessageHandler.manageError);
        } catch(ex) {
            MessageHandler.manageException(ex);
        }
    };
    
    // Main
	MessageHandler.cleanMessage();
    if( $location.path().endsWith('/new') ) {
        // Creation page
        $scope.country = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.code != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshCountry($routeParams.code);
    } else {
        // List page
        $scope.refreshCountryList();
    }
    
    
}]);
