(function(angular) {
	angular.module("uzuraApp", [])
	　.controller('MainController', ['$scope', '$filter', function($scope, $filter) {
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
		$scope.changeFilter = function(filter) {
			$scope.currentFilter = filter;
		};
		
		var where = $filter('filter');
		$scope.$watch('tasks', function(tasks) {
			// tasksが増減したり各要素が変更された時に実行される
			var length = tasks.length;
			$scope.doneCount = where(tasks, $scope.filter.done).length;
			$scope.remainingCount = length - $scope.doneCount;
		}, true);
		
		var originalTask;		// 編集前のタスク
		$scope.editing = null;	// 編集モードのタスクモデル
		
		$scope.editTask = function(task) {
			originalTask = task.title;
			$scope.editing = task;
		}
		
		
	　}]);
}(angular));