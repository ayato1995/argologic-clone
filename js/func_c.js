var Func_c = enchant.Class.create(Func, {
	initialize: function(x, y) {
		Func.call(this, x, y);
		this.name = "clover";
		this.image = core.assets["../img/clover.png"];
	},

	set_block: function(array, frame, stage, player) {
		var block = new Func_c(frame.x + 8, array.length * 20 + frame.y + 4);
		var bs = block.expand_func_block(stage.frames[2].kind_arg);
		block.register_remove_eventListener(array, stage, player, bs);
		stage.addChild(block);
		for (var i = 0; i < bs.length; i++) {
			stage.addChild(bs[i]);
		}
		array.push(block);
	},
})
