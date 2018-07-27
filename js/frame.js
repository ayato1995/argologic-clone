var Frame = enchant.Class.create(enchant.Sprite, {
	initialize: function(x, y, name) {
		enchant.Sprite.call(this, 24, 200);
		this.x = x;
		this.y = y;
		this.name = name;
		this.backgroundColor = this.set_backgroundColor(name);
		this.blocks = new Array();
		this.arg = new Array();
		this.kind_arg = 0;
		this.id = this.set_id(name);
		this.nest = new Array();
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
	},

	check_arg: function(block) {
		if (block.id <= this.kind_arg)
			return true;
		return false;
	},

	check_frame: function() {
		var loop_cnt = 0;
		for (var i = 0; i < this.blocks.length; i++) {
			if (this.blocks[i].type == "loop_start")
				loop_cnt++;
			if (this.blocks[i].type == "loop_end")
				loop_cnt--;
		}
		if (loop_cnt != 0) return false;
		return true;
	},

	output_block: function() {
		var log = "+++++++++++++ " + this.name + "+++++++++++++\n";
		for (var i = 0; i < this.blocks.length; i++) {
			log += this.blocks[i].output_log();
		}
		return log;
	}
})