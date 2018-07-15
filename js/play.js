var Play = enchant.Class.create(Block, {
	initialize: function(x, y) {
		Block.call(this, x, y);
		this.type = "play";
		this.image = core.assets["../img/play.png"];
		this.backgroundColor = null;
	},

	register_play_eventListener: function(player, stage, map, goal) {
		this.addEventListener("touchend", function() {
			if (stage.frames[0].blocks.length != 0) {
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

	play: function(block, player, stage, map, t) {
		var time = t;
    	var forStack = [];
    	var stackCounter = 0;
    	var interval = 500;

    	for (var i = 0; i < block.length; i++) {
    		console.log("play " + block[i].type);
      		if (block[i].type == "function" && block[i].name == "heart") {
        		var k = i;
        		i++;
        		for (var j = player.func_h.arg_num; i < block.length && j > 0; i++, j--) {
          			player.func_h.arg.push(block[i]);
        		}
        		if (player.func_h.arg_num != 0) {
          			block.splice(k + 1, player.func_h.arg_num);
        		}
        		i = k;
        		time = this.play(player.func_h.func, player, stage, map, time);
      		} else if (block[i].type == "function" && block[i].name == "clover") {
        		console.log(block[i].name);
      			var k = i;
        		i++;
        		for (var j = player.func_c.arg_num; i < block.length && j > 0; i++, j--) {
          			player.func_c.arg.push(block[i]);
        		}
        		if (player.func_c.arg_num != 0) {
          			block.splice(k + 1, player.func_c.arg_num);
        		}
        		i = k;
        		time = this.play(player.func_c.func, player, stage, map, time);
      		} else if (block[i].type == "function" && block[i].name == "spead") {
      			var k = i;
        		i++;
        		for (var j = player.func_s.arg_num; i < block.length && j > 0; i++, j--) {
          			player.func_s.arg.push(block[i]);
        		}
        		if (player.func_s.arg_num != 0) {
          			block.splice(k + 1, player.func_s.arg_num);
        		}
        		i = k;
        		time = this.play(player.func_s.func, player, stage, map, time);
      		} else if (block[i].type == "function" && block[i].name == "diamond") {
      			var k = i;
        		i++;
        		for (var j = player.func_d.arg_num; i < block.length && j > 0; i++, j--) {
          			console.log("for " + block[i].type);
       		   		player.func_d.arg.push(block[i]);
        		}
        		if (player.func_d.arg_num != 0) {
          			block.splice(k + 1, player.func_d.arg_num);
        		}
        		i = k;
        		time = this.play(player.func_d.func, player, stage, map, time);
      		} else if (block[i].type == "arg1") {
        		var b = block[i];
        		var order;
		        if (b.func_name == "h") {
		          order = player.arg_h[0];
		        } else if (b.func_name == "c") {
		          order = player.arg_c[0];
		        } else if (b.func_name == "s") {
		          order = player.arg_s[0];
		        } else if (b.func_name == "d") {
		          order = player.arg_d[0];
		        }
		        if (order.type == "function_h")
		          time = this.play(player.func_h, player, stage, map, time);
		        else if (order.type == "function_c")
		          time = this.play(player.func_c, player, stage, map, time);
		        else if (order.type == "function_s")
		          time = this.play(player.func_s, player, stage, map, time);
		        else if (order.type == "function_d")
		          time = this.play(player.func_d, player, stage, map, time);
		        else {
		          setTimeout(this.execution, time, order, player, map, stage);
		          time += interval;
		        }
		    } else if (block[i].type == "arg2") {
        		var b = block[i];
		        var order;
		        if (b.func_name == "h") {
		          order = player.arg_h[1];
		        } else if (b.func_name == "c") {
		          order = player.arg_c[1];
		        } else if (b.func_name == "h") {
		          order = player.arg_s[1];
		        } else if (b.func_name == "d") {
		          order = player.arg_d[1];
		        }
		        if (order.type == "function_h")
		          time = this.play(player.func_h, player, stage, map, time);
		        else if (order.type == "function_c")
		          time = this.play(player.func_c, player, stage, map, time);
		        else if (order.type == "function_s")
		          time = this.play(player.func_s, player, stage, map, time);
		        else if (order.type == "function_d")
		          time = this.play(player.func_d, player, stage, map, time);
		        else {
		          setTimeout(this.execution, time, order, player, map, stage);
		          time += interval;
		        }
		    } else if (block[i].type == "arg3") {
		        var b = block[i];
		        var order;
		        if (b.func_name == "h") {
		          order = player.arg_h[2];
		        } else if (b.func_name == "c") {
		          order = player.arg_c[2];
		        } else if (b.func_name == "h") {
		          order = player.arg_s[2];
		        } else if (b.func_name == "d") {
		          order = player.arg_d[2];
		        }
		        if (order.type == "function_h")
		          time = this.play(player.func_h, player, stage, map, time);
		        else if (order.type == "function_c")
		          time = this.play(player.func_c, player, stage, map, time);
		        else if (order.type == "function_s")
		          time = this.play(player.func_s, player, stage, map, time);
		        else if (order.type == "function_d")
		          time = this.play(player.func_d, player, stage, map, time);
		        else {
		          setTimeout(this.execution, time, order, player, map, stage);
		          time += interval;
		        }
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
	        	if (block[k].type == "function_h") {
	          		time = this.play(player.func_h, player, stage, map, time);
	        	} else if (block[k].type == "function_c") {
	          		time = this.play(player.func_c, player, stage, map, time);
	        	} else if (block[k].type == "function_s") {
	        		time = this.play(player.func_s, player, stage, map, time);
	        	} else if (block[k].type == "function_d") {
	        		time = this.play(player.func_d, player, stage, map, time);
	        	} else if (block[k].type == "arg1") {
	          		var fn = block[k].func_name;
	          		var order;
	          		if (fn == "h") {
	            		order = player.arg_h[0];
	          		} else if (b.func_name == "c") {
	            		order = player.arg_c[0];
	          		} else if (b.func_name == "s") {
	            		order = player.arg_s[0];
	          		} else if (b.func_name == "d") {
	            		order = player.arg_d[0];
	          		}
	          		setTimeout(this.execution, time, order, player, map, stage);
	          		time += interval;
		    	} else if (block[k].type == "arg2") {
				    var fn = block[k].func_name;
				    var order;
				    if (fn == "h") {
				    	order = player.arg_h[1];
				    } else if (b.func_name == "c") {
				        order = player.arg_c[1];
				    } else if (b.func_name == "h") {
				        order = player.arg_s[1];
				    } else if (b.func_name == "d") {
				        order = player.arg_d[1];
				    }
				    setTimeout(this.execution, time, order, player, map, stage);
				    time += interval;
			    } else if (block[k].type == "arg3") {
			      	var fn = block[k].func_name;
			      	var order;
			      	if (fn == "h") {
			        	order = player.arg_h[2];
			      	} else if (b.func_name == "c") {
			        	order = player.arg_c[2];
			      	} else if (b.func_name == "h") {
			        	order = player.arg_s[2];
			      	} else if (b.func_name == "d") {
			        	order = player.arg_d[2];
			      	}
			      	setTimeout(this.execution, time, order, player, map, stage);
			      	time += interval;
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