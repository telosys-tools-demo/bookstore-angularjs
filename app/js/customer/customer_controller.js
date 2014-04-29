'use strict';

/* Controller for Customer */

myAppControllers.controller('CustomerCtrl', ['Customer', '$scope', '$routeParams', '$http', '$location', '$cookies', function(Customer, $scope, $routeParams, $http, $location, $cookies) {
	
    // mode

    $scope.mode = null;
    
	// data

    $scope.customers = {list: []};
    $scope.customer = null;

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

	
    $scope.cleanCustomersInScope = function() {
        $scope.customers.list = [];
    };
    $scope.cleanCustomerInScope = function() {
        $scope.customer = null;
    };
    $scope.setAllCustomersInScope = function(customers) {
        $scope.customers.list = customers;
    };
    $scope.addCustomerInScope = function(customer) {
        $scope.customers.list.push(customer);
    };
    $scope.setOneCustomerInScope = function(customer) {
        $scope.customer = customer;
    };
    
    // refresh data

    $scope.refreshCustomerList = function() {
    	try {
        	$scope.cleanCustomersInScope();
	        Customer.getAll().then(
				function(success) {
        	        $scope.setAllCustomersInScope(success.data);
            	}, 
	            $scope.manageError);
    	} catch(ex) {
    		$scope.manageException(ex);
    	}
    }
    $scope.refreshCustomer = function(code) {
    	try {
        	$scope.cleanCustomerInScope();
	        Customer.get(code).then(
				function(success) {
        	        $scope.setOneCustomerInScope(success.data);
            	}, 
	            $scope.manageError);
    	  } catch(ex) {
        	$scope.manageException(ex);
    	}
    }

    // location

    $scope.goToCustomerList = function() {
        $scope.refreshCustomerList();
        $location.path('/customer');
    }
    $scope.goToCustomer = function(code) {
        $scope.refreshCustomer(code);
        $location.path('/customer/'+code);
    }

    // Actions

    $scope.save = function() {
    	try {
			$scope.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Customer.create;
			} else {
				save = Customer.update;
			}
			save($scope.customer).then(
    	        function(success) {
	                $scope.addSuccess('save ok');
                	$scope.setOneCustomerInScope(success.data);
            	},
        	    $scope.manageError);
    	} catch(ex) {
        	$scope.manageException(ex);
    	}
    };
    $scope.delete = function(code) {
	    try {
			$scope.cleanMessage();
    	    Customer.delete(code).then(
				function(success) {
                	$scope.goToCustomerList();
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
		$scope.refreshCustomer($routeParams.code);
    } else {
        $scope.refreshCustomerList();
    }
    
    
}]);
