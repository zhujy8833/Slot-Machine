define(["jquery", "mustache", "underscore", "reel", "data"],
    function($, Mustache, _, Reel, SlotData){
    var APP = function(rootElement) {
        this.reelData = SlotData;
        this.rewards = ["coffee", "tea", "espresso"];
        this.template = $("#template").text();
        this.reels = [];
        this.rootElement = rootElement || $("#slot-machine");
        this.reelBtn = this.rootElement.find("button");
        this.reward_message = this.rootElement.find("#reward-message");
        this.reward_image = this.rootElement.find("#reward-img");
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
                            },
                            onFinishReel : function(reel) {
                                _self.detectWinning(reel);
                            }
                        }
                    }));
                });
            }

        },
        detectWinning : function(reelToDetect) {
            var _self = this,
                reward;
            this.result.push(reelToDetect.selectedIndex);
            if(this.result.length === this.reelsCount) {
                _self.reelBtn.removeClass("disabled");

                if(_.uniq(this.result).length === 1) {
                    reward = _self.rewards[_.uniq(this.result)[0]];
                    _self.reward_message.html("Congratulation! You just won a " + reward);
                    _self.reward_image.attr("data-reward", reward);
                }
            }
        },
        bind : function() {
            var _self = this;
            this.reelBtn.on("click", function() {
                _self.result = [];
                _self.reelBtn.addClass("disabled");
                _self.reward_message.html("");
                _self.reward_image.attr("data-reward", "");
                _.invoke(_self.reels, "reel");
            });
        }
    };

    return APP;
});