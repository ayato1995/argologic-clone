
var Block = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, type) {
    enchant.Sprite.call(this, 60, 10);
    this.type = type;
    this.x = x;
    this.y = y;
    this.loop_cnt = 0;
    var string = null;
    var color = "aquamarine";

    if (type == "up") {
      string = "前進";
      // color = "red";
    } else if (type == "leftRotate") {
      string = "左に向く";
      // color = "aquamarine";
    } else if (type == "rightRotate") {
      string = "右に向く";
      // color = "gold";
    } else if (type == "if") {
      string = "もしも";
      // color = "orange";
    } else if (type == "function") {
      string = "関数";
      // color = "darkslategray";
    } else if (type == "forStart") {
      string = "ループ s";
      // color = "coral";
    } else if (type == "forEnd") {
      string = "ループ e";
      // color = "tomato";
    } else if (type == "play") {
      string = "実行";
      color = "darkturquoise";
    } else if (type == "exeCopy") {
      // string = "実行フレームにコピー";
      string = "exe";
      color = "darkturquoise";
    } else if (type == "funcCopy") {
      // string = "関数フレームにコピー";
      string = "func";
      color = "darkturquoise"
    } else if (type == "select") {
      string = "ブロックの選択";
      color = "darkturquoise";
    }
    // console.log(this.loop_cnt);

    this.label = new Label(string);
    this.label.x = this.x;
    this.label.y = this.y;
    this.label.font = "6px 'MSゴシック'";
    this.loopCounter = new Label(this.loop_cnt + "回");
    this.loopCounter.x = this.x + this.width - 15;
    this.loopCounter.y = this.y;
    this.loopCounter.font = "6px 'MSゴシック'";
    this.backgroundColor = color;
  },

  remove: function(core) {
    core.rootScene.removeChild(this);
    core.rootScene.removeChild(this.label);
    core.rootScene.removeChild(this.loopCounter);
  },

  play: function(block, player, core, backgroundMap, goal, t) {
    var time = t;
    var forStack = [];
    var stackCounter = 0;

    for (var i = 0; i < block.length; i++) {
      if (block[i].type == "function") {
        time = this.play(player.func_block_list, player, core, backgroundMap, goal, time);
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
    console.log(block[i].type);
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
      console.log(block[k].type);
        setTimeout(this.execution, time, block[k], player, core, backgroundMap);
        time += 1000;
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
    this.y = n * 15 + 15;
    this.label.y = this.y;
    this.loopCounter.y = this.y;
  },

  checkForStart: function(block_list) {
  	for (var i = 0; i < block_list.length; i++) {
  	  if (block_list[i].type == "forStart") return true;
  	}
  	return false;
  }
});
