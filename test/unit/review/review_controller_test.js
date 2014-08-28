'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('review.module'));
  
  describe('ReviewCtrl', function(){
    var ReviewCtrl, Review, Book,  Customer, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Review service
    	Review = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'review1'});
    			return deferred.promise;
    		}
    	};
		
				Book = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Customer = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				ReviewCtrl = $controller('ReviewCtrl', {
    		'Review': Review,
						'Book': Book,
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
    	expect($scope.review).toBeNull();
    	expect($scope.reviews).toBe('review1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshReviewList', function() {
    	// given
    	Review.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'review2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshReviewList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.reviews).toBe('review2');
    });
    
    it('refreshReview', function() {
    	// given
    	Review.get = function(customerCode, bookId) {
			var deferred = $q.defer();
			deferred.resolve({data:'review'+customerCode+bookId});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshReview('1', '2');
    	$scope.$apply();
    	
    	// then
    	expect($scope.review).toBe('review'+'1'+'2');
    });
    
	it('goToReviewList', function() {
    	// given
    	spyOn($scope, "refreshReviewList");
    	
    	// when
    	$scope.goToReviewList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshReviewList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/review');
    });
    
    it('goToReview', function() {
    	// given
    	spyOn($scope, "refreshReview");
    	var customerCode = 1;
    	var bookId = 2;
    	
    	// when
    	$scope.goToReview(customerCode, bookId);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshReview).toHaveBeenCalledWith(customerCode, bookId);
    	expect($location.path).toHaveBeenCalledWith('/review'+'/'+customerCode+'/'+bookId);
    });
    
    it('save : create', function() {
    	// given
    	$scope.review = {customerCode:'1', bookId:'2', name:'review'};
    	
    	$scope.mode = 'create';
    	Review.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'reviewSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.review).toBe('reviewSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.review = {customerCode:'1', bookId:'2', name:'review'};
    	
    	$scope.mode = 'update';
    	Review.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'reviewSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.review).toBe('reviewSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Review.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToReviewList");
    	
    	// when
    	$scope.delete('1', '2');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToReviewList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : review create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/review/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.review).toBeNull();
    	expect($scope.reviews).toBe('review1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});