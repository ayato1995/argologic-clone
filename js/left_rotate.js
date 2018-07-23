var Left_rotate = enchant.Class.create(Block, {
	initialize: function(x, y) {
		Block.call(this, x, y);
		this.type = "left_rotate";
		this.image = core.assets["../img/left.png"];
		this.default_color = "silver";
		this.backgroundColor = this.default_color;
	},

	register_remove_eventListener: function(array, frame, stage, player) {
		this.addEventListener("touchend", function() {
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
				if (this.scaleX != 1) {
					if (frame.nest[frame.nest.length - 1] != frame.kind) {
						frame.nest[frame.nest.length - 1]++;
					} else {
						frame.nest.push(1);
					}
				}
				stage.removeChild(this);
				this.block_remove(array);
			}
		});
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
				var b = this.set_block(array, frame, stage, player);
				if (frame.nest.length != 0) {
					b.scale(1 - frame.nest.length * 0.1, 1 - frame.nest.length * 0.1);
					var kind = frame.nest.pop();
					kind--;
					if (kind != 0) {
						frame.nest.push(kind);
					}
				}
			}
			this.x = this.default_x;
			this.y = this.default_y;
		});
	},

    register_all_set_eventListener: function(frames, stage, player) {
      this.register_set_eventListener(frames[0].blocks, frames[0], stage, player);
      this.register_set_eventListener(frames[1].blocks, frames[1], stage, player);
      this.register_set_eventListener(frames[2].blocks, frames[2], stage, player);
      this.register_set_eventListener(frames[3].blocks, frames[3], stage, player);
      this.register_set_eventListener(frames[4].blocks, frames[4], stage, player);
    },

	set_block: function(array, frame, stage, player) {
		var block = new Left_rotate(frame.x + 4, array.length * 20 + frame.y + 4);
		block.register_remove_eventListener(array, frame, stage, player);
		stage.addChild(block);
		array.push(block);

		return block;
	}
});
