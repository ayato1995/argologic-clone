enchant();

window.onload = function() {
  var selectFlag = false;
  core = new Core(560, 320);
  core.fps = 60;
  core.preload("../img/chara5.png", "../img/map0.gif", "../img/goal.png", "../img/clear.png", "../img/end.png");

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
    var exeCopy = new Block(330, 285, "exeCopy");
    var funcCopy = new Block(330, 270, "funcCopy");
    var select = new Block(330, 255, "select");

    core.rootScene.addChild(backgroundMap);
    core.rootScene.addChild(stack_frame);
    core.rootScene.addChild(func_frame);
    core.rootScene.addChild(goal);
    core.rootScene.addChild(player);
    core.rootScene.addChild(player.up);
    core.rootScene.addChild(player.up.label);
    core.rootScene.addChild(player.leftRotate);
    core.rootScene.addChild(player.leftRotate.label);
    core.rootScene.addChild(player.rightRotate);
    core.rootScene.addChild(player.rightRotate.label);
    core.rootScene.addChild(player.func);
    core.rootScene.addChild(player.func.label);
    core.rootScene.addChild(player.forStart);
    core.rootScene.addChild(player.forStart.label);
    core.rootScene.addChild(player.forStart.loopCounter);
    core.rootScene.addChild(player.forEnd);
    core.rootScene.addChild(player.forEnd.label);
    core.rootScene.addChild(play);
    core.rootScene.addChild(play.label);
    core.rootScene.addChild(exeCopy);
    core.rootScene.addChild(exeCopy.label);
    core.rootScene.addChild(funcCopy);
    core.rootScene.addChild(funcCopy.label);
    core.rootScene.addChild(select);
    // core.rootScene.addChild(select.label);

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
        reset_block_color(player.func_block_list);
      } else {
        selectFlag = true;
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
          block_list.push(new Block(405, block_list.length * 15 + 15, player.copy_list[i].type));
          register_block_eventListener(block_list[block_list.length - 1], block_list);
          core.rootScene.addChild(block_list[block_list.length - 1]);
          core.rootScene.addChild(block_list[block_list.length - 1].label);
          if (block_list[block_list.length - 1].type == "forStart") {
            register_loopCounter_eventListener(block_list[block_list - 1]);
            block_list[block_list.lenght -1].loop_cnt = player.copy_list[i].loop_cnt;
            core.rootScene.addChild(block_list[block_list.length - 1].loopCounter);
          }
        }
        // console.log(block_list);
        console.log(player.copy_list);
        console.log("exeCopy");
      }
    });

    funcCopy.addEventListener("touchstart", function(e) {
      if (player.copy_list.length != 0) {
        for (var i = 0; i < player.copy_list.length; i++) {
          player.func_block_list.push(new Block(485, player.func_block_list.length * 15 + 15, player.copy_list[i].type));
          register_block_eventListener(player.func_block_list[player.func_block_list.length - 1], player.func_block_list);
          core.rootScene.addChild(player.func_block_list[player.func_block_list.length - 1]);
          core.rootScene.addChild(player.func_block_list[player.func_block_list.length - 1].label);
          if (player.func_block_list[player.func_block_list.length - 1].type == "forStart") {
            register_loopCounter_eventListener(player.func_block_list[player.func_block_list.length - 1]);
            player.func_block_list[player.func_block_list.length - 1].loop_cnt = player.copy_list[i].loop_cnt;
            core.rootScene.addChild(player.func_block_list[player.func_block_list.length - 1].loopCounter);
          }
        }
        // console.log(player.func_block_list);
        console.log(player.copy_list);
        console.log("funcCopy");
      }
    });

    /*
    player.addEventListener("enterframe", function(e) {
      if (core.input.up)
        player.toUp(core, backgroundMap);
      else if (core.input.down)
        player.toDown(core, backgroundMap);
      else if (core.input.right)
        player.toRight(core, backgroundMap);
      else if (core.input.left)
        player.toLeft(core, backgroundMap);
    });
    */

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
      this.loopCounter.x = this.x + this.width - 15;
      this.loopCounter.y = this.y
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
        block_list.push(new Block(405, block_list.length * 15 + 15, "up"));
        register_block_eventListener(block_list[block_list.length - 1], block_list);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
      }
      if (e.x > 480 && e.x < 550 && e.y > 10 && e.y < 210) {
        this.moveBlock(player.func_block_list);
        player.func_block_list.push(new Block(485, player.func_block_list.length * 15 + 15, "up"));
        register_block_eventListener(player.func_block_list[player.func_block_list.length - 1], player.func_block_list);
        core.rootScene.addChild(player.func_block_list[player.func_block_list.length - 1]);
        core.rootScene.addChild(player.func_block_list[player.func_block_list.length - 1].label);
      }
      this.x = 330;
      this.y = 10;
      this.label.x = this.x;
      this.label.y = this.y;
    });


    player.leftRotate.addEventListener("touchend", function(e) {
      if (e.x > 400 && e.x < 470 && e.y > 10 && e.y < 210) {
        this.moveBlock(block_list);
        block_list.push(new Block(405, block_list.length * 15 + 15, "leftRotate"));
        register_block_eventListener(block_list[block_list.length - 1], block_list);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
      }
      if (e.x > 480 && e.x < 550 && e.y > 10 && e.y < 210) {
        this.moveBlock(player.func_block_list);
        player.func_block_list.push(new Block(485, player.func_block_list.length * 15 + 15, "leftRotate"));
        register_block_eventListener(player.func_block_list[player.func_block_list.length - 1], player.func_block_list);
        core.rootScene.addChild(player.func_block_list[player.func_block_list.length - 1]);
        core.rootScene.addChild(player.func_block_list[player.func_block_list.length - 1].label);
      }
      this.x = 330;
      this.y = 25;
      this.label.x = this.x;
      this.label.y = this.y;
    });

    player.rightRotate.addEventListener("touchend", function(e) {
      if (e.x > 400 && e.x < 470 && e.y > 10 && e.y < 210) {
        this.moveBlock(block_list);
        block_list.push(new Block(405, block_list.length * 15 + 15, "rightRotate"));
        register_block_eventListener(block_list[block_list.length - 1], block_list);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
      }
      if (e.x > 480 && e.x < 550 && e.y > 10 && e.y < 210) {
        this.moveBlock(player.func_block_list);
        player.func_block_list.push(new Block(485, player.func_block_list.length * 15 + 15, "rightRotate"));
        register_block_eventListener(player.func_block_list[player.func_block_list.length - 1], player.func_block_list);
        core.rootScene.addChild(player.func_block_list[player.func_block_list.length - 1]);
        core.rootScene.addChild(player.func_block_list[player.func_block_list.length - 1].label);
      }
      this.x = 330;
      this.y = 40;
      this.label.x = this.x;
      this.label.y = this.y;
    });

    player.func.addEventListener("touchend", function(e) {
      if (e.x > 400 && e.x < 470 && e.y > 10 && e.y < 210) {
        this.moveBlock(block_list);
        block_list.push(new Block(405, block_list.length * 15 + 15, "function"));
        register_block_eventListener(block_list[block_list.length - 1], block_list);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
      }
      if (e.x > 480 && e.x < 550 && e.y > 10 && e.y < 210) {
        this.moveBlock(player.func_block_list);
        player.func_block_list.push(new Block(485, player.func_block_list.length * 15 + 15, "function"));
        register_block_eventListener(player.func_block_list[player.func_block_list.length - 1], player.func_block_list);
        core.rootScene.addChild(player.func_block_list[player.func_block_list.length - 1]);
        core.rootScene.addChild(player.func_block_list[player.func_block_list.length - 1].label);
      }
      this.x = 330;
      this.y = 55;
      this.label.x = this.x;
      this.label.y = this.y;
    });

    player.forStart.addEventListener("touchend", function(e) {
      if (e.x > 400 && e.x < 470 && e.y > 10 && e.y < 210) {
        this.moveBlock(block_list);
        block_list.push(new Block(405, block_list.length * 15 + 15, "forStart"));
        register_block_eventListener(block_list[block_list.length - 1], block_list);
        block_list[block_list.length - 1].loop_cnt = this.loop_cnt;
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
        core.rootScene.addChild(block_list[block_list.length - 1].loopCounter);
        block_list[block_list.length - 1].loopCounter.text = this.loop_cnt + "回";
        register_loopCounter_eventListener(block_list[block_list.length - 1]);
      }
      if (e.x > 480 && e.x < 550 && e.y > 10 && e.y < 210) {
        this.moveBlock(player.func_block_list);
        player.func_block_list.push(new Block(485, player.func_block_list.length * 15 + 15, "forStart"));
        register_block_eventListener(player.func_block_list[player.func_block_list.length - 1], player.func_block_list);
        player.func_block_list[player.func_block_list.length - 1].loop_cnt = this.loop_cnt;
        core.rootScene.addChild(player.func_block_list[player.func_block_list.length - 1]);
        core.rootScene.addChild(player.func_block_list[player.func_block_list.length - 1].label);
        core.rootScene.addChild(player.func_block_list[player.func_block_list.length - 1].loopCounter);
        player.func_block_list[player.func_block_list.length - 1].loopCounter.text = this.loop_cnt + "回";
        register_loopCounter_eventListener(player.func_block_list[player.func_block_list.length - 1]);
      }
      this.x = 330;
      this.y = 70;
      this.label.x = this.x;
      this.label.y = this.y;
      this.loopCounter.x = this.x + this.width - 15;
      this.loopCounter.y = this.y;
    });

    player.forStart.loopCounter.addEventListener("touchend", function(e) {
      if (player.forStart.loop_cnt < 10) {
        player.forStart.loop_cnt++;
      } else {
        player.forStart.loop_cnt = 0;
      }
      player.forStart.loopCounter.text = player.forStart.loop_cnt + "回";
      // console.log(player.forStart.loop_cnt);
    });

    player.forEnd.addEventListener("touchend", function(e) {
      if (e.x > 400 && e.x < 470 && e.y > 10 && e.y < 210 && this.checkForStart(block_list)) {
        this.moveBlock(block_list);
        block_list.push(new Block(405, block_list.length * 15 + 15, "forEnd"));
        register_block_eventListener(block_list[block_list.length - 1], block_list);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
      }
      if (e.x > 480 && e.x < 550 && e.y > 10 && e.y < 210 && this.checkForStart(player.func_block_list)) {
        this.moveBlock(player.func_block_list);
        player.func_block_list.push(new Block(485, player.func_block_list.length * 15 + 15, "forEnd"));
        register_block_eventListener(player.func_block_list[player.func_block_list.length - 1], player.func_block_list);
        core.rootScene.addChild(player.func_block_list[player.func_block_list.length - 1]);
        core.rootScene.addChild(player.func_block_list[player.func_block_list.length - 1].label);
      }
      this.x = 330;
      this.y = 85;
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

/*
  register_delete_block_eventListener = function(array, player) {
    for (var i = 0; i < array.length; i++) {
      array[i].addEventListener("touchstart", function(e) {
        if (selectFlag) {
          // console.log(array.length);
          console.log(i);
          // if (player.copy_list.length < 3 && !this.select) {
          if (!this.select) {
            player.copy_list.push(this);
            console.log(this.type);
            this.select = true;
            this.backgroundColor = "yellow";
            console.log(this.select);
            console.log(this.backgroundColor);
          } else if (this.select) {
            this.select = false;
            this.backgroundColor = "aquamarine";
            console.log(this.type);
            console.log(this.select);
            console.log(this.backgroundColor);
          } 
        } else {
          this.remove(core);
          block_remove(array, this);
        }
      });
    }
  }
  */

  register_block_eventListener = function(block, array) {
    block.addEventListener("touchstart", function() {
      this.remove(core);
      block_remove(array, this);
    });
  }

  register_loopCounter_eventListener = function(block) {
    /*
    for (var i = 0; i < array.length; i++) {
      block.loopCounter.addEventListener("touchstart", function(e) {
        if (this.loop_cnt < 10) {
          this.loop_cnt++;
        } else {
          this.loop_cnt = 0;
        }
        this.loopCounter.text = this.loop_cnt + "回";
      }.bind(block));
    }
    */
    block.loopCounter.addEventListener("touchstart", function() {
      if (this.loop_cnt < 10) {
        this.loop_cnt++;
      } else {
        this.loop_cnt = 0;
      }
      this.loopCounter.text = this.loop_cnt + "回";
    }.bind(block));
  }

  reset_block_color = function(array) {
    for (var i = 0; i < array.length; i++) {
      array[i].backgroundColor = "aquamarine";
    }
  }

  core.start();
  // core.debug();
};