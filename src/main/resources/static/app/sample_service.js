(function(module) {
   module.factory('Items', function($rootScope, $http) {
       return new app.AjaxItems($rootScope, $http);
   });
}(TodoModule));