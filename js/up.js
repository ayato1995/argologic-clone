var Up = enchant.Class.create(Block, {
	initialize: function(x, y) {
		Block.call(this);
		this.type = "up";
		this.select = false;
		this.image = core.assets["../img/up.png"];
		this.default_color = "silver";
		this.backgroundColor = this.default_color;
		this.x = x;
		this.y = y;
	},

	register_remove_eventListener: function(array, player) {
		this.addEventListener("touchend", function() {
			if (core.rootScene.selectFlag) {
				if (this.select) {
					var i = this.searchBlock(this, array);
					player.copy_list.splice(i, player.copy_list.length - i);
					i = this.searchBlock(this, array);
					for (var j = i; j < array.length && j < i + 3; j++) {
						array[i].select = false;
            			array[i].backgroundColor = array[i].default_color;
          			}
        		} else {
          			this.reset_block_color(player);
          			player.copy_list.length = 0;
          			var i = searchBlock(this, array);
          			for (var j = i; j < array.length && j < i + 3; j++) {
            			player.copy_list.push(array[j]);
            			array[j].select = true;
            			array[j].backgroundColor = "yellow";
          			}
        		}
      		} else {
        		core.rootScene.removeChild(this);
        		block_remove(array, this);
      		}
    	});
  	},

  	register_move_eventListener: function() {
  		this.addEventListener("touchmove", function(e) {
  			this.x = e.x;
  			this.y = e.y;
  		});
  	},

  	register_set_eventListener: function(array, frame, stage) {
  		this.addEventListener("touchend", function(e) {
  			if (e.x > frame.x && e.x < frame.x + frame.width 
  				&& e.y > frame.y && frame.y + frame.height) {
  				this.set_block(array, frame, stage);
  			}
  			this.x = 330;
  			this.y = 10;
  		});
  	},

  	set_block: function(array, frame, stage) {
  		this.moveBlock(array.length);
  		block = new Up(frame.x + 8, array.length * 20 + frame.y + 4);
  		block.register_remove_eventListener();
  		stage.addChild(block);
  		array.push(block);
  	},

  	searchBlock: function(block, array) {
  		for (var i = 0; i < array.length; i++)
  			if (array[i] == block) return i;
  		return -1;
  	}
});