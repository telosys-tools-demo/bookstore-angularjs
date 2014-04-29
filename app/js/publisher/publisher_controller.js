'use strict';

/* Controller for Publisher */

myAppControllers.controller('PublisherCtrl', ['Publisher', '$scope', '$routeParams', '$http', '$location', '$cookies', function(Publisher, $scope, $routeParams, $http, $location, $cookies) {
	
    // mode

    $scope.mode = null;
    
	// data

    $scope.publishers = {list: []};
    $scope.publisher = null;

	// referencies entities

	$scope.items = {};
	$scope.items.countrys = [];
	$scope.loadAllCountry = function() {
        $http({method: 'GET', url: baseURL + '/items/country'}).
        success(function(data, status, headers, config) {
            $scope.items.countrys = data;
        }).
        error($scope.manageError);
    };
	
	$scope.loadAllReferencies = function() {
		$scope.loadAllCountry();
    };
    
    // message

	$scope.message = {};
    $scope.message.successs = [];
    $scope.message.errors = [];
	$scope.cleanMessage = function() {
        $scope.message.successs = [];
        $scope.message.errors = [];
    };
    $scope.addSuccess = function(success) {
        $scope.message.successs.push(success);
    };
    $scope.addError = function(error) {
        $scope.message.errors.push(error);
    };
	$scope.manageError = function(http) {
		if( http.status === 404 ) {
			if( http.data == null || http.data === "" ) {
				$scope.addError('The server is not responding');
			} else {
				$scope.addError('Invalid URL : ' + http.config.url);
			}
		} else if( http.status === 400 ) {
			if(http.data == null) {
				$scope.addError('Bad URL : ' + http.config.url);
			} else {
				$scope.addError(http.data);
			}
		} else {
        	if( http.data != null && http.data !== "" ) {
            	$scope.addError(http.data);
        	}
		}
    };
	$scope.manageException = function(error) {
		$scope.addError(error);
    };

	// display data

	
    $scope.cleanPublishersInScope = function() {
        $scope.publishers.list = [];
    };
    $scope.cleanPublisherInScope = function() {
        $scope.publisher = null;
    };
    $scope.setAllPublishersInScope = function(publishers) {
        $scope.publishers.list = publishers;
    };
    $scope.addPublisherInScope = function(publisher) {
        $scope.publishers.list.push(publisher);
    };
    $scope.setOnePublisherInScope = function(publisher) {
        $scope.publisher = publisher;
    };
    
    // refresh data

    $scope.refreshPublisherList = function() {
    	try {
        	$scope.cleanPublishersInScope();
	        Publisher.getAll().then(
				function(success) {
        	        $scope.setAllPublishersInScope(success.data);
            	}, 
	            $scope.manageError);
    	} catch(ex) {
    		$scope.manageException(ex);
    	}
    }
    $scope.refreshPublisher = function(code) {
    	try {
        	$scope.cleanPublisherInScope();
	        Publisher.get(code).then(
				function(success) {
        	        $scope.setOnePublisherInScope(success.data);
            	}, 
	            $scope.manageError);
    	  } catch(ex) {
        	$scope.manageException(ex);
    	}
    }

    // location

    $scope.goToPublisherList = function() {
        $scope.refreshPublisherList();
        $location.path('/publisher');
    }
    $scope.goToPublisher = function(code) {
        $scope.refreshPublisher(code);
        $location.path('/publisher/'+code);
    }

    // Actions

    $scope.save = function() {
    	try {
			$scope.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Publisher.create;
			} else {
				save = Publisher.update;
			}
			save($scope.publisher).then(
    	        function(success) {
	                $scope.addSuccess('save ok');
                	$scope.setOnePublisherInScope(success.data);
            	},
        	    $scope.manageError);
    	} catch(ex) {
        	$scope.manageException(ex);
    	}
    };
    $scope.delete = function(code) {
	    try {
			$scope.cleanMessage();
    	    Publisher.delete(code).then(
				function(success) {
                	$scope.goToPublisherList();
            	}, 
                $scope.manageError);
        } catch(ex) {
            $scope.manageException(ex);
        }
    };
    
    // Main

	$scope.cleanMessage();
    
    if( $location.path().endsWith('/new') ) {
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.code != null ) {
		$scope.loadAllReferencies();
		$scope.refreshPublisher($routeParams.code);
    } else {
        $scope.refreshPublisherList();
    }
    
    
}]);
