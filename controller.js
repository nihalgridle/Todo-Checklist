	var app = angular.module("MyApp",[]);
	app.controller( "TODOListCtrl" , function ($scope) {
		
		$scope.tasks = [
		{ name: "Milestone #1", id: 0, isChecked: true  }, 
		{ name: "Milestone #2", id: 1, isChecked: true  }, 
		{ name: "Milestone #3", id: 2, isChecked: true },
		{ name: "Milestone #4", id: 3, isChecked: false }

		];

		$scope.filterOptions = { 
			filters:[
			{id: 1,name:"Show All"},
			{id: 2,name:"Checked"},
			{id: 3,name:"Unchecked"}
			]};

			$scope.filterItem = {
				filter: $scope.filterOptions.filters[0]
			}



			$scope.customFilter = function (tasks)
			{

				if ($scope.filterItem.filter.id===1)
					return true;
				else if(tasks.isChecked===true && $scope.filterItem.filter.id===2)
					return true;
				else if (tasks.isChecked===false && $scope.filterItem.filter.id===3)
					return true;
			};

			$scope.updateName = function(task, newName){
				task.name = newName;
			}; 

			var x=3; 

			$scope.AddToList = function ()

			{


				if ($scope.itemName!==""){
					$scope.tasks.push({name:$scope.itemName, id:x++,isChecked:false});
				}
				else{
					alert("no data!");
				}

				$scope.itemName="";
			};

			$scope.Remove = function (task)

			{
				$scope.tasks.splice(this.$index,1);
			};

			$scope.myFunct = function (event) 
			{
				if (event.keyCode === 13){
					$scope.AddToList();
				}
			};
		});