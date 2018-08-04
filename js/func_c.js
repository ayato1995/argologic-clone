var Func_c = enchant.Class.create(Func, {
	initialize: function(x, y) {
		Func.call(this, x, y);
		this.name = "clover";
		this.image = core.assets["../img/clover.png"];
	},

	set_block: function(array, frame, stage, player) {
		var block = new Func_c(frame.x + 4, array.length * 20 + frame.y + 4);
		block.arg_area = block.expand_func_block(array, stage.frames[2].kind_arg);
		if (block.arg_area.length != 0)
			frame.nest.push(stage.frames[2].kind_arg);
		block.register_remove_eventListener(array, stage.frames[2], stage, player);
		stage.addChild(block);
		for (var i = 0; i < block.arg_area.length; i++) {
			stage.addChild(block.arg_area[i]);
		}
		array.push(block);

		return block;
	},

	create_block: function(x, y, stage) {
		var order = new Func_c(x, y);
		var frame = stage.frames[2];
		order.arg_area = order.expand_func_block(null, frame.kind_arg);
		stage.addChild(order);
		for (var i = 0; i < order.arg_area.length; i++)
			stage.addChild(order.arg_area[i]);
		return order;
	}
})
