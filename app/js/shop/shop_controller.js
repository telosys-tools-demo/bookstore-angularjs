'use strict';

/**
 * Controller for Shop
 **/
shopModule.controller('ShopCtrl', ['Shop', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', function(Shop, $scope, $routeParams, $http, $location, $cookies, MessageHandler) {
	
    // edition mode
    $scope.mode = null;
    
	// list of shops
    $scope.shops = [];
	// shop to edit
    $scope.shop = null;

	// referencies entities
	$scope.items = {};
    // employees
	$scope.items.employees = [];
    // countrys
	$scope.items.countrys = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		$scope.loadAllEmployees();
		$scope.loadAllCountrys();
    };
    /**
     * Load all employees
     */
	$scope.loadAllEmployees = function() {
        $http({method: 'GET', url: baseURL + '/items/employee'}).
        success(function(data, status, headers, config) {
            $scope.items.employees = data;
        }).
        error(MessageHandler.manageError);
    };
    /**
     * Load all countrys
     */
	$scope.loadAllCountrys = function() {
        $http({method: 'GET', url: baseURL + '/items/country'}).
        success(function(data, status, headers, config) {
            $scope.items.countrys = data;
        }).
        error(MessageHandler.manageError);
    };
    
    /**
     * Refresh shops list
     */
    $scope.refreshShopList = function() {
    	try {
			$scope.shops = [];
        	Shop.getAll().then(
				function(success) {
        	        $scope.shops = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh shop
     */
    $scope.refreshShop = function(code) {
    	try {
        	$scope.shop = null;
	        Shop.get(code).then(
				function(success) {
        	        $scope.shop = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the shops list page
     */
    $scope.goToShopList = function() {
        $scope.refreshShopList();
        $location.path('/shop');
    }
    /**
     * Go to the shop edit page
     */
    $scope.goToShop = function(code) {
        $scope.refreshShop(code);
        $location.path('/shop/'+code);
    }

    // Actions

    /**
     * Save shop
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Shop.create;
			} else {
				save = Shop.update;
			}
			save($scope.shop).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.shop = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete shop
     */
    $scope.delete = function(code) {
	    try {
			MessageHandler.cleanMessage();
    	    Shop.delete(code).then(
				function(success) {
                	$scope.goToShopList();
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
        $scope.shop = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.code != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshShop($routeParams.code);
    } else {
        // List page
        $scope.refreshShopList();
    }
    
    
}]);
