'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('bookOrder.module'));
  
  describe('BookOrderCtrl', function(){
    var BookOrderCtrl, BookOrder, Shop,  Employee,  Customer, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// BookOrder service
    	BookOrder = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'bookOrder1'});
    			return deferred.promise;
    		}
    	};
		
				Shop = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Employee = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Customer = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				BookOrderCtrl = $controller('BookOrderCtrl', {
    		'BookOrder': BookOrder,
						'Shop': Shop,
						'Employee': Employee,
						'Customer': Customer,
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
    	expect($scope.bookOrder).toBeNull();
    	expect($scope.bookOrders).toBe('bookOrder1');
    	expect(Object.keys($scope.items).length).toBe(3);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshBookOrderList', function() {
    	// given
    	BookOrder.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'bookOrder2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshBookOrderList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.bookOrders).toBe('bookOrder2');
    });
    
    it('refreshBookOrder', function() {
    	// given
    	BookOrder.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'bookOrder'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshBookOrder('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.bookOrder).toBe('bookOrder'+'1');
    });
    
	it('goToBookOrderList', function() {
    	// given
    	spyOn($scope, "refreshBookOrderList");
    	
    	// when
    	$scope.goToBookOrderList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshBookOrderList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/bookOrder');
    });
    
    it('goToBookOrder', function() {
    	// given
    	spyOn($scope, "refreshBookOrder");
    	var id = 1;
    	
    	// when
    	$scope.goToBookOrder(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshBookOrder).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/bookOrder'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.bookOrder = {id:'1', name:'bookOrder'};
    	
    	$scope.mode = 'create';
    	BookOrder.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'bookOrderSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.bookOrder).toBe('bookOrderSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.bookOrder = {id:'1', name:'bookOrder'};
    	
    	$scope.mode = 'update';
    	BookOrder.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'bookOrderSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.bookOrder).toBe('bookOrderSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	BookOrder.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToBookOrderList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToBookOrderList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : bookOrder create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/bookOrder/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.bookOrder).toBeNull();
    	expect($scope.bookOrders).toBe('bookOrder1');
    	expect(Object.keys($scope.items).length).toBe(3);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});