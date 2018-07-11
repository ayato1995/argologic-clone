var Left_rotate = enchant.Class.create(Block, {
	initialize: function(x, y) {
		Block.call(this, x, y);
		this.type = "left_rotate";
		this.image = core.assets["../img/left.png"];
		this.default_color = "silver";
		this.backgroundColor = this.default_color;
	},

	register_remove_eventListener: function(array, stage, player) {
		this.addEventListener("touchend", function() {
			if (stage.selectFlag) {
				if (this.select) {
					var i = this.searchBlock(array);
					player.copy_list.splice(i, player.copy_list.length - i);
					i = this.searchBlock(array);
					for (var j = i; j < array.length && j < i + 3; i++) {
						array[i].select = false;
						array[i].backgroundColor = array[i].default_color;
					}
				} else {
					player.reset_blocks_color();
					player.copy_list.length = 0;
					var i = searchBlock(array);
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
			if (e.x > frame.x && e.x < frame.x + frame.width
				&& e.y > frame.y && e.y < frame.y + frame.height) {
				this.set_block(array, frame, stage, player);
			}
			this.x = 330;
			this.y = 30;
		});
	},

	set_block: function(array, frame, stage, player) {
		this.moveBlock(array.length);
		var block = new Left_rotate(frame.x + 8, array.length * 20 + frame.y + 4);
		block.register_remove_eventListener(array, stage, player);
		stage.addChild(block);
		array.push(block);
	}
})