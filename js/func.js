var Func = enchant.Class.create(Block, {
	initialize: function(x, y) {
		Block.call(this, x, y);
		this.type = "function";
		this.default_color = "silver";
		this.backgroundColor = this.default_color;
		/*
		this.func = [];
		this.arg = [];
		this.arg_num = 0;
		*/
	},

	register_remove_eventListener: function(array, stage, player, args) {
		this.addEventListener("touchstart", function() {
			if (stage.seletctFlag) {
				if (this.select) {
					var i = this.searchBlock(player.copy_list);
					player.copy_list.splice(i, player.copy_list.length - 1);
					i = this.searchBlock(block, array);
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
				stage.removeChild(this);
				this.block_remove(array);
				for (var i = 0; i < args.lenght; i++) {
					stage.removeChild(arg[i]);
				}
			}
		})
	},

	register_move_eventListener: function() {
		this.addEventListener("touchmove", function(e) {
			this.x = e.x;
			this.y = e.y;
		});
	},

	register_set_eventListener: function(array, frame, stage, player) {
		this.addEventListener("touchend", function(e) {
			if (e.x > frame.x && e.x < frame.x + frame.width
				&& e.y > frame.y && e.y < frame.y + frame.height) {
				this.set_block(array, frame, stage, player);
			}
			this.x = this.default_x;
			this.y = this.default_y;
		});
	},

    register_all_set_eventListener: function(frames, stage, player) {
      this.register_set_eventListener(frames[0].blocks, frames[0], stage, player);
      this.register_set_eventListener(frames[1].blocks, frames[1], stage, player);
      this.register_set_eventListener(frames[2].blocks, frames[2], player);
      this.register_set_eventListener(frames[3].blocks, frames[3], stage, player);
      this.register_set_eventListener(frames[4].blocks, frames[4], stage, player);
    },


	set_arg_block: function(block, frame) {
		frame.arg.push(block);
	},

	expand_func_block: function(argNum) {
		var blocks = [];
		switch(argNum) {
		case 1:
			blocks.push(new Block(this.x, this.y + this.height, "arg1"));
			this.register_expand_func_block_eventListener(blocks[0], this);
			blocks[0].height += 6;
			break;
		case 2:
			blocks.push(new Block(this.x, this.y + this.height, "arg1"));
			this.register_expand_func_block_eventListener(blocks[0], this);
			blocks[0].height += 6;
			blocks.push(new Block(blocks[0].x, blocks[0].y + blocks[0].height, "arg2"));
			this.register_expand_func_block_eventListener(blocks[1], blocks[0]);
			blocks[1].height += 4;
			break;
	  	case 3:
	  		blocks.push(new Block(this.x, this.y + this.height, "arg1"));
	  		this.register_expand_func_block_eventListener(blocks[0], this);
	  		blocks[0].height += 6;
	  		blocks.push(new Block(blocks[0].x, blocks[0].y + blocks[0].height, "arg2"));
	  		this.register_expand_func_block_eventListener(blocks[1], blocks[0]);
	  		blocks[1].height += 4;
	  		blocks.push(new Block(blocks[1].x, blocks[1].y + blocks[1].height, "arg3"));
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
})