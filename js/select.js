var Select = enchant.Class.create(Block, {
	initialize: function(x, y) {
		Block.call(this, "select", x, y);
		this.image = core.assets["../img/cut.png"];
	},

	register_eventListener(stage, frames) {
		this.addEventListener("touchstart", function(e) {
			if (stage.selectFlag) {
				stage.selectFlag = false;
				this.reset_blocks_color(frames);
				this.backgroundColor = null;
			} else {
				stage.selectFlag = true;
				this.backgroundColor = "yellow";
			}
			console.log("select flag : " + stage.selectFlag);
		});
	},

	reset_blocks_color: function(frames) {
		frames[0].reset_blocks_backgroundColor();
		frames[1].reset_blocks_backgroundColor();
		frames[2].reset_blocks_backgroundColor();
		frames[3].reset_blocks_backgroundColor();
		frames[4].reset_blocks_backgroundColor();
	}
})