define(["jquery", "underscore", "reel"], function($, _, Reel) {
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
    };

    ReelItem.prototype = {
        moveUp : function() {
            this.currentTop -= this.height;
            this.currentTop = this.currentTop < (-1) * (this.totalItems - 1) * this.height ? 0 : this.currentTop;
            this.element.css({
                top : this.currentTop
            });
        },
        getElement : function() {
            return this.element;
        },
        getItemIndex : function() {
            return this.itemIndex;
        }
    };

    return ReelItem;
});