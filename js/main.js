enchant();

window.onload = function() {
  var selectFlag = false;
  core = new Core(560, 320);
  core.fps = 60;
  core.preload("../img/chara5.png", "../img/map0.gif", "../img/goal.png", "../img/clear.png",
               "../img/end.png", "../img/up.png", "../img/left.png", "../img/right.png",
               "../img/loop_start.png", "../img/loop_end.png",
               "../img/heart.png", "../img/spade.png", "../img/diamond.png", "../img/clover.png");

  core.onload = function() {
    /* map initialize */
    var backgroundMap = new Map(16, 16);
    backgroundMap.image = core.assets["../img/map0.gif"];
    backgroundMap.loadData(stage_map1_0, stage_map1_1);
    backgroundMap.collisionData = stage_map1_col;
    var block_list = [];

    /* goal initialize */
    var goal = new Goal(240, 144, backgroundMap);

    /* player initialize */
    var player = new Player(56, 132, backgroundMap);

    /* block initialize */
    var stack_frame = new Sprite(70, 200);
    stack_frame.backgroundColor = "gray";
    stack_frame.x = 400;
    stack_frame.y = 10;
    var func_frame = new Sprite(70, 200);
    func_frame.backgroundColor = "lightsteelblue";
    func_frame.x = 480;
    func_frame.y = 10;

    

    var play = new Block(330, 300, "play");
    var exeCopy = new Block(330, 280, "exeCopy");
    var funcCopy = new Block(330, 260, "funcCopy");
    var select = new Block(330, 240, "select");

    var loop = addLabel(player.forStart, String(player.forStart.loop_cnt));

    core.rootScene.addChild(backgroundMap);
    core.rootScene.addChild(stack_frame);
    core.rootScene.addChild(func_frame);
    core.rootScene.addChild(goal);
    core.rootScene.addChild(player);
    core.rootScene.addChild(player.up);
    core.rootScene.addChild(player.leftRotate);
    core.rootScene.addChild(player.rightRotate);
    core.rootScene.addChild(player.func);
    core.rootScene.addChild(player.func.label);
    core.rootScene.addChild(player.forStart);
    core.rootScene.addChild(loop);
    core.rootScene.addChild(player.forEnd);
    core.rootScene.addChild(play);
    core.rootScene.addChild(exeCopy);
    core.rootScene.addChild(funcCopy);
    core.rootScene.addChild(select);

    play.addEventListener("touchstart", function(e) {
      if(block_list.length != 0) {
      	var time = this.play(block_list, player, core, backgroundMap, goal, 0);
        setTimeout(function() {
          if (player.intersect(goal)) {
            core.replaceScene(core.field(true));
          } else {
            core.replaceScene(core.field(false));
          }
          for (i = 0; i < block_list.length; i++)
            block_list[i].remove(core);
        }, time);
        block_list = [];
      }

    });
    
    select.addEventListener("touchstart", function(e) {
      if (selectFlag) {
        selectFlag = false;
        reset_block_color(block_list);
        reset_block_color(player.func_h);
        this.backgroundColor = "green";
      } else {
        selectFlag = true;
        this.backgroundColor = "yellow";
      }
      /* デバッグデータ */
      /*
      // player.copy_list.push(new Block(330, 25, "forStart"));
      player.copy_list.push(new Block(330, 25, "leftRotate"));
      player.copy_list.push(new Block(330, 25, "leftRotate"));
      player.copy_list.push(new Block(330, 25, "leftRotate"));
      */
      console.log(selectFlag);
    });

    exeCopy.addEventListener("touchstart", function(e) {
      if (player.copy_list.length != 0) {
        for (var i = 0; i < player.copy_list.length; i++) {
          block_list.push(new Block(405, block_list.length * 20 + 15, player.copy_list[i].type));
          if (block_list[block_list.length  - 1].type == "forStart") {
            block_list[block_list.length - 1].loop_cnt = player.copy_list[i].loop_cnt;
            var label = addLabel(block_list[block_list.length - 1], String(block_list[block_list.length - 1].loop_cnt));
            register_forBlock_eventListener(block_list[block_list.length - 1], block_list, player, label);
            core.rootScene.addChild(block_list[block_list.length - 1]);
            core.rootScene.addChild(label);
          } else {
            register_block_eventListener(block_list[block_list.length - 1], block_list, player);
            core.rootScene.addChild(block_list[block_list.length - 1]);
            core.rootScene.addChild(block_list[block_list.length - 1].label);
          }
        }
        /*
        console.log(player.copy_list);
        console.log("exeCopy");
        */
      }
    });

    funcCopy.addEventListener("touchstart", function(e) {
      if (player.copy_list.length != 0) {
        for (var i = 0; i < player.copy_list.length; i++) {
          player.func_h.push(new Block(485, player.func_h.length * 20 + 15, player.copy_list[i].type));
          if (player.func_h[player.func_h.length - 1].type == "forStart") {
            player.func_h[player.func_h.length -1].loop_cnt = player.copy_list[i].loop_cnt;
            var label = addLabel(player.func_h[player.func_h.length -1], String(player.func_h[player.func_h.length - 1].loop_cnt));
            register_forBlock_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player, label);
            core.rootScene.addChild(player.func_h[player.func_h.length - 1]);
            core.rootScene.addChild(label);
          } else {
            register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player);
            core.rootScene.addChild(player.func_h[player.func_h.length - 1]);
            core.rootScene.addChild(player.func_h[player.func_h.length - 1].label);
          }
        }
        // console.log(player.func_h);
        /*
        console.log(player.copy_list);
        console.log("funcCopy");
        */
      }
    });

    player.up.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
      this.label.x = this.x;
      this.label.y = this.y;
    });

    player.leftRotate.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
      this.label.x = this.x;
      this.label.y = this.y;
    });

    player.rightRotate.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
      this.label.x = this.x;
      this.label.y = this.y;
    });

    player.func.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
      this.label.x = this.x;
      this.label.y = this.y;
    });

    player.forStart.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
      this.label.x = this.x;
      this.label.y = this.y;
      loop.x = this.x + this.width - 6;
      loop.y = this.y + this.height - 6;
    });

    player.forEnd.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
      this.label.x = this.x;
      this.label.y = this.y;
    });

    player.up.addEventListener("touchend", function(e) {
      if (e.x > 400 && e.x < 470 && e.y > 10 && e.y < 210) {
        this.moveBlock(block_list);
        block_list.push(new Block(405, block_list.length * 20 + 15, "up"));
        register_block_eventListener(block_list[block_list.length - 1], block_list, player);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
      }
      if (e.x > 480 && e.x < 550 && e.y > 10 && e.y < 210) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(485, player.func_h.length * 20 + 15, "up"));
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1]);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1].label);
      }
      this.x = 330;
      this.y = 10;
      this.label.x = this.x;
      this.label.y = this.y;
    });


    player.leftRotate.addEventListener("touchend", function(e) {
      if (e.x > 400 && e.x < 470 && e.y > 10 && e.y < 210) {
        this.moveBlock(block_list);
        block_list.push(new Block(405, block_list.length * 20 + 15, "leftRotate"));
        register_block_eventListener(block_list[block_list.length - 1], block_list, player);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
      }
      if (e.x > 480 && e.x < 550 && e.y > 10 && e.y < 210) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(485, player.func_h.length * 20 + 15, "leftRotate"));
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1]);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1].label);
      }
      this.x = 330;
      this.y = 30;
      this.label.x = this.x;
      this.label.y = this.y;
    });

    player.rightRotate.addEventListener("touchend", function(e) {
      if (e.x > 400 && e.x < 470 && e.y > 10 && e.y < 210) {
        this.moveBlock(block_list);
        block_list.push(new Block(405, block_list.length * 20 + 15, "rightRotate"));
        register_block_eventListener(block_list[block_list.length - 1], block_list, player);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
      }
      if (e.x > 480 && e.x < 550 && e.y > 10 && e.y < 210) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(485, player.func_h.length * 20 + 15, "rightRotate"));
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1]);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1].label);
      }
      this.x = 330;
      this.y = 50;
      this.label.x = this.x;
      this.label.y = this.y;
    });

    player.func.addEventListener("touchend", function(e) {
      if (e.x > 400 && e.x < 470 && e.y > 10 && e.y < 210) {
        this.moveBlock(block_list);
        block_list.push(new Block(405, block_list.length * 20 + 15, "function"));
        register_block_eventListener(block_list[block_list.length - 1], block_list, player);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
      }
      if (e.x > 480 && e.x < 550 && e.y > 10 && e.y < 210) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(485, player.func_h.length * 20 + 15, "function"));
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1]);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1].label);
      }
      this.x = 330;
      this.y = 70;
      this.label.x = this.x;
      this.label.y = this.y;
    });

    player.forStart.addEventListener("touchend", function(e) {
      if (e.x > 400 && e.x < 470 && e.y > 10 && e.y < 210) {
        this.moveBlock(block_list);
        block_list.push(new Block(405, block_list.length * 20 + 15, "forStart"));
        block_list[block_list.length - 1].loop_cnt = this.loop_cnt;
        var label = addLabel(block_list[block_list.length - 1], String(block_list[block_list.length - 1].loop_cnt));
        register_forBlock_eventListener(block_list[block_list.length - 1], block_list, player, label);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
        core.rootScene.addChild(label);
        register_loopCounter_eventListener(block_list[block_list.length - 1], label);
      }
      if (e.x > 480 && e.x < 550 && e.y > 10 && e.y < 210) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(485, player.func_h.length * 20 + 15, "forStart"));
        player.func_h[player.func_h.length - 1].loop_cnt = this.loop_cnt;
        var label = addLabel(player.func_h[player.func_h.length - 1], String(player.func_h[player.func_h.length - 1].loop_cnt));
        register_forBlock_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player, label);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1]);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1].label);
        core.rootScene.addChild(label);
        register_loopCounter_eventListener(player.func_h[player.func_h.length - 1], label);
      }
      this.x = 330;
      this.y = 90;
      this.label.x = this.x;
      this.label.y = this.y;
      loop.x = this.x + this.width - 6;
      loop.y = this.y + this.height - 6;
    });

    loop.addEventListener("touchstart", function(e) {
      if (player.forStart.loop_cnt < 10) {
        player.forStart.loop_cnt++;
      } else {
        player.forStart.loop_cnt = 0;
        this.x += 2;
        this.width -= 2;
      }
      if (player.forStart.loop_cnt == 10) {
        this.x -= 2;
        this.width += 2;
      }
      this.text = String(player.forStart.loop_cnt);
    });

    player.forEnd.addEventListener("touchend", function(e) {
      if (e.x > 400 && e.x < 470 && e.y > 10 && e.y < 210 && this.checkForStart(block_list)) {
        this.moveBlock(block_list);
        block_list.push(new Block(405, block_list.length * 20 + 15, "forEnd"));
        register_block_eventListener(block_list[block_list.length - 1], block_list, player);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
      }
      if (e.x > 480 && e.x < 550 && e.y > 10 && e.y < 210 && this.checkForStart(player.func_h)) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(485, player.func_h.length * 20 + 15, "forEnd"));
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1]);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1].label);
      }
      this.x = 330;
      this.y = 110;
      this.label.x = this.x;
      this.label.y = this.y;
    });
  }

  core.field = function(clear) {
    var scene = new Scene();
    var game_set_image = new Sprite(189, 97);
    if (clear)
      game_set_image = core.assets["../img/clear.png"];
    else 
      game_set_image = core.assets["../img/end.png"];
    scene.addChild(game_set_image);
    return scene;
  }

  block_remove = function(array, block) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == block) {
        array.splice(i, 1);
      }
    }
    for (var i = 0; i < array.length; i++) {
      array[i].moveBlock(i);
    }
  }

  register_block_eventListener = function(block, array, player) {
    block.addEventListener("touchstart", function() {
      if (selectFlag) {
        if (this.select) {
          var i = searchBlock(block, player.copy_list);
          player.copy_list.splice(i, player.copy_list.length - i);
          i = searchBlock(block, array);
          for (var j = i; j < array.length && j < i + 3; j++) {
            array[j].select = false;
            array[j].backgroundColor = "silver";
          }
        } else {
          player.copy_list = [];
          var i = searchBlock(block, array);
          for (var j = i; j < array.length && j < i + 3; j++) {
            player.copy_list.push(array[j]);
            array[j].select = true;
            array[j].backgroundColor = "yellow";
          }
        }
      } else {
        this.remove(core);
        block_remove(array, this); 
      }
    });
  }

  register_forBlock_eventListener = function(block, array, player, label) {
    block.addEventListener("touchstart", function() {
      if (selectFlag) {
        if (this.select) {
          var i = searchBlock(block, player.copy_list);
          player.copy_list.splice(i, player.copy_list.length - i);
          i = searchBlock(block, array);
          for (var j = i; j < array.length && j < i + 3; j++) {
            array[j].select = false;
            array[j].backgroundColor = "silver";
          }
        } else {
          player.copy_list = [];
          var i = searchBlock(block, array);
          for (var j = i; j < array.length && j < i + 3; j++) {
            player.copy_list.push(array[j]);
            array[j].select = true;
            array[j].backgroundColor = "yellow";
          }
        }
      } else {
        this.remove(core);
        block_remove(array, this);
        core.rootScene.removeChild(label);
      }
    });
  }

  searchBlock = function (block, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == block) return i;
    }
    return -1;
  }

  register_loopCounter_eventListener = function(block, label) {
    label.addEventListener("touchstart", function() {
      if (this.loop_cnt < 10) {
        this.loop_cnt++;
      } else {
        this.loop_cnt = 0;
        label.x += 2;
        label.width -= 2;
      }
      if (this.loop_cnt == 10) {
        label.x -= 2;
        label.width += 2;
      }
      label.text = String(this.loop_cnt);
    }.bind(block));
  }

  reset_block_color = function(array) {
    for (var i = 0; i < array.length; i++) {
      array[i].backgroundColor = "silver";
    }
  }

  addLabel = function(block, text) {
    var label = new Label(text);
    label.x = block.x + block.width - 6;
    label.y = block.y + block.height - 6;
    label.backgroundColor = "white";
    label.font = "6px 'MSゴシック'";
    label.height = 6;
    label.width = 6;
    return label;
  }

  core.start();
  // core.debug();
};
