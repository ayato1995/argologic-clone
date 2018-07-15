var Frame = enchant.Class.create(enchant.Sprite, {
	initialize: function(x, y, name) {
		enchant.Sprite.call(this, 32, 200);
		this.x = x;
		this.y = y;
		this.name = name;
		this.backgroundColor = this.set_backgroundColor(name);
		this.blocks = new Array();
		this.arg = new Array();
		this.kind_arg = 0;
		this.id = this.set_id(name);
	},

	set_backgroundColor: function(name) {
		if (name == "stack") 
			return "gray";
		return "lightsteelblue";
	},

	set_id: function(name) {
		if (name == "stack") return 0;
		else if (name == "heart") return 1;
		else if (name == "clover") return 2;
		else if (name == "spade") return 3;
		else if (name == "diamond") return 4;
	},

	reset_blocks_backgroundColor: function() {
		for (var i = 0; i < this.blocks.length; i++) {
			this.blocks[i].reset_backgroundColor();
		}
	}
})