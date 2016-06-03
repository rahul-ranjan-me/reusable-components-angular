define([
		"angular", 
		"ngRoute",

		// Controllers

		"controllers/HomeCtrl",
		"controllers/AlerterCtrl",
		"controllers/LoggerCtrl",
		"controllers/GridCtrl",

		// Directives

		"directives/header",
		"components/grid/grid",

		// Services

		"services/httpCalls.js",

		//Factories

		"factory/xhr.js",

		// Templates

		"text!../templates/homeTemplate.html",
		"text!../templates/alerter.html",
		"text!../templates/logger.html",
		"text!../templates/gridExample.html"
	], 
	function(
		angular,
		ngRoute,

		// Controllers

		HomeCtrl,
		AlerterCtrl,
		LoggerCtrl,
		GridCtrl,

		// Directives

		header,
		grid,

		// Services

		httpCalls,

		// Factory

		xhr,

		// Templates

		homeTemplate,
		alerter,
		logger,
		gridExample
	) {

	    var app = angular.module("projectModule", ["ngRoute"] )

	    	// Controllers

	    	.controller('HomeCtrl', HomeCtrl)
			.controller('AlerterCtrl', AlerterCtrl)
			.controller('LoggerCtrl', LoggerCtrl)
			.controller('GridCtrl', GridCtrl)

			// Directives

	    	.directive('headerDirective', header)
	    	.directive('gridDirective', grid)
		
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
						when('/grid', {
							template: gridExample,
							controller: 'GridCtrl'
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