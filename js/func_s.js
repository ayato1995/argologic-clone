var Func_s = enchant.Class.create(Func, {
	initialize: function(x, y) {
		Func.call(this, x, y);
		this.name = "spead";
		this.image = core.assets["../img/spade.png"];
	},

	set_block: function(array, frame, stage, player) {
		var block = new Func_s(frame.x + 4, array.length * 20 + frame.y + 4);
		block.arg_area = block.expand_func_block(array, stage.frames[3].kind_arg);
		if (frame.nest.length != 0 && block.arg_area.length != 0)
			return null;
		if (block.arg_area.length != 0)
			frame.nest.push(stage.frames[3].kind_arg);
		block.register_remove_eventListener(array, frame, stage, player);
		stage.addChild(block);
		for (var i = 0; i < block.arg_area.length; i++) {
			stage.addChild(block.arg_area[i]);
		}
		array.push(block);

		return block;
	},

	create_block: function(x, y, stage) {
		var order = new Func_s(x, y);
		var frame = stage.frames[3];
		order.arg_area = order.expand_func_block(null, frame.kind_arg);
		stage.addChild(order);
		for (var i = 0; i < order.arg_area.length; i++)
			stage.addChild(order.arg_area[i]);
		return order;
	}
})
