var Func_s = enchant.Class.create(Func, {
	initialize: function(x, y) {
		Func.call(this, x, y);
		this.name = "spead";
		this.image = core.assets["../img/spade.png"];
	},

	set_block: function(array, frame, stage, player) {
		var block = new Func_s(frame.x + 8, array.length * 20 + frame.y + 4);
		var bs = block.expand_func_block(stage.frames[3].kind_arg);
		block.register_remove_eventListener(array, stage, player, bs);
		stage.addChild(block);
		for (var i = 0; i < bs.length; i++) {
			stage.addChild(bs[i]);
		}
		array.push(block);
	}
})
