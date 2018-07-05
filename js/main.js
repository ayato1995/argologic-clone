enchant();

window.onload = function() {
  var selectFlag = false;
  core = new Core(600, 320);
  core.fps = 60;
  core.preload("../img/chara5.png", "../img/map0.gif", "../img/goal.png", "../img/clear.png",
               "../img/end.png", "../img/up.png", "../img/left.png", "../img/right.png",
               "../img/loop_start.png", "../img/loop_end.png",
               "../img/heart.png", "../img/spade.png", "../img/diamond.png", "../img/clover.png",
               "../img/copy.png", "../img/cut.png", "../img/play.png");

  core.onload = function() {
    core.stageId = 1;
    core.clearFlag = true;
    var stage = createStage(core.stageId);

    core.pushScene(stage);
  }

  core.field = function(clear, stage) {
    var scene = new Scene();
    var game_set_image = new Sprite(189, 97);
    if (clear && core.clearFlag) {
      game_set_image = core.assets["../img/clear.png"];
    } else {
      core.clearFlag = false;
      game_set_image = core.assets["../img/end.png"];
    }
    register_replay_eventListener(game_set_image, core.stageId);
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

  register_block_eventListener = function(block, array, player, scene) {
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
          reset_block_color(scene.block_list);
          reset_block_color(player.func_h);
          reset_block_color(player.func_c);
          reset_block_color(player.func_s);
          reset_block_color(player.func_d);
          player.copy_list = [];
          var i = searchBlock(block, array);
          for (var j = i; j < array.length && j < i + 3; j++) {
            player.copy_list.push(array[j]);
            array[j].select = true;
            array[j].backgroundColor = "yellow";
          }
        }
      } else {
        scene.removeChild(this);
        block_remove(array, this); 
      }
    });
  }

  register_forBlock_eventListener = function(block, array, player, scene, label) {
    block.addEventListener("touchstart", function() {
      if (selectFlag) {
        if (this.select) {
          reset_block_color(scene.block_list);
          reset_block_color(player.func_h);
          reset_block_color(player.func_c);
          reset_block_color(player.func_s);
          reset_block_color(player.func_d);
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
        scene.removeChild(this);
        block_remove(array, this);
        scene.removeChild(label);
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

    label.addEventListener("enterframe", function() {
    	if (block.loop_cnt == 10) {
    	  this.x = block.x + block.width - 8;
    	} else {
    	  this.x = block.x + block.width - 6;
    	}
    	this.y = block.y + block.height - 6;
    })
  }

  register_replay_eventListener = function(img, id) {
  	img.addEventListener("touchstart", function() {
  	  core.popScene();
  	  core.popScene();
  	  var scene = createStage(id);
  	  core.pushScene(scene);
  	});
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

  createStage = function(stageId) {
  	var map = null;
  	var map_img = core.assets["../img/map0.gif"];
  	if (stageId == 1) {
  	  map = addMap1(map_img);
  	} else if (stageId == 2) {
  	  map = addMap2(map_img);
  	}

    /* goal initialize */
    var goal = new Goal(map.goalX, map.goalY, core.assets["../img/goal.png"]);

    /* player initialize */
    var player = new Player(map.initializeX, map.initializeY, map.direction);

    /* block initialize */
    var stack_frame = new Sprite(32, 200);
    stack_frame.backgroundColor = "gray";
    stack_frame.x = 370;
    stack_frame.y = 10;
    var funch_frame = new Sprite(32, 200);
    funch_frame.backgroundColor = "lightsteelblue";
    funch_frame.x = 412;
    funch_frame.y = 10;
    var funcc_frame = new Sprite(32, 200);
    funcc_frame.backgroundColor = "lightsteelblue";
    funcc_frame.x = 452;
    funcc_frame.y = 10;
    var funcs_frame = new Sprite(32, 200);
    funcs_frame.backgroundColor = "lightsteelblue";
    funcs_frame.x = 494;
    funcs_frame.y = 10;
    var funcd_frame = new Sprite(32, 200);
    funcd_frame.backgroundColor = "lightsteelblue";
    funcd_frame.x = 536;
    funcd_frame.y = 10;

    var play = new Block(330, 300, "play");
    var exeCopy = new Block(stack_frame.x + 8, stack_frame.y + stack_frame.height + 10, "copy");
    var funchCopy = new Block(funch_frame.x + 8, funch_frame.y + funch_frame.height + 10, "copy");
    var funccCopy = new Block(funcc_frame.x + 8, funcc_frame.y + funcc_frame.height + 10, "copy");
    var funcsCopy = new Block(funcs_frame.x + 8, funcs_frame.y + funcs_frame.height + 10, "copy");
    var funcdCopy = new Block(funcd_frame.x + 8, funcd_frame.y + funcd_frame.height + 10, "copy");
    var select = new Block(330, 280, "select");

    var loop = addLabel(player.forStart, String(player.forStart.loop_cnt));
    var stage = new Scene();
    stage.id = stageId;
    stage.block_list = [];

    stage.addChild(map);
    stage.addChild(stack_frame);
    stage.addChild(funch_frame);
    stage.addChild(funcc_frame);
    stage.addChild(funcs_frame);
    stage.addChild(funcd_frame);
    stage.addChild(goal);
    stage.addChild(player);
    stage.addChild(player.up);
    stage.addChild(player.leftRotate);
    stage.addChild(player.rightRotate);
    stage.addChild(player.funch);
    stage.addChild(player.funcc);
    stage.addChild(player.funcs);
    stage.addChild(player.funcd);
    stage.addChild(player.arg1);
    stage.addChild(player.arg2);
    stage.addChild(player.arg3);
    stage.addChild(player.forStart);
    stage.addChild(loop);
    stage.addChild(player.forEnd);
    stage.addChild(play);
    stage.addChild(exeCopy);
    stage.addChild(funchCopy);
    stage.addChild(funccCopy);
    stage.addChild(funcsCopy);
    stage.addChild(funcdCopy);
    stage.addChild(select);

    play.addEventListener("touchstart", function(e) {
      if(stage.block_list.length != 0) {
      	var time = this.play(stage.block_list, player, stage, map, 0);
        setTimeout(function() {
          if (player.within(goal, 16)) {
          	var scene = core.field(true, stage);
            core.pushScene(scene);
          } else {
          	var scene = core.field(false, stage);
            core.pushScene(scene);
          }
          for (i = 0; i < stage.block_list.length; i++)
            stage.block_list[i].remove();
        }, time);
        stage.block_list = [];
      }
    });

    select.addEventListener("touchstart", function(e) {
      if (selectFlag) {
        selectFlag = false;
        reset_block_color(stage.block_list);
        reset_block_color(player.func_h);
        reset_block_color(player.func_c);
        reset_block_color(player.func_s);
        reset_block_color(player.func_d);
        this.backgroundColor = null;
      } else {
        selectFlag = true;
        this.backgroundColor = "yellow";
      }
      console.log(selectFlag);
    });

    exeCopy.addEventListener("touchstart", function(e) {
      if (player.copy_list.length != 0) {
        for (var i = 0; i < player.copy_list.length; i++) {
          stage.block_list.push(new Block(stack_frame.x + 8, stage.block_list.length * 20 + 15, player.copy_list[i].type));
          if (stage.block_list[stage.block_list.length  - 1].type == "forStart") {
            stage.block_list[stage.block_list.length - 1].loop_cnt = player.copy_list[i].loop_cnt;
            var label = addLabel(stage.block_list[stage.block_list.length - 1], String(stage.block_list[stage.block_list.length - 1].loop_cnt));
            register_forBlock_eventListener(stage.block_list[stage.block_list.length - 1], stage.block_list, player, stage, label);
            stage.addChild(stage.block_list[stage.block_list.length - 1]);
            stage.addChild(label);
          } else {
            register_block_eventListener(stage.block_list[stage.block_list.length - 1], stage.block_list, player, stage);
            stage.addChild(stage.block_list[stage.block_list.length - 1]);
            stage.addChild(stage.block_list[stage.block_list.length - 1].label);
          }
        }
      }
    });

    funchCopy.addEventListener("touchstart", function(e) {
      if (player.copy_list.length != 0) {
        for (var i = 0; i < player.copy_list.length; i++) {
          player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, player.copy_list[i].type));
          if (player.func_h[player.func_h.length - 1].type == "forStart") {
            player.func_h[player.func_h.length -1].loop_cnt = player.copy_list[i].loop_cnt;
            var label = addLabel(player.func_h[player.func_h.length -1], String(player.func_h[player.func_h.length - 1].loop_cnt));
            register_forBlock_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player, stage, label);
            stage.addChild(player.func_h[player.func_h.length - 1]);
            stage.addChild(label);
          } else {
            register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player, stage);
            stage.addChild(player.func_h[player.func_h.length - 1]);
            stage.addChild(player.func_h[player.func_h.length - 1].label);
          }
        }
      }
    });

    funccCopy.addEventListener("touchstart", function(e) {
      if (player.copy_list.length != 0) {
        for (var i = 0; i < player.copy_list.length; i++) {
          player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, player.copy_list[i].type));
          if (player.func_c[player.func_c.length - 1].type == "forStart") {
            player.func_c[player.func_c.length -1].loop_cnt = player.copy_list[i].loop_cnt;
            var label = addLabel(player.func_c[player.func_c.length -1], String(player.func_c[player.func_c.length - 1].loop_cnt));
            register_forBlock_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player, stage, label);
            stage.addChild(player.func_c[player.func_c.length - 1]);
            stage.addChild(label);
          } else {
            register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player, stage);
            stage.addChild(player.func_c[player.func_c.length - 1]);
            stage.addChild(player.func_c[player.func_c.length - 1].label);
          }
        }
      }
    });

    funcsCopy.addEventListener("touchstart", function(e) {
      if (player.copy_list.length != 0) {
        for (var i = 0; i < player.copy_list.length; i++) {
          player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, player.copy_list[i].type));
          if (player.func_s[player.func_s.length - 1].type == "forStart") {
            player.func_s[player.func_s.length -1].loop_cnt = player.copy_list[i].loop_cnt;
            var label = addLabel(player.func_s[player.func_s.length -1], String(player.func_s[player.func_s.length - 1].loop_cnt));
            register_forBlock_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player, stage, label);
            stage.addChild(player.func_s[player.func_s.length - 1]);
            stage.addChild(label);
          } else {
            register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player, stage);
            stage.addChild(player.func_s[player.func_s.length - 1]);
            stage.addChild(player.func_s[player.func_s.length - 1].label);
          }
        }
      }
    });

    funcdCopy.addEventListener("touchstart", function(e) {
      if (player.copy_list.length != 0) {
        for (var i = 0; i < player.copy_list.length; i++) {
          player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, player.copy_list[i].type));
          if (player.func_d[player.func_d.length - 1].type == "forStart") {
            player.func_d[player.func_d.length -1].loop_cnt = player.copy_list[i].loop_cnt;
            var label = addLabel(player.func_d[player.func_d.length -1], String(player.func_d[player.func_d.length - 1].loop_cnt));
            register_forBlock_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player, stage, label);
            stage.addChild(player.func_d[player.func_d.length - 1]);
            stage.addChild(label);
          } else {
            register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player, stage);
            stage.addChild(player.func_d[player.func_d.length - 1]);
            stage.addChild(player.func_d[player.func_d.length - 1].label);
          }
        }
      }
    });

    player.up.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
    });

    player.leftRotate.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
    });

    player.rightRotate.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
    });

    player.funch.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
    });

    player.funcc.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
    });

    player.funcs.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
    });

    player.funcd.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
    });

    player.arg1.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
    });

    player.arg2.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
    });

    player.arg3.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
    })

    player.forStart.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
      loop.x = this.x + this.width - 6;
      loop.y = this.y + this.height - 6;
    });

    player.forEnd.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
    });

    player.up.addEventListener("touchend", function(e) {
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height) {
        this.moveBlock(stage.block_list);
        stage.block_list.push(new Block(stack_frame.x + 8, stage.block_list.length * 20 + 15, "up"));
        register_block_eventListener(stage.block_list[stage.block_list.length - 1], stage.block_list, player, stage);
        stage.addChild(stage.block_list[stage.block_list.length - 1]);
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "up"));
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player, stage);
        stage.addChild(player.func_h[player.func_h.length - 1]);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "up"));
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player, stage);
        stage.addChild(player.func_c[player.func_c.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "up"));
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player);
        stage.addChild(player.func_s[player.func_s.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "up"));
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player);
        stage.addChild(player.func_d[player.func_d.length - 1]);
      }
      this.x = 330;
      this.y = 10;
    });


    player.leftRotate.addEventListener("touchend", function(e) {
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height) {
        this.moveBlock(stage.block_list);
        stage.block_list.push(new Block(stack_frame.x + 8, stage.block_list.length * 20 + 15, "leftRotate"));
        register_block_eventListener(stage.block_list[stage.block_list.length - 1], stage.block_list, player, stage);
        stage.addChild(stage.block_list[stage.block_list.length - 1]);
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "leftRotate"));
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player, stage);
        stage.addChild(player.func_h[player.func_h.length - 1]);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "leftRotate"));
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player, stage);
        stage.addChild(player.func_c[player.func_c.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "leftRotate"));
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player, stage);
        stage.addChild(player.func_s[player.func_s.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "leftRotate"));
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player, stage);
        stage.addChild(player.func_d[player.func_d.length - 1]);
      }
      this.x = 330;
      this.y = 30;
    });

    player.rightRotate.addEventListener("touchend", function(e) {
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height) {
        this.moveBlock(stage.block_list);
        stage.block_list.push(new Block(stack_frame.x + 8, stage.block_list.length * 20 + 15, "rightRotate"));
        register_block_eventListener(stage.block_list[stage.block_list.length - 1], stage.block_list, player, stage);
        stage.addChild(stage.block_list[stage.block_list.length - 1]);
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "rightRotate"));
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player, stage);
        stage.addChild(player.func_h[player.func_h.length - 1]);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "rightRotate"));
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player, stage);
        stage.addChild(player.func_c[player.func_c.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "rightRotate"));
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player, stage);
        stage.addChild(player.func_s[player.func_s.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "rightRotate"));
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player, stage);
        stage.addChild(player.func_d[player.func_d.length - 1]);
      }
      this.x = 330;
      this.y = 50;
    });

    player.funch.addEventListener("touchend", function(e) {
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height) {
        this.moveBlock(stage.block_list);
        stage.block_list.push(new Block(stack_frame.x + 8, stage.block_list.length * 20 + 15, "function_h"));
        var bs = stage.block_list[stage.block_list.length - 1].expandFuncBlock(player.func_h_arg.length);
        register_block_eventListener(stage.block_list[stage.block_list.length - 1], stage.block_list, player, stage);
        stage.addChild(stage.block_list[stage.block_list.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "function_h"));
        var bs = player.func_h[player.func_h.length - 1].expandFuncBlock(player.func_h_arg.length);
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player, stage);
        stage.addChild(player.func_h[player.func_h.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	bs[i].height += 4;
        	stage.addChild(bs[i]);
        }
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "function_h"));
        var bs = player.func_c[player.func_c.length - 1].expandFuncBlock(player.func_h_arg.length);
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player, stage);
        stage.addChild(player.func_c[player.func_c.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "function_h"));
        var bs = player.func_s[player.func_s.length - 1].expandFuncBlock(player.func_h_arg.length);
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player, stage);
        stage.addChild(player.func_s[player.func_s.length -1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "function_h"));
        var bs = player.func_d[player.func_d.length - 1].expandFuncBlock(player.func_h_arg.length);
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player, stage);
        stage.addChild(player.func_d[player.func_d.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
      }
      this.x = 330;
      this.y = 70;
    });

    player.funcc.addEventListener("touchend", function(e) {
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height) {
        this.moveBlock(stage.block_list);
        stage.block_list.push(new Block(stack_frame.x + 8, stage.block_list.length * 20 + 15, "function_c"));
        var bs = stage.block_list[stage.block_list.length - 1].expandFuncBlock(player.func_c_arg.length);
        register_block_eventListener(stage.block_list[stage.block_list.length - 1], stage.block_list, player, stage);
        stage.addChild(stage.block_list[stage.block_list.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "function_c"));
        var bs = player.func_h[player.func_h.length - 1].expandFuncBlock(player.func_c_arg.length);
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player, stage);
        stage.addChild(player.func_h[player.func_h.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "function_c"));
        var bs = player.func_c[player.func_c.length - 1].expandFuncBlock(player.func_c_arg.length);
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player, stage);
        stage.addChild(player.func_c[player.func_c.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "function_c"));
        var bs = player.func_s[player.func_s.length - 1].expandFuncBlock(player.func_c_arg.length);
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player, stage);
        stage.addChild(player.func_s[player.func_s.length -1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "function_c"));
        var bs = player.func_d[player.func_d.length - 1].expandFuncBlock(player.func_c_arg.length);
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player, stage);
        stage.addChild(player.func_d[player.func_d.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
      }
      this.x = 330;
      this.y = 90;
    });

    player.funcs.addEventListener("touchend", function(e) {
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height) {
        this.moveBlock(stage.block_list);
        stage.block_list.push(new Block(stack_frame.x + 8, stage.block_list.length * 20 + 15, "function_s"));
        var bs = stage.block_list[stage.block_list.length - 1].expandFuncBlock(player.func_s_arg.length);
        register_block_eventListener(stage.block_list[stage.block_list.length - 1], stage.block_list, player, stage);
        stage.addChild(stage.block_list[stage.block_list.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "function_s"));
        var bs = player.func_h[player.func_h.length - 1].expandFuncBlock(player.func_s_arg.length);
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player, stage);
        stage.addChild(player.func_h[player.func_h.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "function_s"));
        var bs = player.func_c[player.func_c.length - 1].expandFuncBlock(player.func_s_arg.length);
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player, stage);
        stage.addChild(player.func_c[player.func_c.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "function_s"));
        var bs = player.func_s[player.func_s.length - 1].expandFuncBlock(player.func_s_arg.length);
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player, stage);
        stage.addChild(player.func_s[player.func_s.length -1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "function_s"));
        var bs = player.func_d[player.func_d.length - 1].expandFuncBlock(player.func_s_arg.length);
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player, stage);
        stage.addChild(player.func_d[player.func_d.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
      }
      this.x = 330;
      this.y = 110;
    });

    player.funcd.addEventListener("touchend", function(e) {
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height) {
        this.moveBlock(stage.block_list);
        stage.block_list.push(new Block(stack_frame.x + 8, stage.block_list.length * 20 + 15, "function_d"));
        var bs = stage.block_list[stage.block_list.length - 1].expandFuncBlock(player.func_d_arg.length);
        register_block_eventListener(stage.block_list[stage.block_list.length - 1], stage.block_list, player, stage);
        stage.addChild(stage.block_list[stage.block_list.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "function_d"));
        var bs = player.func_h[player.func_h.length - 1].expandFuncBlock(player.func_d_arg.length);
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player, stage);
        stage.addChild(player.func_h[player.func_h.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "function_d"));
        var bs = player.func_c[player.func_c.length - 1].expandFuncBlock(player.func_d_arg.length);
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player, stage);
        stage.addChild(player.func_c[player.func_c.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "function_d"));
        var bs = player.func_s[player.func_s.length - 1].expandFuncBlock(player.func_d_arg.length);
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player, stage);
        stage.addChild(player.func_s[player.func_s.length -1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "function_d"));
        var bs = player.func_d[player.func_d.length - 1].expandFuncBlock(player.func_d_arg.length);
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player, stage);
        stage.addChild(player.func_d[player.func_d.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
      }
      this.x = 330;
      this.y = 130;
    });

    player.arg1.addEventListener("touchend", function(e) {
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "arg1"));
        player.func_h[player.func_h.length - 1].func_name = "h";
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player, stage);
        player.arg_check(player.func_h_arg, "arg1");
        stage.addChild(player.func_h[player.func_h.length - 1]);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "arg1"));
        player.func_c[player.func_c.length - 1].func_name = "c";
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player, stage);
        player.arg_check(player.func_c_arg, "arg1");
        stage.addChild(player.func_c[player.func_c.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "arg1"));
        player.func_s[player.func_s.length - 1].func_name = "s";
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player, stage);
        player.arg_check(player.func_s_arg, "arg1");
        stage.addChild(player.func_s[player.func_s.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "arg1"));
        player.func_d[player.func_d.length - 1].func_name = "d";
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player, stage);
        player.arg_check(player.func_d_arg, "arg1");
        stage.addChild(player.func_d[player.func_d.length - 1]);
      }
      this.x = 330;
      this.y = 150;
    });

    player.arg2.addEventListener("touchend", function(e) {
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height 
      	&& this.checkArg1(player.func_h)) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "arg2"));
        player.func_h[player.func_h.length - 1].func_name = "h";
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player, stage);
        player.arg_check(player.func_h_arg, "arg2");
        stage.addChild(player.func_h[player.func_h.length - 1]);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height
      	&& this.checkArg1(player.func_c)) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "arg2"));
        player.func_c[player.func_c.length - 1].func_name = "c";
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player);
        player.arg_check(player.func_c_arg, "arg2");
        stage.addChild(player.func_c[player.func_c.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height
      	&& this.checkArg1(player.func_s)) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "arg2"));
        player.func_s[player.func_s.length - 1].func_name = "s";
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player, stage);
        player.arg_check(player.func_s_arg, "arg2");
        stage.addChild(player.func_s[player.func_s.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height
      	&& this.checkArg1(player.func_d)) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "arg2"));
        player.func_d[player.func_d.length - 1].func_name = "d";
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player, stage);
        player.arg_check(player.func_d_arg, "arg2");
        stage.addChild(player.func_d[player.func_d.length - 1]);
      }
      this.x = 330;
      this.y = 170;
    });

    player.arg3.addEventListener("touchend", function(e) {
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height
      	&& this.checkArg2(player.func_h)) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "arg3"));
        player.func_h[player.func_h.length - 1].func_name = "h";
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player, stage);
        player.arg_check(player.func_h_arg, "arg3");
        stage.addChild(player.func_h[player.func_h.length - 1]);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height
      	&& this.checkArg2(player.func_c)) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "arg3"));
        player.func_c[player.func_c.length - 1].func_name = "c";
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player, stage);
        player.arg_check(player.func_c_arg, "arg3");
        stage.addChild(player.func_c[player.func_c.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height
      	&& this.checkArg2(player.func_s)) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "arg3"));
        player.func_s[player.func_s.length - 1].func_name = "s";
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player, stage);
        player.arg_check(player.func_s_arg, "arg3");
        stage.addChild(player.func_s[player.func_s.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height
      	&& this.checkArg2(player.func_d)) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "arg3"));
        player.func_d[player.func_d.length - 1].func_name = "d";
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player, stage);
        player.arg_check(player.func_d_arg, "arg3");
        stage.addChild(player.func_d[player.func_d.length - 1]);
      }
      this.x = 330;
      this.y = 190;
    });

    player.forStart.addEventListener("touchend", function(e) {
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height) {
        this.moveBlock(stage.block_list);
        stage.block_list.push(new Block(stack_frame.x + 8, stage.block_list.length * 20 + 15, "forStart"));
        stage.block_list[stage.block_list.length - 1].loop_cnt = this.loop_cnt;
        var label = addLabel(stage.block_list[stage.block_list.length - 1], String(stage.block_list[stage.block_list.length - 1].loop_cnt));
        register_forBlock_eventListener(stage.block_list[stage.block_list.length - 1], stage.block_list, player, stage, label);
        stage.addChild(stage.block_list[stage.block_list.length - 1]);
        stage.addChild(label);
        register_loopCounter_eventListener(stage.block_list[stage.block_list.length - 1], label);
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "forStart"));
        player.func_h[player.func_h.length - 1].loop_cnt = this.loop_cnt;
        var label = addLabel(player.func_h[player.func_h.length - 1], String(player.func_h[player.func_h.length - 1].loop_cnt));
        register_forBlock_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player, stage, label);
        stage.addChild(player.func_h[player.func_h.length - 1]);
        stage.addChild(label);
        register_loopCounter_eventListener(player.func_h[player.func_h.length - 1], label);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "forStart"));
        player.func_c[player.func_c.length - 1].loop_cnt = this.loop_cnt;
        var label = addLabel(player.func_c[player.func_c.length - 1], String(player.func_c[player.func_c.length - 1].loop_cnt));
        register_forBlock_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player, stage, label);
        stage.addChild(player.func_c[player.func_c.length - 1]);
        stage.addChild(label);
        register_loopCounter_eventListener(player.func_c[player.func_c.length - 1], label);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "forStart"));
        player.func_s[player.func_s.length - 1].loop_cnt = this.loop_cnt;
        var label = addLabel(player.func_s[player.func_s.length - 1], String(player.func_s[player.func_s.length - 1].loop_cnt));
        register_forBlock_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player, stage, label);
        stage.addChild(player.func_s[player.func_s.length -1]);
        stage.addChild(label);
        register_loopCounter_eventListener(player.func_s[player.func_c.length - 1], label);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "forStart"));
        player.func_d[player.func_d.length - 1].loop_cnt = this.loop_cnt;
        var label = addLabel(player.func_d[player.func_d.length - 1], String(player.func_d[player.func_d.length - 1].loop_cnt));
        register_forBlock_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player, stage, label);
        stage.addChild(player.func_d[player.func_d.length - 1]);
        stage.addChild(label);
        register_loopCounter_eventListener(player.func_d[player.func_d.length - 1], label);
      }
      this.x = 330;
      this.y = 210;
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
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height 
        && this.checkForStart(stage.block_list)) {
        this.moveBlock(stage.block_list);
        stage.block_list.push(new Block(stack_frame.x + 8, stage.block_list.length * 20 + 15, "forEnd"));
        register_block_eventListener(stage.block_list[stage.block_list.length - 1], stage.block_list, player, stage);
        stage.addChild(stage.block_list[stage.block_list.length - 1]);
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height
        && this.checkForStart(player.func_h)) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "forEnd"));
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player, stage);
        stage.addChild(player.func_h[player.func_h.length - 1]);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height
        && this.checkForStart(player.func_c)) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "forEnd"));
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player, stage);
        stage.addChild(player.func_c[player.func_c.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height
        && this.checkForStart(player.func_s)) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "forEnd"));
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player, stage);
        stage.addChild(player.func_s[player.func_s.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height
        && this.checkForStart(player.func_d)) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "forEnd"));
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player, stage);
        stage.addChild(player.func_d[player.func_d.length - 1]);
      }
      this.x = 330;
      this.y = 230;
    });

    return stage;
  }

  core.start();
  // core.debug();
};
