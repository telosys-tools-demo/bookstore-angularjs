'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('workgroup.module'));
  
  describe('WorkgroupCtrl', function(){
    var WorkgroupCtrl, Workgroup,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Workgroup service
    	Workgroup = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'workgroup1'});
    			return deferred.promise;
    		}
    	};
		
				WorkgroupCtrl = $controller('WorkgroupCtrl', {
    		'Workgroup': Workgroup,
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
    	expect($scope.workgroup).toBeNull();
    	expect($scope.workgroups).toBe('workgroup1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshWorkgroupList', function() {
    	// given
    	Workgroup.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'workgroup2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshWorkgroupList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.workgroups).toBe('workgroup2');
    });
    
    it('refreshWorkgroup', function() {
    	// given
    	Workgroup.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'workgroup'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshWorkgroup('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.workgroup).toBe('workgroup'+'1');
    });
    
	it('goToWorkgroupList', function() {
    	// given
    	spyOn($scope, "refreshWorkgroupList");
    	
    	// when
    	$scope.goToWorkgroupList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshWorkgroupList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/workgroup');
    });
    
    it('goToWorkgroup', function() {
    	// given
    	spyOn($scope, "refreshWorkgroup");
    	var id = 1;
    	
    	// when
    	$scope.goToWorkgroup(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshWorkgroup).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/workgroup'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.workgroup = {id:'1', name:'workgroup'};
    	
    	$scope.mode = 'create';
    	Workgroup.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'workgroupSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.workgroup).toBe('workgroupSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.workgroup = {id:'1', name:'workgroup'};
    	
    	$scope.mode = 'update';
    	Workgroup.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'workgroupSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.workgroup).toBe('workgroupSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Workgroup.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToWorkgroupList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToWorkgroupList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : workgroup create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/workgroup/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.workgroup).toBeNull();
    	expect($scope.workgroups).toBe('workgroup1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});