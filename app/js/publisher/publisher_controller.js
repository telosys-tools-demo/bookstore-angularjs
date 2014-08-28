'use strict';

/**
 * Controller for Publisher
 **/
publisherModule.controller('PublisherCtrl', ['Publisher',  'Country', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Publisher, Country, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'Country',     // edition mode
    $scope.mode = null;
    
	// list of publishers
    $scope.publishers = [];
	// publisher to edit
    $scope.publisher = null;

	// referencies entities
	$scope.items = {};
    // countrys
	$scope.items.countrys = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Country.getAllAsListItems().then(
				function(success) {
        	        $scope.items.countrys = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh publishers list
     */
    $scope.refreshPublisherList = function() {
    	try {
			$scope.publishers = [];
        	Publisher.getAll().then(
				function(success) {
        	        $scope.publishers = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh publisher
     */
    $scope.refreshPublisher = function(code) {
    	try {
        	$scope.publisher = null;
	        Publisher.get(code).then(
				function(success) {
        	        $scope.publisher = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the publishers list page
     */
    $scope.goToPublisherList = function() {
        $scope.refreshPublisherList();
        $location.path('/publisher');
    }
    /**
     * Go to the publisher edit page
     */
    $scope.goToPublisher = function(code) {
        $scope.refreshPublisher(code);
        $location.path('/publisher/'+code);
    }

    // Actions

    /**
     * Save publisher
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Publisher.create;
			} else {
				save = Publisher.update;
			}
			save($scope.publisher).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.publisher = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete publisher
     */
    $scope.delete = function(code) {
	    try {
			MessageHandler.cleanMessage();
    	    Publisher.delete(code).then(
				function(success) {
                	$scope.goToPublisherList();
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
        $scope.publisher = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.code != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshPublisher($routeParams.code);
    } else {
        // List page
        $scope.refreshPublisherList();
    }
    
    
}]);
