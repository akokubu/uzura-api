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
		
		// フィルタリング条件
		$scope.filter = {
			done: { done: true }, // 完了のみ
			remaining: { done: false } // 未完了のみ
		};
		
		// 現在のフィルタの状態モデル
		$scope.currentFilter = null;
		
		// フィルタリング条件の変更
		$scope.changeFilter(filter) {
			$scope.currentFilter = filter;
		};
		
		
	　}]);
}(angular));