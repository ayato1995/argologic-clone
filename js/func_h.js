var Func_h = enchant.Class.create(Func, {
	initialize: function(x, y) {
		Func.call(this, x, y);
		this.name = "heart";
		this.image = core.assets["../img/heart.png"];
	},

	set_block: function(array, frame, stage, player) {
		var block = new Func_h(frame.x + 8, array.length * 20 + frame.y + 4);
		var bs = block.expand_func_block(this.arg_num);
		block.register_remove_eventListener(array, stage, player, bs);
		stage.addChild(block);
		for (var i = 0; i < bs.length; i++) {
			stage.addChild(bs[i]);
		}
		array.push(block);
	},
});
