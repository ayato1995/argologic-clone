
var Block = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, type) {
    // enchant.Sprite.call(this, 60, 10);
    enchant.Sprite.call(this, 16, 16);
    this.type = type;
    this.x = x;
    this.y = y;
    this.loop_cnt = 0;
    this.select = false;
    var string = null;
    var color = "silver";

    if (type == "up") {
      this.image = core.assets["../img/up.png"];
    } else if (type == "leftRotate") {
      this.image = core.assets["../img/left.png"];
    } else if (type == "rightRotate") {
      this.image = core.assets["../img/right.png"];
    } else if (type == "if") {
      string = "もしも";
    } else if (type == "function_h") {
      this.image = core.assets["../img/heart.png"];
    } else if (type == "function_c") {
      this.image = core.assets["../img/clover.png"];
    } else if (type == "function_s") {
      this.image = core.assets["../img/spade.png"];
    } else if (type == "function_d") {
      this.image = core.assets["../img/diamond.png"];
    } else if (type == "arg1") {
      color = "tomato";
      this.func_name;
    } else if (type == "arg2") {
      color = "deepskyblue";
      this.func_name;
    } else if (type == "arg3") {
      color = "greenyellow";
      this.func_name;
    } else if (type == "forStart") {
      this.image = core.assets["../img/loop_start.png"];
    } else if (type == "forEnd") {
      this.image = core.assets["../img/loop_end.png"];
    } else if (type == "play") {
      string = "実行";
      color = "green";
    } else if (type == "copy") {
      color = "green";
    } else if (type == "select") {
      string = "ブロックの選択";
      color = "green";
    }
    // console.log(this.loop_cnt);

    this.label = new Label(string);
    this.label.x = this.x;
    this.label.y = this.y;
    this.label.font = "6px 'MSゴシック'";
    this.loopCounter = new Label(String(this.loop_cnt));
    this.loopCounter.x = this.x + this.width - 15;
    this.loopCounter.y = this.y;
    this.loopCounter.font = "6px 'MSゴシック'";
    //this.loopCounter.color = "white";
    this.backgroundColor = color;
  },

  remove: function(core) {
    core.rootScene.removeChild(this);
    core.rootScene.removeChild(this.label);
    //core.rootScene.removeChild(this.loopCounter);
  },

  play: function(block, player, core, backgroundMap, t) {
    var time = t;
    var forStack = [];
    var stackCounter = 0;

    for (var i = 0; i < block.length; i++) {
      console.log(block[i].type);
      if (block[i].type == "function_h") {
        var k = i;
        i++;
        for (var j = player.func_h.length; i < block.length && j > 0; i++, j--) {
          console.log("for " + block[i].type);
          player.arg_h.push(block[i]);
        }
        i = k;
        block.splice(i + 1, player.func_h.length);
        time = this.play(player.func_h, player, core, backgroundMap, time);
      } else if (block[i].type == "function_c") {
      	var k = i;
        i++;
        for (var j = player.func_c.length; i < block.length && j > 0; i++, j--) {
          console.log("for " + block[i].type);
          player.arg_c.push(block[i]);
        }
        i = k;
        block.splice(i + 1, player.func_c.length);
        time = this.play(player.func_c, player, core, backgroundMap, time);
      } else if (block[i].type == "function_s") {
      	var k = i;
        i++;
        for (var j = player.func_s.length; i < block.length && j > 0; i++, j--) {
          console.log("for s" + block[i].type);
          player.arg_s.push(block[i]);
        }
        i = k;
        block.splice(i + 1, player.func_s.length);
        time = this.play(player.func_s, player, core, backgroundMap, time);
      } else if (block[i].type == "function_d") {
      	var k = i;
        i++;
        for (var j = player.func_d.length; i < block.length && j > 0; i++, j--) {
          console.log("for " + block[i].type);
          player.arg_d.push(block[i]);
        }
        i = k;
        block.splice(i + 1, player.func_d.length);
        time = this.play(player.func_d, player, core, backgroundMap, time);
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
        setTimeout(this.execution, time, order, player, core, backgroundMap);
        time += 1000;
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
        setTimeout(this.execution, time, order, player, core, backgroundMap);
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
        setTimeout(this.execution, time, order, player, core, backgroundMap);
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
        time = this.forExecution(loop_list, 0, player, core, backgroundMap, time)[0];
      } else {
        setTimeout(this.execution, time, block[i], player, core, backgroundMap);
        time += 1000;
      }
    }

    return time;
  },

  forExecution: function(block, i, player, core, backgroundMap, time) {
    if (block.length == 0) {
      return time;
    }
    var loop = block[i].loop_cnt;
    var k = i;
    console.log("loop :" + loop);
    var j = 1;
    while (true) {
      k++;
      if (block[k].type == "forStart") {
        var req = this.forExecution(block, k, player, core, backgroundMap, time);
        time = req[0];
        k = req[1];
      } else if (block[k].type == "forEnd") {
        if (j < loop) {
          k = i;
          j++;
        } else {
          var req = [time, k];
          return req;
        }
      } else {
        if (block[k].type == "function") {
          time = this.play(player.func_h, player, core, backgroundMap, time);
        } else {
          setTimeout(this.execution, time, block[k], player, core, backgroundMap);
          time += 1000;
        }
      }
    }

    return time;
  },

  execution: function(block, player, core, backgroundMap) {
    switch(block.type) {
    case "up":
      player.toUp(core, backgroundMap);
      break;
    case "leftRotate":
      player.toLeftRotate(core, backgroundMap);
      break;
    case "rightRotate":
      player.toRightRotate(core, backgroundMap);
      break;
    }
  },

  forAnalyzer: function(block_list, i) {
  	var for_blocks = [];
  	for (; i < block_list.length; i++) {
  	  if (block[i].type == "forStart")
  	    for_blocks.push(forAnalyzer(block_list, i));
  	  else if (block_list[i].type == "forEnd")
  	  	return for_blocks;
  	  else
  	  	for_blocks.push(block_list[i]);
  	}
  },
  
  moveBlock: function(n) {
    this.y = n * 20 + 15;
    this.label.y = this.y;
    this.loopCounter.y = this.y;
  },

  checkForStart: function(block_list) {
  	for (var i = 0; i < block_list.length; i++) {
  	  if (block_list[i].type == "forStart") return true;
  	}
  	return false;
  },

  checkArg1: function(block_list) {
  	for (var i = 0; i < block_list.length; i++) {
  	  if (block_list[i].type == "arg1") return true;
  	}
  	return false;
  },

  checkArg2: function(block_list) {
  	for (var i = 0; i < block_list.length; i++) {
  	  if (block_list[i].type == "arg2") return true;
  	}
  	return false;
  },

  expandFuncBlock: function(argNum) {
    this.height += argNum * 20
  }
});
