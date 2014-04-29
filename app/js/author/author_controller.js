'use strict';

/* Controller for Author */

myAppControllers.controller('AuthorCtrl', ['Author', '$scope', '$routeParams', '$http', '$location', '$cookies', function(Author, $scope, $routeParams, $http, $location, $cookies) {
	
    // mode

    $scope.mode = null;
    
	// data

    $scope.authors = {list: []};
    $scope.author = null;

	// referencies entities

	$scope.items = {};
	
	$scope.loadAllReferencies = function() {
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

	
    $scope.cleanAuthorsInScope = function() {
        $scope.authors.list = [];
    };
    $scope.cleanAuthorInScope = function() {
        $scope.author = null;
    };
    $scope.setAllAuthorsInScope = function(authors) {
        $scope.authors.list = authors;
    };
    $scope.addAuthorInScope = function(author) {
        $scope.authors.list.push(author);
    };
    $scope.setOneAuthorInScope = function(author) {
        $scope.author = author;
    };
    
    // refresh data

    $scope.refreshAuthorList = function() {
    	try {
        	$scope.cleanAuthorsInScope();
	        Author.getAll().then(
				function(success) {
        	        $scope.setAllAuthorsInScope(success.data);
            	}, 
	            $scope.manageError);
    	} catch(ex) {
    		$scope.manageException(ex);
    	}
    }
    $scope.refreshAuthor = function(id) {
    	try {
        	$scope.cleanAuthorInScope();
	        Author.get(id).then(
				function(success) {
        	        $scope.setOneAuthorInScope(success.data);
            	}, 
	            $scope.manageError);
    	  } catch(ex) {
        	$scope.manageException(ex);
    	}
    }

    // location

    $scope.goToAuthorList = function() {
        $scope.refreshAuthorList();
        $location.path('/author');
    }
    $scope.goToAuthor = function(id) {
        $scope.refreshAuthor(id);
        $location.path('/author/'+id);
    }

    // Actions

    $scope.save = function() {
    	try {
			$scope.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Author.create;
			} else {
				save = Author.update;
			}
			save($scope.author).then(
    	        function(success) {
	                $scope.addSuccess('save ok');
                	$scope.setOneAuthorInScope(success.data);
            	},
        	    $scope.manageError);
    	} catch(ex) {
        	$scope.manageException(ex);
    	}
    };
    $scope.delete = function(id) {
	    try {
			$scope.cleanMessage();
    	    Author.delete(id).then(
				function(success) {
                	$scope.goToAuthorList();
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
    } else if( $routeParams.id != null ) {
		$scope.loadAllReferencies();
		$scope.refreshAuthor($routeParams.id);
    } else {
        $scope.refreshAuthorList();
    }
    
    
}]);
