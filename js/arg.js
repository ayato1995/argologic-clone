var Arg = enchant.Class.create(Block, {
	initialize: function(x, y, id) {
		Block.call(this, x, y);
		this.type = "arg";
		this.func_name = null;
		this.id = id;
		this.default_color = this.set_default_color(this.id);
		this.backgroundColor = this.default_color;
	},

	register_select_eventListener: function(array, frame, stage, player) {
		this.addEventListener("touchstart", function() {
			if (stage.play_flag) return;
			if (!stage.selectFlag) return;
			if (this.select) {
				var i = this.searchBlock(player.copy_list);
				player.copy_list.splice(i, player.copy_list.length - i);
				i = this.searchBlock(array);
				for (var j = i; j < array.length && j < i + 3; j++) {
					array[i].select = false;
					array[i].backgroundColor = array[i].default_color;
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
		});
	},

	register_remove_eventListener: function(old_array, new_array, old_frame, new_frame, stage, player) {
		this.addEventListener("touchend", function(e) {
			if (stage.play_flag) return;
			if (stage.selectFlag) return;
			if (e.x > new_frame.x && e.x < new_frame.x + new_frame.width
				&& e.y > new_frame.y && e.y < new_frame.y + new_frame.height && new_frame.check_arg(this)) {
				stage.log += "insert " + this.type + " " + new_frame.name + "\n";
				this.set_block(new_array, new_frame, stage, player);
			} else {
				this.x = this.default_x;
				this.y = this.default_y;
			}
		});
	},

	register_set_eventListener: function(array, frame, stage, player) {
		this.addEventListener("touchend", function(e) {
			if (e.x > frame.x && e.x < frame.x + frame.width
				&& e.y > frame.y && e.y < frame.y + frame.height && frame.check_arg(this)) {
				stage.log += "insert " + this.type + " " + frame.name + "\n";
				this.set_block(array, frame, stage, player);
			}
			this.x = this.default_x;
			this.y = this.default_y;
		})
	},

    register_all_set_eventListener: function(frames, stage, player) {
    	for (var i = 1; i < frames.length; i++) {
    		this.register_set_eventListener(frames[i].blocks, frames[i], stage, player);
    	}
    },

    register_all_remove_eventListener: function(array, frame, stage, player) {
    	for (var i = 1; i < stage.frames.length; i++) {
    		if (frame == stage.frames[i]) continue;
    		this.register_remove_eventListener(array, stage.frames[i].blocks, frame, stage.frames[i], stage, player);
    	}
    	this.addEventListener("touchend", function(e) {
			if (e.x > frame.x && e.x < frame.x + frame.width
				&& e.y > frame.y && e.y < frame.y + frame.height) {
				this.x = this.default_x;
				this.y = this.default_y;
			} else {
				stage.log += "delete " + this.type + " " + frame.name + "\n";
				stage.removeChild(this);
				frame.kind_arg--;
				this.block_remove(array);
			}
		});
    },

	set_block: function(array, frame, stage, player) {
		var block = new Arg(frame.x + 4, array.length * 20 + frame.y + 4, this.id);
		block.func_name = frame.name;
		block.register_new_block_eventListener(array, frame, stage, player);
		block.set_arg_type(frame);
		stage.addChild(block);
		array.push(block);
	},

	set_default_color: function(id) {
		switch(id) {
		case 0:
			var color = "tomato";
			break;
		case 1:
			var color = "deepskyblue";
			break;
		case 2:
			var color = "greenyellow";
			break;
		}
		return color;
	},

	set_arg_type: function(frame) {
		if (frame.kind_arg < this.id + 1)
			frame.kind_arg = this.id + 1;
	}
})
