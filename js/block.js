
var Block = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, type) {
    enchant.Sprite.call(this, 60, 10);
    this.type = type;
    label = new Label(this.type);
    this.x = x;
    this.y = y;
    this.loop_cnt = 0;

    if (type == "up") {
      color = "red";
    } else if (type == "leftRotate") {
      color = "aquamarine";
    } else if (type == "rightRotate") {
      color = "gold";
    } else if (type == "for") {
      color = "blue";
    } else if (type == "if") {
      color = "orange";
    } else if (type == "function") {
      color = "darkslategray";
    } else if (type == "forStart") {
      color = "coral";
      this.loop_cnt = 3;
    } else if (type == "forEnd") {
      color = "tomato";
    } else if (type == "play") {
      color = "darkturquoise";
    }
    // console.log(this.loop_cnt);

    this.backgroundColor = color;
  },

  remove: function(core) {
    core.rootScene.removeChild(this);
  },

  /*
  play: function(block, player, core, backgroundMap, goal, t) {
    var time = t;
    var flag = true;
    // var n = 3;
    var for_blocks = [];

    for (var i = 0; i < block.length; i++) {
      // console.log(block[i].type + flag);
      if (block[i].type == "function" && flag) {
        time = this.play(player.func_block_list, player, core, backgroundMap, goal, time);
      } else if (block[i].type == "forStart") {
      	flag = false;
      	// console.log("===========");
        console.log(block[i].loop_cnt);
      } else if (block[i].type == "forEnd") {
      	flag = true;
      	// console.log("-----------");
      	// for (var j = 0; j < n; j++)
        for (var j = 0; j < this.loop_cnt; j++)
      		time = this.play(for_blocks, player, core, backgroundMap, goal, time);
      } else if (flag){
        setTimeout(this.execution, time, block[i], player, core, backgroundMap);
        time += 1000;
      } else if (!flag) {
      	for_blocks.push(block[i]);
      }
    }
    return time;
  },*/

  play: function(block, player, core, backgroundMap, goal, t) {
    var time = t;
    var forStack = [];
    var stackCounter = 0;
    // console.log(forStack);

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
        time = this.forExecution(loop_list, 0, player, core, backgroundMap, time);
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
        time = this.forExecution(block, k, player, core, backgroundMap, time);
      } else if (block[k].type == "forEnd") {
        if (j < loop) {
          k = i;
          j++;
        } else {
          console.log(time);
          return time;
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
      /*
    case "function":
      console.log("function");
      break;
      */
    }
  },
  
  moveBlock: function(n) {
    this.x = 405;
    this.y = n * 15 + 15;
  }
});
