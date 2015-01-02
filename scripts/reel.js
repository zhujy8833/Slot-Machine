//Reel
define(["jquery", "underscore", "reel-item"], function($, _, ReelItem){
    var Reel = function(options) {
        var _self = this;
        options = options || {};
        this.element = options.element || [];
        this.index = options.index;
        this.reelItems = [];
        $(this.element).find("li").each(function(index, ele) {
            _self.reelItems.push(new ReelItem({
                element : $(ele),
                itemIndex : index,
                parentElement : $(this.element),
                height : 100,
                totalItems : $(_self.element).find("li").length
            }));
        });
        this.callbacks = options.callbacks || {};
        this.counter = 0;
        this.itemHeight = 100;
    };

    Reel.prototype = {
        start : function() {
            var _self = this;
            this.counter = 0;
            // generate random number
            this.maxSpins = Math.floor((Math.random()*100)+1) + this.index * 100;

            if(_self.callbacks.onStartReel) {
                _self.callbacks.onStartReel(_self);
            }
        },

        reel : function() {
            var _self = this;
            this.start();
            while(this.counter < this.maxSpins) {
                this.counter++;
                this.moveItems();
            }
            this.selectedTarget = _.find(this.reelItems, function(reelItem) {
                var element = reelItem.getElement();
                return $(element).position().top === 0
            });

            this.selectedIndex = this.selectedTarget.getItemIndex();
            this.stop();
            //this.stop();
        },
        moveItems : function() {
            var _self = this;
            console.log()
            _.invoke(_self.reelItems, "moveUp");
        },
        stop : function() {
            var _self = this;
            if(_self.callbacks.onFinishReel) {
                _self.callbacks.onFinishReel(_self);
            }
        }
    }

    return Reel;
});
