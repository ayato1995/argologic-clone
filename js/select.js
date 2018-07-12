var Select = enchant.Class.create(Block, {
	initialize: function(x, y) {
		Block.call(this, x, y);
		this.type = "select";
		this.image = core.assets["../img/cut.png"];
		this.backgroundColor = null;
	},

	register_eventListener(stage, exe_frame, h_frame, c_frame, s_frame, d_frame) {
		this.addEventListener("touchstart", function(e) {
			if (stage.selectFlag) {
				stage.selectFlag = false;
				// this.reset_blocks_color(exe_frame, h_frame, c_frame, s_frame, d_frame);
				this.backgroundColor = null;
			} else {
				stage.selectFlag = true;
				this.backgroundColor = "yellow";
			}
			console.log("select flag : " + stage.selectFlag);
		});
	},

	reset_blocks_color: function(e, h, c, s, d) {
		e.reset_block_color();
		h.reset_block_color();
		c.reset_block_color();
		s.reset_block_color();
		d.reset_block_color();
	}
})