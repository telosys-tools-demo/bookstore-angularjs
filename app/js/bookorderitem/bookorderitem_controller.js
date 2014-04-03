'use strict';

/* Controller for BookOrderItem */

myAppControllers.controller('BookOrderItemCtrl', ['BookOrderItem', '$scope', '$routeParams', '$http', '$location', '$cookies', function(BookOrderItem, $scope, $routeParams, $http, $location, $cookies) {
	
    // mode

    $scope.mode = null;
    
	// data

    $scope.bookOrderItems = {list: []};
    $scope.bookOrderItem = null;

	// referencies entities

	$scope.items = {};
	$scope.items.bookOrders = [];
	$scope.items.books = [];
	$scope.loadAllBookOrder = function() {
        $http({method: 'GET', url: baseURL + '/items/bookOrder'}).
        success(function(data, status, headers, config) {
            $scope.items.bookOrders = data;
        }).
        error($scope.manageError);
    };
	$scope.loadAllBook = function() {
        $http({method: 'GET', url: baseURL + '/items/book'}).
        success(function(data, status, headers, config) {
            $scope.items.books = data;
        }).
        error($scope.manageError);
    };
	
	$scope.loadAllReferencies = function() {
		$scope.loadAllBookOrder();
		$scope.loadAllBook();
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

	
    $scope.cleanBookOrderItemsInScope = function() {
        $scope.bookOrderItems.list = [];
    };
    $scope.cleanBookOrderItemInScope = function() {
        $scope.bookOrderItem = null;
    };
    $scope.setAllBookOrderItemsInScope = function(bookOrderItems) {
        $scope.bookOrderItems.list = bookOrderItems;
    };
    $scope.addBookOrderItemInScope = function(bookOrderItem) {
        $scope.bookOrderItems.list.push(bookOrderItem);
    };
    $scope.setOneBookOrderItemInScope = function(bookOrderItem) {
        $scope.bookOrderItem = bookOrderItem;
    };
    
    // refresh data

    $scope.refreshBookOrderItemList = function() {
    	try {
        	$scope.cleanBookOrderItemsInScope();
	        BookOrderItem.getAll().then(
				function(success) {
        	        $scope.setAllBookOrderItemsInScope(success.data);
            	}, 
	            $scope.manageError);
    	} catch(ex) {
    		$scope.manageException(ex);
    	}
    }
    $scope.refreshBookOrderItem = function(bookOrderId, bookId) {
    	try {
        	$scope.cleanBookOrderItemInScope();
	        BookOrderItem.get(bookOrderId, bookId).then(
				function(success) {
        	        $scope.setOneBookOrderItemInScope(success.data);
            	}, 
	            $scope.manageError);
    	  } catch(ex) {
        	$scope.manageException(ex);
    	}
    }

    // location

    $scope.goToBookOrderItemList = function() {
        $scope.refreshBookOrderItemList();
        $location.path('/bookOrderItem');
    }
    $scope.goToBookOrderItem = function(bookOrderId, bookId) {
        $scope.refreshBookOrderItem(bookOrderId, bookId);
        $location.path('/bookOrderItem/'+bookOrderId+'/'+bookId);
    }

    // Actions

    $scope.save = function() {
    	try {
			$scope.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = BookOrderItem.create;
			} else {
				save = BookOrderItem.update;
			}
			save($scope.bookOrderItem).then(
    	        function(success) {
	                $scope.addSuccess('save ok');
                	$scope.setOneBookOrderItemInScope(success.data);
            	},
        	    $scope.manageError);
    	} catch(ex) {
        	$scope.manageException(ex);
    	}
    };
    $scope.delete = function(bookOrderId, bookId) {
	    try {
			$scope.cleanMessage();
    	    BookOrderItem.delete(bookOrderId, bookId).then(
				function(success) {
                	$scope.goToBookOrderItemList();
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
    } else if( $routeParams.bookOrderId != null && $routeParams.bookId != null ) {
		$scope.loadAllReferencies();
		$scope.refreshBookOrderItem($routeParams.bookOrderId, $routeParams.bookId);
    } else {
        $scope.refreshBookOrderItemList();
    }
    
    
}]);
