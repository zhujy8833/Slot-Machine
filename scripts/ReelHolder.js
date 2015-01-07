//Reel
define(["jquery", "underscore", "ReelItem"], function($, _, ReelItem){
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
                height : 140,
                totalItems : $(_self.element).find("li").length
            }));
        });
        this.callbacks = options.callbacks || {};
        this.counter = 0;
        this.itemHeight = 140;
    };

    Reel.prototype = {
        start : function() {
            var _self = this;
            this.counter = 0;
            // generate random number
            this.rounds = Math.floor((Math.random()*10)+1);

            if(_self.callbacks.onStartReel) {
                _self.callbacks.onStartReel(_self);
            }
        },

        reel : function() {
            var _self = this;
            this.start();
            while(this.counter < this.rounds) {
                this.counter++;
                this.moveItems();
            }
            setTimeout(function() {
                _self.stop();
            }, _self.rounds * 100);
        },

        moveItems : function() {
            var _self = this;
            _.invoke(_self.reelItems, "moveUp");

            return this;
        },

        stop : function() {
            var _self = this;
            this.selectedTarget = _.find(this.reelItems, function(reelItem) {
                return reelItem.getCurrentPosition() === 0;
            });

            this.selectedIndex = this.selectedTarget.getItemIndex();

            if(_self.callbacks.onFinishReel) {
                _self.callbacks.onFinishReel(_self);
            }

            return this;
        }
    }

    return Reel;
});
