'use strict';

/**
 * Controller for Book
 **/
bookModule.controller('BookCtrl', ['Book',  'Author', 'Publisher', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Book, Author, Publisher, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Author',  'Publisher',     // edition mode
    $scope.mode = null;
    
	// list of books
    $scope.books = [];
	// book to edit
    $scope.book = null;

	// referencies entities
	$scope.items = {};
    // authors
	$scope.items.authors = [];
    // publishers
	$scope.items.publishers = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Author.getAllAsListItems().then(
				function(success) {
        	        $scope.items.authors = success.data;
            	}, 
	            MessageHandler.manageError);
		Publisher.getAllAsListItems().then(
				function(success) {
        	        $scope.items.publishers = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh books list
     */
    $scope.refreshBookList = function() {
    	try {
			$scope.books = [];
        	Book.getAll().then(
				function(success) {
        	        $scope.books = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh book
     */
    $scope.refreshBook = function(id) {
    	try {
        	$scope.book = null;
	        Book.get(id).then(
				function(success) {
        	        $scope.book = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the books list page
     */
    $scope.goToBookList = function() {
        $scope.refreshBookList();
        $location.path('/book');
    }
    /**
     * Go to the book edit page
     */
    $scope.goToBook = function(id) {
        $scope.refreshBook(id);
        $location.path('/book/'+id);
    }

    // Actions

    /**
     * Save book
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Book.create;
			} else {
				save = Book.update;
			}
			save($scope.book).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.book = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete book
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    Book.delete(id).then(
				function(success) {
                	$scope.goToBookList();
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
        $scope.book = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshBook($routeParams.id);
    } else {
        // List page
        $scope.refreshBookList();
    }
    
    
}]);
