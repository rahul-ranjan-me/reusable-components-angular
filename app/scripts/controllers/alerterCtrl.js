define([
		'../components/alerter/alerter'
	], 
	function(
		alerter
	) {
		
	    function HomeCtrl($scope){
	    	this.$scope = $scope;
	    	
	    	this.$scope.alertClick = function() {
				var abc = alerter.alert('My Application', 'This is para 1', 'This is para 2', ['OK', 'Cancel']);
				abc.on('ok', function(){
		    		alert('I am alert ok');
		    	});

		    	abc.on('cancel', function(){
		    		alert('I am alert cancel');
		    	});
	    	};

	    	this.$scope.warnClick = function() {
				var xyz = alerter.warn('My Application', '<strong>This is new</strong>', 'This is old', ['OK', 'Cancel', 'Reload Me']);

		    	xyz.on('ok', function(){
		    		alert('I am warn ok');
		    	});

		    	xyz.on('cancel', function(){
		    		alert('I am warn cancel');
		    	});

		    	xyz.on('reloadMe', function(){
		    		alert('I am reload');
		    	}); 		
	    	};

	    	this.$scope.errorClick = function() {
				var xyz = alerter.error('My Application', 'Some errors requires your attention', ['OK']);

		    	xyz.on('ok', function(){
		    		alert('I am error ok');
		    	});

	    	};

	    	this.$scope.notificationClick = function() {
				var xyz = alerter.notification('My Application', 'I will go off in <strong>3</strong> seconds', [3]);
	    	};

	    }

	    return HomeCtrl;
	}
);