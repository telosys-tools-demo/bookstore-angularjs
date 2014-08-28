'use strict';

/**
 * Controller for Customer
 **/
customerModule.controller('CustomerCtrl', ['Customer',  'Country', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Customer, Country, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Country',     // edition mode
    $scope.mode = null;
    
	// list of customers
    $scope.customers = [];
	// customer to edit
    $scope.customer = null;

	// referencies entities
	$scope.items = {};
    // countrys
	$scope.items.countrys = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Country.getAllAsListItems().then(
				function(success) {
        	        $scope.items.countrys = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh customers list
     */
    $scope.refreshCustomerList = function() {
    	try {
			$scope.customers = [];
        	Customer.getAll().then(
				function(success) {
        	        $scope.customers = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh customer
     */
    $scope.refreshCustomer = function(code) {
    	try {
        	$scope.customer = null;
	        Customer.get(code).then(
				function(success) {
        	        $scope.customer = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the customers list page
     */
    $scope.goToCustomerList = function() {
        $scope.refreshCustomerList();
        $location.path('/customer');
    }
    /**
     * Go to the customer edit page
     */
    $scope.goToCustomer = function(code) {
        $scope.refreshCustomer(code);
        $location.path('/customer/'+code);
    }

    // Actions

    /**
     * Save customer
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Customer.create;
			} else {
				save = Customer.update;
			}
			save($scope.customer).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.customer = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete customer
     */
    $scope.delete = function(code) {
	    try {
			MessageHandler.cleanMessage();
    	    Customer.delete(code).then(
				function(success) {
                	$scope.goToCustomerList();
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
        $scope.customer = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.code != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshCustomer($routeParams.code);
    } else {
        // List page
        $scope.refreshCustomerList();
    }
    
    
}]);
