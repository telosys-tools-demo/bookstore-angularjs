'use strict';

/* Controller for Workgroup */

myAppControllers.controller('WorkgroupCtrl', ['Workgroup', '$scope', '$routeParams', '$http', '$location', '$cookies', function(Workgroup, $scope, $routeParams, $http, $location, $cookies) {
	
    // mode

    $scope.mode = null;
    
	// data

    $scope.workgroups = {list: []};
    $scope.workgroup = null;

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

	
    $scope.cleanWorkgroupsInScope = function() {
        $scope.workgroups.list = [];
    };
    $scope.cleanWorkgroupInScope = function() {
        $scope.workgroup = null;
    };
    $scope.setAllWorkgroupsInScope = function(workgroups) {
        $scope.workgroups.list = workgroups;
    };
    $scope.addWorkgroupInScope = function(workgroup) {
        $scope.workgroups.list.push(workgroup);
    };
    $scope.setOneWorkgroupInScope = function(workgroup) {
        $scope.workgroup = workgroup;
    };
    
    // refresh data

    $scope.refreshWorkgroupList = function() {
    	try {
        	$scope.cleanWorkgroupsInScope();
	        Workgroup.getAll().then(
				function(success) {
        	        $scope.setAllWorkgroupsInScope(success.data);
            	}, 
	            $scope.manageError);
    	} catch(ex) {
    		$scope.manageException(ex);
    	}
    }
    $scope.refreshWorkgroup = function(id) {
    	try {
        	$scope.cleanWorkgroupInScope();
	        Workgroup.get(id).then(
				function(success) {
        	        $scope.setOneWorkgroupInScope(success.data);
            	}, 
	            $scope.manageError);
    	  } catch(ex) {
        	$scope.manageException(ex);
    	}
    }

    // location

    $scope.goToWorkgroupList = function() {
        $scope.refreshWorkgroupList();
        $location.path('/workgroup');
    }
    $scope.goToWorkgroup = function(id) {
        $scope.refreshWorkgroup(id);
        $location.path('/workgroup/'+id);
    }

    // Actions

    $scope.save = function() {
    	try {
			$scope.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Workgroup.create;
			} else {
				save = Workgroup.update;
			}
			save($scope.workgroup).then(
    	        function(success) {
	                $scope.addSuccess('save ok');
                	$scope.setOneWorkgroupInScope(success.data);
            	},
        	    $scope.manageError);
    	} catch(ex) {
        	$scope.manageException(ex);
    	}
    };
    $scope.delete = function(id) {
	    try {
			$scope.cleanMessage();
    	    Workgroup.delete(id).then(
				function(success) {
                	$scope.goToWorkgroupList();
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
    } else if( $routeParams.id != null ) {
		$scope.loadAllReferencies();
		$scope.refreshWorkgroup($routeParams.id);
    } else {
        $scope.refreshWorkgroupList();
    }
    
    
}]);
