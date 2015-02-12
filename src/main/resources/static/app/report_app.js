angular.module('ReportApp', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'index-tmpl',
				controller: 'SheetListController'
			})
			.when('/new', {
				templateUrl: 'new-tmpl',
				controller: 'CreationController'
			})
			.when('/sheet/:id', {
				templateUrl: 'sheet-tmpl',
				controller: 'SheetController'
			})
			.otherwise({
				redirectTo: '/'
			});
	}])
	.controller('SheetController', [function SheetListController() {		
	}])
	.controller('CreationController', ['$scope', function CreationController($scope) {
		function createOrderLine() {
			return {
				productName: '',
				unitPrice: 0,
				count: 0
			};
		}
		
		// リストモデルに新しい明細行を追加する
		$scope.addLine = function() {
			$scope.lines.push(createOrderLine());
		};
		
		// リストモデルを初期化する
		$scope.initialize = function() {
			$scope.lines = [createOrderLine()];
		};
		
		// リストモデルから帳票モデルを作成して保存
		$scope.save = function() {};
		
		// 任意の明細行をリストモデルから取り除く
		$scope.removeLine = function(target) {
			var lines = $scope.lines;
			var index = lines.indexOf(target);
			
			if (index !== -1) {
				lines.splice(index, 1);
			}
		};
		
		// 引数から小計を計算して返す
		$scope.getSubtotal = function(orderLine) {
			return orderLine.unitPrice * orderLine.count;
		};
		
		// リストから合計金額を計算して返す
		$scope.getTotalAmount = function(lines) {
			var totalAmount = 0;
		
			angular.forEach(lines, function(orderLine) {
				totalAmount += $scope.getSubtotal(orderLine);
			});
			
			return totalAmount;			
		};

		$scope.lines = [createOrderLine()];
	}])
	.controller('SheetController', [function SheetController() {		
	}]);