/**
 * Created by akokubu on 2015/02/14.
 */
(function(module) {
    'use strict';

    module.controller('pageController', function($scope) {
        $scope.show = {
            list: true,
            add: false,
            info: false
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

    module.controller('listController', function($scope) {
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
}(TodoModule));
