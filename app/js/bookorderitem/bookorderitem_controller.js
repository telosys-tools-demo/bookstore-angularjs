'use strict';

/**
 * Controller for BookOrderItem
 **/
bookOrderItemModule.controller('BookOrderItemCtrl', ['BookOrderItem', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', function(BookOrderItem, $scope, $routeParams, $http, $location, $cookies, MessageHandler) {
	
    // edition mode
    $scope.mode = null;
    
	// list of bookOrderItems
    $scope.bookOrderItems = [];
	// bookOrderItem to edit
    $scope.bookOrderItem = null;

	// referencies entities
	$scope.items = {};
    // bookOrders
	$scope.items.bookOrders = [];
    // books
	$scope.items.books = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		$scope.loadAllBookOrders();
		$scope.loadAllBooks();
    };
    /**
     * Load all bookOrders
     */
	$scope.loadAllBookOrders = function() {
        $http({method: 'GET', url: baseURL + '/items/bookOrder'}).
        success(function(data, status, headers, config) {
            $scope.items.bookOrders = data;
        }).
        error(MessageHandler.manageError);
    };
    /**
     * Load all books
     */
	$scope.loadAllBooks = function() {
        $http({method: 'GET', url: baseURL + '/items/book'}).
        success(function(data, status, headers, config) {
            $scope.items.books = data;
        }).
        error(MessageHandler.manageError);
    };
    
    /**
     * Refresh bookOrderItems list
     */
    $scope.refreshBookOrderItemList = function() {
    	try {
			$scope.bookOrderItems = [];
        	BookOrderItem.getAll().then(
				function(success) {
        	        $scope.bookOrderItems = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh bookOrderItem
     */
    $scope.refreshBookOrderItem = function(bookOrderId, bookId) {
    	try {
        	$scope.bookOrderItem = null;
	        BookOrderItem.get(bookOrderId, bookId).then(
				function(success) {
        	        $scope.bookOrderItem = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the bookOrderItems list page
     */
    $scope.goToBookOrderItemList = function() {
        $scope.refreshBookOrderItemList();
        $location.path('/bookOrderItem');
    }
    /**
     * Go to the bookOrderItem edit page
     */
    $scope.goToBookOrderItem = function(bookOrderId, bookId) {
        $scope.refreshBookOrderItem(bookOrderId, bookId);
        $location.path('/bookOrderItem/'+bookOrderId+'/'+bookId);
    }

    // Actions

    /**
     * Save bookOrderItem
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = BookOrderItem.create;
			} else {
				save = BookOrderItem.update;
			}
			save($scope.bookOrderItem).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.bookOrderItem = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete bookOrderItem
     */
    $scope.delete = function(bookOrderId, bookId) {
	    try {
			MessageHandler.cleanMessage();
    	    BookOrderItem.delete(bookOrderId, bookId).then(
				function(success) {
                	$scope.goToBookOrderItemList();
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
        $scope.bookOrderItem = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.bookOrderId != null && $routeParams.bookId != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshBookOrderItem($routeParams.bookOrderId, $routeParams.bookId);
    } else {
        // List page
        $scope.refreshBookOrderItemList();
    }
    
    
}]);
