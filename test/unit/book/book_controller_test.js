'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('book.module'));
  
  describe('BookCtrl', function(){
    var BookCtrl, Book, Author,  Publisher, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Book service
    	Book = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'book1'});
    			return deferred.promise;
    		}
    	};
		
				Author = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Publisher = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				BookCtrl = $controller('BookCtrl', {
    		'Book': Book,
						'Author': Author,
						'Publisher': Publisher,
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
    	expect($scope.book).toBeNull();
    	expect($scope.books).toBe('book1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshBookList', function() {
    	// given
    	Book.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'book2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshBookList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.books).toBe('book2');
    });
    
    it('refreshBook', function() {
    	// given
    	Book.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'book'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshBook('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.book).toBe('book'+'1');
    });
    
	it('goToBookList', function() {
    	// given
    	spyOn($scope, "refreshBookList");
    	
    	// when
    	$scope.goToBookList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshBookList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/book');
    });
    
    it('goToBook', function() {
    	// given
    	spyOn($scope, "refreshBook");
    	var id = 1;
    	
    	// when
    	$scope.goToBook(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshBook).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/book'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.book = {id:'1', name:'book'};
    	
    	$scope.mode = 'create';
    	Book.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'bookSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.book).toBe('bookSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.book = {id:'1', name:'book'};
    	
    	$scope.mode = 'update';
    	Book.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'bookSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.book).toBe('bookSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Book.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToBookList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToBookList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : book create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/book/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.book).toBeNull();
    	expect($scope.books).toBe('book1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});