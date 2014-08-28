'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('badge.module'));
  
  describe('BadgeCtrl', function(){
    var BadgeCtrl, Badge,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Badge service
    	Badge = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'badge1'});
    			return deferred.promise;
    		}
    	};
		
				BadgeCtrl = $controller('BadgeCtrl', {
    		'Badge': Badge,
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
    	expect($scope.badge).toBeNull();
    	expect($scope.badges).toBe('badge1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshBadgeList', function() {
    	// given
    	Badge.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'badge2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshBadgeList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.badges).toBe('badge2');
    });
    
    it('refreshBadge', function() {
    	// given
    	Badge.get = function(badgeNumber) {
			var deferred = $q.defer();
			deferred.resolve({data:'badge'+badgeNumber});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshBadge('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.badge).toBe('badge'+'1');
    });
    
	it('goToBadgeList', function() {
    	// given
    	spyOn($scope, "refreshBadgeList");
    	
    	// when
    	$scope.goToBadgeList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshBadgeList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/badge');
    });
    
    it('goToBadge', function() {
    	// given
    	spyOn($scope, "refreshBadge");
    	var badgeNumber = 1;
    	
    	// when
    	$scope.goToBadge(badgeNumber);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshBadge).toHaveBeenCalledWith(badgeNumber);
    	expect($location.path).toHaveBeenCalledWith('/badge'+'/'+badgeNumber);
    });
    
    it('save : create', function() {
    	// given
    	$scope.badge = {badgeNumber:'1', name:'badge'};
    	
    	$scope.mode = 'create';
    	Badge.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'badgeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.badge).toBe('badgeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.badge = {badgeNumber:'1', name:'badge'};
    	
    	$scope.mode = 'update';
    	Badge.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'badgeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.badge).toBe('badgeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Badge.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToBadgeList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToBadgeList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : badge create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/badge/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.badge).toBeNull();
    	expect($scope.badges).toBe('badge1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});