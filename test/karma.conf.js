module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
  	  'app/lib/angular/angular-resource.js',
  	  'app/lib/angular/angular-cookies.js',
  	  'app/lib/angular/angular-animate.js',
  	  'app/lib/angular-translate/angular-translate.js',
  	  'app/lib/angular-translate/angular-translate-storage-cookie.js',
  	  'app/lib/angular-translate/angular-translate-storage-local.js',
  	  'app/lib/angular-translate/angular-translate-loader-static-files.js',
  	  'app/lib/angular-dynamic-locale/tmhDynamicLocale.js',
  	  'app/lib/angular-strap/angular-strap.min.js',
  	  'app/lib/angular-strap/angular-strap.tpl.min.js',
  	  'bower_components/angular-mocks/angular-mocks.js',
      'app/js/*.js',
      'app/js/**/*_module.js',
      'app/js/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};