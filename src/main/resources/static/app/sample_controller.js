/**
 * Created by akokubu on 2015/02/14.
 */
(function(module) {
    'use strict';

    module.controller('pageController', function($scope, $timeout) {
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
            $scope.showMessage({
                type: 'alert-warning',
                text: '削除しました',
                show: true
            });
            $scope.$root.$broadcast('changeItems');
            $scope.changePage('list');
        };

        $scope.changePage = function(type) {
            for (var name in $scope.show) {
                if (name == type) {
                    $scope.show[name] = true;
                } else {
                    $scope.show[name] = false;
                }
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
//            $scope.$parent.active = item;
            $scope.$parent.changePage('info');
        };

        // 一覧データが変わったときには、再度一覧データを取得しなおす
        $scope.$on('changeItems', function() {
            Items.list(function(list) {
               $scope.items = list;
            });
        });

        $scope.items = [
            {
                title: 'お買い物リスト',
                memo: '大根と豆腐を買ってくる'
            },
            {
                title: '通帳記入をする',
                memo: 'XX銀行の貯金通帳に記入する'
            }
        ];
    });

    module.controller('addController', function($scope) {
       $scope.addItem = function() {
           console.log('addItem');
           if (!$scope.addItemForm.$valid) {
               alert('入力エラーです');
               return;
           }

           $scope.$parent.showMessage({
               type: 'alert-info',
               text: '追加しました',
               show: true
           });

           $scope.$root.$broadcast('changeItems');
           $scope.$parent.changePage('list');
           $scope.item = {};
       }
    });
}(TodoModule));
