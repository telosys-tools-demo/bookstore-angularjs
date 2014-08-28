'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('employeeGroup.module'));
  
  describe('EmployeeGroup', function(){
	var $httpBackend, EmployeeGroup, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	EmployeeGroup = $injector.get('EmployeeGroup');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/employeeGroup').respond("test");
    	EmployeeGroup.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/employeeGroup').respond("test");
    	EmployeeGroup.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/employeeGroup/1/2').respond("test");
    	EmployeeGroup.get('1', '2').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		EmployeeGroup.create({employeeCode:null, groupId:null,name:'employeeGroup'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('employeeGroup.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/employeeGroup').respond("test");
    	EmployeeGroup.create({employeeCode:'1', groupId:'2',name:'employeeGroup'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		EmployeeGroup.update({employeeCode:null, groupId:null,name:'employeeGroup'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('employeeGroup.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/employeeGroup/1/2').respond("test");
    	EmployeeGroup.update({employeeCode:'1', groupId:'2',name:'employeeGroup'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/employeeGroup/1/2').respond("test");
    	EmployeeGroup.delete('1', '2').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});