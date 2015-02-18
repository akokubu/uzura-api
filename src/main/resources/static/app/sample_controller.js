/**
 * Created by akokubu on 2015/02/14.
 */
(function(module) {
    'use strict';

    module.controller('pageController', function($scope, $timeout, Items) {
        $scope.show = {
            list: true,
            add: false,
            info: false
        };

        $scope.message = {
            type: 'alert-info',
            text: '',
            show: false
        };

        $scope.showMessage = function(msg) {
            $scope.message = msg;
            $timeout(function() {
                $scope.message.show = false;
            }, 3000);
        };

        $scope.deleteItem = function(item) {
        	
        	Items.remove(item, function() {
        		$scope.changePage('list');
        		$scope.showMessage({
        			type: 'alert-warning',
        			text: '削除しました',
        			show: true
        		});
        	});
        };

        $scope.changePage = function(type) {
            for (var name in $scope.show) {
                if (name == type) {
                    $scope.show[name] = true;
                } else {
                    $scope.show[name] = false;
                }
            }
            if (type == 'info') {
            	var item = Items.getCurrentItem();
            	console.log(item);
            	$scope.active = item;
            }
        };
    });

    module.controller('listController', function($scope, Items) {
        // 一覧データを取得
        Items.list(function(list) {
           $scope.items = list;
        });

        // 一覧からクリックされた時の処理（詳細ページに繊維）
        $scope.show = function(item) {
            Items.setCurrentItem(item);
            $scope.$parent.changePage('info');
        };

        // 一覧データが変わったときには、再度一覧データを取得しなおす
        $scope.$on('changeItems', function() {
            Items.list(function(list) {
               $scope.items = list;
            });
        });
    });

    module.controller('addController', function($scope, Items) {
       $scope.addItem = function() {
           if (!$scope.addItemForm.$valid) {
               alert('入力エラーです');
               return;
           }
           
           Items.add($scope.item, function(data) {
        	   $scope.$parent.showMessage({
        		   type: 'alert-info',
        		   text: '追加しました',
        		   show: true
        	   });
        	   $scope.$parent.changePage('list');
        	   $scope.item = {};
           });

       }
    });
}(TodoModule));
