define(["jquery", "underscore", "SlotMachine", "data", "Reel"],
	function($, _, SlotMachine, slotData, Reel) {
	describe("SlotMachine", function() {
		var slotMachine,
			testDiv,
            reelBtn;
		var createReel = function(attrs) {
            attrs = attrs || {};
			return new Reel(_.extend({
					element : $("<div></div>")
			}, attrs));
		};

		beforeEach(function() {
			testDiv = document.createElement("div");
            reelBtn = $("<button></button>");
            $(testDiv).append(reelBtn);
			slotMachine = new SlotMachine(testDiv);
        });

		afterEach(function() {
			$(testDiv).remove();
            slotMachine = undefined;
		});

		it("should init", function() {
			var onFinishReel = jasmine.createSpy("onFinishReel");
			expect(slotMachine.template).toBeDefined();
			expect(slotMachine.reelData.length).toBe(slotData.length);
			expect(slotMachine.reelsCount).toBe(slotData.length);
		});

        it("detectWinning - no winning", function() {
            slotMachine.reels = [];
            slotMachine.reels.push(createReel());
            slotMachine.reels.push(createReel());
            slotMachine.reels.push(createReel());
            slotMachine.reels[0].selectedIndex = 0;
            slotMachine.reels[1].selectedIndex = 1;
            slotMachine.reels[2].selectedIndex = 2;

            slotMachine.detectWinning(slotMachine.reels[0]);
            expect(slotMachine.result.length).toBe(1);
            expect(slotMachine.reward).not.toBeDefined();

            slotMachine.detectWinning(slotMachine.reels[1]);
            expect(slotMachine.result.length).toBe(2);
            expect(slotMachine.reward).not.toBeDefined();

            slotMachine.detectWinning(slotMachine.reels[2]);
            expect(slotMachine.result.length).toBe(3);
            expect(slotMachine.reward).not.toBeDefined();
        });

        it("detectWinning - winning", function() {
            slotMachine.reels = [];
            slotMachine.reels.push(createReel());
            slotMachine.reels.push(createReel());
            slotMachine.reels.push(createReel());
            slotMachine.reels[0].selectedIndex = 0;
            slotMachine.reels[1].selectedIndex = 0;
            slotMachine.reels[2].selectedIndex = 0;

            slotMachine.detectWinning(slotMachine.reels[0]);
            expect(slotMachine.result.length).toBe(1);
            expect(slotMachine.reward).not.toBeDefined();

            slotMachine.detectWinning(slotMachine.reels[1]);
            expect(slotMachine.result.length).toBe(2);
            expect(slotMachine.reward).not.toBeDefined();

            slotMachine.detectWinning(slotMachine.reels[2]);
            expect(slotMachine.result.length).toBe(3);
            expect(slotMachine.reward).toBeDefined();
            expect(slotMachine.reward).toBe(slotMachine.rewardsPool[0]);
        });

        it("reset", function() {
            slotMachine.reward = "coffee";
            slotMachine.result = [1,1,2];

            slotMachine.reset();
            expect(slotMachine.reward).not.toBeDefined();
            expect(slotMachine.result).toEqual([]);
        });

        it("bind", function() {
            var reel = createReel();
            spyOn(reel, "reel");
            spyOn(slotMachine, "reset");
            slotMachine.reels.push(reel);
            reelBtn.trigger("click");

            expect(reel.reel).toHaveBeenCalled();
            expect(slotMachine.reset).toHaveBeenCalled();
        });
	});
});