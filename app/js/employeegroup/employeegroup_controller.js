'use strict';

/* Controller for EmployeeGroup */

myAppControllers.controller('EmployeeGroupCtrl', ['EmployeeGroup', '$scope', '$routeParams', '$http', '$location', '$cookies', function(EmployeeGroup, $scope, $routeParams, $http, $location, $cookies) {
	
    // mode

    $scope.mode = null;
    
	// data

    $scope.employeeGroups = {list: []};
    $scope.employeeGroup = null;

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

	
    $scope.cleanEmployeeGroupsInScope = function() {
        $scope.employeeGroups.list = [];
    };
    $scope.cleanEmployeeGroupInScope = function() {
        $scope.employeeGroup = null;
    };
    $scope.setAllEmployeeGroupsInScope = function(employeeGroups) {
        $scope.employeeGroups.list = employeeGroups;
    };
    $scope.addEmployeeGroupInScope = function(employeeGroup) {
        $scope.employeeGroups.list.push(employeeGroup);
    };
    $scope.setOneEmployeeGroupInScope = function(employeeGroup) {
        $scope.employeeGroup = employeeGroup;
    };
    
    // refresh data

    $scope.refreshEmployeeGroupList = function() {
    	try {
        	$scope.cleanEmployeeGroupsInScope();
	        EmployeeGroup.getAll().then(
				function(success) {
        	        $scope.setAllEmployeeGroupsInScope(success.data);
            	}, 
	            $scope.manageError);
    	} catch(ex) {
    		$scope.manageException(ex);
    	}
    }
    $scope.refreshEmployeeGroup = function(employeeCode, groupId) {
    	try {
        	$scope.cleanEmployeeGroupInScope();
	        EmployeeGroup.get(employeeCode, groupId).then(
				function(success) {
        	        $scope.setOneEmployeeGroupInScope(success.data);
            	}, 
	            $scope.manageError);
    	  } catch(ex) {
        	$scope.manageException(ex);
    	}
    }

    // location

    $scope.goToEmployeeGroupList = function() {
        $scope.refreshEmployeeGroupList();
        $location.path('/employeeGroup');
    }
    $scope.goToEmployeeGroup = function(employeeCode, groupId) {
        $scope.refreshEmployeeGroup(employeeCode, groupId);
        $location.path('/employeeGroup/'+employeeCode+'/'+groupId);
    }

    // Actions

    $scope.save = function() {
    	try {
			$scope.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = EmployeeGroup.create;
			} else {
				save = EmployeeGroup.update;
			}
			save($scope.employeeGroup).then(
    	        function(success) {
	                $scope.addSuccess('save ok');
                	$scope.setOneEmployeeGroupInScope(success.data);
            	},
        	    $scope.manageError);
    	} catch(ex) {
        	$scope.manageException(ex);
    	}
    };
    $scope.delete = function(employeeCode, groupId) {
	    try {
			$scope.cleanMessage();
    	    EmployeeGroup.delete(employeeCode, groupId).then(
				function(success) {
                	$scope.goToEmployeeGroupList();
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
    } else if( $routeParams.employeeCode != null && $routeParams.groupId != null ) {
		$scope.loadAllReferencies();
		$scope.refreshEmployeeGroup($routeParams.employeeCode, $routeParams.groupId);
    } else {
        $scope.refreshEmployeeGroupList();
    }
    
    
}]);
