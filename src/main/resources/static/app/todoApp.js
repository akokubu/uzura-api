(function(angular) {
	angular.module("uzuraApp", [])
	.service('taskService', ['$rootScope', '$filter', function($scope, $filter) {
		var list = []; // Taskリスト
		
		$scope.$watch(function() {
			return list;
		}, function(value) {
			$scope.$broadcast('change:list', value);
		}, true);
		
		var where = $filter('filter');
		
		var done = { done: true };
		var remaining = { done: false };
		
		// リストが扱えるフィルタリング条件
		this.filter = {
			done: done,
			remaining: remaining
		};
		
		// 完了状態のTaskのみを抽出して返す
		this.getDone = function() {
			return where(list, done);
		};
		
		// Taskを受け取り新しいTaskリストに加える
		this.add = function(title) {
			list.push({
				title: title,
				done: false
			});
		};
		
		this.remove = function(currentTask) {
			list = where(list, function(task) {
				return currentTask !== task; 
			});
		};
		
		this.removeDone = function() {
			list = where(list, remaining);
		};
		
		// リスト内のTaskすべての状態を引数に合わせる
		this.changeState = function(state) {
			angular.forEach(list, function(task) {
				task.done = state;
			});
		};
	}])
	.controller('RegisterController', ['$scope', 'taskService', function($scope, taskService) {
		$scope.newTask = '';
	
		$scope.addTask = function() {
			taskService.add($scope.newTask);
			$scope.newTask = '';
		};
	}])
	.controller('ToolbarController', ['$scope', 'taskService', function($scope, taskService) {
		$scope.filter = taskService.filter;
		
		$scope.$on('change:list', function(evt, list) {
			var length = list.length;
            var doneCount = taskService.getDone().length;
                        
            $scope.allCount = length;
            $scope.doneCount = doneCount;
            $scope.remainingCount = length - doneCount;
		});
		
		$scope.checkAll = function() {
			taskService.changeState(!!$scope.remainingCount);
		};
		
		$scope.changeFilter = function(filter) {
			$scope.$emit('change:filter', filter);
		};
		
		$scope.removeDoneTask = function() {
			taskService.removeDone();
		};
	}])
	.controller('TaskListController', ['$scope', 'taskService', function($scope, taskService) {
		$scope.$on('change:list', function(evt, list) {
			$scope.tasks = list;
		});
		
		var originalTitle;
		
		$scope.editing = null;
		
		$scope.editTask = function(task) {
			originalTitle = task.title;
			$scope.ediging = task;
		};
		
		$scope.doneEdit = function(taskForm) {
			if (taskForm.$invalid) {
				$scope.editing.title = originalTitle;
			}
			$scope.editing = originalTitle = null;
		};
		
		$scope.removeTask = function(task) {
			taskService.remove(task);
		};
	}])
	.controller('MainController', ['$scope', '$filter', function($scope, $filter) {
		$scope.currentFilter = null;
		
		$scope.$on('change:filter', function(evt, filter) {
			$scope.currentFilter = filter;
		});
	}])
	.directive('mySelect', function($timeout, $parse) {
		return function(scope, $el, attrs) {
			// scope ‐ 現在の$scopeオブジェクト,
			// $el   - jqLiteオブジェクト
			// attrs - DOM属性のハッシュ
			scope.$watch(attrs.mySelect, function(val) {
				if (val) {
					$timeout(function() {
						$el[0].select(); 
			        });
				}
			});
		};
	});
	
}(angular));