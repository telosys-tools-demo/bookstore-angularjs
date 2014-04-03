'use strict';

/* Controller for Employee */

myAppControllers.controller('EmployeeCtrl', ['Employee', '$scope', '$routeParams', '$http', '$location', '$cookies', function(Employee, $scope, $routeParams, $http, $location, $cookies) {
	
    // mode

    $scope.mode = null;
    
	// data

    $scope.employees = {list: []};
    $scope.employee = null;

	// referencies entities

	$scope.items = {};
	$scope.items.shops = [];
	$scope.items.workgroups = [];
	$scope.items.badges = [];
	$scope.loadAllShop = function() {
        $http({method: 'GET', url: baseURL + '/items/shop'}).
        success(function(data, status, headers, config) {
            $scope.items.shops = data;
        }).
        error($scope.manageError);
    };
	$scope.loadAllWorkgroup = function() {
        $http({method: 'GET', url: baseURL + '/items/workgroup'}).
        success(function(data, status, headers, config) {
            $scope.items.workgroups = data;
        }).
        error($scope.manageError);
    };
	$scope.loadAllBadge = function() {
        $http({method: 'GET', url: baseURL + '/items/badge'}).
        success(function(data, status, headers, config) {
            $scope.items.badges = data;
        }).
        error($scope.manageError);
    };
	
	$scope.loadAllReferencies = function() {
		$scope.loadAllShop();
		$scope.loadAllWorkgroup();
		$scope.loadAllBadge();
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

	
    $scope.cleanEmployeesInScope = function() {
        $scope.employees.list = [];
    };
    $scope.cleanEmployeeInScope = function() {
        $scope.employee = null;
    };
    $scope.setAllEmployeesInScope = function(employees) {
        $scope.employees.list = employees;
    };
    $scope.addEmployeeInScope = function(employee) {
        $scope.employees.list.push(employee);
    };
    $scope.setOneEmployeeInScope = function(employee) {
        $scope.employee = employee;
    };
    
    // refresh data

    $scope.refreshEmployeeList = function() {
    	try {
        	$scope.cleanEmployeesInScope();
	        Employee.getAll().then(
				function(success) {
        	        $scope.setAllEmployeesInScope(success.data);
            	}, 
	            $scope.manageError);
    	} catch(ex) {
    		$scope.manageException(ex);
    	}
    }
    $scope.refreshEmployee = function(code) {
    	try {
        	$scope.cleanEmployeeInScope();
	        Employee.get(code).then(
				function(success) {
        	        $scope.setOneEmployeeInScope(success.data);
            	}, 
	            $scope.manageError);
    	  } catch(ex) {
        	$scope.manageException(ex);
    	}
    }

    // location

    $scope.goToEmployeeList = function() {
        $scope.refreshEmployeeList();
        $location.path('/employee');
    }
    $scope.goToEmployee = function(code) {
        $scope.refreshEmployee(code);
        $location.path('/employee/'+code);
    }

    // Actions

    $scope.save = function() {
    	try {
			$scope.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Employee.create;
			} else {
				save = Employee.update;
			}
			save($scope.employee).then(
    	        function(success) {
	                $scope.addSuccess('save ok');
                	$scope.setOneEmployeeInScope(success.data);
            	},
        	    $scope.manageError);
    	} catch(ex) {
        	$scope.manageException(ex);
    	}
    };
    $scope.delete = function(code) {
	    try {
			$scope.cleanMessage();
    	    Employee.delete(code).then(
				function(success) {
                	$scope.goToEmployeeList();
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
    } else if( $routeParams.code != null ) {
		$scope.loadAllReferencies();
		$scope.refreshEmployee($routeParams.code);
    } else {
        $scope.refreshEmployeeList();
    }
    
    
}]);
