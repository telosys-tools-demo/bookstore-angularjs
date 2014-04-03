'use strict';

/* Controller for BookOrder */

myAppControllers.controller('BookOrderCtrl', ['BookOrder', '$scope', '$routeParams', '$http', '$location', '$cookies', function(BookOrder, $scope, $routeParams, $http, $location, $cookies) {
	
    // mode

    $scope.mode = null;
    
	// data

    $scope.bookOrders = {list: []};
    $scope.bookOrder = null;

	// referencies entities

	$scope.items = {};
	$scope.items.shops = [];
	$scope.items.employees = [];
	$scope.items.customers = [];
	$scope.loadAllShop = function() {
        $http({method: 'GET', url: baseURL + '/items/shop'}).
        success(function(data, status, headers, config) {
            $scope.items.shops = data;
        }).
        error($scope.manageError);
    };
	$scope.loadAllEmployee = function() {
        $http({method: 'GET', url: baseURL + '/items/employee'}).
        success(function(data, status, headers, config) {
            $scope.items.employees = data;
        }).
        error($scope.manageError);
    };
	$scope.loadAllCustomer = function() {
        $http({method: 'GET', url: baseURL + '/items/customer'}).
        success(function(data, status, headers, config) {
            $scope.items.customers = data;
        }).
        error($scope.manageError);
    };
	
	$scope.loadAllReferencies = function() {
		$scope.loadAllShop();
		$scope.loadAllEmployee();
		$scope.loadAllCustomer();
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

	
    $scope.cleanBookOrdersInScope = function() {
        $scope.bookOrders.list = [];
    };
    $scope.cleanBookOrderInScope = function() {
        $scope.bookOrder = null;
    };
    $scope.setAllBookOrdersInScope = function(bookOrders) {
        $scope.bookOrders.list = bookOrders;
    };
    $scope.addBookOrderInScope = function(bookOrder) {
        $scope.bookOrders.list.push(bookOrder);
    };
    $scope.setOneBookOrderInScope = function(bookOrder) {
        $scope.bookOrder = bookOrder;
    };
    
    // refresh data

    $scope.refreshBookOrderList = function() {
    	try {
        	$scope.cleanBookOrdersInScope();
	        BookOrder.getAll().then(
				function(success) {
        	        $scope.setAllBookOrdersInScope(success.data);
            	}, 
	            $scope.manageError);
    	} catch(ex) {
    		$scope.manageException(ex);
    	}
    }
    $scope.refreshBookOrder = function(id) {
    	try {
        	$scope.cleanBookOrderInScope();
	        BookOrder.get(id).then(
				function(success) {
        	        $scope.setOneBookOrderInScope(success.data);
            	}, 
	            $scope.manageError);
    	  } catch(ex) {
        	$scope.manageException(ex);
    	}
    }

    // location

    $scope.goToBookOrderList = function() {
        $scope.refreshBookOrderList();
        $location.path('/bookOrder');
    }
    $scope.goToBookOrder = function(id) {
        $scope.refreshBookOrder(id);
        $location.path('/bookOrder/'+id);
    }

    // Actions

    $scope.save = function() {
    	try {
			$scope.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = BookOrder.create;
			} else {
				save = BookOrder.update;
			}
			save($scope.bookOrder).then(
    	        function(success) {
	                $scope.addSuccess('save ok');
                	$scope.setOneBookOrderInScope(success.data);
            	},
        	    $scope.manageError);
    	} catch(ex) {
        	$scope.manageException(ex);
    	}
    };
    $scope.delete = function(id) {
	    try {
			$scope.cleanMessage();
    	    BookOrder.delete(id).then(
				function(success) {
                	$scope.goToBookOrderList();
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
    } else if( $routeParams.id != null ) {
		$scope.loadAllReferencies();
		$scope.refreshBookOrder($routeParams.id);
    } else {
        $scope.refreshBookOrderList();
    }
    
    
}]);
