describe("タスクサンプルのテスト", function() {
	// DIで設定する変数
	var $rootScope, $timeout, $controller, Items;
	var controller, $scope;
	
	// モジュールをロードする
	beforeEach(module('todoModule'));
	
	// DIを用いて、必要なサービスを設定する
	beforeEach(inject(function(_$controller_, _$rootScope_, _$timeout_, _Items_) {
		$rootScope = _$rootScope_;
		$controller = _$controller_;
		Items = _Items_;
		$timeout = _$timeout_;
		
		$scope = $rootScope.$new();
		controller = $controller('pageController', {
			$scope: $scope,
			$timeout: $timeout,
			Items: Items
		});
	}));
	
	it ('messageのテスト', function() {
		var msg = {
				type: 'alert-warning',
				text: '削除しました',
				show: true
		};
		
		$scope.showMessage(msg);
		expect($scope.message.show).toEqual(true);
		
		$timeout.flush();
		expect($scope.message.show).toEqual(false);
	});
	
	
	beforeEach(function() {
		// 事前準備
	});
	
	it("テスト項目１", function() {
		// 実際のテスト処理を記述
		// アサーションメソッドを使って値をチェック
		expect(1).toEqual(1);
	});
});