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
    core.stageId = 0;
    var stage = titleScene();

    core.pushScene(stage);
  }

  core.field = function(clear, stage) {
    var scene = new Scene();
    var game_set_image = new Sprite(189, 97);
    if (clear && stage.clearFlag) {
      stage.clearFlag = false;
      game_set_image = core.assets["../img/clear.png"];
    } else {
      stage.clearFlag = false;
      game_set_image = core.assets["../img/end.png"];
    }
    register_replay_eventListener(game_set_image, core.stageId, clear);
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
            if (array[j].type == "arg1") {
              array[j].backgroundColor = "tomato";
            } else if (array[j].type == "arg2") {
              array[j].backgroundColor = "deepskyblue";
            } else if (array[j].type == "arg3") {
              array[j].backgroundColor = "greenyellow";
            } else {
              array[j].backgroundColor = "silver";
            }
          }
        } else {
          reset_block_color(scene.block_list);
          reset_block_color(player.func_h.func);
          reset_block_color(player.func_c.func);
          reset_block_color(player.func_s.func);
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
        if (this.type == "arg1" || this.type == "arg2" || this.type || "arg3") {
          var i = 0;
          if (this.func_name == "h") {
          	for (; i < player.func_h.func_arg.length; i++)
          	  if (player.func_h_arg[i] == this.type) {
          	  	player.func_h_arg.splice(i, 1);
          	  }
          } else if (this.func_name == "c") {
          	for (; i < player.func_c_arg.length; i++)
          	  if (player.func_c_arg[i] == this.type) 
          	  	player.func_c_arg.splice(i, 1);
          } else if (this.func_name == "s") {
          	for (; i < player.func_s_arg.length; i++)
          	  if (player.func_s_arg[i] == this.type) 
          	  	player.func_s_arg.splice(i, 1);
          } else if (this.func_name == "d") {
          	for (; i < player.func_d_arg.length; i++)
          	  if (player.func_d_arg[i] == this.type) 
          	  	player.func_d_arg.splice(i, 1);
          }
        }
      }
    });
  }

  register_forBlock_eventListener = function(block, array, player, scene, label) {
    block.addEventListener("touchstart", function() {
      if (selectFlag) {
        if (this.select) {
          reset_block_color(scene.block_list);
          reset_block_color(player.func_h.func);
          reset_block_color(player.func_c.func);
          reset_block_color(player.func_s.func);
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

  register_func_block_eventListener = function(block, array, player, scene, args) {
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
          reset_block_color(player.func_h.func);
          reset_block_color(player.func_c.func);
          reset_block_color(player.func_s.func);
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
        for (var i = args.length; i >= 0; i--) {
        	scene.removeChild(args[i]);
        } 
      }
    });
  }
/*
  searchBlock = function (block, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == block) return i;
    }
    return -1;
  }
  */

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
    });
  }

  register_replay_eventListener = function(img, id, flag) {
  	img.addEventListener("touchstart", function() {
  	  core.popScene();
  	  core.popScene();
  	  var scene = null;
  	  if (flag)
  	    scene = titleScene();
  	  else 
  	    scene = createStage(id);
  	  core.pushScene(scene);
  	});
  }

  reset_block_color = function(array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].type == "arg1") {
      	array[i].backgroundColor = "tomato";
      } else if (array[i].type == "arg2") {
      	array[i].backgroundColor = "deepskyblue";
      } else if (array[i].type ==  "arg3") {
      	array[i].backgroundColor = "greenyellow";
      } else {
        array[i].backgroundColor = "silver";
      }
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

  titleScene = function() {
  	var scene = new Scene();
  	// scene.backgroundColor = "red";
  	var title = new Label("アルゴロジック クローン");
  	title.height = 16;
  	title.width = 166;
  	title.x = (core.width / 2) - (title.width / 2);
  	title.y = 40;
  	var stage1 = new Label("stage 1");
  	stage1.height = 16;
  	stage1.width = 112;
  	stage1.x = (core.width / 4) - (stage1.width / 2);
  	stage1.y = core.height / 2;
  	var stage2 = new Label("stage 2");
  	stage2.height = 16;
  	stage2.width = 112;
  	stage2.x = (core.width * 3 / 4) - (stage2.width / 2);
  	stage2.y = core.height / 2;

  	stage1.addEventListener("touchstart", function() {
  		core.stageId = 1;
  		var stage = createStage(core.stageId);
  		core.popScene();
  		core.pushScene(stage);
  	});

  	stage2.addEventListener("touchstart", function() {
  	  core.stageId = 2;
  	  var stage = createStage(core.stageId);
  	  core.popScene();
  	  core.pushScene(stage);
  	})

  	scene.addChild(title);
  	scene.addChild(stage1);
  	scene.addChild(stage2);

  	return scene;
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
    stack_frame.y = 31;
    var funch_frame = new Sprite(32, 200);
    funch_frame.backgroundColor = "lightsteelblue";
    funch_frame.x = 412;
    funch_frame.y = 31;
    var h_label = new Sprite(16, 16);
    h_label.image = core.assets["../img/heart.png"];
    h_label.x = funch_frame.x + 8;
    h_label.y = 10;
    var funcc_frame = new Sprite(32, 200);
    funcc_frame.backgroundColor = "lightsteelblue";
    funcc_frame.x = 452;
    funcc_frame.y = 31;
    var c_label = new Sprite(16, 16);
    c_label.image = core.assets["../img/clover.png"];
    c_label.x = funcc_frame.x + 8;
    c_label.y = 10;
    var funcs_frame = new Sprite(32, 200);
    funcs_frame.backgroundColor = "lightsteelblue";
    funcs_frame.x = 494;
    funcs_frame.y = 31;
    var s_label = new Sprite(16, 16);
    s_label.image = core.assets["../img/spade.png"];
    s_label.x = funcs_frame.x + 8;
    s_label.y = 10;
    var funcd_frame = new Sprite(32, 200);
    funcd_frame.backgroundColor = "lightsteelblue";
    funcd_frame.x = 536;
    funcd_frame.y = 31;
    var d_label = new Sprite(16, 16);
    d_label.image = core.assets["../img/diamond.png"];
    d_label.x = funcd_frame.x + 8;
    d_label.y = 10;

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
    stage.clearFlag = true;
    // stage.block_list = [];

    stage.addChild(map);
    stage.addChild(stack_frame);
    stage.addChild(h_label);
    stage.addChild(funch_frame);
    stage.addChild(c_label);
    stage.addChild(funcc_frame);
    stage.addChild(s_label);
    stage.addChild(funcs_frame);
    stage.addChild(d_label);
    stage.addChild(funcd_frame);
    stage.addChild(goal);
    stage.addChild(player);
    stage.addChild(player.up);
    stage.addChild(player.left_rotate);
    stage.addChild(player.right_rotate);
    stage.addChild(player.func_h);
    stage.addChild(player.func_c);
    stage.addChild(player.func_s);
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
      if(player.block_list.length != 0) {
      	var time = this.play(player.block_list, player, stage, map, 0);
        setTimeout(function() {
          if (!stage.clearFlag) return;
          stage.clearFlag = false;
          if (player.before_block != null)
            player.before_block.backgroundColor = "silver";
          if (player.within(goal, 16)) {
          	var scene = core.field(true, stage);
            core.pushScene(scene);
          } else {
          	var scene = core.field(false, stage);
            core.pushScene(scene);
          }
          for (i = 0; i < player.block_list.length; i++)
            player.block_list[i].remove();
        }, time);
        player.block_list = [];
      }
    });

    select.addEventListener("touchstart", function(e) {
      if (selectFlag) {
        selectFlag = false;
        reset_block_color(player.block_list);
        reset_block_color(player.func_h.func);
        reset_block_color(player.func_c.func);
        reset_block_color(player.func_s.func);
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
          player.block_list.push(new Block(stack_frame.x + 8, player.block_list.length * 20 + stack_frame.y + 4, player.copy_list[i].type));
          if (player.block_list[player.block_list.length  - 1].type == "forStart") {
            player.block_list[player.block_list.length - 1].loop_cnt = player.copy_list[i].loop_cnt;
            var label = addLabel(player.block_list[player.block_list.length - 1], String(player.block_list[player.block_list.length - 1].loop_cnt));
            register_forBlock_eventListener(player.block_list[player.block_list.length - 1], player.block_list, player, stage, label);
            stage.addChild(player.block_list[player.block_list.length - 1]);
            stage.addChild(label);
          } else {
            register_block_eventListener(player.block_list[player.block_list.length - 1], player.block_list, player, stage);
            stage.addChild(player.block_list[player.block_list.length - 1]);
            stage.addChild(player.block_list[player.block_list.length - 1].label);
          }
        }
      }
    });

    funchCopy.addEventListener("touchstart", function(e) {
      if (player.copy_list.length != 0) {
        for (var i = 0; i < player.copy_list.length; i++) {
          player.func_h.func.push(new Block(funch_frame.x + 8, player.func_h.func.length * 20 + funch_frame.y + 4, player.copy_list[i].type));
          if (player.func_h.func[player.func_h.func.length - 1].type == "forStart") {
            player.func_h.func[player.func_h.func.length -1].loop_cnt = player.copy_list[i].loop_cnt;
            var label = addLabel(player.func_h.func[player.func_h.func.length -1], String(player.func_h.func[player.func_h.func.length - 1].loop_cnt));
            register_forBlock_eventListener(player.func_h.func[player.func_h.func.length - 1], player.func_h.func, player, stage, label);
            stage.addChild(player.func_h.func[player.func_h.func.length - 1]);
            stage.addChild(label);
          } else {
            register_block_eventListener(player.func_h.func[player.func_h.func.length - 1], player.func_h.func, player, stage);
            stage.addChild(player.func_h.func[player.func_h.func.length - 1]);
            stage.addChild(player.func_h.func[player.func_h.func.length - 1].label);
          }
        }
      }
    });

    funccCopy.addEventListener("touchstart", function(e) {
      if (player.copy_list.length != 0) {
        for (var i = 0; i < player.copy_list.length; i++) {
          player.func_c.func.push(new Block(funcc_frame.x + 8, player.func_c.func.length * 20 + funcc_frame.y + 4, player.copy_list[i].type));
          if (player.func_c.func[player.func_c.func.length - 1].type == "forStart") {
            player.func_c.func[player.func_c.func.length -1].loop_cnt = player.copy_list[i].loop_cnt;
            var label = addLabel(player.func_c.func[player.func_c.func.length -1], String(player.func_c.func[player.func_c.func.length - 1].loop_cnt));
            register_forBlock_eventListener(player.func_c.func[player.func_c.func.length - 1], player.func_c.func, player, stage, label);
            stage.addChild(player.func_c.func[player.func_c.func.length - 1]);
            stage.addChild(label);
          } else {
            register_block_eventListener(player.func_c.func[player.func_c.func.length - 1], player.func_c.func, player, stage);
            stage.addChild(player.func_c.func[player.func_c.func.length - 1]);
            stage.addChild(player.func_c.func[player.func_c.func.length - 1].label);
          }
        }
      }
    });

    funcsCopy.addEventListener("touchstart", function(e) {
      if (player.copy_list.length != 0) {
        for (var i = 0; i < player.copy_list.length; i++) {
          player.func_s.func.push(new Block(funcs_frame.x + 8, player.func_s.func.length * 20 + funcs_frame.y + 4, player.copy_list[i].type));
          if (player.func_s.func[player.func_s.func.length - 1].type == "forStart") {
            player.func_s.func[player.func_s.func.length -1].loop_cnt = player.copy_list[i].loop_cnt;
            var label = addLabel(player.func_s.func[player.func_s.func.length -1], String(player.func_s.func[player.func_s.func.length - 1].loop_cnt));
            register_forBlock_eventListener(player.func_s.func[player.func_s.func.length - 1], player.func_s.func, player, stage, label);
            stage.addChild(player.func_s.func[player.func_s.func.length - 1]);
            stage.addChild(label);
          } else {
            register_block_eventListener(player.func_s.func[player.func_s.func.length - 1], player.func_s.func, player, stage);
            stage.addChild(player.func_s.func[player.func_s.func.length - 1]);
            stage.addChild(player.func_s.func[player.func_s.func.length - 1].label);
          }
        }
      }
    });

    funcdCopy.addEventListener("touchstart", function(e) {
      if (player.copy_list.length != 0) {
        for (var i = 0; i < player.copy_list.length; i++) {
          player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + funcd_frame.y + 4, player.copy_list[i].type));
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
    /*
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
    */

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

    player.up.register_set_eventListener(player.block_list, stack_frame, stage, player);
    player.up.register_set_eventListener(player.func_h.func, funch_frame, stage, player);
    player.up.register_set_eventListener(player.func_c.func, funcc_frame, stage, player);
    player.up.register_set_eventListener(player.func_s.func, funcs_frame, stage, player);
    player.up.register_set_eventListener(player.func_d, funcd_frame, stage, player);

    player.left_rotate.register_set_eventListener(player.block_list, stack_frame, stage, player);
    player.left_rotate.register_set_eventListener(player.func_h.func, funch_frame, stage, player);
    player.left_rotate.register_set_eventListener(player.func_c.func, funcc_frame, stage, player);
    player.left_rotate.register_set_eventListener(player.func_s.func, funcs_frame, stage, player);
    player.left_rotate.register_set_eventListener(player.func_d, funcd_frame, stage, player);

    player.right_rotate.register_set_eventListener(player.block_list, stack_frame, stage, player);
    player.right_rotate.register_set_eventListener(player.func_h.func, funch_frame, stage, player);
    player.right_rotate.register_set_eventListener(player.func_c.func, funcc_frame, stage, player);
    player.right_rotate.register_set_eventListener(player.func_s.func, funcs_frame, stage, player);
    player.right_rotate.register_set_eventListener(player.func_d, funcd_frame, stage, player);

    player.func_h.register_set_eventListener(player.block_list, stack_frame, stage, player);
    player.func_h.register_set_eventListener(player.func_h.func, funch_frame, stage, player);
    player.func_h.register_set_eventListener(player.func_c.func, funcc_frame, stage, player);
    player.func_h.register_set_eventListener(player.func_s.func, funcs_frame, stage, player);
    player.func_h.register_set_eventListener(player.func_d, funcd_frame, stage, player);

    player.func_c.register_set_eventListener(player.block_list, stack_frame, stage, player);
    player.func_c.register_set_eventListener(player.func_h.func, funch_frame, stage, player);
    player.func_c.register_set_eventListener(player.func_c.func, funcc_frame, stage, player);
    player.func_c.register_set_eventListener(player.func_s.func, funcs_frame, stage, player);
    player.func_c.register_set_eventListener(player.func_d, funcd_frame, stage, player);

    player.func_s.register_set_eventListener(player.block_list, stack_frame, stage, player);
    player.func_s.register_set_eventListener(player.func_h.func, funch_frame, stage, player);
    player.func_s.register_set_eventListener(player.func_c.func, funcc_frame, stage, player);
    player.func_s.register_set_eventListener(player.func_s.func, funcs_frame, stage, player);
    player.func_s.register_set_eventListener(player.func_d, funcd_frame, stage, player);

    /*
    player.funch.addEventListener("touchend", function(e) {
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height) {
        this.moveBlock(player.block_list);
        player.block_list.push(new Block(stack_frame.x + 8, player.block_list.length * 20 + stack_frame.y + 4, "function_h"));
        var bs = player.block_list[player.block_list.length - 1].expandFuncBlock(player.func_h.func_arg.length);
        stage.addChild(player.block_list[player.block_list.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
        register_func_block_eventListener(player.block_list[player.block_list.length - 1], player.block_list, player, stage, bs);
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h.func);
        player.func_h.func.push(new Block(funch_frame.x + 8, player.func_h.func.length * 20 + funch_frame.y + 4, "function_h"));
        var bs = player.func_h.func[player.func_h.func.length - 1].expandFuncBlock(player.func_h.func_arg.length);
        stage.addChild(player.func_h.func[player.func_h.func.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
        register_func_block_eventListener(player.func_h.func[player.func_h.func.length - 1], player.func_h.func, player, stage, bs);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c.func);
        player.func_c.func.push(new Block(funcc_frame.x + 8, player.func_c.func.length * 20 + funcc_frame.y + 4, "function_h"));
        var bs = player.func_c.func[player.func_c.func.length - 1].expandFuncBlock(player.func_h.func_arg.length);
        stage.addChild(player.func_c.func[player.func_c.func.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
        register_func_block_eventListener(player.func_c.func[player.func_c.func.length - 1], player.func_c.func, player, stage, bs);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s.func);
        player.func_s.func.push(new Block(funcs_frame.x + 8, player.func_s.func.length * 20 + funcs_frame.y + 4, "function_h"));
        var bs = player.func_s.func[player.func_s.func.length - 1].expandFuncBlock(player.func_h.func_arg.length);
        stage.addChild(player.func_s.func[player.func_s.func.length -1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
        register_func_block_eventListener(player.func_s.func[player.func_s.func.length - 1], player.func_s.func, player, stage, bs);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + funcd_frame.y + 4, "function_h"));
        var bs = player.func_d[player.func_d.length - 1].expandFuncBlock(player.func_h.func_arg.length);
        stage.addChild(player.func_d[player.func_d.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
        register_func_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player, stage, bs);
      }
      this.x = 330;
      this.y = 70;
    });
    */

    /*
    player.funcc.addEventListener("touchend", function(e) {
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height) {
        this.moveBlock(player.block_list);
        player.block_list.push(new Block(stack_frame.x + 8, player.block_list.length * 20 + stack_frame.y + 4, "function_c"));
        var bs = player.block_list[player.block_list.length - 1].expandFuncBlock(player.func_c.func_arg.length);
        stage.addChild(player.block_list[player.block_list.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
        register_func_block_eventListener(player.block_list[player.block_list.length - 1], player.block_list, player, stage, bs);
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h.func);
        player.func_h.func.push(new Block(funch_frame.x + 8, player.func_h.func.length * 20 + funch_frame.y + 4, "function_c"));
        var bs = player.func_h.func[player.func_h.func.length - 1].expandFuncBlock(player.func_c.func_arg.length);
        stage.addChild(player.func_h.func[player.func_h.func.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
        register_func_block_eventListener(player.func_h.func[player.func_h.func.length - 1], player.func_h.func, player, stage, bs);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c.func);
        player.func_c.func.push(new Block(funcc_frame.x + 8, player.func_c.func.length * 20 + funcc_frame.y + 4, "function_c"));
        var bs = player.func_c.func[player.func_c.func.length - 1].expandFuncBlock(player.func_c.func_arg.length);
        stage.addChild(player.func_c.func[player.func_c.func.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
        register_func_block_eventListener(player.func_c.func[player.func_c.func.length - 1], player.func_c.func, player, stage, bs);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s.func);
        player.func_s.func.push(new Block(funcs_frame.x + 8, player.func_s.func.length * 20 + funcs_frame.y + 4, "function_c"));
        var bs = player.func_s.func[player.func_s.func.length - 1].expandFuncBlock(player.func_c.func_arg.length);
        stage.addChild(player.func_s.func[player.func_s.func.length -1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
        register_func_block_eventListener(player.func_s.func[player.func_s.func.length - 1], player.func_s.func, player, stage, bs);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + funcd_frame.y + 4, "function_c"));
        var bs = player.func_d[player.func_d.length - 1].expandFuncBlock(player.func_c.func_arg.length);
        stage.addChild(player.func_d[player.func_d.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
        register_func_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player, stage, bs);
      }
      this.x = 330;
      this.y = 90;
    });
    player.funcs.addEventListener("touchend", function(e) {
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height) {
        this.moveBlock(player.block_list);
        player.block_list.push(new Block(stack_frame.x + 8, player.block_list.length * 20 + stack_frame.y + 4, "function_s"));
        var bs = player.block_list[player.block_list.length - 1].expandFuncBlock(player.func_s.func_arg.length);
        stage.addChild(player.block_list[player.block_list.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
        register_func_block_eventListener(player.block_list[player.block_list.length - 1], player.block_list, player, stage, bs);
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h.func);
        player.func_h.func.push(new Block(funch_frame.x + 8, player.func_h.func.length * 20 + funch_frame.y + 4, "function_s"));
        var bs = player.func_h.func[player.func_h.func.length - 1].expandFuncBlock(player.func_s.func_arg.length);
        stage.addChild(player.func_h.func[player.func_h.func.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
        register_func_block_eventListener(player.func_h.func[player.func_h.func.length - 1], player.func_h.func, player, stage, bs);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c.func);
        player.func_c.func.push(new Block(funcc_frame.x + 8, player.func_c.func.length * 20 + funcc_frame.y + 4, "function_s"));
        var bs = player.func_c.func[player.func_c.func.length - 1].expandFuncBlock(player.func_s.func_arg.length);
        stage.addChild(player.func_c.func[player.func_c.func.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
        register_func_block_eventListener(player.func_c.func[player.func_c.func.length - 1], player.func_c.func, player, stage, bs);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s.func);
        player.func_s.func.push(new Block(funcs_frame.x + 8, player.func_s.func.length * 20 + funcs_frame.y + 4, "function_s"));
        var bs = player.func_s.func[player.func_s.func.length - 1].expandFuncBlock(player.func_s.func_arg.length);
        stage.addChild(player.func_s.func[player.func_s.func.length -1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
        register_func_block_eventListener(player.func_s.func[player.func_s.func.length - 1], player.func_s.func, player, stage, bs);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + funcd_frame.y + 4, "function_s"));
        var bs = player.func_d[player.func_d.length - 1].expandFuncBlock(player.func_s.func_arg.length);
        stage.addChild(player.func_d[player.func_d.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
        register_func_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player, stage, bs);
      }
      this.x = 330;
      this.y = 110;
    });
    */

    player.funcd.addEventListener("touchend", function(e) {
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height) {
        this.moveBlock(player.block_list);
        player.block_list.push(new Block(stack_frame.x + 8, player.block_list.length * 20 + stack_frame.y + 4, "function_d"));
        var bs = player.block_list[player.block_list.length - 1].expandFuncBlock(player.func_d_arg.length);
        stage.addChild(player.block_list[player.block_list.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
        register_func_block_eventListener(player.block_list[player.block_list.length - 1], player.block_list, player, stage, bs);
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h.func);
        player.func_h.func.push(new Block(funch_frame.x + 8, player.func_h.func.length * 20 + funch_frame.y + 4, "function_d"));
        var bs = player.func_h.func[player.func_h.func.length - 1].expandFuncBlock(player.func_d_arg.length);
        stage.addChild(player.func_h.func[player.func_h.func.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
        register_func_block_eventListener(player.func_h.func[player.func_h.func.length - 1], player.func_h.func, player, stage, bs);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c.func);
        player.func_c.func.push(new Block(funcc_frame.x + 8, player.func_c.func.length * 20 + funcc_frame.y + 4, "function_d"));
        var bs = player.func_c.func[player.func_c.func.length - 1].expandFuncBlock(player.func_d_arg.length);
        stage.addChild(player.func_c.func[player.func_c.func.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
        register_func_block_eventListener(player.func_c.func[player.func_c.func.length - 1], player.func_c.func, player, stage, bs);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s.func);
        player.func_s.func.push(new Block(funcs_frame.x + 8, player.func_s.func.length * 20 + funcs_frame.y + 4, "function_d"));
        var bs = player.func_s.func[player.func_s.func.length - 1].expandFuncBlock(player.func_d_arg.length);
        stage.addChild(player.func_s.func[player.func_s.func.length -1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
        register_func_block_eventListener(player.func_s.func[player.func_s.func.length - 1], player.func_s.func, player, stage, bs);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + funcd_frame.y + 4, "function_d"));
        var bs = player.func_d[player.func_d.length - 1].expandFuncBlock(player.func_d_arg.length);
        stage.addChild(player.func_d[player.func_d.length - 1]);
        for (var i = 0; i < bs.length; i++) {
        	stage.addChild(bs[i]);
        }
        register_func_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player, stage, bs);
      }
      this.x = 330;
      this.y = 130;
    });

    player.arg1.addEventListener("touchend", function(e) {
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h.func);
        player.func_h.func.push(new Block(funch_frame.x + 8, player.func_h.func.length * 20 + funch_frame.y + 4, "arg1"));
        player.func_h.func[player.func_h.func.length - 1].func_name = "h";
        register_block_eventListener(player.func_h.func[player.func_h.func.length - 1], player.func_h.func, player, stage);
        player.arg_check(player.func_h.func_arg, "arg1");
        stage.addChild(player.func_h.func[player.func_h.func.length - 1]);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c.func);
        player.func_c.func.push(new Block(funcc_frame.x + 8, player.func_c.func.length * 20 + funcc_frame.y + 4, "arg1"));
        player.func_c.func[player.func_c.func.length - 1].func_name = "c";
        register_block_eventListener(player.func_c.func[player.func_c.func.length - 1], player.func_c.func, player, stage);
        player.arg_check(player.func_c.func_arg, "arg1");
        stage.addChild(player.func_c.func[player.func_c.func.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s.func);
        player.func_s.func.push(new Block(funcs_frame.x + 8, player.func_s.func.length * 20 + funcs_frame.y + 4, "arg1"));
        player.func_s.func[player.func_s.func.length - 1].func_name = "s";
        register_block_eventListener(player.func_s.func[player.func_s.func.length - 1], player.func_s.func, player, stage);
        player.arg_check(player.func_s.func_arg, "arg1");
        stage.addChild(player.func_s.func[player.func_s.func.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + funcd_frame.y + 4, "arg1"));
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
      	&& this.checkArg1(player.func_h.func)) {
        this.moveBlock(player.func_h.func);
        player.func_h.func.push(new Block(funch_frame.x + 8, player.func_h.func.length * 20 + funch_frame.y + 4, "arg2"));
        player.func_h.func[player.func_h.func.length - 1].func_name = "h";
        register_block_eventListener(player.func_h.func[player.func_h.func.length - 1], player.func_h.func, player, stage);
        player.arg_check(player.func_h.func_arg, "arg2");
        stage.addChild(player.func_h.func[player.func_h.func.length - 1]);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height
      	&& this.checkArg1(player.func_c.func)) {
        this.moveBlock(player.func_c.func);
        player.func_c.func.push(new Block(funcc_frame.x + 8, player.func_c.func.length * 20 + funcc_frame.y + 4, "arg2"));
        player.func_c.func[player.func_c.func.length - 1].func_name = "c";
        register_block_eventListener(player.func_c.func[player.func_c.func.length - 1], player.func_c.func, player, stage);
        player.arg_check(player.func_c.func_arg, "arg2");
        stage.addChild(player.func_c.func[player.func_c.func.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height
      	&& this.checkArg1(player.func_s.func)) {
        this.moveBlock(player.func_s.func);
        player.func_s.func.push(new Block(funcs_frame.x + 8, player.func_s.func.length * 20 + funcs_frame.y + 4, "arg2"));
        player.func_s.func[player.func_s.func.length - 1].func_name = "s";
        register_block_eventListener(player.func_s.func[player.func_s.func.length - 1], player.func_s.func, player, stage);
        player.arg_check(player.func_s.func_arg, "arg2");
        stage.addChild(player.func_s.func[player.func_s.func.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height
      	&& this.checkArg1(player.func_d)) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + funcd_frame.y + 4, "arg2"));
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
      	&& this.checkArg2(player.func_h.func)) {
        this.moveBlock(player.func_h.func);
        player.func_h.func.push(new Block(funch_frame.x + 8, player.func_h.func.length * 20 + funch_frame.y + 4, "arg3"));
        player.func_h.func[player.func_h.func.length - 1].func_name = "h";
        register_block_eventListener(player.func_h.func[player.func_h.func.length - 1], player.func_h.func, player, stage);
        player.arg_check(player.func_h.func_arg, "arg3");
        stage.addChild(player.func_h.func[player.func_h.func.length - 1]);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height
      	&& this.checkArg2(player.func_c.func)) {
        this.moveBlock(player.func_c.func);
        player.func_c.func.push(new Block(funcc_frame.x + 8, player.func_c.func.length * 20 + funcc_frame.y + 4, "arg3"));
        player.func_c.func[player.func_c.func.length - 1].func_name = "c";
        register_block_eventListener(player.func_c.func[player.func_c.func.length - 1], player.func_c.func, player, stage);
        player.arg_check(player.func_c.func_arg, "arg3");
        stage.addChild(player.func_c.func[player.func_c.func.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height
      	&& this.checkArg2(player.func_s.func)) {
        this.moveBlock(player.func_s.func);
        player.func_s.func.push(new Block(funcs_frame.x + 8, player.func_s.func.length * 20 + funcs_frame.y + 4, "arg3"));
        player.func_s.func[player.func_s.func.length - 1].func_name = "s";
        register_block_eventListener(player.func_s.func[player.func_s.func.length - 1], player.func_s.func, player, stage);
        player.arg_check(player.func_s.func_arg, "arg3");
        stage.addChild(player.func_s.func[player.func_s.func.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height
      	&& this.checkArg2(player.func_d)) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + funcd_frame.y + 4, "arg3"));
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
        this.moveBlock(player.block_list);
        player.block_list.push(new Block(stack_frame.x + 8, player.block_list.length * 20 + stack_frame.y + 4, "forStart"));
        player.block_list[player.block_list.length - 1].loop_cnt = this.loop_cnt;
        var label = addLabel(player.block_list[player.block_list.length - 1], String(player.block_list[player.block_list.length - 1].loop_cnt));
        register_forBlock_eventListener(player.block_list[player.block_list.length - 1], player.block_list, player, stage, label);
        stage.addChild(player.block_list[player.block_list.length - 1]);
        stage.addChild(label);
        register_loopCounter_eventListener(player.block_list[player.block_list.length - 1], label);
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h.func);
        player.func_h.func.push(new Block(funch_frame.x + 8, player.func_h.func.length * 20 + funch_frame.y + 4, "forStart"));
        player.func_h.func[player.func_h.func.length - 1].loop_cnt = this.loop_cnt;
        var label = addLabel(player.func_h.func[player.func_h.func.length - 1], String(player.func_h.func[player.func_h.func.length - 1].loop_cnt));
        register_forBlock_eventListener(player.func_h.func[player.func_h.func.length - 1], player.func_h.func, player, stage, label);
        stage.addChild(player.func_h.func[player.func_h.func.length - 1]);
        stage.addChild(label);
        register_loopCounter_eventListener(player.func_h.func[player.func_h.func.length - 1], label);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c.func);
        player.func_c.func.push(new Block(funcc_frame.x + 8, player.func_c.func.length * 20 + funcc_frame.y + 4, "forStart"));
        player.func_c.func[player.func_c.func.length - 1].loop_cnt = this.loop_cnt;
        var label = addLabel(player.func_c.func[player.func_c.func.length - 1], String(player.func_c.func[player.func_c.func.length - 1].loop_cnt));
        register_forBlock_eventListener(player.func_c.func[player.func_c.func.length - 1], player.func_c.func, player, stage, label);
        stage.addChild(player.func_c.func[player.func_c.func.length - 1]);
        stage.addChild(label);
        register_loopCounter_eventListener(player.func_c.func[player.func_c.func.length - 1], label);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s.func);
        player.func_s.func.push(new Block(funcs_frame.x + 8, player.func_s.func.length * 20 + funcs_frame.y + 4, "forStart"));
        player.func_s.func[player.func_s.func.length - 1].loop_cnt = this.loop_cnt;
        var label = addLabel(player.func_s.func[player.func_s.func.length - 1], String(player.func_s.func[player.func_s.func.length - 1].loop_cnt));
        register_forBlock_eventListener(player.func_s.func[player.func_s.func.length - 1], player.func_s.func, player, stage, label);
        stage.addChild(player.func_s.func[player.func_s.func.length -1]);
        stage.addChild(label);
        register_loopCounter_eventListener(player.func_s.func[player.func_s.func.length - 1], label);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + funcd_frame.y + 4, "forStart"));
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
        && this.checkForStart(player.block_list)) {
        this.moveBlock(player.block_list);
        player.block_list.push(new Block(stack_frame.x + 8, player.block_list.length * 20 + stack_frame.y + 4, "forEnd"));
        register_block_eventListener(player.block_list[player.block_list.length - 1], player.block_list, player, stage);
        stage.addChild(player.block_list[player.block_list.length - 1]);
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height
        && this.checkForStart(player.func_h.func)) {
        this.moveBlock(player.func_h.func);
        player.func_h.func.push(new Block(funch_frame.x + 8, player.func_h.func.length * 20 + funch_frame.y + 4, "forEnd"));
        register_block_eventListener(player.func_h.func[player.func_h.func.length - 1], player.func_h.func, player, stage);
        stage.addChild(player.func_h.func[player.func_h.func.length - 1]);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height
        && this.checkForStart(player.func_c.func)) {
        this.moveBlock(player.func_c.func);
        player.func_c.func.push(new Block(funcc_frame.x + 8, player.func_c.func.length * 20 + funcc_frame.y + 4, "forEnd"));
        register_block_eventListener(player.func_c.func[player.func_c.func.length - 1], player.func_c.func, player, stage);
        stage.addChild(player.func_c.func[player.func_c.func.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height
        && this.checkForStart(player.func_s.func)) {
        this.moveBlock(player.func_s.func);
        player.func_s.func.push(new Block(funcs_frame.x + 8, player.func_s.func.length * 20 + funcs_frame.y + 4, "forEnd"));
        register_block_eventListener(player.func_s.func[player.func_s.func.length - 1], player.func_s.func, player, stage);
        stage.addChild(player.func_s.func[player.func_s.func.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height
        && this.checkForStart(player.func_d)) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + funcd_frame.y + 4, "forEnd"));
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
