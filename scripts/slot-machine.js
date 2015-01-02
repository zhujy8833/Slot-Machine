define(["jquery", "mustache", "underscore", "reel", "data"],
    function($, Mustache, _, Reel, SlotData){
    var APP = function(rootElement) {
        this.reelData = SlotData;
        this.rewards = ["coffee", "tea", "espresso"];
        this.template = $("#template").text();
        this.reels = [];
        this.rootElement = rootElement || $("#slot-machine");
        this.reelBtn = this.rootElement.find("button");
        this.result = [];
        this.init();
        this.bind();
    };

    APP.prototype = {
        init : function() {
            var _self = this;
            _self.itemHeight = 100;
            var reelsHolder = _self.rootElement.find("#reels");
            _.each(_self.reelData, function(reel){
                var array = [];
                _.each(reel, function(d, index) {
                    array.push({top : index * _self.itemHeight, data : d});
                });
                reelsHolder.append(Mustache.render(_self.template, {items : array}));
            });

            _self.reelsCount = _self.reelData.length;
            if(_self.reelsCount > 0) {
                reelsHolder.find("ul").each(function(index, ulElement){
                    _self.reels.push(new Reel({
                        element : ulElement,
                        index : index,
                        callbacks : {
                            onStartReel : function() {
                                _self.reelBtn.addClass("disabled");
                            },
                            onFinishReel : function(reel) {
                                _self.detectWinning(reel);
                                _self.reelBtn.removeClass("disabled");
                            }
                        }
                    }));
                });
            }

        },
        detectWinning : function(reelToDetect) {
            //console.log(reelToDetect);
            var _self = this;
            var reward_msg = $("#reward-message");
            this.result.push(reelToDetect.selectedIndex);
            if(this.result.length === this.reelsCount) {
                if(_.uniq(this.result).length > 1) {
                    reward_msg.html("");
                } else {
                    reward_msg.html("Congratulation! You just won a " + _self.rewards[_.uniq(this.result)[0]]);
                }
            }
        },
        bind : function() {
            var _self = this;
            this.reelBtn.on("click", function() {
                _self.result = [];
                _.invoke(_self.reels, "reel");
            });
        }
    };

    return APP;
});