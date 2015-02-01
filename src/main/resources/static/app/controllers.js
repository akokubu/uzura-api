(function(angular) {
	var AppController = function($scope, Item) {
		Item.query(function(response) {
			$scope.items = response ? response : [];
		});
		
		$scope.addItem = function(newItem) {
			new Item({
				firstName: newItem.firstName,
				lastName: newItem.lastName
			}).$save(function(item) {
				$scope.items.push(item);
			});
			$scope.newItem = "";
		};
		
		$scope.deleteItem = function(item) {
          item.$remove(function() {
		    $scope.items.splice($scope.items.indexOf(item), 1);
		  });	
		}
	};
	
	AppController.$inject = ['$scope', 'Item'];
	angular.module("myApp.controllers").controller("AppController", AppController);
}(angular));