define([
		'properties'
	], 
	function(
		Properties
	) {
		
		var self;
	    function GridCtrl($scope, httpCalls, $http, $sce){
	    	self = this;
	    	this.$scope = $scope;
	    	this.$http = $http;
	    	this.$sce = $sce;

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

    	

			$scope.showImplementation = function(ev, what){
				ev.preventDefault();
				if(what === 'client'){
					$scope.showWhat = 'client';
				}else{
					$scope.showWhat = 'server';
				}
			};

			$scope.closeMe = function(ev){
				ev.preventDefault();
				delete $scope.showWhat;
			};

		}

	    function formatMe(arg){
	    	var date = new Date(arg);

	    	function formatTime(input){
	    		var inputTime = parseInt(input);
	    		if(inputTime < 10){
	    			return '0' + inputTime;
	    		}else{
	    			return inputTime;
	    		}
	    	}

	    	function formatMonth(input){
	    		switch(input) {
				    case 0:
				        return 'Jan';
				    case 1:
				        return 'Feb';
				    case 2:
				        return 'Mar';
				    case 3:
				        return 'Apr';
					case 4:
				        return 'May';
				    case 5:
				        return 'Jun';
				    case 6:
				        return 'July';
				    case 7:
				        return 'Aug';
				    case 8:
				        return 'Sep';
				    case 9:
				        return 'Oct';
				    case 10:
				        return 'Nov';
				    case 11:
				        return 'Dec';
				}
	    	}

	    	return self.$sce.trustAsHtml('<strong>'+date.getDate() + '-' +
	    		formatMonth(date.getMonth()) + '-' + 
	    		date.getFullYear() + ' ' +
	    		formatTime(date.getHours()) + ':' + 
	    		formatTime(date.getMinutes()) + ':' +
	    		formatTime(date.getSeconds()) + '</strong>');
		}

		GridCtrl.prototype.createClientSideGrid = function(){
	    	this.$scope.gridData = {
	    		headerData : {
	    			serial : {
	    				label: 'No.',
	    				id : 'number',
	    				sort : true,
	    				sorted : 'desc',
	    				format: formatMe,
	    				width : '250px'
	    			},
	    			name: {
	    				label:'Name',
	    				id: 'name',
	    				sort : true,
	    				width: '250px'
	    			},
	    			age: {
	    				label:'Age',
	    				id: 'age',
	    				sort: true,
	    				width: '250px'
	    			},
	    			birthday: {
	    				label:'Birthday',
	    				id: 'birthday',
	    				sort: true,
	    				width: '250px'
	    			},
	    			salary: {
	    				label: 'Salary',
	    				id: 'salary',
	    				sort: true,
	    				width: '250px'
	    			},
	    			sortNumber : {
	    				label: 'Sort Number',
	    				id : 'sortNumber',
	    				sort : true,
	    				width : '250px'
	    			}
	    		},
	    		grid : [
	    			{
	    				serial: 1465796010006,
	    				name: 'Moroni',
	    				age: 50,
	    				birthday : 'Oct 28, 1970',
	    				salary : '60,000',
	    				sortNumber : 300525
	    			},
	    			{
	    				serial: 1465796010006,
	    				name: 'Tiancum',
	    				age: 43,
	    				birthday : 'Sep 28, 1970',
	    				salary : '40,000',
	    				sortNumber : 55245
	    			},
	    			{
	    				serial: 1465796010006,
	    				name: 'Jacob',
	    				age: 30,
	    				birthday : 'Oct 28, 1965',
	    				salary : '45,000',
	    				sortNumber : 9986367
	    			},
	    			{
	    				serial: 1465796010006,
	    				name: 'Nephi',
	    				age: 32,
	    				birthday : 'Oct 28, 1968',
	    				salary : '60,000',
	    				sortNumber : 225412
	    			}
	    		]
	    	};

	    	for(var i=0; i<1000; i++){
	    		this.$scope.gridData.grid.push(
	    			{
	    				serial : new Date().valueOf(),
	    				name : Math.random().toString().split('.')[1],
	    				age: Math.random().toString().split('.')[1],
	    				birthday: Math.random().toString().split('.')[1],
	    				salary: Math.random().toString().split('.')[1],
	    				sortNumber: Math.random().toString().split('.')[1]
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