'use strict';

/* Controller for Synopsis */

myAppControllers.controller('SynopsisCtrl', ['Synopsis', '$scope', '$routeParams', '$http', '$location', '$cookies', function(Synopsis, $scope, $routeParams, $http, $location, $cookies) {
	
    // mode

    $scope.mode = null;
    
	// data

    $scope.synopsiss = {list: []};
    $scope.synopsis = null;

	// referencies entities

	$scope.items = {};
	$scope.items.books = [];
	$scope.loadAllBook = function() {
        $http({method: 'GET', url: baseURL + '/items/book'}).
        success(function(data, status, headers, config) {
            $scope.items.books = data;
        }).
        error($scope.manageError);
    };
	
	$scope.loadAllReferencies = function() {
		$scope.loadAllBook();
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

	
    $scope.cleanSynopsissInScope = function() {
        $scope.synopsiss.list = [];
    };
    $scope.cleanSynopsisInScope = function() {
        $scope.synopsis = null;
    };
    $scope.setAllSynopsissInScope = function(synopsiss) {
        $scope.synopsiss.list = synopsiss;
    };
    $scope.addSynopsisInScope = function(synopsis) {
        $scope.synopsiss.list.push(synopsis);
    };
    $scope.setOneSynopsisInScope = function(synopsis) {
        $scope.synopsis = synopsis;
    };
    
    // refresh data

    $scope.refreshSynopsisList = function() {
    	try {
        	$scope.cleanSynopsissInScope();
	        Synopsis.getAll().then(
				function(success) {
        	        $scope.setAllSynopsissInScope(success.data);
            	}, 
	            $scope.manageError);
    	} catch(ex) {
    		$scope.manageException(ex);
    	}
    }
    $scope.refreshSynopsis = function(bookId) {
    	try {
        	$scope.cleanSynopsisInScope();
	        Synopsis.get(bookId).then(
				function(success) {
        	        $scope.setOneSynopsisInScope(success.data);
            	}, 
	            $scope.manageError);
    	  } catch(ex) {
        	$scope.manageException(ex);
    	}
    }

    // location

    $scope.goToSynopsisList = function() {
        $scope.refreshSynopsisList();
        $location.path('/synopsis');
    }
    $scope.goToSynopsis = function(bookId) {
        $scope.refreshSynopsis(bookId);
        $location.path('/synopsis/'+bookId);
    }

    // Actions

    $scope.save = function() {
    	try {
			$scope.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Synopsis.create;
			} else {
				save = Synopsis.update;
			}
			save($scope.synopsis).then(
    	        function(success) {
	                $scope.addSuccess('save ok');
                	$scope.setOneSynopsisInScope(success.data);
            	},
        	    $scope.manageError);
    	} catch(ex) {
        	$scope.manageException(ex);
    	}
    };
    $scope.delete = function(bookId) {
	    try {
			$scope.cleanMessage();
    	    Synopsis.delete(bookId).then(
				function(success) {
                	$scope.goToSynopsisList();
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
    } else if( $routeParams.bookId != null ) {
		$scope.loadAllReferencies();
		$scope.refreshSynopsis($routeParams.bookId);
    } else {
        $scope.refreshSynopsisList();
    }
    
    
}]);
