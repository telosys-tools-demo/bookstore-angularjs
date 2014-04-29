'use strict';

/**
 * Controller for Employee
 **/
employeeModule.controller('EmployeeCtrl', ['Employee', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', function(Employee, $scope, $routeParams, $http, $location, $cookies, MessageHandler) {
	
    // edition mode
    $scope.mode = null;
    
	// list of employees
    $scope.employees = [];
	// employee to edit
    $scope.employee = null;

	// referencies entities
	$scope.items = {};
    // shops
	$scope.items.shops = [];
    // workgroups
	$scope.items.workgroups = [];
    // badges
	$scope.items.badges = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		$scope.loadAllShops();
		$scope.loadAllWorkgroups();
		$scope.loadAllBadges();
    };
    /**
     * Load all shops
     */
	$scope.loadAllShops = function() {
        $http({method: 'GET', url: baseURL + '/items/shop'}).
        success(function(data, status, headers, config) {
            $scope.items.shops = data;
        }).
        error(MessageHandler.manageError);
    };
    /**
     * Load all workgroups
     */
	$scope.loadAllWorkgroups = function() {
        $http({method: 'GET', url: baseURL + '/items/workgroup'}).
        success(function(data, status, headers, config) {
            $scope.items.workgroups = data;
        }).
        error(MessageHandler.manageError);
    };
    /**
     * Load all badges
     */
	$scope.loadAllBadges = function() {
        $http({method: 'GET', url: baseURL + '/items/badge'}).
        success(function(data, status, headers, config) {
            $scope.items.badges = data;
        }).
        error(MessageHandler.manageError);
    };
    
    /**
     * Refresh employees list
     */
    $scope.refreshEmployeeList = function() {
    	try {
			$scope.employees = [];
        	Employee.getAll().then(
				function(success) {
        	        $scope.employees = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh employee
     */
    $scope.refreshEmployee = function(code) {
    	try {
        	$scope.employee = null;
	        Employee.get(code).then(
				function(success) {
        	        $scope.employee = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the employees list page
     */
    $scope.goToEmployeeList = function() {
        $scope.refreshEmployeeList();
        $location.path('/employee');
    }
    /**
     * Go to the employee edit page
     */
    $scope.goToEmployee = function(code) {
        $scope.refreshEmployee(code);
        $location.path('/employee/'+code);
    }

    // Actions

    /**
     * Save employee
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Employee.create;
			} else {
				save = Employee.update;
			}
			save($scope.employee).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.employee = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete employee
     */
    $scope.delete = function(code) {
	    try {
			MessageHandler.cleanMessage();
    	    Employee.delete(code).then(
				function(success) {
                	$scope.goToEmployeeList();
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
        $scope.employee = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.code != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshEmployee($routeParams.code);
    } else {
        // List page
        $scope.refreshEmployeeList();
    }
    
    
}]);
