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
			console.log("add");
			list.push({
				title: title,
				done: false
			});
			console.log(list);
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
			angular.forEac(list, function(task) {
				task.done = state;
			});
		};
	}])
	.controller('RegisterController', ['$scope', 'taskService', function($scope, taskService) {
		$scope.newTask = '';
		
		$scope.addTask = function() {
			taskService.add($scope.newTitle);
			$scope.newTask = '';
		};
	}])
	.controller('ToolbarController', ['$scope', 'taskService', function($scope, taskService) {
		$scope.filter = taskService.filter;
		
		$scope.on('change:list', function(evt, list) {
			var length = list.length;
            var doneCount = tasks.getDone().length;
                        
            $scope.allCount = length;
            $scope.doneCount = doneCount;
            $scope.remaningCount = length - doneCount;
		});
		
		$scope.checkAll = function() {
			taskService.changeState(!!$scope.remainingCount);
		};
		
		$scope.changeFilter = function(filter) {
			$scope.emit('change:filter', filter);
		};
		
		$scope.removeDoneTask = function() {
			taskService.removeDone();
		};
	}]);
	.controller('MainController', ['$scope', '$filter', function($scope, $filter) {
		$scope.tasks = [];
		
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
		
		$scope.doneEdit = function(taskForm){
			if (taskForm.$invalid) {
				$scope.editing.title = originalTask;
			}
			$scope.editing = originalTask = null;
		}
		
		// 全て完了、未完了
		$scope.checkAll = function() {
			console.log($scope.remainingCount)
			console.log(!$scope.remainingCount)
			var state = !!$scope.remainingCount;
			
			angular.forEach($scope.tasks, function(task) {
				task.done = state
			});
		}
		
		// 完了したTaskを全て削除
		$scope.removeDoneTask = function() {
			$scope.tasks = where($scope.tasks, $scope.filter.remaining);
		}
		
		// 任意のTaskを削除
		$scope.removeTask = function(currentTask) {
			$scope.tasks = where($scope.tasks, function(task) {
				return currentTask !== task;
			});
		};
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