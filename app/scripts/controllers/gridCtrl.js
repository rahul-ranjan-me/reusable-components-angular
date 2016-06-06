define([], 
	function() {
		
	    function GridCtrl($scope, httpCalls){
	    	this.$scope = $scope;

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

	    	this.$scope.onRowSelect = function(row){
	    		this.$scope.selectedRow = row;
	    	}.bind(this);
	    }

	    return GridCtrl;
	}
);