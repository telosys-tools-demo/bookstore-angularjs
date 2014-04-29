'use strict';

/* Controller for Country */

myAppControllers.controller('CountryCtrl', ['Country', '$scope', '$routeParams', '$http', '$location', '$cookies', function(Country, $scope, $routeParams, $http, $location, $cookies) {
	
    // mode

    $scope.mode = null;
    
	// data

    $scope.countrys = {list: []};
    $scope.country = null;

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

	
    $scope.cleanCountrysInScope = function() {
        $scope.countrys.list = [];
    };
    $scope.cleanCountryInScope = function() {
        $scope.country = null;
    };
    $scope.setAllCountrysInScope = function(countrys) {
        $scope.countrys.list = countrys;
    };
    $scope.addCountryInScope = function(country) {
        $scope.countrys.list.push(country);
    };
    $scope.setOneCountryInScope = function(country) {
        $scope.country = country;
    };
    
    // refresh data

    $scope.refreshCountryList = function() {
    	try {
        	$scope.cleanCountrysInScope();
	        Country.getAll().then(
				function(success) {
        	        $scope.setAllCountrysInScope(success.data);
            	}, 
	            $scope.manageError);
    	} catch(ex) {
    		$scope.manageException(ex);
    	}
    }
    $scope.refreshCountry = function(code) {
    	try {
        	$scope.cleanCountryInScope();
	        Country.get(code).then(
				function(success) {
        	        $scope.setOneCountryInScope(success.data);
            	}, 
	            $scope.manageError);
    	  } catch(ex) {
        	$scope.manageException(ex);
    	}
    }

    // location

    $scope.goToCountryList = function() {
        $scope.refreshCountryList();
        $location.path('/country');
    }
    $scope.goToCountry = function(code) {
        $scope.refreshCountry(code);
        $location.path('/country/'+code);
    }

    // Actions

    $scope.save = function() {
    	try {
			$scope.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Country.create;
			} else {
				save = Country.update;
			}
			save($scope.country).then(
    	        function(success) {
	                $scope.addSuccess('save ok');
                	$scope.setOneCountryInScope(success.data);
            	},
        	    $scope.manageError);
    	} catch(ex) {
        	$scope.manageException(ex);
    	}
    };
    $scope.delete = function(code) {
	    try {
			$scope.cleanMessage();
    	    Country.delete(code).then(
				function(success) {
                	$scope.goToCountryList();
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
		$scope.refreshCountry($routeParams.code);
    } else {
        $scope.refreshCountryList();
    }
    
    
}]);
