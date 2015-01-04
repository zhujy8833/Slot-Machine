define(["jquery", "underscore", "Reel", "ReelItem"],
	function($, _, Reel, ReelItem){
		describe("Reel", function(){
			var reel,
				reelString = "<ul><li>123</li><li>456</li><li>789></li></ul>",
				container,
				element;
			beforeEach(function() {
                container = document.createElement("div");
				$(container).html(reelString);
                element = $(container).find("ul");
				reel = new Reel({
					element : element,
					index : 0
				});
                jasmine.clock().install();
			});

			afterEach(function() {
				element.remove();
				$(container).html("");
                jasmine.clock().uninstall();
			});

			it("should init", function() {
				expect(reel.element).toBeDefined();
				expect(reel.index).toBeDefined();
				expect(reel.index).toBe(0);
				expect(reel.reelItems.length).toBe(3);
				_.each(reel.reelItems, function(item) {
					expect(item instanceof ReelItem).toBe(true);
				});
			});

			it("should start", function() {
				var onStartCallback = jasmine.createSpy("onStartCallback");
				reel.callbacks.onStartReel = onStartCallback;

				reel.start();
				expect(reel.rounds).toBeDefined();
				expect(reel.counter).toBe(0);
				expect(onStartCallback).toHaveBeenCalled();
			});

			it("should reel", function() {
				spyOn(reel, "start");
				spyOn(reel, "moveItems");
                spyOn(reel, "stop");
				reel.rounds = 12;
				reel.reel();
				expect(reel.start).toHaveBeenCalled();
				expect(reel.counter).toBe(12);
				expect(reel.moveItems).toHaveBeenCalled();

                jasmine.clock().tick(reel.rounds * 100);
                expect(reel.stop).toHaveBeenCalled();
			});

			it("should moveItems", function() {
                var reelItem1 = reel.reelItems[0],
                    reelItem2 = reel.reelItems[1],
                    reelItem3 = reel.reelItems[2];
                spyOn(reelItem1, "moveUp");
                spyOn(reelItem2, "moveUp");
                spyOn(reelItem3, "moveUp");

                reel.moveItems();
                expect(reelItem1.moveUp).toHaveBeenCalled();
                expect(reelItem2.moveUp).toHaveBeenCalled();
                expect(reelItem3.moveUp).toHaveBeenCalled();
            });

			it("should stop", function() {
                var targetReelItem = reel.reelItems[0];
                var onFinishCallback = jasmine.createSpy("onFinish");
                reel.callbacks.onFinishReel = onFinishCallback;
                targetReelItem.currentPosition = 0;

                reel.stop();
                expect(reel.selectedTarget).toBe(targetReelItem);
                expect(reel.selectedIndex).toBe(targetReelItem.getItemIndex());
                expect(onFinishCallback).toHaveBeenCalled();
			});
		})
	});