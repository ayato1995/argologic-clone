var Loop_end = enchant.Class.create(Block, {
	initialize: function(x, y) {
		Block.call(this, x, y);
		this.type = "loop_end";
		this.image = core.assets["../img/loop_end.png"];
		this.default_color = "silver";
		this.backgroundColor = this.default_color;
	},

	register_remove_eventListener: function(array, stage, player) {
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
			if (e.x > frame.x && e.x < frame.x + frame.width &&
				e.y > frame.y && e.y < frame.y + frame.height && this.check_loop_start(array)
				&& frame.func_flag == 0) {
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

	set_block: function(array, frame, stage, player) {
		var block = new Loop_end(frame.x + 4, array.length * 20 + frame.y + 4);
		block.register_remove_eventListener(array, stage, player);
		stage.addChild(block);
		array.push(block);
	},

	check_loop_start: function(array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].type == "loop_start") return true;
		}
		return false;
	}
})
