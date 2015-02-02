(function(angular) {
	angular.module("uzuraApp", [])
	　.controller('MainController', ['$scope', function($scope) {
		$scope.tasks = [];
		$scope.newTask = '';
		
		$scope.addTask = function() {
			$scope.tasks.push({
				title: $scope.newTask,
				done: false
			});
			$scope.newTask = '';
		}
	　}]);
}(angular));