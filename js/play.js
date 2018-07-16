var Play = enchant.Class.create(Block, {
	initialize: function(x, y) {
		Block.call(this, x, y);
		this.type = "play";
		this.image = core.assets["../img/play.png"];
		// 実行中のブロックをハイライトするため
		this.block_stack = new Array();
	},

	register_play_eventListener: function(player, stage, map, goal) {
		this.addEventListener("touchend", function() {
			if (stage.frames[0].blocks.length != 0 && this.check_frames(stage.frames)) {
				var time = this.play(stage.frames[0].blocks, player, stage, map, 0);
				setTimeout(function() {
					if (!stage.clearFlag) return;
					if (player.before_block != null)
						player.before_block.backgroundColor = player.before_block.default_color;
					if (player.within(goal, 16)) {
						var scene = core.field(true, stage);
						core.pushScene(scene);
					} else {
						var scene = core.field(false, stage);
						core.pushScene(scene);
					}
				}, time);
				stage.frames[0].blocks.length = 0;
			}
		});
	},

	check_frames: function(frames) {
		for (var i = 0; i < frames.length; i++) {
			if (!frames[i].check_frame())
				return false;
		}
		return true;
	},

	play: function(block, player, stage, map, t, args) {
		var time = t;
    	var forStack = [];
    	var stackCounter = 0;
    	var interval = 500;

    	for (var i = 0; i < block.length; i++) {
    		console.log("play " + block[i].type);
    		if (block[i].type == "function") {
    			time = this.play_function(i, block[i], block, stage, player, map, time);
      		} else if (block[i].type == "arg") {
      			time = this.play_arg(i, block, stage, player, map, time, args);
		    } else if (block[i].type == "forStart") {
		        var loop_list = [];
		        do {
		          loop_list.push(block[i]);
		          if (block[i].type == "forStart") {
		            forStack.push(block[i]);
		            stackCounter++;
		          } else if (block[i].type == "forEnd") {
		            forStack.pop();
		            stackCounter--;
		          }
		          i++;
		        } while (forStack.length > 0);
		        i--;
		        time = this.forExecution(loop_list, 0, player, map, time, stage)[0];
		    } else {
		        setTimeout(this.execution, time, block[i], player, map, stage);
		        time += interval;
		    }
		}

		return time;
  	},

  	play_function: function(i, order, block, stage, player, map, time) {
  		if (order.name == "heart") {
        	order.set_arg(i, block, stage.frames[1]);
        	time = this.play(stage.frames[1].blocks, player, stage, map, time, block[i].arg);
      	} else if (order.name == "clover") {
      		console.log(block[i]);
      		order.set_arg(i, block, stage.frames[2]);
      		time = this.play(stage.frames[2].blocks, player, stage, map, time, block[i].arg);
      	} else if (order.name == "spead") {
      		order.set_arg(i, block, stage.frames[3]);
      		time = this.play(stage.frames[3].blocks, player, stage, map, time, block[i].arg);
      	} else if (order.name == "diamond") {
      		order.set_arg(i, block, stage.frames[4]);
      		time = this.play(stage.frames[4].blocks, player, stage, map, time, block[i].arg);
      	}

      	return time;
  	},

  	play_arg: function(i, block, stage, player, map, time, args) {
  		var interval = 500;
  		var order = null;
  		if (block[i].id == 0) {
		    order = args[0];
		} else if (block[i].id == 1) {
		    order = args[1];
		} else if (block[i].id == 2) {
			order = args[2];
		}
		if (order.type == "function") {
		    console.log(order.type + " " + order.name);
		    time = this.play_function(i, order, block, stage, player, map, time);
		} else {
		    setTimeout(this.execution, time, order, player, map, stage);
		    time += interval;
		}

		return time;
  	},

	forExecution: function(block, i, player, map, time, stage) {
	  	var interval = 500;
	    if (block.length == 0) {
	      return time;
	    }
	    var loop = block[i].loop_cnt;
	    var k = i;
	    console.log("loop :" + loop);
	    var j = 1;
	    while (true) {
	    	k++;
	    	if (block[k].type == "loop_start") {
	    		var req = this.forExecution(block, k, player, map, time, stage);
	        	time = req[0];
	        	k = req[1];
	      	} else if (block[k].type == "loop_end") {
	        	if (j < loop) {
	        		k = i;
	        		j++;
	        	} else {
	          		var req = [time, k];
	          		return req;
	        	}
	      	} else {
	      		if (block[k].type == "function") {
	      			time = this.play_function(k, block, stage, player, map, time);
	      		} else if (block[k].type == "arg") {
	      			time = this.play_arg(k, block, stage, player, map, time, args);
	      		} else {
		          	setTimeout(this.execution, time, block[k], player, map, stage);
		          	time += interval;
		        }
	      	}
	    }

	    return time;
	},

	execution: function(block, player, map, stage) {
	    if (player.before_block != null)
	    	player.before_block.backgroundColor = player.before_block.default_color;
	    block.backgroundColor = "yellow";
	    switch(block.type) {
	    case "up":
	    	player.toUp(map, stage);
	    	break;
	    case "left_rotate":
	    	player.toLeftRotate(map);
	    	break;
	    case "right_rotate":
	    	player.toRightRotate(map);
	    	break;
	    }
	    player.before_block = block;
	},
});