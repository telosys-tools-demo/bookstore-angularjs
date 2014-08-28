'use strict';

/**
 * Module for messages
 */
var messageHandler = angular.module('messageHandler.module', []);

/**
 * Factory for messages handler
 */
messageHandler.factory('MessageHandler',['$rootScope', function($rootScope) {

    // message
    $rootScope.message = {};
    // successful messages
    $rootScope.message.successs = [];
    // error messages
    $rootScope.message.errors = [];
    // server error messages
    $rootScope.message.serverErrors = [];

    var $this = {};

    /**
     * Clean all messages
     */
    $this.cleanMessage = function() {
        $rootScope.message.successs = [];
        $rootScope.message.errors = [];
        $rootScope.message.serverErrors = [];
    };

    /**
     * Add a successful message
     */
    $this.addSuccess = function(success, values) {
        var messageValues = $this.getMessageValues(values);
        $rootScope.message.successs.push({message: success, values: messageValues});
    };

    /**
     * Add an error message
     */
    $this.addError = function(error, values) {
        var messageValues = $this.getMessageValues(values);
        $rootScope.message.errors.push({message: error, values: messageValues});
    };

    /**
     * Add a server error message (no translate)
     */
    $this.addServerError = function(serverError) {
        $rootScope.message.serverErrors.push(serverError);
    };

    /**
     * Define message values
     * @param values array
     * @return values map
     */
    $this.getMessageValues = function(values) {
        var errorValues = {};
        if(values != null) {
	        if(values instanceof Array) {
	            for (var i = 0; i < values.length; i++) {
	                errorValues['a' + i] = values[i];
	            }
	        } else {
	            errorValues['a0'] = values;
	        }
        }
        return errorValues;
    };

    /**
     * Manage the error
     */
    $this.manageError = function(http) {
        if( http.status === 404 ) {
            if( http.data == null || http.data === "" ) {
                $this.addError('server.not.responding',baseURL);
            } else {
                $this.addError('Invalid URL : ',[http.config.url]);
            }
        } else if( http.status === 400 ) {
            if(http.data == null) {
                $this.addError('Bad URL : ',[http.config.url]);
            } else {
                $this.addServerError(http.data);
            }
        } else {
            if( http.data != null && http.data !== "" ) {
                $this.addServerError(http.data);
            }
        }
    };

    /**
     * Manage the exception
     */
    $this.manageException = function(error) {
        $this.addError(error);
    };

    // Return message handler
    return $this;
}]);
