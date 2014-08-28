'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('customer.module'));
  
  describe('CustomerCtrl', function(){
    var CustomerCtrl, Customer, Country, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Customer service
    	Customer = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'customer1'});
    			return deferred.promise;
    		}
    	};
		
				Country = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				CustomerCtrl = $controller('CustomerCtrl', {
    		'Customer': Customer,
						'Country': Country,
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
    	expect($scope.customer).toBeNull();
    	expect($scope.customers).toBe('customer1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshCustomerList', function() {
    	// given
    	Customer.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'customer2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshCustomerList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.customers).toBe('customer2');
    });
    
    it('refreshCustomer', function() {
    	// given
    	Customer.get = function(code) {
			var deferred = $q.defer();
			deferred.resolve({data:'customer'+code});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshCustomer('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.customer).toBe('customer'+'1');
    });
    
	it('goToCustomerList', function() {
    	// given
    	spyOn($scope, "refreshCustomerList");
    	
    	// when
    	$scope.goToCustomerList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshCustomerList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/customer');
    });
    
    it('goToCustomer', function() {
    	// given
    	spyOn($scope, "refreshCustomer");
    	var code = 1;
    	
    	// when
    	$scope.goToCustomer(code);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshCustomer).toHaveBeenCalledWith(code);
    	expect($location.path).toHaveBeenCalledWith('/customer'+'/'+code);
    });
    
    it('save : create', function() {
    	// given
    	$scope.customer = {code:'1', name:'customer'};
    	
    	$scope.mode = 'create';
    	Customer.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'customerSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.customer).toBe('customerSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.customer = {code:'1', name:'customer'};
    	
    	$scope.mode = 'update';
    	Customer.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'customerSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.customer).toBe('customerSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Customer.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToCustomerList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToCustomerList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : customer create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/customer/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.customer).toBeNull();
    	expect($scope.customers).toBe('customer1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});