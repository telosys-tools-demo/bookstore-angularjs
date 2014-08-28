'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('synopsis.module'));
  
  describe('SynopsisCtrl', function(){
    var SynopsisCtrl, Synopsis, Book, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Synopsis service
    	Synopsis = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'synopsis1'});
    			return deferred.promise;
    		}
    	};
		
				Book = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				SynopsisCtrl = $controller('SynopsisCtrl', {
    		'Synopsis': Synopsis,
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
    	expect($scope.synopsis).toBeNull();
    	expect($scope.synopsiss).toBe('synopsis1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshSynopsisList', function() {
    	// given
    	Synopsis.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'synopsis2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSynopsisList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.synopsiss).toBe('synopsis2');
    });
    
    it('refreshSynopsis', function() {
    	// given
    	Synopsis.get = function(bookId) {
			var deferred = $q.defer();
			deferred.resolve({data:'synopsis'+bookId});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSynopsis('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.synopsis).toBe('synopsis'+'1');
    });
    
	it('goToSynopsisList', function() {
    	// given
    	spyOn($scope, "refreshSynopsisList");
    	
    	// when
    	$scope.goToSynopsisList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSynopsisList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/synopsis');
    });
    
    it('goToSynopsis', function() {
    	// given
    	spyOn($scope, "refreshSynopsis");
    	var bookId = 1;
    	
    	// when
    	$scope.goToSynopsis(bookId);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSynopsis).toHaveBeenCalledWith(bookId);
    	expect($location.path).toHaveBeenCalledWith('/synopsis'+'/'+bookId);
    });
    
    it('save : create', function() {
    	// given
    	$scope.synopsis = {bookId:'1', name:'synopsis'};
    	
    	$scope.mode = 'create';
    	Synopsis.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'synopsisSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.synopsis).toBe('synopsisSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.synopsis = {bookId:'1', name:'synopsis'};
    	
    	$scope.mode = 'update';
    	Synopsis.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'synopsisSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.synopsis).toBe('synopsisSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Synopsis.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToSynopsisList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToSynopsisList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : synopsis create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/synopsis/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.synopsis).toBeNull();
    	expect($scope.synopsiss).toBe('synopsis1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});