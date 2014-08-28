'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('synopsis.module'));
  
  describe('Synopsis', function(){
	var $httpBackend, Synopsis, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Synopsis = $injector.get('Synopsis');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/synopsis').respond("test");
    	Synopsis.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/synopsis').respond("test");
    	Synopsis.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/synopsis/1').respond("test");
    	Synopsis.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Synopsis.create({bookId:null,name:'synopsis'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('synopsis.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/synopsis').respond("test");
    	Synopsis.create({bookId:'1',name:'synopsis'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Synopsis.update({bookId:null,name:'synopsis'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('synopsis.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/synopsis/1').respond("test");
    	Synopsis.update({bookId:'1',name:'synopsis'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/synopsis/1').respond("test");
    	Synopsis.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});