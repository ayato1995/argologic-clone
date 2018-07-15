var Func_h = enchant.Class.create(Func, {
	initialize: function(x, y) {
		Func.call(this, x, y);
		this.name = "heart";
		this.image = core.assets["../img/heart.png"];
	},

	set_block: function(array, frame, stage, player) {
		var block = new Func_h(frame.x + 8, array.length * 20 + frame.y + 4);
		block.arg_area = block.expand_func_block(stage.frames[1].kind_arg);
		block.register_remove_eventListener(array, stage, player);
		stage.addChild(block);
		for (var i = 0; i < block.arg_area.length; i++) {
			stage.addChild(block.arg_area[i]);
		}
		array.push(block);
	}
});
