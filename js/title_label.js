var Title_label = enchant.Class.create(enchant.Label, {
	initialize: function(y, id, text) {
		enchant.Label.call(this, text);
		this.height = 16;
		this.width = 112;
		this.id = id;
		this.x = this.set_x();
		this.y = y;
		this.register_label_eventListener();
	},

	register_label_eventListener: function() {
		this.addEventListener("touchstart", function() {
			var stage = createStage(this.id);
			core.popScene();
			core.pushScene(stage);
		});
	},

	set_x: function() {
		if (this.id % 2 == 0)
			return (core.width * 3 / 4) - (this.width / 2);
		else
			return (core.width / 4) - (this.width / 2);
	},
});