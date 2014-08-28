'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('bookOrderItem.module'));
  
  describe('BookOrderItemCtrl', function(){
    var BookOrderItemCtrl, BookOrderItem, BookOrder,  Book, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// BookOrderItem service
    	BookOrderItem = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'bookOrderItem1'});
    			return deferred.promise;
    		}
    	};
		
				BookOrder = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Book = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				BookOrderItemCtrl = $controller('BookOrderItemCtrl', {
    		'BookOrderItem': BookOrderItem,
						'BookOrder': BookOrder,
						'Book': Book,
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
    	expect($scope.bookOrderItem).toBeNull();
    	expect($scope.bookOrderItems).toBe('bookOrderItem1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshBookOrderItemList', function() {
    	// given
    	BookOrderItem.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'bookOrderItem2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshBookOrderItemList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.bookOrderItems).toBe('bookOrderItem2');
    });
    
    it('refreshBookOrderItem', function() {
    	// given
    	BookOrderItem.get = function(bookOrderId, bookId) {
			var deferred = $q.defer();
			deferred.resolve({data:'bookOrderItem'+bookOrderId+bookId});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshBookOrderItem('1', '2');
    	$scope.$apply();
    	
    	// then
    	expect($scope.bookOrderItem).toBe('bookOrderItem'+'1'+'2');
    });
    
	it('goToBookOrderItemList', function() {
    	// given
    	spyOn($scope, "refreshBookOrderItemList");
    	
    	// when
    	$scope.goToBookOrderItemList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshBookOrderItemList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/bookOrderItem');
    });
    
    it('goToBookOrderItem', function() {
    	// given
    	spyOn($scope, "refreshBookOrderItem");
    	var bookOrderId = 1;
    	var bookId = 2;
    	
    	// when
    	$scope.goToBookOrderItem(bookOrderId, bookId);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshBookOrderItem).toHaveBeenCalledWith(bookOrderId, bookId);
    	expect($location.path).toHaveBeenCalledWith('/bookOrderItem'+'/'+bookOrderId+'/'+bookId);
    });
    
    it('save : create', function() {
    	// given
    	$scope.bookOrderItem = {bookOrderId:'1', bookId:'2', name:'bookOrderItem'};
    	
    	$scope.mode = 'create';
    	BookOrderItem.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'bookOrderItemSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.bookOrderItem).toBe('bookOrderItemSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.bookOrderItem = {bookOrderId:'1', bookId:'2', name:'bookOrderItem'};
    	
    	$scope.mode = 'update';
    	BookOrderItem.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'bookOrderItemSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.bookOrderItem).toBe('bookOrderItemSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	BookOrderItem.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToBookOrderItemList");
    	
    	// when
    	$scope.delete('1', '2');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToBookOrderItemList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : bookOrderItem create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/bookOrderItem/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.bookOrderItem).toBeNull();
    	expect($scope.bookOrderItems).toBe('bookOrderItem1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});