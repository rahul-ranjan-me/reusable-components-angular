define([
		"angular", 
		"ngRoute",

		// Controllers

		"controllers/HomeCtrl",
		"controllers/AlerterCtrl",
		"controllers/LoggerCtrl",

		// Directives

		"directives/header",

		// Services

		"services/httpCalls.js",

		//Factories

		"factory/xhr.js",

		// Templates

		"text!../templates/homeTemplate.html",
		"text!../templates/alerter.html",
		"text!../templates/logger.html"
	], 
	function(
		angular,
		ngRoute,

		// Controllers

		HomeCtrl,
		AlerterCtrl,
		LoggerCtrl,

		// Directives

		header,

		// Services

		httpCalls,

		// Factory

		xhr,

		// Templates

		homeTemplate,
		alerter,
		logger
	) {

	    var app = angular.module("projectModule", ["ngRoute"] )

	    	// Controllers

	    	.controller('HomeCtrl', HomeCtrl)
			.controller('AlerterCtrl', AlerterCtrl)
			.controller('LoggerCtrl', LoggerCtrl)

			// Directives

	    	.directive('headerDirective', header)
		
			// Services

			.service('httpCalls', httpCalls)

			// Factory
			
			.factory('xhr', xhr)
			
			.config(['$routeProvider', function($routeProvider) {
					$routeProvider.
						when('/', {
							template: homeTemplate,
							controller: 'HomeCtrl'
						}).
						when('/alerter', {
							template: alerter,
							controller: 'AlerterCtrl'
						}).
						when('/logger', {
							template: logger,
							controller: 'LoggerCtrl'
						}).
						otherwise({
							redirectTo: '/'
						});
		}]);

	    app.init = function () {
	    	angular.bootstrap(document, ['projectModule']);
		};

	    return app;
	}
);