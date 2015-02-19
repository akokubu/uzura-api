/**
 * Created by akokubu on 2015/02/18.
 */
(function(app) {
   'use strict';

    var AjaxItems = function($scope, $http) {
        this.init($scope, $http);
    };

    var p = AjaxItems.prototype;
    p.init = function($scope, $http) {
        this.$scope = $scope;
        this.$http = $http;
    };

    p.setCurrentItem = function(item) {
        this.current = item;
    };

    p.getCurrentItem = function() {
        return this.current;
    };

    p.list = function(callback) {
    	this.$http({
    		method: 'GET',
    		url: 'api/tasks'
    	}).success(function(response, status, headers, config, statusText) {
    		callback.call(this, response);
    	});
    };

    p.add = function(item, callback) {
        var $scope = this.$scope;
        this.$http({
        	method: 'POST',
        	url: 'api/tasks',
        	data: {
        		title: item.title,
        		memo: item.memo
        	}
    	}).success(function(response, status, headers, config, statusText) {
    		$scope.$broadcast('changeItems');
    		callback.call(this, response.data);
    	});
    };

    p.remove = function(item, callback) {
    	var $scope = this.$scope;
    	this.$http({
    		method: 'DELETE',
    		url: 'api/tasks/' + item.id
    	}).success(function(response, status, headers, config, statusText) {
    		$scope.$broadcast('changeItems');
    		callback.call(this, response);
    	});
    };
    
    app.AjaxItems = AjaxItems;
}(this.app));
