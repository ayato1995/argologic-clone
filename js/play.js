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
				stage.log += "play\n";
				stage.play_flag = true;
				for (var i = 0; i < stage.frames.length; i++) {
					stage.log += stage.frames[i].output_block();
				}
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

  	play: function(player, stage, args) {
  		var frame = this.exec_frames[this.frame_id];
  		if (frame.ip >= frame.blocks.length) {
  			if (frame.name == "stack") {
	  			this.judge_goal(player, stage);
  				return;
  			} else {
  				var func = this.exec_frames.pop();
  				func.remove_blocks(stage);
  				stage.removeChild(func.label);
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
				this.copy_function(order, stage, player, frame);
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
		if (!stage.clearFlag)
			return;
		else
			setTimeout(this.play.bind(this), this.interval, player, stage, args);
  	},

  	judge_goal: function(player, stage) {
  		if (! stage.clearFlag) return;
  		if (player.within(stage.goal, 16))
  			core.field(true, stage);
  		else
  			core.field(false, stage);
  	},

	copy_function: function(order, stage, player, frame) {
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
		stage.addChild(origin_frame.label);
		if (base_frame.kind_arg != 0) {
		    origin_frame.kind_arg = base_frame.kind_arg;
			order.set_arg(frame.ip, frame.blocks, this.exec_frames[this.frame_id].kind_arg);
			this.change_arg(order, base_frame, origin_frame, stage);
		}
	},

	change_arg: function(order, base_frame, origin_frame, stage) {
		for (var i = 0; i < origin_frame.kind_arg; i++) {
			for (var j = 0; j < origin_frame.blocks.length; j++) {
				var o = origin_frame.blocks[j];
				if (o.type == "arg" && o.id == i) {
					stage.removeChild(origin_frame.blocks[j]);
					var b = order.arg[i].create_block(o.x, o.y, stage);
					origin_frame.blocks[j] = b;
				}
			}
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
			var order = frame.blocks[i];
			var o = order.create_block(f.x + 4, f.blocks.length * 20 + f.y + 4, stage);
			f.blocks.push(o);
		}
		this.exec_frames.push(f);
		this.frame_id = this.exec_frames.length - 1;
	},
});