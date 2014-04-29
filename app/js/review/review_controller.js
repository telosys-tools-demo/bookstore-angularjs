'use strict';

/* Controller for Review */

myAppControllers.controller('ReviewCtrl', ['Review', '$scope', '$routeParams', '$http', '$location', '$cookies', function(Review, $scope, $routeParams, $http, $location, $cookies) {
	
    // mode

    $scope.mode = null;
    
	// data

    $scope.reviews = {list: []};
    $scope.review = null;

	// referencies entities

	$scope.items = {};
	$scope.items.books = [];
	$scope.items.customers = [];
	$scope.loadAllBook = function() {
        $http({method: 'GET', url: baseURL + '/items/book'}).
        success(function(data, status, headers, config) {
            $scope.items.books = data;
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
		$scope.loadAllBook();
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

	
    $scope.cleanReviewsInScope = function() {
        $scope.reviews.list = [];
    };
    $scope.cleanReviewInScope = function() {
        $scope.review = null;
    };
    $scope.setAllReviewsInScope = function(reviews) {
        $scope.reviews.list = reviews;
    };
    $scope.addReviewInScope = function(review) {
        $scope.reviews.list.push(review);
    };
    $scope.setOneReviewInScope = function(review) {
        $scope.review = review;
    };
    
    // refresh data

    $scope.refreshReviewList = function() {
    	try {
        	$scope.cleanReviewsInScope();
	        Review.getAll().then(
				function(success) {
        	        $scope.setAllReviewsInScope(success.data);
            	}, 
	            $scope.manageError);
    	} catch(ex) {
    		$scope.manageException(ex);
    	}
    }
    $scope.refreshReview = function(customerCode, bookId) {
    	try {
        	$scope.cleanReviewInScope();
	        Review.get(customerCode, bookId).then(
				function(success) {
        	        $scope.setOneReviewInScope(success.data);
            	}, 
	            $scope.manageError);
    	  } catch(ex) {
        	$scope.manageException(ex);
    	}
    }

    // location

    $scope.goToReviewList = function() {
        $scope.refreshReviewList();
        $location.path('/review');
    }
    $scope.goToReview = function(customerCode, bookId) {
        $scope.refreshReview(customerCode, bookId);
        $location.path('/review/'+customerCode+'/'+bookId);
    }

    // Actions

    $scope.save = function() {
    	try {
			$scope.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Review.create;
			} else {
				save = Review.update;
			}
			save($scope.review).then(
    	        function(success) {
	                $scope.addSuccess('save ok');
                	$scope.setOneReviewInScope(success.data);
            	},
        	    $scope.manageError);
    	} catch(ex) {
        	$scope.manageException(ex);
    	}
    };
    $scope.delete = function(customerCode, bookId) {
	    try {
			$scope.cleanMessage();
    	    Review.delete(customerCode, bookId).then(
				function(success) {
                	$scope.goToReviewList();
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
    } else if( $routeParams.customerCode != null && $routeParams.bookId != null ) {
		$scope.loadAllReferencies();
		$scope.refreshReview($routeParams.customerCode, $routeParams.bookId);
    } else {
        $scope.refreshReviewList();
    }
    
    
}]);
