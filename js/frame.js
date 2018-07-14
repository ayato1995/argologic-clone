var Frame = enchant.Class.create(enchant.Sprite, {
	initialize: function(x, y, name) {
		enchant.Sprite.call(this, 32, 200);
		this.x = x;
		this.y = y;
		this.name = name;
		this.backgroundColor = this.set_backgroundColor(name);
		this.blocks = new Array();
		this.arg_blocks = new Array();
		this.kind_arg = 0;
	},

	set_backgroundColor: function(name) {
		if (name == "stack") 
			return "gray";
		return "lightsteelblue";
	},

	reset_blocks_backgroundColor: function() {
		for (var i = 0; i < this.blocks.length; i++) {
			this.blocks[i].reset_backgroundColor();
		}
	}
})