'use strict';

/* Controller for Book */

myAppControllers.controller('BookCtrl', ['Book', '$scope', '$routeParams', '$http', '$location', '$cookies', function(Book, $scope, $routeParams, $http, $location, $cookies) {
	
    // mode

    $scope.mode = null;
    
	// data

    $scope.books = {list: []};
    $scope.book = null;

	// referencies entities

	$scope.items = {};
	$scope.items.authors = [];
	$scope.items.publishers = [];
	$scope.loadAllAuthor = function() {
        $http({method: 'GET', url: baseURL + '/items/author'}).
        success(function(data, status, headers, config) {
            $scope.items.authors = data;
        }).
        error($scope.manageError);
    };
	$scope.loadAllPublisher = function() {
        $http({method: 'GET', url: baseURL + '/items/publisher'}).
        success(function(data, status, headers, config) {
            $scope.items.publishers = data;
        }).
        error($scope.manageError);
    };
	
	$scope.loadAllReferencies = function() {
		$scope.loadAllAuthor();
		$scope.loadAllPublisher();
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

	
    $scope.cleanBooksInScope = function() {
        $scope.books.list = [];
    };
    $scope.cleanBookInScope = function() {
        $scope.book = null;
    };
    $scope.setAllBooksInScope = function(books) {
        $scope.books.list = books;
    };
    $scope.addBookInScope = function(book) {
        $scope.books.list.push(book);
    };
    $scope.setOneBookInScope = function(book) {
        $scope.book = book;
    };
    
    // refresh data

    $scope.refreshBookList = function() {
    	try {
        	$scope.cleanBooksInScope();
	        Book.getAll().then(
				function(success) {
        	        $scope.setAllBooksInScope(success.data);
            	}, 
	            $scope.manageError);
    	} catch(ex) {
    		$scope.manageException(ex);
    	}
    }
    $scope.refreshBook = function(id) {
    	try {
        	$scope.cleanBookInScope();
	        Book.get(id).then(
				function(success) {
        	        $scope.setOneBookInScope(success.data);
            	}, 
	            $scope.manageError);
    	  } catch(ex) {
        	$scope.manageException(ex);
    	}
    }

    // location

    $scope.goToBookList = function() {
        $scope.refreshBookList();
        $location.path('/book');
    }
    $scope.goToBook = function(id) {
        $scope.refreshBook(id);
        $location.path('/book/'+id);
    }

    // Actions

    $scope.save = function() {
    	try {
			$scope.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Book.create;
			} else {
				save = Book.update;
			}
			save($scope.book).then(
    	        function(success) {
	                $scope.addSuccess('save ok');
                	$scope.setOneBookInScope(success.data);
            	},
        	    $scope.manageError);
    	} catch(ex) {
        	$scope.manageException(ex);
    	}
    };
    $scope.delete = function(id) {
	    try {
			$scope.cleanMessage();
    	    Book.delete(id).then(
				function(success) {
                	$scope.goToBookList();
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
		$scope.refreshBook($routeParams.id);
    } else {
        $scope.refreshBookList();
    }
    
    
}]);
