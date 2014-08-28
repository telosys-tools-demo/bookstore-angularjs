'use strict';

/**
 * Controller for Badge
 **/
badgeModule.controller('BadgeCtrl', ['Badge',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Badge, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of badges
    $scope.badges = [];
	// badge to edit
    $scope.badge = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh badges list
     */
    $scope.refreshBadgeList = function() {
    	try {
			$scope.badges = [];
        	Badge.getAll().then(
				function(success) {
        	        $scope.badges = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh badge
     */
    $scope.refreshBadge = function(badgeNumber) {
    	try {
        	$scope.badge = null;
	        Badge.get(badgeNumber).then(
				function(success) {
        	        $scope.badge = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the badges list page
     */
    $scope.goToBadgeList = function() {
        $scope.refreshBadgeList();
        $location.path('/badge');
    }
    /**
     * Go to the badge edit page
     */
    $scope.goToBadge = function(badgeNumber) {
        $scope.refreshBadge(badgeNumber);
        $location.path('/badge/'+badgeNumber);
    }

    // Actions

    /**
     * Save badge
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Badge.create;
			} else {
				save = Badge.update;
			}
			save($scope.badge).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.badge = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete badge
     */
    $scope.delete = function(badgeNumber) {
	    try {
			MessageHandler.cleanMessage();
    	    Badge.delete(badgeNumber).then(
				function(success) {
                	$scope.goToBadgeList();
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
        $scope.badge = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.badgeNumber != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshBadge($routeParams.badgeNumber);
    } else {
        // List page
        $scope.refreshBadgeList();
    }
    
    
}]);
