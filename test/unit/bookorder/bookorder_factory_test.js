'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('bookOrder.module'));
  
  describe('BookOrder', function(){
	var $httpBackend, BookOrder, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	BookOrder = $injector.get('BookOrder');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/bookOrder').respond("test");
    	BookOrder.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/bookOrder').respond("test");
    	BookOrder.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/bookOrder/1').respond("test");
    	BookOrder.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		BookOrder.create({id:null,name:'bookOrder'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('bookOrder.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/bookOrder').respond("test");
    	BookOrder.create({id:'1',name:'bookOrder'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		BookOrder.update({id:null,name:'bookOrder'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('bookOrder.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/bookOrder/1').respond("test");
    	BookOrder.update({id:'1',name:'bookOrder'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/bookOrder/1').respond("test");
    	BookOrder.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});