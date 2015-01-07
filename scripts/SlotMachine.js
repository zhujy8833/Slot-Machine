define(["jquery", "mustache", "underscore", "ReelHolder", "data"],
    function($, Mustache, _, Reel, SlotData){
    var APP = function(rootElement) {
        this.reelData = SlotData;
        this.rewardsPool = ["coffee", "tea", "espresso"];
        this.template = $("#template").text();
        this.reels = [];
        this.rootElement = $(rootElement) || $("#slot-machine");
        this.reelBtn = this.rootElement.find("button");
        this.reward_message = this.rootElement.find("#reward-message span");
        this.reward_image = this.rootElement.find("#reward-img");
        this.result = [];
        this.init();
        this.bind();
    };

    APP.prototype = {
        init : function() {
            var _self = this;
            _self.itemHeight = 140;
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
                    reward = _self.rewardsPool[_.uniq(_self.result)[0]];
                    _self.reward_message.html("Congratulation! You just won a cup of " + reward + "!")
                        .addClass("rewarding");
                    _self.reward_image.attr("data-reward", reward);
                    _self.reward = reward;
                }
            }
        },
        bind : function() {
            var _self = this;
            this.reelBtn.on("click", function() {
                _self.reset();
                _.invoke(_self.reels, "reel");
            }).on("mousedown", function() {
                var ele = $(this);
                ele.addClass("mousedown");
                $(document).on("mouseup", function(){
                    ele.removeClass("mousedown");
                    $(document).off("mouseup");
                })
            });
        },
        reset : function() {
            this.result = [];
            this.reward = undefined;
            this.reelBtn.addClass("disabled");
            this.reward_message.html("").removeClass("rewarding");
            this.reward_image.attr("data-reward", "");

            return this;
        }
    };

    return APP;
});