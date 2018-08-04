var Func = enchant.Class.create(Block, {
	initialize: function(x, y) {
		Block.call(this, x, y);
		this.type = "function";
		this.default_color = "silver";
		this.backgroundColor = this.default_color;
		this.arg_area = null;
		this.arg = new Array();
	},

	register_remove_eventListener: function(array, frame, stage, player) {
		this.addEventListener("touchstart", function() {
			if (stage.selectFlag) {
				if (this.select) {
					var i = this.searchBlock(player.copy_list);
					player.copy_list.splice(i, player.copy_list.length - 1);
					i = this.searchBlock(array);
					for (var j = i; j < array.length && j < i + 3; j++) {
						array[j].select = false;
						array[j].backgroundColor = array[j].default_color;
					}
				} else {
          			this.reset_block_color(stage.frames);
					player.copy_list.length = 0;
					var i = this.searchBlock(array);
					for (var j = i; j < array.length && j < i + 3; j++) {
						player.copy_list.push(array[j]);
						array[j].select = true;
						array[j].backgroundColor = "yellow";
					}
				}
			} else {
				if (this.arg_area.length != 0)
					frame.nest.pop();
				if (frame.nest[frame.nest.length - 1] != frame.kind_arg) {
					frame.nest[frame.nest.length - 1]++;
				} else {
					fram.nest.push(1);
				}
				stage.log += "delete " + this.type + " " + frame.name + "\n";
				stage.removeChild(this);
				var i = this.searchBlock(array);
				this.reset_scale(array, i, frame.kind_arg);
				this.block_remove(array);
				for (var i = 0; i < this.arg_area.length; i++) {
					stage.removeChild(this.arg_area[i]);
				}
			}
		})
	},

	register_set_eventListener: function(array, frame, stage, player) {
		this.addEventListener("touchend", function(e) {
			if (e.x > frame.x && e.x < frame.x + frame.width
				&& e.y > frame.y && e.y < frame.y + frame.height) {
				stage.log += "insert " + this.type + " " + frame.name + "\n";
				var b = this.set_block(array, frame, stage, player);
				if (b.arg_area.length == 0 && frame.nest.length != 0) {
					var kind = frame.nest.pop();
					kind--;
					if (kind != 0)
						frame.nest.push(kind);
				}
			}
			this.x = this.default_x;
			this.y = this.default_y;
		});
	},

	set_arg_block: function(block) {
		this.arg.push(block);
	},

	expand_func_block: function(array, argNum) {
		var blocks = [];
		switch(argNum) {
		case 1:
			blocks.push(new Arg(this.x, this.y + this.height, 0));
			this.register_expand_func_block_eventListener(blocks[0], this);
			blocks[0].height += 6;
			break;
		case 2:
			blocks.push(new Arg(this.x, this.y + this.height, 0));
			this.register_expand_func_block_eventListener(blocks[0], this);
			blocks[0].height += 6;
			blocks.push(new Arg(blocks[0].x, blocks[0].y + blocks[0].height, 1));
			this.register_expand_func_block_eventListener(blocks[1], blocks[0]);
			blocks[1].height += 4;
			break;
	  	case 3:
	  		blocks.push(new Arg(this.x, this.y + this.height, 0));
	  		this.register_expand_func_block_eventListener(blocks[0], this);
	  		blocks[0].height += 6;
	  		blocks.push(new Arg(blocks[0].x, blocks[0].y + blocks[0].height, 1));
	  		this.register_expand_func_block_eventListener(blocks[1], blocks[0]);
	  		blocks[1].height += 4;
	  		blocks.push(new Arg(blocks[1].x, blocks[1].y + blocks[1].height, 2));
	  		this.register_expand_func_block_eventListener(blocks[2], blocks[1]);
	  		blocks[2].height += 4;
	  	}

	    return blocks;
	},

	register_expand_func_block_eventListener: function(arg, block) {
  		arg.addEventListener("enterframe", function() {
  			this.x = block.x;
  			this.y = block.y + block.height;
  		});
	},

	set_arg: function(index, array, kind_arg) {
		var i = index;
		i++;
		for (var j = kind_arg; i < array.length && j > 0; i++, j--) {
			this.set_arg_block(array[i]);
		}
		if (kind_arg != 0)
			array.splice(index + 1, kind_arg);
	},

	remove_stage_block: function(stage) {
		if (this.arg.length != 0) {
			for (var i = 0; i < this.arg.length; i++) {
				stage.removeChild(this.arg[i]);
			}
			this.arg.length = 0;
		}
		if (this.arg_area.length != 0) {
			for (var i = 0; i < this.arg_area.length; i++) {
				stage.removeChild(this.arg_area[i]);
			}
			this.arg_area.length = 0;
		}
		stage.removeChild(this);
	},
})