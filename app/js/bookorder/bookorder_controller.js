'use strict';

/**
 * Controller for BookOrder
 **/
bookOrderModule.controller('BookOrderCtrl', ['BookOrder',  'Shop', 'Employee', 'Customer', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(BookOrder, Shop, Employee, Customer, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Shop',  'Employee',  'Customer',     // edition mode
    $scope.mode = null;
    
	// list of bookOrders
    $scope.bookOrders = [];
	// bookOrder to edit
    $scope.bookOrder = null;

	// referencies entities
	$scope.items = {};
    // shops
	$scope.items.shops = [];
    // employees
	$scope.items.employees = [];
    // customers
	$scope.items.customers = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Shop.getAllAsListItems().then(
				function(success) {
        	        $scope.items.shops = success.data;
            	}, 
	            MessageHandler.manageError);
		Employee.getAllAsListItems().then(
				function(success) {
        	        $scope.items.employees = success.data;
            	}, 
	            MessageHandler.manageError);
		Customer.getAllAsListItems().then(
				function(success) {
        	        $scope.items.customers = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh bookOrders list
     */
    $scope.refreshBookOrderList = function() {
    	try {
			$scope.bookOrders = [];
        	BookOrder.getAll().then(
				function(success) {
        	        $scope.bookOrders = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh bookOrder
     */
    $scope.refreshBookOrder = function(id) {
    	try {
        	$scope.bookOrder = null;
	        BookOrder.get(id).then(
				function(success) {
        	        $scope.bookOrder = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the bookOrders list page
     */
    $scope.goToBookOrderList = function() {
        $scope.refreshBookOrderList();
        $location.path('/bookOrder');
    }
    /**
     * Go to the bookOrder edit page
     */
    $scope.goToBookOrder = function(id) {
        $scope.refreshBookOrder(id);
        $location.path('/bookOrder/'+id);
    }

    // Actions

    /**
     * Save bookOrder
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = BookOrder.create;
			} else {
				save = BookOrder.update;
			}
			save($scope.bookOrder).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.bookOrder = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete bookOrder
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    BookOrder.delete(id).then(
				function(success) {
                	$scope.goToBookOrderList();
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
        $scope.bookOrder = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshBookOrder($routeParams.id);
    } else {
        // List page
        $scope.refreshBookOrderList();
    }
    
    
}]);
