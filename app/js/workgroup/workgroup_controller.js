'use strict';

/**
 * Controller for Workgroup
 **/
workgroupModule.controller('WorkgroupCtrl', ['Workgroup',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(Workgroup, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of workgroups
    $scope.workgroups = [];
	// workgroup to edit
    $scope.workgroup = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh workgroups list
     */
    $scope.refreshWorkgroupList = function() {
    	try {
			$scope.workgroups = [];
        	Workgroup.getAll().then(
				function(success) {
        	        $scope.workgroups = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh workgroup
     */
    $scope.refreshWorkgroup = function(id) {
    	try {
        	$scope.workgroup = null;
	        Workgroup.get(id).then(
				function(success) {
        	        $scope.workgroup = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the workgroups list page
     */
    $scope.goToWorkgroupList = function() {
        $scope.refreshWorkgroupList();
        $location.path('/workgroup');
    }
    /**
     * Go to the workgroup edit page
     */
    $scope.goToWorkgroup = function(id) {
        $scope.refreshWorkgroup(id);
        $location.path('/workgroup/'+id);
    }

    // Actions

    /**
     * Save workgroup
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Workgroup.create;
			} else {
				save = Workgroup.update;
			}
			save($scope.workgroup).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.workgroup = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete workgroup
     */
    $scope.delete = function(id) {
	    try {
			MessageHandler.cleanMessage();
    	    Workgroup.delete(id).then(
				function(success) {
                	$scope.goToWorkgroupList();
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
        $scope.workgroup = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.id != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshWorkgroup($routeParams.id);
    } else {
        // List page
        $scope.refreshWorkgroupList();
    }
    
    
}]);
