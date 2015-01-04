define(["jquery", "underscore", "ReelItem"],
	function($, _, ReelItem) {
		describe("ReelItem", function() {
			var reelItem,
				parentElement,
				elememt;
			beforeEach(function() {
				parentElement = document.createElement("ul");
				$(parentElement).html("<li>123</li>");
				element = $(parentElement).find("li");

				reelItem = new ReelItem({
					parentElement : parentElement,
					element : element,
					itemIndex : 1,
					totalItems : 1
				});
				jasmine.clock().install();
			});

			afterEach(function() {
				$(element).remove();
				$(parentElement).remove();
				jasmine.clock().uninstall();
			});

			it("init", function() {
				expect(reelItem.currentPosition).toBe(1);
				expect(reelItem.height).toBe(100);
			});

			it("should move up", function() {
				reelItem.currentTop = 100;
				reelItem.moveUp();
				jasmine.clock().tick(400);
				expect(reelItem.currentTop).toBe(0);

				//make currentTop less than 0
				reelItem.moveUp();
				expect(reelItem.currentTop).toBe(0);

				//change totalItems, make currentTop less than 0
				reelItem.totalItems = 2;
				reelItem.moveUp();
				expect(reelItem.currentTop).toBe(100);
			});

		});
	});