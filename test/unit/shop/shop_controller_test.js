'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('shop.module'));
  
  describe('ShopCtrl', function(){
    var ShopCtrl, Shop, Employee,  Country, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Shop service
    	Shop = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'shop1'});
    			return deferred.promise;
    		}
    	};
		
				Employee = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Country = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				ShopCtrl = $controller('ShopCtrl', {
    		'Shop': Shop,
						'Employee': Employee,
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
    	expect($scope.shop).toBeNull();
    	expect($scope.shops).toBe('shop1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshShopList', function() {
    	// given
    	Shop.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'shop2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshShopList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.shops).toBe('shop2');
    });
    
    it('refreshShop', function() {
    	// given
    	Shop.get = function(code) {
			var deferred = $q.defer();
			deferred.resolve({data:'shop'+code});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshShop('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.shop).toBe('shop'+'1');
    });
    
	it('goToShopList', function() {
    	// given
    	spyOn($scope, "refreshShopList");
    	
    	// when
    	$scope.goToShopList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshShopList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/shop');
    });
    
    it('goToShop', function() {
    	// given
    	spyOn($scope, "refreshShop");
    	var code = 1;
    	
    	// when
    	$scope.goToShop(code);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshShop).toHaveBeenCalledWith(code);
    	expect($location.path).toHaveBeenCalledWith('/shop'+'/'+code);
    });
    
    it('save : create', function() {
    	// given
    	$scope.shop = {code:'1', name:'shop'};
    	
    	$scope.mode = 'create';
    	Shop.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'shopSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.shop).toBe('shopSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.shop = {code:'1', name:'shop'};
    	
    	$scope.mode = 'update';
    	Shop.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'shopSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.shop).toBe('shopSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Shop.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToShopList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToShopList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : shop create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/shop/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.shop).toBeNull();
    	expect($scope.shops).toBe('shop1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});