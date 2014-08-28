'use strict';

/**
 * Controller for Synopsis
 **/
synopsisModule.controller('SynopsisCtrl', ['Synopsis',  'Book', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Synopsis, Book, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Book',     // edition mode
    $scope.mode = null;
    
	// list of synopsiss
    $scope.synopsiss = [];
	// synopsis to edit
    $scope.synopsis = null;

	// referencies entities
	$scope.items = {};
    // books
	$scope.items.books = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Book.getAllAsListItems().then(
				function(success) {
        	        $scope.items.books = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh synopsiss list
     */
    $scope.refreshSynopsisList = function() {
    	try {
			$scope.synopsiss = [];
        	Synopsis.getAll().then(
				function(success) {
        	        $scope.synopsiss = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh synopsis
     */
    $scope.refreshSynopsis = function(bookId) {
    	try {
        	$scope.synopsis = null;
	        Synopsis.get(bookId).then(
				function(success) {
        	        $scope.synopsis = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the synopsiss list page
     */
    $scope.goToSynopsisList = function() {
        $scope.refreshSynopsisList();
        $location.path('/synopsis');
    }
    /**
     * Go to the synopsis edit page
     */
    $scope.goToSynopsis = function(bookId) {
        $scope.refreshSynopsis(bookId);
        $location.path('/synopsis/'+bookId);
    }

    // Actions

    /**
     * Save synopsis
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Synopsis.create;
			} else {
				save = Synopsis.update;
			}
			save($scope.synopsis).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.synopsis = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete synopsis
     */
    $scope.delete = function(bookId) {
	    try {
			MessageHandler.cleanMessage();
    	    Synopsis.delete(bookId).then(
				function(success) {
                	$scope.goToSynopsisList();
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
        $scope.synopsis = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.bookId != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshSynopsis($routeParams.bookId);
    } else {
        // List page
        $scope.refreshSynopsisList();
    }
    
    
}]);
