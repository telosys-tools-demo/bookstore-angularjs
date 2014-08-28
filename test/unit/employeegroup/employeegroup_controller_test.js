'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('employeeGroup.module'));
  
  describe('EmployeeGroupCtrl', function(){
    var EmployeeGroupCtrl, EmployeeGroup,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// EmployeeGroup service
    	EmployeeGroup = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'employeeGroup1'});
    			return deferred.promise;
    		}
    	};
		
				EmployeeGroupCtrl = $controller('EmployeeGroupCtrl', {
    		'EmployeeGroup': EmployeeGroup,
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
    	expect($scope.employeeGroup).toBeNull();
    	expect($scope.employeeGroups).toBe('employeeGroup1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshEmployeeGroupList', function() {
    	// given
    	EmployeeGroup.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'employeeGroup2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshEmployeeGroupList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.employeeGroups).toBe('employeeGroup2');
    });
    
    it('refreshEmployeeGroup', function() {
    	// given
    	EmployeeGroup.get = function(employeeCode, groupId) {
			var deferred = $q.defer();
			deferred.resolve({data:'employeeGroup'+employeeCode+groupId});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshEmployeeGroup('1', '2');
    	$scope.$apply();
    	
    	// then
    	expect($scope.employeeGroup).toBe('employeeGroup'+'1'+'2');
    });
    
	it('goToEmployeeGroupList', function() {
    	// given
    	spyOn($scope, "refreshEmployeeGroupList");
    	
    	// when
    	$scope.goToEmployeeGroupList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshEmployeeGroupList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/employeeGroup');
    });
    
    it('goToEmployeeGroup', function() {
    	// given
    	spyOn($scope, "refreshEmployeeGroup");
    	var employeeCode = 1;
    	var groupId = 2;
    	
    	// when
    	$scope.goToEmployeeGroup(employeeCode, groupId);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshEmployeeGroup).toHaveBeenCalledWith(employeeCode, groupId);
    	expect($location.path).toHaveBeenCalledWith('/employeeGroup'+'/'+employeeCode+'/'+groupId);
    });
    
    it('save : create', function() {
    	// given
    	$scope.employeeGroup = {employeeCode:'1', groupId:'2', name:'employeeGroup'};
    	
    	$scope.mode = 'create';
    	EmployeeGroup.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'employeeGroupSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.employeeGroup).toBe('employeeGroupSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.employeeGroup = {employeeCode:'1', groupId:'2', name:'employeeGroup'};
    	
    	$scope.mode = 'update';
    	EmployeeGroup.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'employeeGroupSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.employeeGroup).toBe('employeeGroupSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	EmployeeGroup.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToEmployeeGroupList");
    	
    	// when
    	$scope.delete('1', '2');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToEmployeeGroupList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : employeeGroup create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/employeeGroup/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.employeeGroup).toBeNull();
    	expect($scope.employeeGroups).toBe('employeeGroup1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});