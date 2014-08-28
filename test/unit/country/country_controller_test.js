'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('country.module'));
  
  describe('CountryCtrl', function(){
    var CountryCtrl, Country,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Country service
    	Country = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'country1'});
    			return deferred.promise;
    		}
    	};
		
				CountryCtrl = $controller('CountryCtrl', {
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
    	expect($scope.country).toBeNull();
    	expect($scope.countrys).toBe('country1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshCountryList', function() {
    	// given
    	Country.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'country2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshCountryList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.countrys).toBe('country2');
    });
    
    it('refreshCountry', function() {
    	// given
    	Country.get = function(code) {
			var deferred = $q.defer();
			deferred.resolve({data:'country'+code});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshCountry('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.country).toBe('country'+'1');
    });
    
	it('goToCountryList', function() {
    	// given
    	spyOn($scope, "refreshCountryList");
    	
    	// when
    	$scope.goToCountryList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshCountryList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/country');
    });
    
    it('goToCountry', function() {
    	// given
    	spyOn($scope, "refreshCountry");
    	var code = 1;
    	
    	// when
    	$scope.goToCountry(code);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshCountry).toHaveBeenCalledWith(code);
    	expect($location.path).toHaveBeenCalledWith('/country'+'/'+code);
    });
    
    it('save : create', function() {
    	// given
    	$scope.country = {code:'1', name:'country'};
    	
    	$scope.mode = 'create';
    	Country.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'countrySaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.country).toBe('countrySaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.country = {code:'1', name:'country'};
    	
    	$scope.mode = 'update';
    	Country.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'countrySaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.country).toBe('countrySaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Country.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToCountryList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToCountryList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : country create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/country/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.country).toBeNull();
    	expect($scope.countrys).toBe('country1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});