define([
		'../components/logger/logger',
		'../components/alerter/alerter'
	], 
	function(
		logger,
		alerter
	) {
		
	    function LoggerCtrl($scope){
	    	
	    	this.$scope = $scope;
	    	
	    	this.$scope.logMe = function(){
	    		
	    		var randomString = Math.random()+'',
	    			logAlert = alerter.alert('My application', 'I am going to log <strong>'+randomString+'</strong>', ['Ok', 'Cancel']);

	    		logAlert.on('ok', function(){
	    			logger.log(randomString);
	    		});
	    		
	    	};

	    }

	    return LoggerCtrl;
	}
);