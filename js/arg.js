var Arg = enchant.Class.create(Block, {
	initialize: function(x, y, id) {
		Block.call(this, x, y);
		this.type = "arg";
		this.func_name = null;
		this.id = id;
		this.default_color = this.set_default_color(this.id);
		this.backgroundColor = this.default_color;
	},

	register_remove_eventListener: function(array, stage, player) {
		this.addEventListener("touchstart", function() {
			if (stage.selectFlag) {
				if (this.select) {
					var i = this.searchBlock(player.copy_list);
					player.copy_list.splice(i, player.copy_list.length - i);
					i = this.searchBlock(array);
					for (var j = i; j < array.length && j < i + 3; j++) {
						array[i].select = false;
						array[i].backgroundColor = array[i].default_color;
					}
				} else {
					player.reset_block_color();
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
			if (e.x > frame.x && e.x < frame.x + frame.width
				&& e.y > frame.y && e.y < frame.y + frame.height) {
				this.set_block(array, frame, stage, player);
			}
			this.x = this.default_x;
			this.y = this.default_y;
		})
	},

	set_block: function(array, frame, stage, player) {
		this.moveBlock(array.length);
		var block = new Arg(frame.x + 8, array.length * 20 + frame.y + 4, this.id);
		block.func_name = frame.name;
		this.register_remove_eventListener(array, stage, player);
		this.set_arg_type(frame);
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
		frame.arg_num = this.id;
	}
})