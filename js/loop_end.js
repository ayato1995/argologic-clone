var Loop_end = enchant.Class.create(Block, {
	initialize: function(x, y) {
		Block.call(this, x, y);
		this.type = "loop_end";
		this.image = core.assets["../img/loop_end.png"];
		this.default_color = "silver";
		this.backgroundColor = this.default_color;
	},

	register_select_eventListener: function(array, frame, stage, player) {
		this.addEventListener("touchend", function() {
			if (stage.play_flag) return;
			if (!stage.selectFlag) return;
			if (this.select) {
				var i = this.searchBlock(player.copy_list);
				player.copy_list.splice(i, player.copy_list.length - i);
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
		});
	},

	register_all_remove_eventListener: function(array, frame, stage, player) {
		for (var i = 0; i < stage.frames.length; i++) {
			if (frame == stage.frames[i]) continue;
			this.register_move_insert_eventListener(stage.frames[i].blocks, stage.frames[i], stage, player);
		}
		this.register_remove_eventListener(array, frame, stage, player);
	},

	register_move_insert_eventListener: function(array, frame, stage, player) {
		this.addEventListener("touchend", function(e) {
			if (stage.play_flag) return;
			if (stage.selectFlag) return;
			if (e.x > frame.x && e.x < frame.x + frame.width &&
				e.y > frame.y && e.y < frame.y + frame.height && this.check_loop_stack(frame)) {
				stage.log += "insert " + this.type + " " + frame.name + "\n";
				this.set_block(array, frame, stage, player);
			}
		});
	},

	register_remove_eventListener: function(array, frame, stage, player) {
		this.addEventListener("touchend", function(e) {
			if (e.x > frame.x && e.x < frame.x + frame.width
				&& e.y > frame.y && e.y < frame.y + frame.height) {
				this.x = this.default_x;
				this.y = this.default_y;
			} else {
				stage.log += "delete " + this.type + " " + frame.name + "\n";
				stage.removeChild(this);
				this.block_remove(array);
			}
		});
	},
	
	register_set_eventListener: function(array, frame, stage, player) {
		this.addEventListener("touchend", function(e) {
			if (e.x > frame.x && e.x < frame.x + frame.width &&
				e.y > frame.y && e.y < frame.y + frame.height && this.check_loop_stack(frame)) {
				stage.log += "insert " + this.type + " " + frame.name + "\n";
				this.set_block(array, frame, stage, player);
			}
			this.x = this.default_x;
			this.y = this.default_y;
		});
	},

	set_block: function(array, frame, stage, player) {
		var block = new Loop_end(frame.x + 4, array.length * 20 + frame.y + 4);
		block.register_new_block_eventListener(array, frame, stage, player);
		stage.addChild(block);
		array.push(block);
	},

	create_block: function(x, y, stage) {
		var order = new Loop_end(x, y);
		stage.addChild(order);
		return order;
	},

	check_loop_stack: function(frame) {
		if (frame.loop_stack.length == 0) return false;
		return true;
	},
});
