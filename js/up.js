var Up = enchant.Class.create(Block, {
	initialize: function(x, y) {
		Block.call(this, x, y);
		this.type = "up";
		this.image = core.assets["../img/up.png"];
		this.default_color = "silver";
		this.backgroundColor = this.default_color;
	},

  set_block: function(array, frame, stage, player) {
    var block = new Up(frame.x + 4, array.length * 20 + frame.y + 4);
    block.register_remove_eventListener(array, frame, stage, player);
    stage.addChild(block);
    array.push(block);

    return block;
  }
});