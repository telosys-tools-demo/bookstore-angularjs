'use strict';

/**
 * Controller for Review
 **/
reviewModule.controller('ReviewCtrl', ['Review', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', function(Review, $scope, $routeParams, $http, $location, $cookies, MessageHandler) {
	
    // edition mode
    $scope.mode = null;
    
	// list of reviews
    $scope.reviews = [];
	// review to edit
    $scope.review = null;

	// referencies entities
	$scope.items = {};
    // books
	$scope.items.books = [];
    // customers
	$scope.items.customers = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		$scope.loadAllBooks();
		$scope.loadAllCustomers();
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
     * Load all customers
     */
	$scope.loadAllCustomers = function() {
        $http({method: 'GET', url: baseURL + '/items/customer'}).
        success(function(data, status, headers, config) {
            $scope.items.customers = data;
        }).
        error(MessageHandler.manageError);
    };
    
    /**
     * Refresh reviews list
     */
    $scope.refreshReviewList = function() {
    	try {
			$scope.reviews = [];
        	Review.getAll().then(
				function(success) {
        	        $scope.reviews = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh review
     */
    $scope.refreshReview = function(customerCode, bookId) {
    	try {
        	$scope.review = null;
	        Review.get(customerCode, bookId).then(
				function(success) {
        	        $scope.review = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the reviews list page
     */
    $scope.goToReviewList = function() {
        $scope.refreshReviewList();
        $location.path('/review');
    }
    /**
     * Go to the review edit page
     */
    $scope.goToReview = function(customerCode, bookId) {
        $scope.refreshReview(customerCode, bookId);
        $location.path('/review/'+customerCode+'/'+bookId);
    }

    // Actions

    /**
     * Save review
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Review.create;
			} else {
				save = Review.update;
			}
			save($scope.review).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.review = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete review
     */
    $scope.delete = function(customerCode, bookId) {
	    try {
			MessageHandler.cleanMessage();
    	    Review.delete(customerCode, bookId).then(
				function(success) {
                	$scope.goToReviewList();
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
        $scope.review = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.customerCode != null && $routeParams.bookId != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshReview($routeParams.customerCode, $routeParams.bookId);
    } else {
        // List page
        $scope.refreshReviewList();
    }
    
    
}]);
