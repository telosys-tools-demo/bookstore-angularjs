'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('workgroup.module'));
  
  describe('Workgroup', function(){
	var $httpBackend, Workgroup, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Workgroup = $injector.get('Workgroup');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/workgroup').respond("test");
    	Workgroup.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/workgroup').respond("test");
    	Workgroup.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/workgroup/1').respond("test");
    	Workgroup.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Workgroup.create({id:null,name:'workgroup'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('workgroup.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/workgroup').respond("test");
    	Workgroup.create({id:'1',name:'workgroup'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Workgroup.update({id:null,name:'workgroup'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('workgroup.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/workgroup/1').respond("test");
    	Workgroup.update({id:'1',name:'workgroup'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/workgroup/1').respond("test");
    	Workgroup.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});