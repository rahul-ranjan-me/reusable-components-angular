define([
		'properties'
	], 
	function(
		Properties
	) {
		
	    function GridCtrl($scope, httpCalls, $http){
	    	this.$scope = $scope;
	    	this.$http = $http;

			/* *************************************
				Client side implementation starts here
			************************************* */

			this.createClientSideGrid();	

			/* *************************************
				Client side implementation ends here
			************************************* */


			/* *************************************
				Server side implementation starts here
			************************************* */
			this.createServerSideGrid();		

			/* *************************************
				Server side implementation ends here
			************************************* */

    	
	    }

	    GridCtrl.prototype.createClientSideGrid = function(){
	    	this.$scope.gridData = {
	    		headerData : {
	    			name: {
	    				label:'Name',
	    				id: 'name',
	    				width:'25%'
	    			},
	    			age: {
	    				label:'Age',
	    				id: 'age',
	    				sort: true,
	    				sorted: 'asc',
	    				width:'25%'
	    			},
	    			birthday: {
	    				label:'Birthday',
	    				id: 'birthday',
	    				sort: true,
	    				width:'25%'
	    			},
	    			salary: {
	    				label: 'Salary',
	    				id: 'salary',
	    				sort: true,
	    				width:'25%'
	    			}
	    		},
	    		grid : [
	    			{
	    				name: 'Moroni',
	    				age: 50,
	    				birthday : 'Oct 28, 1970',
	    				salary : '60,000'
	    			},
	    			{
	    				name: 'Tiancum',
	    				age: 43,
	    				birthday : 'Sep 28, 1970',
	    				salary : '40,000'
	    			},
	    			{
	    				name: 'Jacob',
	    				age: 30,
	    				birthday : 'Oct 28, 1965',
	    				salary : '45,000'
	    			},
	    			{
	    				name: 'Nephi',
	    				age: 32,
	    				birthday : 'Oct 28, 1968',
	    				salary : '60,000'
	    			}
	    		]
	    	};

	    	for(var i=0; i<1000; i++){
	    		this.$scope.gridData.grid.push(
	    			{
	    				name : Math.random().toString().split('.')[1],
	    				age: Math.random().toString().split('.')[1],
	    				birthday: Math.random().toString().split('.')[1],
	    				salary: Math.random().toString().split('.')[1]
	    			}	
	    		);
	    	}
	    	this.$scope.onClientRowSelect = function(row){
	    		this.$scope.selectedClientRow = row;
	    	}.bind(this);
	    };


	    GridCtrl.prototype.createServerSideGrid = function(){
	    	this.$scope.params = {
				page : 0,
				sortKey : 'age',
				sortDirection: 'asc',
				search : null
			};

			this.$scope.serverGridData = {
				headerData : {
	    			name: {
	    				label:'Name',
	    				id: 'name',
	    				width:'25%'
	    			},
	    			age: {
	    				label:'Age',
	    				id: 'age',
	    				sort: true,
	    				sorted: 'asc',
	    				width:'25%'
	    			},
	    			birthday: {
	    				label:'Birthday',
	    				id: 'birthday',
	    				sort: true,
	    				width:'25%'
	    			},
	    			salary: {
	    				label: 'Salary',
	    				id: 'salary',
	    				sort: true,
	    				width:'25%'
	    			}
	    		},
	    		grid : []
			};

			this.callServer(this.$scope.params);

			this.$scope.onServerRowSelect = function(row){
	    		this.$scope.selectedServerRow = row;
	    	}.bind(this);

	    	this.$scope.callServer = function(params){
	    		this.callServer(params);
	    	}.bind(this);
	    };

	    GridCtrl.prototype.callServer = function(params) {
	    	var context = this;
	    	this.$http({
    			url : Properties.gridAction,
    			method: 'GET',
    			params: params ? params : {}
    		})
    		.then(function successCallback(response) {
    			var data = response.data;
    			context.$scope.serverGridData.grid = data.gridData;
    			context.$scope.serverGridData.totalRecords = data.records;
    			context.$scope.serverGridData.pageSize = data.pageSize;
    			context.$scope.serverGridData.currentPage = data.currentPage;
    			context.$scope.$broadcast('griddata', {grid: context.$scope.serverGridData});
    		}.bind(this), function errorCallback(response) {
				alert('some error occured');
			});
	    };

	    return GridCtrl;
	}
);