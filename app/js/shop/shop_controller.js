'use strict';

/* Controller for Shop */

myAppControllers.controller('ShopCtrl', ['Shop', '$scope', '$routeParams', '$http', '$location', '$cookies', function(Shop, $scope, $routeParams, $http, $location, $cookies) {
	
    // mode

    $scope.mode = null;
    
	// data

    $scope.shops = {list: []};
    $scope.shop = null;

	// referencies entities

	$scope.items = {};
	$scope.items.employees = [];
	$scope.items.countrys = [];
	$scope.loadAllEmployee = function() {
        $http({method: 'GET', url: baseURL + '/items/employee'}).
        success(function(data, status, headers, config) {
            $scope.items.employees = data;
        }).
        error($scope.manageError);
    };
	$scope.loadAllCountry = function() {
        $http({method: 'GET', url: baseURL + '/items/country'}).
        success(function(data, status, headers, config) {
            $scope.items.countrys = data;
        }).
        error($scope.manageError);
    };
	
	$scope.loadAllReferencies = function() {
		$scope.loadAllEmployee();
		$scope.loadAllCountry();
    };
    
    // message

	$scope.message = {};
    $scope.message.successs = [];
    $scope.message.errors = [];
	$scope.cleanMessage = function() {
        $scope.message.successs = [];
        $scope.message.errors = [];
    };
    $scope.addSuccess = function(success) {
        $scope.message.successs.push(success);
    };
    $scope.addError = function(error) {
        $scope.message.errors.push(error);
    };
	$scope.manageError = function(http) {
		if( http.status === 404 ) {
			if( http.data == null || http.data === "" ) {
				$scope.addError('The server is not responding');
			} else {
				$scope.addError('Invalid URL : ' + http.config.url);
			}
		} else if( http.status === 400 ) {
			if(http.data == null) {
				$scope.addError('Bad URL : ' + http.config.url);
			} else {
				$scope.addError(http.data);
			}
		} else {
        	if( http.data != null && http.data !== "" ) {
            	$scope.addError(http.data);
        	}
		}
    };
	$scope.manageException = function(error) {
		$scope.addError(error);
    };

	// display data

	
    $scope.cleanShopsInScope = function() {
        $scope.shops.list = [];
    };
    $scope.cleanShopInScope = function() {
        $scope.shop = null;
    };
    $scope.setAllShopsInScope = function(shops) {
        $scope.shops.list = shops;
    };
    $scope.addShopInScope = function(shop) {
        $scope.shops.list.push(shop);
    };
    $scope.setOneShopInScope = function(shop) {
        $scope.shop = shop;
    };
    
    // refresh data

    $scope.refreshShopList = function() {
    	try {
        	$scope.cleanShopsInScope();
	        Shop.getAll().then(
				function(success) {
        	        $scope.setAllShopsInScope(success.data);
            	}, 
	            $scope.manageError);
    	} catch(ex) {
    		$scope.manageException(ex);
    	}
    }
    $scope.refreshShop = function(code) {
    	try {
        	$scope.cleanShopInScope();
	        Shop.get(code).then(
				function(success) {
        	        $scope.setOneShopInScope(success.data);
            	}, 
	            $scope.manageError);
    	  } catch(ex) {
        	$scope.manageException(ex);
    	}
    }

    // location

    $scope.goToShopList = function() {
        $scope.refreshShopList();
        $location.path('/shop');
    }
    $scope.goToShop = function(code) {
        $scope.refreshShop(code);
        $location.path('/shop/'+code);
    }

    // Actions

    $scope.save = function() {
    	try {
			$scope.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Shop.create;
			} else {
				save = Shop.update;
			}
			save($scope.shop).then(
    	        function(success) {
	                $scope.addSuccess('save ok');
                	$scope.setOneShopInScope(success.data);
            	},
        	    $scope.manageError);
    	} catch(ex) {
        	$scope.manageException(ex);
    	}
    };
    $scope.delete = function(code) {
	    try {
			$scope.cleanMessage();
    	    Shop.delete(code).then(
				function(success) {
                	$scope.goToShopList();
            	}, 
                $scope.manageError);
        } catch(ex) {
            $scope.manageException(ex);
        }
    };
    
    // Main

	$scope.cleanMessage();
    
    if( $location.path().endsWith('/new') ) {
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.code != null ) {
		$scope.loadAllReferencies();
		$scope.refreshShop($routeParams.code);
    } else {
        $scope.refreshShopList();
    }
    
    
}]);
