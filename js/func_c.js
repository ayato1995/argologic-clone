var Func_c = enchant.Class.create(Func, {
	initialize: function(x, y) {
		Func.call(this, x, y);
		this.name = "clover";
		this.image = core.assets["../img/clover.png"];
	},

	set_block: function(array, frame, stage, player) {
		var block = new Func_c(frame.x + 4, array.length * 20 + frame.y + 4);
		block.arg_area = block.expand_func_block(stage.frames[2].kind_arg);
		block.register_remove_eventListener(array, stage, player);
		stage.addChild(block);
		for (var i = 0; i < block.arg_area.length; i++) {
			stage.addChild(block.arg_area[i]);
		}
		array.push(block);
	},
})
