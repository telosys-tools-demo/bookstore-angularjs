'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('bookOrderItem.module'));
  
  describe('BookOrderItem', function(){
	var $httpBackend, BookOrderItem, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	BookOrderItem = $injector.get('BookOrderItem');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/bookOrderItem').respond("test");
    	BookOrderItem.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/bookOrderItem').respond("test");
    	BookOrderItem.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/bookOrderItem/1/2').respond("test");
    	BookOrderItem.get('1', '2').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		BookOrderItem.create({bookOrderId:null, bookId:null,name:'bookOrderItem'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('bookOrderItem.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/bookOrderItem').respond("test");
    	BookOrderItem.create({bookOrderId:'1', bookId:'2',name:'bookOrderItem'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		BookOrderItem.update({bookOrderId:null, bookId:null,name:'bookOrderItem'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('bookOrderItem.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/bookOrderItem/1/2').respond("test");
    	BookOrderItem.update({bookOrderId:'1', bookId:'2',name:'bookOrderItem'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/bookOrderItem/1/2').respond("test");
    	BookOrderItem.delete('1', '2').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});