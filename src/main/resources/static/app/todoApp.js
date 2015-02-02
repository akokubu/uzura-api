(function(angular) {
	angular.module("uzuraApp", [])
	　.controller('MainController', ['$scope', function($scope) {
		$scope.tasks = [];
		
		$scope.addTask = function() {
			$scope.tasks.push({
				title: Math.random(),
				done: false
			});
		}
	　}]);
}(angular));