(function(module) {
   module.factory('Items', function($rootScope) {
       return new app.ArrayItems($rootScope);
   });
}(TodoModule));