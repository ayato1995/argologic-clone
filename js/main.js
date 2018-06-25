enchant();

window.onload = function() {
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

    play.addEventListener("touchstart", function(e) {
      if(block_list.length != 0) {
      	var time = this.play(block_list, player, core, backgroundMap, goal, 0);
        // console.log(time);
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
        register_delete_block_eventListenr(block_list);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
      }
      if (e.x > 480 && e.x < 550 && e.y > 10 && e.y < 210) {
        this.moveBlock(player.func_block_list);
        player.func_block_list.push(new Block(485, player.func_block_list.length * 15 + 15, "up"));
        register_delete_block_eventListenr(player.func_block_list);
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
        register_delete_block_eventListenr(block_list);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
      }
      if (e.x > 480 && e.x < 550 && e.y > 10 && e.y < 210) {
        this.moveBlock(player.func_block_list);
        player.func_block_list.push(new Block(485, player.func_block_list.length * 15 + 15, "leftRotate"));
        register_delete_block_eventListenr(player.func_block_list);
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
        register_delete_block_eventListenr(block_list);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
      }
      if (e.x > 480 && e.x < 550 && e.y > 10 && e.y < 210) {
        this.moveBlock(player.func_block_list);
        player.func_block_list.push(new Block(485, player.func_block_list.length * 15 + 15, "rightRotate"));
        register_delete_block_eventListenr(player.func_block_list);
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
        register_delete_block_eventListenr(block_list);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
      }
      if (e.x > 480 && e.x < 550 && e.y > 10 && e.y < 210) {
        this.moveBlock(player.func_block_list);
        player.func_block_list.push(new Block(485, player.func_block_list.length * 15 + 15, "function"));
        register_delete_block_eventListenr(player.func_block_list);
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
        register_delete_block_eventListenr(block_list);
        block_list[block_list.length - 1].loop_cnt = this.loop_cnt;
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
        core.rootScene.addChild(block_list[block_list.length - 1].loopCounter);
        block_list[block_list.length - 1].loopCounter.text = this.loop_cnt + "回";
        register_loopCounter_eventListenr(block_list);
        /*
        block_list[block_list.length - 1].loopCounter.addEventListener("touchstart", function() {
          if (block_list[block_list.length - 1].loop_cnt < 10) {
            block_list[block_list.length - 1].loop_cnt++;
          } else {
            block_list[block_list.length - 1].loop_cnt = 0;
          }
          this.text = block_list[block_list.length - 1].loop_cnt + "回";
        })
        */
      }
      if (e.x > 480 && e.x < 550 && e.y > 10 && e.y < 210) {
        this.moveBlock(player.func_block_list);
        player.func_block_list.push(new Block(485, player.func_block_list.length * 15 + 15, "forStart"));
        register_delete_block_eventListenr(player.func_block_list);
        player.func_block_list[player.func_block_list.length - 1].loop_cnt = this.loop_cnt;
        core.rootScene.addChild(player.func_block_list[player.func_block_list.length - 1]);
        core.rootScene.addChild(player.func_block_list[player.func_block_list.length - 1].label);
        core.rootScene.addChild(player.func_block_list[player.func_block_list.length - 1].loopCounter);
        player.func_block_list[player.func_block_list.length - 1].loopCounter.text = this.loop_cnt + "回";
        register_loopCounter_eventListenr(player.func_block_list);
        /*
        player.func_block_list[player.func_block_list.length - 1].loopCounter.addEventListener("touchstart", function() {
          if (player.func_block_list[player.func_block_list.length - 1].loop_cnt < 10) {
            player.func_block_list[player.func_block_list.length - 1].loop_cnt++;
          } else {
            player.func_block_list[player.func_block_list.length - 1].loop_cnt = 0;
          }
          this.text = player.func_block_list[player.func_block_list.length - 1].loop_cnt + "回";
        })
        */
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
        // console.log(player.loop_cnt++);
      } else {
        player.forStart.loop_cnt = 0;
        // console.log("aaa " +player.loop_cnt);
      }
      player.forStart.loopCounter.text = player.forStart.loop_cnt + "回";
      console.log(player.forStart.loop_cnt);
    });

    player.forEnd.addEventListener("touchend", function(e) {
      if (e.x > 400 && e.x < 470 && e.y > 10 && e.y < 210 && this.checkForStart(block_list)) {
        this.moveBlock(block_list);
        block_list.push(new Block(405, block_list.length * 15 + 15, "forEnd"));
        register_delete_block_eventListenr(block_list);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
      }
      if (e.x > 480 && e.x < 550 && e.y > 10 && e.y < 210 && this.checkForStart(player.func_block_list)) {
        this.moveBlock(player.func_block_list);
        player.func_block_list.push(new Block(485, player.func_block_list.length * 15 + 15, "forEnd"));
        register_delete_block_eventListenr(player.func_block_list);
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

  register_delete_block_eventListenr = function(array) {
    for (var i = 0; i < array.length; i++) {
      array[i].addEventListener("touchstart", function(e) {
        this.remove(core);
        block_remove(array, this);
      });
    }
  }

  register_loopCounter_eventListenr = function(array) {
    for (var i = 0; i < array.length; i++) {
      array[i].loopCounter.addEventListener("touchstart", function() {
        if (this.loop_cnt < 10) {
          this.loop_cnt++;
        } else {
          this.loop_cnt = 0;
        }
        this.loopCounter.text = this.loop_cnt + "回";
      }.bind(array[i]));
    }
  }

  core.start();
  // core.debug();
};