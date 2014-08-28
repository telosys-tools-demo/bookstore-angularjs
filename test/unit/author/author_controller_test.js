'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('author.module'));
  
  describe('AuthorCtrl', function(){
    var AuthorCtrl, Author,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Author service
    	Author = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'author1'});
    			return deferred.promise;
    		}
    	};
		
				AuthorCtrl = $controller('AuthorCtrl', {
    		'Author': Author,
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
    	expect($scope.author).toBeNull();
    	expect($scope.authors).toBe('author1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshAuthorList', function() {
    	// given
    	Author.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'author2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshAuthorList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.authors).toBe('author2');
    });
    
    it('refreshAuthor', function() {
    	// given
    	Author.get = function(id) {
			var deferred = $q.defer();
			deferred.resolve({data:'author'+id});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshAuthor('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.author).toBe('author'+'1');
    });
    
	it('goToAuthorList', function() {
    	// given
    	spyOn($scope, "refreshAuthorList");
    	
    	// when
    	$scope.goToAuthorList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshAuthorList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/author');
    });
    
    it('goToAuthor', function() {
    	// given
    	spyOn($scope, "refreshAuthor");
    	var id = 1;
    	
    	// when
    	$scope.goToAuthor(id);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshAuthor).toHaveBeenCalledWith(id);
    	expect($location.path).toHaveBeenCalledWith('/author'+'/'+id);
    });
    
    it('save : create', function() {
    	// given
    	$scope.author = {id:'1', name:'author'};
    	
    	$scope.mode = 'create';
    	Author.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'authorSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.author).toBe('authorSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.author = {id:'1', name:'author'};
    	
    	$scope.mode = 'update';
    	Author.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'authorSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.author).toBe('authorSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Author.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToAuthorList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToAuthorList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : author create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/author/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.author).toBeNull();
    	expect($scope.authors).toBe('author1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});