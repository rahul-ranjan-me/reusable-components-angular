define(
	[
		"lodash",
		"text!../../../templates/grid.html"
	], 
	function(
		_,
		grid
	){
    
	    return function($filter){
	    	return {
		    	template : grid,
		    	scope : {
		    		grid : '=',
		    		rowselect : '&'
		    	},
		    	link : function($scope, elem, attrs){
		    		
		    		var headers = $scope.grid.headerData,
		    			gridItems = $scope.grid.grid,
		    			freezedItems = angular.copy(gridItems),
		    			allPages = [];
		    			pagesize = parseInt(attrs.pagesize),
		    			$scope.curPage = 0;
		    			$scope.pagePos = attrs.pagepos;
		    			$scope.view = attrs.view;
		    			$scope.switchView = attrs.switchview;
		    			$scope.userPaging = pagesize;

		    		/* ****************
		    			This for loop will be called during the first rendering 
		    			of this directive to sort on load
																**************** */
		    		doSortonLoad();

		    		$scope.changeView = function(view){
		    			$scope.view = view;
		    		}

		    		$scope.itemsPerPage = function(args){
		    			pagesize = parseInt(args);
		    			doSortonLoad();
		    		}

		    		/* ****************
		    			Sorting on cloumn click
										**************** */

		    		$scope.sortMe = function(item){
		    			if(item.sort){

		    				if(item.direction ==='asc'){
		    					item.direction = 'desc';
		    				}else{
		    					item.direction = 'asc';
		    				}

		    				gridItems = (sorting(gridItems, item.id, item.direction));
		    				$scope.curPage = 0;
		    				createPage();

		    				for(var i in headers){
			    				if (item.id !== headers[i].id){
			    					delete headers[i].direction;
			    				}
			    			}

		    			}

		    		}

		    		$scope.search = function(){
		    			gridItems = $filter('filter')(freezedItems, $scope.searchKey);
		    			createPage();
		    		}

		    		
		    		/* ****************
		    			Pagination navigation 
										**************** */
		    		$scope.updatePage = function(i, ev){
		    			ev.preventDefault();
		    			$scope.curPage = i;
		    			$scope.pageToShow = allPages[$scope.curPage];
		    		}

		    		$scope.prev = function(ev){
		    			ev.preventDefault();
		    			if($scope.curPage>0){
		    				$scope.curPage -= 1;
		    				$scope.pageToShow = allPages[$scope.curPage];
		    			}
		    		}

		    		$scope.next = function(ev){
		    			ev.preventDefault();
		    			if($scope.curPage<allPages.length-1){
		    				$scope.curPage += 1;
		    				$scope.pageToShow = allPages[$scope.curPage];
		    			}
		    		}

		    		/* ****************
		    			Sorting on data load
										**************** */

					function doSortonLoad(){
						for(var i in headers){
			    			if(headers[i].sorted){
			    				gridItems = (sorting(gridItems, headers[i].id, headers[i].sorted));
			    				headers[i].direction = headers[i].sorted;
			    			}
			    		}
			    		createPage();
					}

					/* ****************
		    			Client side paging of items
										**************** */
					function createPage(arg){
						var pages = [],
							page = [],
							item = 0;
						for(var i = 0; i < gridItems.length; i++){
							
							item = item+1;
							page.push(gridItems[i]);

							if(item === pagesize || i === gridItems.length-1){
								pages.push(page);
								item = 0;
								page = [];
							}
						}

						allPages = pages;
						$scope.pages = pages;
						$scope.pageToShow = pages[0];
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