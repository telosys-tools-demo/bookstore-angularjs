'use strict';

/**
 * Controller for Author
 **/
authorModule.controller('AuthorCtrl', ['Author',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Author, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of authors
    $scope.authors = [];
	// author to edit
    $scope.author = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh authors list
     */
    $scope.refreshAuthorList = function() {
    	try {
			$scope.authors = [];
        	Author.getAll().then(
				function(success) {
        	        $scope.authors = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh author
     */
    $scope.refreshAuthor = function(id) {
    	try {
        	$scope.author = null;
	        Author.get(id).then(
				function(success) {
        	        $scope.author = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the authors list page
     */
    $scope.goToAuthorList = function() {
        $scope.refreshAuthorList();
        $location.path('/author');
    }
    /**
     * Go to the author edit page
     */
    $scope.goToAuthor = function(id) {
        $scope.refreshAuthor(id);
        $location.path('/author/'+id);
    }

    // Actions

    /**
     * Save author
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Author.create;
			} else {
				save = Author.update;
			}
			save($scope.author).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.author = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete author
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    Author.delete(id).then(
				function(success) {
                	$scope.goToAuthorList();
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
        $scope.author = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshAuthor($routeParams.id);
    } else {
        // List page
        $scope.refreshAuthorList();
    }
    
    
}]);
