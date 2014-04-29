'use strict';

/* Controller for Badge */

myAppControllers.controller('BadgeCtrl', ['Badge', '$scope', '$routeParams', '$http', '$location', '$cookies', function(Badge, $scope, $routeParams, $http, $location, $cookies) {
	
    // mode

    $scope.mode = null;
    
	// data

    $scope.badges = {list: []};
    $scope.badge = null;

	// referencies entities

	$scope.items = {};
	
	$scope.loadAllReferencies = function() {
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

	
    $scope.cleanBadgesInScope = function() {
        $scope.badges.list = [];
    };
    $scope.cleanBadgeInScope = function() {
        $scope.badge = null;
    };
    $scope.setAllBadgesInScope = function(badges) {
        $scope.badges.list = badges;
    };
    $scope.addBadgeInScope = function(badge) {
        $scope.badges.list.push(badge);
    };
    $scope.setOneBadgeInScope = function(badge) {
        $scope.badge = badge;
    };
    
    // refresh data

    $scope.refreshBadgeList = function() {
    	try {
        	$scope.cleanBadgesInScope();
	        Badge.getAll().then(
				function(success) {
        	        $scope.setAllBadgesInScope(success.data);
            	}, 
	            $scope.manageError);
    	} catch(ex) {
    		$scope.manageException(ex);
    	}
    }
    $scope.refreshBadge = function(badgeNumber) {
    	try {
        	$scope.cleanBadgeInScope();
	        Badge.get(badgeNumber).then(
				function(success) {
        	        $scope.setOneBadgeInScope(success.data);
            	}, 
	            $scope.manageError);
    	  } catch(ex) {
        	$scope.manageException(ex);
    	}
    }

    // location

    $scope.goToBadgeList = function() {
        $scope.refreshBadgeList();
        $location.path('/badge');
    }
    $scope.goToBadge = function(badgeNumber) {
        $scope.refreshBadge(badgeNumber);
        $location.path('/badge/'+badgeNumber);
    }

    // Actions

    $scope.save = function() {
    	try {
			$scope.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Badge.create;
			} else {
				save = Badge.update;
			}
			save($scope.badge).then(
    	        function(success) {
	                $scope.addSuccess('save ok');
                	$scope.setOneBadgeInScope(success.data);
            	},
        	    $scope.manageError);
    	} catch(ex) {
        	$scope.manageException(ex);
    	}
    };
    $scope.delete = function(badgeNumber) {
	    try {
			$scope.cleanMessage();
    	    Badge.delete(badgeNumber).then(
				function(success) {
                	$scope.goToBadgeList();
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
    } else if( $routeParams.badgeNumber != null ) {
		$scope.loadAllReferencies();
		$scope.refreshBadge($routeParams.badgeNumber);
    } else {
        $scope.refreshBadgeList();
    }
    
    
}]);
