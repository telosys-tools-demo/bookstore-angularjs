'use strict';

/* Services */

var myAppServices = angular.module('myApp.services', ['ngResource', 'ngCookies']);

// Demonstrate how to register services
// In this case it is a simple value service.
myAppServices.value('version', '0.1');

// Base URL for REST Services on the Spring MVC webapp
myAppServices.value('restURL', 'http://bookstore-spring.telosys-tools-demo.cloudbees.net/rest/');
