'use strict';

/**
 * Controller for EmployeeGroup
 **/
employeeGroupModule.controller('EmployeeGroupCtrl', ['EmployeeGroup',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(EmployeeGroup, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of employeeGroups
    $scope.employeeGroups = [];
	// employeeGroup to edit
    $scope.employeeGroup = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh employeeGroups list
     */
    $scope.refreshEmployeeGroupList = function() {
    	try {
			$scope.employeeGroups = [];
        	EmployeeGroup.getAll().then(
				function(success) {
        	        $scope.employeeGroups = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh employeeGroup
     */
    $scope.refreshEmployeeGroup = function(employeeCode, groupId) {
    	try {
        	$scope.employeeGroup = null;
	        EmployeeGroup.get(employeeCode, groupId).then(
				function(success) {
        	        $scope.employeeGroup = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the employeeGroups list page
     */
    $scope.goToEmployeeGroupList = function() {
        $scope.refreshEmployeeGroupList();
        $location.path('/employeeGroup');
    }
    /**
     * Go to the employeeGroup edit page
     */
    $scope.goToEmployeeGroup = function(employeeCode, groupId) {
        $scope.refreshEmployeeGroup(employeeCode, groupId);
        $location.path('/employeeGroup/'+employeeCode+'/'+groupId);
    }

    // Actions

    /**
     * Save employeeGroup
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = EmployeeGroup.create;
			} else {
				save = EmployeeGroup.update;
			}
			save($scope.employeeGroup).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.employeeGroup = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete employeeGroup
     */
    $scope.delete = function(employeeCode, groupId) {
	    try {
			MessageHandler.cleanMessage();
    	    EmployeeGroup.delete(employeeCode, groupId).then(
				function(success) {
                	$scope.goToEmployeeGroupList();
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
        $scope.employeeGroup = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.employeeCode != null && $routeParams.groupId != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshEmployeeGroup($routeParams.employeeCode, $routeParams.groupId);
    } else {
        // List page
        $scope.refreshEmployeeGroupList();
    }
    
    
}]);
