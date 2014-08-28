'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('myApp.services'));


  describe('version', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });

  describe('restURL', function() {
    it('should return current rest URL', inject(function(restURL) {
      expect(restURL).toEqual('http://bookstore-spring.telosys-tools-demo.cloudbees.net/rest/');
    }));
  });
});
