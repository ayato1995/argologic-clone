var Play = enchant.Class.create(Block, {
	initialize: function(x, y) {
		Block.call(this, x, y);
		this.type = "play";
		this.image = core.assets["../img/play.png"];
		// 実行中のブロックをハイライトするため
		this.block_stack = new Array();
		this.call_stack = new Array();
		this.exec_frames = new Array();
		this.frame_id = 0;
		/* interval of order */
		this.interval = 500;
		/* loop variable */
		this.start_ip = new Array();
		this.counter = new Array();
	},

	register_play_eventListener: function(player, stage, map, goal) {
		this.addEventListener("touchend", function() {
			if (stage.frames[0].blocks.length != 0 && this.check_frames(stage.frames)) {
				for (var i = 0; i < stage.frames.length; i++) {
					stage.log += stage.frames[i].output_block();
				}
				write_log(stage.log);
				this.ready_play(stage.frames[0].blocks, player, stage);
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

	ready_play: function(block, player, stage) {
		core.height += 180;
		player.pop_block_stage(stage);
    	for (var i = 0; i < stage.frames.length; i++) {
    		stage.frames[i].pop_btn_stage(stage);
    		stage.frames[i].move_frame();
    	}
    	stage.removeChild(stage.play);
    	stage.removeChild(stage.select);
    	this.copy_frame(stage.frames[0], stage, player);    	
    	this.play(player, stage, null);
	},

	/*
	play: function(block, player, stage, map, t, args) {
		var time = t;
    	var forStack = [];
    	var interval = 500;

    	for (var i = 0; i < block.length; i++) {
    		console.log("play " + block[i].type);
    		if (block[i].type == "function") {
    			setTimeout(this.push_func_stack.bind(this), time, block[i]);
    			time = this.play_function(i, block[i], block, stage, player, map, time);
      		} else if (block[i].type == "arg") {
      			time = this.play_arg(i, block, stage, player, map, time, args);
		    } else if (block[i].type == "loop_start") {
		        var loop_list = [];
		        do {
		          loop_list.push(block[i]);
		          if (block[i].type == "loop_start") {
		            forStack.push(block[i]);
		          } else if (block[i].type == "loop_end") {
		            forStack.pop();
		          }
		          i++;
		        } while (forStack.length > 0);
		        i--;
		        time = this.forExecution(loop_list, 0, player, map, time, stage)[0];
		    } else {
		        setTimeout(this.execution, time, block[i], player, map, stage, this);
		        time += interval;
		    }
		}
		// stage.removeChild(this.exec_frames.pop());

		return time;
  	},*/
  	play: function(player, stage, args) {
  		var frame = this.exec_frames[this.frame_id];
  		if (frame.ip >= frame.blocks.length) {
  			if (frame.name == "stack") {
	  			this.judge_goal(player, stage);
  				return;
  			} else {
  				var func = this.exec_frames.pop();
  				func.remove_blocks(stage);
  				stage.removeChild(func);
  				this.frame_id--;
  				var frame = this.exec_frames[this.frame_id];
  				var order = frame.blocks[frame.ip];
  				order.backgroundColor = order.default_color;
  				frame.ip++;
  			}
  		} else {
	  		var order = frame.blocks[frame.ip];
			var type = order.type;
			if (type == "function") {
				this.copy_function(order, stage, player);
			} else if (type == "arg") {
				frame.ip++;
			} else if (type == "loop_start") {
				this.loop_start(frame.ip, order);
				frame.ip++;
			} else if (type == "loop_end") {
				this.loop_end(frame.ip, order, frame);
			} else {
				this.execution(order, player, stage);
				frame.ip++;
			}
		}
  		setTimeout(this.play.bind(this), this.interval, player, stage, args);
  	},

  	judge_goal: function(player, stage) {
  		if (! stage.clearFlag) return;
  		if (player.within(stage.goal, 16))
  			core.field(true, stage);
  		else
  			core.field(false, stage);
  	},

  	/*
  	play_function: function(i, order, block, stage, player, map, time) {
  		if (order.name == "heart") {
        	order.set_arg(i, block, stage.frames[1]);
        	this.copy_frame(stage.frames[1], stage, player);
      	} else if (order.name == "clover") {
      		order.set_arg(i, block, stage.frames[2]);
        	this.copy_frame(stage.frames[2], stage, player);
      		// time = this.play(stage.frames[2].blocks, player, stage, map, time, block[i].arg);
      	} else if (order.name == "spead") {
      		order.set_arg(i, block, stage.frames[3]);
        	this.copy_frame(stage.frames[3], stage, player);
      		// time = this.play(stage.frames[3].blocks, player, stage, map, time, block[i].arg);
      	} else if (order.name == "diamond") {
      		order.set_arg(i, block, stage.frames[4]);
        	this.copy_frame(stage.frames[4], stage, player);
      		// time = this.play(stage.frames[4].blocks, player, stage, map, time, block[i].arg);
      	}
        time = this.play(this.exec_frames[this.exec_frames.length - 1].blocks, player, stage, map, time, block[i].arg);
    	setTimeout(this.pop_func_stack.bind(this), time);

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
		if (order == null) return time;
		if (order.type == "function") {
		    time = this.play_function(i, order, block, stage, player, map, time);
		} else {
		    setTimeout(this.execution, time, order, player, map, stage, this);
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
	      			time = this.play_function(k, block[k], block, stage, player, map, time);
	      		} else if (block[k].type == "arg") {
	      			time = this.play_arg(k, block, stage, player, map, time, args);
	      		} else {
		          	setTimeout(this.execution, time, block[k], player, map, stage, this);
		          	time += interval;
		        }
	      	}
	    }

	    return time;
	},
	*/
	copy_function: function(order, stage, player) {
		order.backgroundColor = "red";
		var id = 0;
		var name = order.name;
		if (name == "heart")
			id = 1;
		else if (name == "clover")
			id = 2;
		else if (name == "spead")
			id = 3;
		else if (name == "diamond")
			id = 4;
		var base_frame = stage.frames[id];
		this.copy_frame(base_frame, stage, player);
		var origin_frame = this.exec_frames[this.frame_id];
		if (base_frame.kind_arg != 0) {
			origin_frame.kind_arg = origin_frame.kind_arg;
		}
	},

	loop_start: function(ip, order) {
		this.start_ip.push(ip + 1);
		this.counter.push(order.loop_cnt);
	},

	loop_end: function(ip, order, frame) {
		var cnt = this.counter.pop();
		var ip = this.start_ip.pop();
		cnt--;
		if (cnt == 0) {
			frame.ip++;
			return;
		}
		frame.ip = ip;
		this.start_ip.push(ip);
		this.counter.push(cnt);
	},

	execution: function(block, player, stage) {
	    if (this.block_stack.length > 0) {
	    	this.pop_block_stack();
	    }
	    this.push_block_stack(block);
	    switch(block.type) {
	    case "up":
	    	player.toUp(stage);
	    	break;
	    case "left_rotate":
	    	player.toLeftRotate();
	    	break;
	    case "right_rotate":
	    	player.toRightRotate();
	    	break;
	    }
	    player.before_block = block;
	},

	push_block_stack: function(block) {
		block.backgroundColor = "red";
		this.block_stack.push(block);
	},

	push_func_stack: function(block) {
		block.backgroundColor = "red";
		this.call_stack.push(block);
	},

	pop_block_stack: function() {
		var b = this.block_stack.pop();
		b.backgroundColor = b.default_color;
	},

	pop_func_stack: function() {
		var b = this.call_stack.pop();
		if (b != null)
			b.backgroundColor = b.default_color;
	},

	reset_block_stack: function() {
		for (var i = 0; i < this.block_stack.length; i++) {
			this.pop_block_stack();
		}
		for (var i = 0; i < this.call_stack.length; i++) {
			this.pop_func_stack();
		}
	},

	copy_frame: function(frame, stage, player) {
		var f = new Frame(330 + this.exec_frames.length * 30, 31, frame.name);
		stage.addChild(f);
		for (var i = 0; i < frame.blocks.length; i++) {
			frame.blocks[i].set_block(f.blocks, f, stage, player);
		}
		this.exec_frames.push(f);
		this.frame_id = this.exec_frames.length - 1;
	},
});