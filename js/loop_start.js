var Loop_start = enchant.Class.create(Block, {
	initialize: function(x, y) {
		Block.call(this, x, y);
		this.type = "loop_start";
		this.image = core.assets["../img/loop_start.png"];
		this.default_color = "silver";
		this.backgroundColor = this.default_color;
		this.loop_cnt = 1;
		this.loop_label = this.initialize_label(String(this.loop_cnt));
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

	register_remove_eventListener: function(array, stage, player) {
		this.addEventListener("touchstart", function() {
			if (stage.selectFlag) {
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
			} else {
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
			this.loop_label.x = this.x + this.width - 6;
			this.loop_label.y = this.y + this.height - 6;
		})
	},

	register_set_eventListener: function(array, frame, stage, player) {
		this.addEventListener("touchend", function(e) {
			if (e.x > frame.x && e.x < frame.x + frame.width &&
				e.y > frame.y && e.y < frame.y + frame.height) {
				console.log(frame.nest.length + " " + frame.nest[frame.nest.length - 1]);
				if (frame.nest.length == 0 || frame.nest[frame.nest.length - 1] == 0)
					this.set_block(array, frame, stage, player);
			}
			this.x = this.default_x;
			this.y = this.default_y;
			this.loop_label.x = this.x + this.width - 6;
			this.loop_label.y = this.y + this.height - 6;
		});
	},

    register_all_set_eventListener: function(frames, stage, player) {
      this.register_set_eventListener(frames[0].blocks, frames[0], stage, player);
      this.register_set_eventListener(frames[1].blocks, frames[1], stage, player);
      this.register_set_eventListener(frames[2].blocks, frames[2], stage, player);
      this.register_set_eventListener(frames[3].blocks, frames[3], stage, player);
      this.register_set_eventListener(frames[4].blocks, frames[4], stage, player);
    },

	register_loop_label_eventListener: function() {
		this.loop_label.addEventListener("touchstart", function(e) {
			if (this.loop_cnt < 10) {
				this.loop_cnt++;
			} else {
				this.loop_cnt = 1;
				this.loop_label.x += 2;
				this.loop_label.width -= 2;
			}
			if (this.loop_cnt == 10) {
				this.loop_label.x -= 2;
				this.loop_label.width += 2;
			}
			this.loop_label.text = String(this.loop_cnt);
		}.bind(this));
	},

	set_block: function(array, frame, stage, player) {
		var block = new Loop_start(frame.x + 4, array.length * 20 + frame.y + 4);
		block.set_loop_cnt(this.loop_cnt);
		block.register_remove_eventListener(array, stage, player);
		stage.addChild(block);
		stage.addChild(block.loop_label);
		array.push(block);
	},

	set_loop_cnt: function(cnt) {
		this.loop_cnt = cnt;
		this.loop_label.text = this.loop_cnt;
	}
});
