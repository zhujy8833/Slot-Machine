define(["jquery", "underscore", "Reel"], function($, _, Reel) {
    var ReelItem = function(options) {
        options = options || {};
        var properties = {
            "parentElement" : [],
            "element" : [],
            "height" : 100,
            "itemIndex" : 0,
            "totalItems" : 0
        };

        for (var prop in properties) {
            this[prop] = options[prop] || properties[prop];
        }
        this.currentTop = $(this.element).position().top;
        this.previousTop = this.currentTop;
        this.currentPosition = this.itemIndex;
    };

    ReelItem.prototype = {
        moveUp : function(callback) {
            var _self = this;
            callback = callback || function(){};
            this.currentTop -= this.height;
            this.currentTop = this.currentTop < 0 ? (this.totalItems - 1) * this.height : this.currentTop;//this.currentTop === (-1) * (this.totalItems - 1) * this.height ?  : this.currentTop;

            this.currentPosition = parseInt(this.currentTop / 100, 10);
            this.element.animate({
                top : _self.currentTop
            }, 100, "linear", callback);

        },
        getElement : function() {
            return this.element;
        },
        getItemIndex : function() {
            return this.itemIndex;
        },
        getCurrentPosition : function() {
            return this.currentPosition;
        }
    };

    return ReelItem;
});