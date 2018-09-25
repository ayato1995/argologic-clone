var Loop_start = enchant.Class.create(Block, {
	initialize: function(x, y) {
		Block.call(this, "loop_start", x, y);
		this.image = core.assets["../img/loop_start.png"];
		this.default_color = "silver";
		this.backgroundColor = this.default_color;
		this.loop_cnt = 1;
		this.loop_label = this.initialize_label(String(this.loop_cnt));
		this.set_flag = false;
		this.register_loop_label_eventListener();
	},

	initialize_label: function(text) {
		var label = new Label(text);
		label.x = this.x + this.width - 6;
		label.y = this.y + this.height - 6;
		label.backgroundColor = "white";
		label.font = "6px 'MSゴシック'";
		label.height = 6;
		label.width = 6;

		return label;
	},
	/*
	register_select_eventListener: function(array, frame, stage, player) {
		this.addEventListener("touchstart", function() {
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
	*/
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
				e.y > frame.y && e.y < frame.y + frame.height) {
				if (frame.nest.length == 0 || frame.nest[frame.nest.length - 1] == 0) {
					stage.log += "insert " + this.type + " " + frame.name + "\n";
					frame.loop_stack.push(this.type);
					this.set_block(array, frame, stage, player);
				}
			}
		});
	},

	register_remove_eventListener: function(array, frame, stage, player) {
		this.addEventListener("touchend", function(e) {
			if (e.x > frame.x && e.x < frame.x + frame.width
				&& e.y > frame.y && e.y < frame.y + frame.height) {
				this.x = this.default_x;
				this.y = this.default_y;
				this.loop_label.x = this.x + this.width - this.loop_label.width;
				this.loop_label.y = this.y + this.height - 6;
			} else {
				stage.log += "delete " + this.type + " " + frame.name + "\n";
				stage.removeChild(this.loop_label);
				stage.removeChild(this);
				this.block_remove(array);
			}
		});
	},

	register_move_eventListener: function() {
		this.addEventListener("touchmove", function(e) {
			this.x = e.x;
			this.y = e.y;
			this.loop_label.x = this.x + this.width - this.loop_label.width;
			this.loop_label.y = this.y + this.height - 6;
		})
	},

	register_set_eventListener: function(array, frame, stage, player) {
		this.addEventListener("touchend", function(e) {
			if (e.x > frame.x && e.x < frame.x + frame.width &&
				e.y > frame.y && e.y < frame.y + frame.height) {
				if (frame.nest.length == 0 || frame.nest[frame.nest.length - 1] == 0) {
					stage.log += "insert " + this.type + " " + frame.name + "\n";
					frame.loop_stack.push(this.type);
					this.set_block(array, frame, stage, player);
				}
			}
			this.x = this.default_x;
			this.y = this.default_y;
			this.loop_label.x = this.x + this.width - this.loop_label.width;
			this.loop_label.y = this.y + this.height - 6;
		});
	},

	register_loop_label_eventListener: function() {
		this.loop_label.addEventListener("touchstart", function(e) {
			if (this.loop_cnt < 10) {
				this.loop_cnt++;
				if (this.loop_cnt == 10) {
					this.loop_label.width += 2;
				}
			} else {
				this.loop_cnt = 1;
				this.loop_label.width -= 2;
			}
			this.loop_label.x = this.x + this.width - this.loop_label.width;
			this.loop_label.text = String(this.loop_cnt);
		}.bind(this));
	},

	set_block: function(array, frame, stage, player) {
		var block = new Loop_start(frame.x + 4, array.length * 20 + frame.y + 4);
		block.set_loop_cnt(this, block);
		block.register_new_block_eventListener(array, frame, stage, player);
		stage.addChild(block);
		stage.addChild(block.loop_label);
		array.push(block);
	},

	create_block: function(x, y, stage) {
		var order = new Loop_start(x, y);
		order.set_loop_cnt(this, order);
		stage.addChild(order);
		stage.addChild(order.loop_label);
		return order;
	},

	set_loop_cnt: function(tblock, block) {
		this.loop_cnt = tblock.loop_cnt;
		this.loop_label.width = tblock.loop_label.width;
		this.loop_label.x = block.x + block.width - this.loop_label.width;
		this.loop_label.text = this.loop_cnt;
	},

	output_log: function() {
		return this.type + " " + this.loop_cnt + "\n";
	},

	moveBlock: function(n) {
		this.y = n * 20 + 31 + 4;
		this.loop_label.x = this.x + this.width - this.loop_label.width;
		this.loop_label.y = this.y + this.height - 6;
	},

	move_frame_block: function(frame, i) {
		this.x = frame.x + 4;
		this.y = frame.y + 4 + i * 20;
		this.loop_label.x = this.x + this.width - this.loop_label.width;
		this.loop_label.y = this.loop_label.y = this.y + this.height - 6;
	},

	remove_stage_block: function(stage) {
		stage.removeChild(this.loop_label);
		stage.removeChild(this);
	}
});
