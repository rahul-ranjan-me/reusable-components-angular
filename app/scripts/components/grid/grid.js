define(
	[
		"lodash",
		"text!../../../templates/grid.html"
	], 
	function(
		_,
		grid
	){
    
	    return function(){
	    	return {
		    	template : grid,
		    	scope : {
		    		grid : '=',
		    		rowselect : '&'
		    	},
		    	replace : true,
		    	link : function($scope, elem, attrs){
		    		var headers = $scope.grid.headerData,
		    			gridItems = $scope.grid.grid;

		    		/* ****************
		    			This for loop will be called during the first rendering 
		    			of this directive to sort on load
																**************** */
		    		for(var i in headers){
		    			if(headers[i].sorted){
		    				$scope.grid.grid = (sorting(gridItems, headers[i].id, headers[i].sorted));
		    				if(headers[i].sorted ==='asc'){
		    					headers[i].direction = 'desc';
		    				}else{
		    					headers[i].direction = 'asc';
		    				}
		    			}
		    		}


		    		/* ****************
		    			Sorting on cloumn click
										**************** */

		    		$scope.sortMe = function(item){
		    			if(item.sort){

		    				for(var i in headers){
			    				if (item.id !== headers[i].id){
			    					delete headers[i].direction;
			    				}
			    			}

		    				if(item.direction && item.direction ==='asc'){
		    					item.direction = 'desc';
		    				}else{
		    					item.direction = 'asc';
		    				}
		    				$scope.grid.grid = (sorting(gridItems, item.id, item.direction));

		    			}
		    		}

		    		/* ****************
		    			Generic sorting function
									**************** */

		    		function sorting(data, item, direction){
		    			return _.orderBy(data, [item], [direction]);
		    		}
		    		
		    	}
		    };
	    };	

	}
);