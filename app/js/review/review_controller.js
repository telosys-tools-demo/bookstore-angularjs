'use strict';

/**
 * Controller for Review
 **/
reviewModule.controller('ReviewCtrl', ['Review',  'Book', 'Customer', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Review, Book, Customer, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Book',  'Customer',     // edition mode
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
		Book.getAllAsListItems().then(
				function(success) {
        	        $scope.items.books = success.data;
            	}, 
	            MessageHandler.manageError);
		Customer.getAllAsListItems().then(
				function(success) {
        	        $scope.items.customers = success.data;
            	}, 
	            MessageHandler.manageError);
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
