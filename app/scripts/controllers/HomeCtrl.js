define([], 
	function() {
		
	    function HomeCtrl($scope, httpCalls){
	    	this.$scope = $scope;
	    	this.httpCalls = httpCalls;
	    	this.homepageResponse = this.homepageResponse.bind(this);
	    	this.getPageDetails();
	    }

	    HomeCtrl.prototype.getPageDetails = function(){
	    	this.httpCalls.home(null, this.homepageResponse);
	    };

	    HomeCtrl.prototype.homepageResponse = function(response){
	    	this.$scope.componentDetails = response;
	    };

	    return HomeCtrl;
	}
);