/**
 * Created by akokubu on 2015/02/18.
 */
(function(app) {
   'use strict';

    var ArrayItems = function($scope) {
        this.init($scope);
    };

    var p = ArrayItems.prototype;
    p.init = function($scope) {
        this.$scope = $scope;
        this.items = new Array();
        this.serial = 0;
    };

    p.setCurrentItem = function(item) {
        this.current = item;
    };

    p.getCurrentItem = function() {
        return this.current;
    };

    p.list = function(callback) {
        callback.call(this, this.items);
    };

    p.add = function(item, callback) {
        this.serial++;
        item.id = "id_" + this.serial;
        var $scope = this.$scope;
        this.items.push(item);
        //TODO
    };

    p.remove = function(item, callback) {
        var id = item.id;
        var tmp = new Array();
        for (var i=0; i<this.item.length; i++) {
            if (item.id != this.items[i].id) {
                tmp.push(this.items[i]);
            }
        }
        this.items = tmp;
        //TODO
    };
    app.ArrayItems = ArrayItems;
}(this.app));