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
	.controller('SheetListController', ['$scope', 'sheets', function SheetListController($scope, sheets) {
		$scope.list = sheets.list;
	}])
	.controller('CreationController', ['$scope', '$location', 'sheets', function CreationController($scope, $location, sheets) {
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
		$scope.save = function() {
			sheets.add($scope.lines);
			$location.path('/');
			
		};
		
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
	}])
	
	.service('sheets', [function() {
		this.list = []; // 帳票リスト
		
		// 明細行リストを受け取り新しい帳票を作成して帳票リストに加える
		this.add = function(lines) {
			this.list.push({
				id: String(this.list.length + 1),
				createdAt: Date.now(),
				lines: lines
			});
		};
		
		// 任意のidを持った帳票を返す
		this.get = function(id) {
			var list = this.list;
			var index = list.length;
			var sheet;
			
			while(index--) {
				sheet = list[index];
				if (sheet.id === id) {
					return sheet;
				}
			}
			return null;
		};
		
	}]);
	