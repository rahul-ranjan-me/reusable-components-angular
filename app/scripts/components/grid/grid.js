define(
	[
		"lodash",
		"text!../../../templates/grid.html"
	], 
	function(
		_,
		grid
	){
    
	    return function($filter, $rootScope, $timeout){
	    	return {
		    	template : grid,
		    	scope : {
		    		grid : '=',
		    		params : '=',
		    		callserver : '&',
		    		rowselect : '&'
		    	},
		    	require: '?ngModel',
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
		    			$scope.columnCount = attrs.columncount;

		    			$scope.server = attrs.server;
		    			$scope.pageArray = [];


		    		/* ****************************************************************
		    			This for loop will be called during the first rendering 
		    			of this directive to sort on load
					***************************************************************** */
		    		doSortonLoad();

		    		$scope.changeView = function(view){
		    			$scope.view = view;
		    		}

		    		$scope.itemsPerPage = function(args){
		    			pagesize = parseInt(args);
		    			$scope.curPage = 0;
		    			createPage();
		    		}

		    		/* ***********************************************
		    			Sorting on cloumn click
					************************************************ */

		    		$scope.sortMe = function(item){
		    			if(item.sort){

		    				if(item.direction ==='asc'){
		    					item.direction = 'desc';
		    				}else{
		    					item.direction = 'asc';
		    				}

		    				if($scope.server){
		    					$scope.makeParams({sortKey: item.id, direction: item.direction}, null, 'sort');
		    				}else{
			    				gridItems = (sorting(gridItems, item.id, item.direction));
			    				$scope.curPage = 0;
			    				createPage();
			    			}

		    				for(var i in headers){
			    				if (item.id !== headers[i].id){
			    					delete headers[i].direction;
			    				}
			    			}

		    			}

		    		}

		    		$scope.search = function(search){
		    			if($scope.server){
		    				$scope.makeParams(search, null, 'search');
		    			}else{
		    				gridItems = $filter('filter')(freezedItems, search);
		    				createPage();
			    		}
		    		}

		    		
		    		/* ***********************************************
		    			Pagination navigation 
					************************************************ */
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
		    			Server side interaction methods starts here
									**************** */


					var sortingObj = {};

					if($scope.server){renderFromServer();}

					function createServerPage(totalRecords, pagesize){
						var indices;

						if(totalRecords%pagesize === 0){
							indices = totalRecords/pagesize;
						}else{
							indices = (totalRecords/pagesize)+1;
						}

						for(var i=0; i<indices; i++){
							$scope.pageArray.push(i);
						}
					}

					function renderFromServer(){
						sortingObj.sortKey = $scope.params.sortKey;
						sortingObj.direction = $scope.params.sortDirection;
						$scope.currentPage = $scope.grid.currentPage;
						if($scope.server){
							$scope.$on('griddata', function (event, args) {
								gridItems = args.grid.grid;
								$scope.currentPage = args.grid.currentPage;
								doSortonLoad();
								createServerPage($scope.grid.totalRecords, $scope.grid.pageSize);
								$scope.curPage = 0;
							});
						}
					}


					$scope.makeParams = function(data, ev, event){
						if(ev){ev.preventDefault();}

						if(event === 'page'){
							$scope.params.page = data;
						}else if(event === 'prev'){
							$scope.params.page = data-1;
						}else if(event === 'next'){
							$scope.params.page = data+1;
						}else if(event === 'search'){
							$scope.params.search = data;
						}else if(event === 'sort'){
							if(sortingObj.sortKey !== data.sortKey){
								delete headers[sortingObj.sortKey].sorted;
								delete headers[sortingObj.sortKey].direction;
								sortingObj.sortKey = data.sortKey;
								sortingObj.direction = data.sortDirection;
							}
							$scope.params.sortKey = data.sortKey;
							$scope.params.sortDirection = data.direction;
						}

						$scope.callserver($scope.params);
					}

					/* ****************
		    			Server side interaction methods ends here
									**************** */

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