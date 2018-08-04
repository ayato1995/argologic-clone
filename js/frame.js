var Frame = enchant.Class.create(enchant.Sprite, {
	initialize: function(x, y, name) {
		enchant.Sprite.call(this, 24, 200);
		this.default_x = x;
		this.default_y = y;
		this.x = this.default_x;
		this.y = this.default_y;
		this.name = name;
		this.backgroundColor = this.set_backgroundColor(name);
		this.label = this.set_label(name);
		this.copy_btn = new Copy(this.x + 4, this.y + this.height + 10);
		this.blocks = new Array();
		/* instraction pointer */
		this.ip = 0;
		this.arg = new Array();
		this.kind_arg = 0;
		this.id = this.set_id(name);
		this.nest = new Array();
	},

	set_label: function(name) {
		if (name == "stack") return null;
		var label = new Sprite(16, 16);
		if (name == "heart") {
			label.image = core.assets["../img/heart.png"];
		} else if (name == "clover") {
			label.image = core.assets["../img/clover.png"];
		} else if (name == "spade") {
			label.image = core.assets["../img/spade.png"];
		} else if (name == "diamond") {
			label.image = core.assets["../img/diamond.png"];
		}
		label.x = this.x + 4;
		label.y = this.y - 21;

		return label;
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

	push_label_btn_stage: function(stage) {
		if (this.label != null)
			stage.addChild(this.label);
		this.push_btn_stage(stage);
	},

	push_btn_stage: function(stage) {
		stage.addChild(this.copy_btn);
	},

	pop_btn_stage: function(stage) {
		stage.removeChild(this.copy_btn);
	},

	move_frame: function() {
		this.x -= 40;
		this.y += this.height + 40;
		if (this.label != null) {
			this.label.x = this.x + 4;
			this.label.y = this.y - 21;
		}
		for (var i = 0; i < this.blocks.length; i++) {
			this.blocks[i].move_frame_block(this, i);
		}
	},

	reset_frame: function() {
		this.x = this.default_x;
		this.y = this.default_y;
		if (this.label != null) {
			this.label.x = this.x + 4;
			this.label.y = this.y - 21;
		}
		for (var i = 0; i < this.blocks.length; i++) {
			this.blocks[i].x = this.x + 4;
			this.blocks[i].moveBlock(i);
		}
	},

	reset_blocks_backgroundColor: function() {
		for (var i = 0; i < this.blocks.length; i++) {
			this.blocks[i].reset_backgroundColor();
		}
	},

	remove_blocks: function(stage) {
		for (var i = 0; i < this.blocks.length; i++)
			stage.removeChild(this.blocks[i]);
		this.blocks.length = 0;
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
		if (this.nest.length != 0) {
			console.log("nest.length = " + this.nest.length);
			return false;
		}
		return true;
	},

	output_block: function() {
		var log = this.name + "\n";
		for (var i = 0; i < this.blocks.length; i++) {
			log += this.blocks[i].output_log();
		}
		return log;
	}
})