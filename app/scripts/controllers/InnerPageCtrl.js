define([
		'../logger'
	], 
	function(
		logger
	) {

	    function PhoneDetailCtrl($scope){

	    	this.$scope = $scope;
	    	$scope.pageName = "Innerpage";

	    	$scope.goHomepage = function(val){
	    		this.navigate('/');
	    	}.bind(this);
	    }

	    PhoneDetailCtrl.prototype.navigate = function(val){
	    	logger.log('I am coming innerpage');
	    	this.$scope.hash = val;
	    	window.location.hash = val;
	    };

	    return PhoneDetailCtrl;
	    
	}
);