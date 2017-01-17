var app = angular.module("MyApp",[]);
app.controller( "TODOListCtrl", function ($scope, todoService) {




$scope.tasks = todoService.list();

//localStorage.setItem('tasks', JSON.stringify($scope.tasks));

//$scope.tasks = todoService.list();

$scope.filterOptions = { 
	filters:[
	{id: 1,name:"Show All"},
	{id: 2,name:"Checked"},
	{id: 3,name:"Unchecked"}
	]
	};

	$scope.filterItem = {

		filter: $scope.filterOptions.filters[0]
	}



	$scope.customFilter = function (tasks){

		if ($scope.filterItem.filter.id===1){

			return true;
		}

		else if(tasks.isChecked===true && $scope.filterItem.filter.id===2){

			return true;
		}

		else if (tasks.isChecked===false && $scope.filterItem.filter.id===3){

			return true;
		}
	};

	var x=3; 

	$scope.addToList = function (){

		//console.log(itemName);
		
		if ($scope.itemName!==""){
			todoService.insert($scope.itemName);
		}
		else{
			alert("no data!");
		}

		$scope.itemName="";

	};


	$scope.remove = function (){
		
        task=this;
		todoService.delete(task);
	};

	$scope.onEnterAdd = function (event) {

		if (event.keyCode === 13){
			$scope.addToList();
		}
	};	

	$scope.onEnterUpdate = function (event, task, newName){

		if (event.keyCode === 13){
			
			$scope.updateName(task, newName);
			return true;
		}
		else{ 
			return false;
		}	
	};

	$scope.updateName = function(task, newName){

		todoService.edit(task, newName);
	}; 
});

app.factory('todoService', function(){

	var saved = localStorage.getItem('tasks');

	//var x=3;
	var tasks = (localStorage.getItem('tasks')!==null) ? JSON.parse(saved) :  [{ name: "Milestone #1", id: 0, isChecked: true  }, 
			{ name: "Milestone #2", id: 1, isChecked: true  }, 
			{ name: "Milestone #3", id: 2, isChecked: true  },
			{ name: "Milestone #4", id: 3, isChecked: true  }];		

		return {


    	list: function(){
    		return tasks;
    	},

    	insert: function(itemName){
    			
    			tasks.push({
    				name: itemName, isChecked:false
    			});
    			//_saveToLocalStorage(tasks);
    			localStorage.setItem('tasks', JSON.stringify(tasks));
    			
    	},

    	delete: function(task){
    			
				tasks.splice(task.$index, 1);
				localStorage.setItem('tasks', JSON.stringify(tasks));   		
    	},

    	edit: function(task, newName){
   
    			task.name=newName;
    			localStorage.setItem('tasks', JSON.stringify(tasks));
    	}

    }

 });