'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('employee.module'));
  
  describe('EmployeeCtrl', function(){
    var EmployeeCtrl, Employee, Shop,  Workgroup,  Badge, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
    beforeEach(inject(function($injector) {
    	$controller = $injector.get('$controller');
    	$q = $injector.get('$q');
    	$rootScope = $injector.get('$rootScope');
    	$scope = $rootScope.$new();
    	$routeParams = $injector.get('$routeParams');
    	$httpBackend = $injector.get('$httpBackend');
    	
    	// location is mocked due to redirection in browser : karma does not support it
    	$location = {
    		path: jasmine.createSpy("path").andCallFake(function() {
        	    return "";
        	})
    	};
    	
    	// Messages
    	MessageHandler = {
    		cleanMessage: jasmine.createSpy("cleanMessage"),
    		addSuccess: jasmine.createSpy("addSuccess"),
    		manageError: jasmine.createSpy("manageError"),
    		manageException: jasmine.createSpy("manageException"),
    	};

    	// Employee service
    	Employee = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'employee1'});
    			return deferred.promise;
    		}
    	};
		
				Shop = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Workgroup = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Badge = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				EmployeeCtrl = $controller('EmployeeCtrl', {
    		'Employee': Employee,
						'Shop': Shop,
						'Workgroup': Workgroup,
						'Badge': Badge,
			    		'$scope': $scope,
    		'$routeParams': $routeParams,
    		'$http': $httpBackend,
    		'$location': $location,
    		'MessageHandler': MessageHandler
    	});
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
    it('init', function() {
    	$rootScope.$apply();
    	expect($scope.mode).toBeNull();
    	expect($scope.employee).toBeNull();
    	expect($scope.employees).toBe('employee1');
    	expect(Object.keys($scope.items).length).toBe(3);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshEmployeeList', function() {
    	// given
    	Employee.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'employee2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshEmployeeList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.employees).toBe('employee2');
    });
    
    it('refreshEmployee', function() {
    	// given
    	Employee.get = function(code) {
			var deferred = $q.defer();
			deferred.resolve({data:'employee'+code});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshEmployee('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.employee).toBe('employee'+'1');
    });
    
	it('goToEmployeeList', function() {
    	// given
    	spyOn($scope, "refreshEmployeeList");
    	
    	// when
    	$scope.goToEmployeeList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshEmployeeList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/employee');
    });
    
    it('goToEmployee', function() {
    	// given
    	spyOn($scope, "refreshEmployee");
    	var code = 1;
    	
    	// when
    	$scope.goToEmployee(code);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshEmployee).toHaveBeenCalledWith(code);
    	expect($location.path).toHaveBeenCalledWith('/employee'+'/'+code);
    });
    
    it('save : create', function() {
    	// given
    	$scope.employee = {code:'1', name:'employee'};
    	
    	$scope.mode = 'create';
    	Employee.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'employeeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.employee).toBe('employeeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.employee = {code:'1', name:'employee'};
    	
    	$scope.mode = 'update';
    	Employee.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'employeeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.employee).toBe('employeeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Employee.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToEmployeeList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToEmployeeList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : employee create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/employee/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.employee).toBeNull();
    	expect($scope.employees).toBe('employee1');
    	expect(Object.keys($scope.items).length).toBe(3);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});