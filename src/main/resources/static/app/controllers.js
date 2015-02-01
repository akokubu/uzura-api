(function(angular) {
	var AppController = function($scope, Item) {
		Item.query(function(response) {
			$scope.items = response ? response : [];
		});
		
		$scope.addItem = function(newItem) {
			console.log(newItem);
			new Item({
				firstName: newItem.firstName,
				lastName: newItem.lastName
			}).$save(function(item) {
				$scope.items.push(item);
			});
			$scope.newItem = "";
		};
	};
	
	AppController.$inject = ['$scope', 'Item'];
	angular.module("myApp.controllers").controller("AppController", AppController);
}(angular));