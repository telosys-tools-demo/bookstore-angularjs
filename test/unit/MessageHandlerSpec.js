'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('messageHandler.module'));

  describe('MessageHandler', function(){
	var rootScope;
	var _MessageHandler;
	  
    beforeEach(inject(function(MessageHandler, $rootScope) {
    	rootScope = $rootScope.$new();
    	_MessageHandler = MessageHandler;
    }));
    
    it('init', function() {
    	expect(rootScope.message).toBeDefined();
    	expect(rootScope.message.successs.length).toBe(0);
    	expect(rootScope.message.errors.length).toBe(0);
    	expect(rootScope.message.serverErrors.length).toBe(0);
    })
    
    it('addServerError', function() {
    	_MessageHandler.addServerError("test");
    	expect(rootScope.message.serverErrors[0]).toBe("test");
    })
    
    it('addError', function() {
    	_MessageHandler.addError("test");
    	expect(rootScope.message.errors[0].message).toBe("test");
    	expect(Object.keys(rootScope.message.errors[0].values).length).toBe(0);
    })
    
    it('addSuccess', function() {
    	_MessageHandler.addSuccess("test");
    	expect(rootScope.message.successs[0].message).toBe("test");
    	expect(Object.keys(rootScope.message.successs[0].values).length).toBe(0);
    })
  });
});
