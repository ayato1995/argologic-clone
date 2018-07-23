var Up = enchant.Class.create(Block, {
	initialize: function(x, y) {
		Block.call(this, x, y);
		this.type = "up";
		this.image = core.assets["../img/up.png"];
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
  			if (e.x > frame.x && e.x < frame.x + frame.width 
  				&& e.y > frame.y && e.y < frame.y + frame.height) {
          if (frame.func_flag.length == 0)
  				  this.set_block(array, frame, stage, player);
          else {
            console.log(frame.func_flag[frame.func_flag.length - 1]);
            var i = this.search_func_block(array);
            var kind = frame.func_flag.pop();
            var b = this.set_arg_block(i + 1, array[i].arg, frame, stage, player);
            kind--;
            if (kind != 0) {
              frame.func_flag.push(kind);
              console.log(frame.func_flag[frame.func_flag.length - 1]);
            }
            b.scale(1 - (frame.func_flag.length + 1) * 0.1, 1 - (frame.func_flag.length + 1)* 0.1);
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
  		var block = new Up(frame.x + 4, array.length * 20 + frame.y + 4);
  		block.register_remove_eventListener(array, stage, player);
  		stage.addChild(block);
  		array.push(block);
  	},

    set_arg_block: function(length, array, frame, stage, player) {
      console.log(array);
      var block = new Up(frame.x + 4, length * 20 + frame.y+ 4);
      block.register_remove_eventListener(array, stage, player);
      stage.addChild(block);
      array.push(block);
      return block;
    }

});