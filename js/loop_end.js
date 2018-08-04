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
			if (stage.play_flag) return;
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
				stage.log += "delete " + this.type + " " + frame.name + "\n";
				stage.removeChild(this);
				this.block_remove(array);
			}
		});
	},
	
	register_set_eventListener: function(array, frame, stage, player) {
		this.addEventListener("touchend", function(e) {
			if (e.x > frame.x && e.x < frame.x + frame.width &&
				e.y > frame.y && e.y < frame.y + frame.height && this.check_loop_start(array)) {
				stage.log += "insert " + this.type + " " + frame.name + "\n";
				this.set_block(array, frame, stage, player);
			}
			this.x = this.default_x;
			this.y = this.default_y;
		});
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
