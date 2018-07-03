enchant();

window.onload = function() {
  var selectFlag = false;
  core = new Core(600, 320);
  core.fps = 60;
  core.preload("../img/chara5.png", "../img/map0.gif", "../img/goal.png", "../img/clear.png",
               "../img/end.png", "../img/up.png", "../img/left.png", "../img/right.png",
               "../img/loop_start.png", "../img/loop_end.png",
               "../img/heart.png", "../img/spade.png", "../img/diamond.png", "../img/clover.png");

  core.onload = function() {
    /* map initialize */
    // var backgroundMap = addMap1(core.assets["../img/map0.gif"]);
    var backgroundMap = addMap2(core.assets["../img/map0.gif"]);
    var block_list = [];

    /* goal initialize */
    var goal = new Goal(backgroundMap.goalX, backgroundMap.goalY, core.assets["../img/goal.png"]);

    /* player initialize */
    var player = new Player(backgroundMap.initializeX, backgroundMap.initializeY, backgroundMap.direction);

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

    core.rootScene.addChild(backgroundMap);
    core.rootScene.addChild(stack_frame);
    core.rootScene.addChild(funch_frame);
    core.rootScene.addChild(funcc_frame);
    core.rootScene.addChild(funcs_frame);
    core.rootScene.addChild(funcd_frame);
    core.rootScene.addChild(goal);
    core.rootScene.addChild(player);
    core.rootScene.addChild(player.up);
    core.rootScene.addChild(player.leftRotate);
    core.rootScene.addChild(player.rightRotate);
    core.rootScene.addChild(player.funch);
    core.rootScene.addChild(player.funch.label);
    core.rootScene.addChild(player.funcc);
    core.rootScene.addChild(player.funcc.label);
    core.rootScene.addChild(player.funcs);
    core.rootScene.addChild(player.funcs.label);
    core.rootScene.addChild(player.funcd);
    core.rootScene.addChild(player.funcd.label);
    core.rootScene.addChild(player.arg1);
    core.rootScene.addChild(player.arg2);
    core.rootScene.addChild(player.arg3);
    core.rootScene.addChild(player.forStart);
    core.rootScene.addChild(loop);
    core.rootScene.addChild(player.forEnd);
    core.rootScene.addChild(play);
    core.rootScene.addChild(exeCopy);
    core.rootScene.addChild(funchCopy);
    core.rootScene.addChild(funccCopy);
    core.rootScene.addChild(funcsCopy);
    core.rootScene.addChild(funcdCopy);
    core.rootScene.addChild(select);

    play.addEventListener("touchstart", function(e) {
      if(block_list.length != 0) {
      	var time = this.play(block_list, player, core, backgroundMap, 0);
        setTimeout(function() {
          if (player.within(goal, 16))
            core.replaceScene(core.field(true));
          else
            core.replaceScene(core.field(false));
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
          block_list.push(new Block(stack_frame.x + 8, block_list.length * 20 + 15, player.copy_list[i].type));
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

    funchCopy.addEventListener("touchstart", function(e) {
      if (player.copy_list.length != 0) {
        for (var i = 0; i < player.copy_list.length; i++) {
          player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, player.copy_list[i].type));
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

    funccCopy.addEventListener("touchstart", function(e) {
      if (player.copy_list.length != 0) {
        for (var i = 0; i < player.copy_list.length; i++) {
          player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, player.copy_list[i].type));
          if (player.func_c[player.func_c.length - 1].type == "forStart") {
            player.func_c[player.func_c.length -1].loop_cnt = player.copy_list[i].loop_cnt;
            var label = addLabel(player.func_c[player.func_c.length -1], String(player.func_c[player.func_c.length - 1].loop_cnt));
            register_forBlock_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player, label);
            core.rootScene.addChild(player.func_c[player.func_c.length - 1]);
            core.rootScene.addChild(label);
          } else {
            register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player);
            core.rootScene.addChild(player.func_c[player.func_c.length - 1]);
            core.rootScene.addChild(player.func_c[player.func_c.length - 1].label);
          }
        }
        // console.log(player.func_h);
        /*
        console.log(player.copy_list);
        console.log("funcCopy");
        */
      }
    });

    funcsCopy.addEventListener("touchstart", function(e) {
      if (player.copy_list.length != 0) {
        for (var i = 0; i < player.copy_list.length; i++) {
          player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, player.copy_list[i].type));
          if (player.func_s[player.func_s.length - 1].type == "forStart") {
            player.func_s[player.func_s.length -1].loop_cnt = player.copy_list[i].loop_cnt;
            var label = addLabel(player.func_s[player.func_s.length -1], String(player.func_s[player.func_s.length - 1].loop_cnt));
            register_forBlock_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player, label);
            core.rootScene.addChild(player.func_s[player.func_s.length - 1]);
            core.rootScene.addChild(label);
          } else {
            register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player);
            core.rootScene.addChild(player.func_s[player.func_s.length - 1]);
            core.rootScene.addChild(player.func_s[player.func_s.length - 1].label);
          }
        }
        // console.log(player.func_h);
        /*
        console.log(player.copy_list);
        console.log("funcCopy");
        */
      }
    });

    funcdCopy.addEventListener("touchstart", function(e) {
      if (player.copy_list.length != 0) {
        for (var i = 0; i < player.copy_list.length; i++) {
          player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, player.copy_list[i].type));
          if (player.func_d[player.func_d.length - 1].type == "forStart") {
            player.func_d[player.func_d.length -1].loop_cnt = player.copy_list[i].loop_cnt;
            var label = addLabel(player.func_d[player.func_d.length -1], String(player.func_d[player.func_d.length - 1].loop_cnt));
            register_forBlock_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player, label);
            core.rootScene.addChild(player.func_d[player.func_d.length - 1]);
            core.rootScene.addChild(label);
          } else {
            register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player);
            core.rootScene.addChild(player.func_d[player.func_d.length - 1]);
            core.rootScene.addChild(player.func_d[player.func_d.length - 1].label);
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
      this.label.x = this.x;
      this.label.y = this.y;
    });

    player.funcc.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
      this.label.x = this.x;
      this.label.y = this.y;
    });

    player.funcs.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
      this.label.x = this.x;
      this.label.y = this.y;
    });

    player.funcd.addEventListener("touchmove", function(e) {
      this.x = e.x;
      this.y = e.y;
      this.label.x = this.x;
      this.label.y = this.y;
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
        this.moveBlock(block_list);
        block_list.push(new Block(stack_frame.x + 8, block_list.length * 20 + 15, "up"));
        register_block_eventListener(block_list[block_list.length - 1], block_list, player);
        core.rootScene.addChild(block_list[block_list.length - 1]);
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "up"));
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1]);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "up"));
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player);
        core.rootScene.addChild(player.func_c[player.func_c.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "up"));
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player);
        core.rootScene.addChild(player.func_s[player.func_s.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "up"));
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player);
        core.rootScene.addChild(player.func_d[player.func_d.length - 1]);
      }
      this.x = 330;
      this.y = 10;
    });


    player.leftRotate.addEventListener("touchend", function(e) {
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height) {
        this.moveBlock(block_list);
        block_list.push(new Block(stack_frame.x + 8, block_list.length * 20 + 15, "leftRotate"));
        register_block_eventListener(block_list[block_list.length - 1], block_list, player);
        core.rootScene.addChild(block_list[block_list.length - 1]);
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "leftRotate"));
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1]);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "leftRotate"));
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player);
        core.rootScene.addChild(player.func_c[player.func_c.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "leftRotate"));
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player);
        core.rootScene.addChild(player.func_s[player.func_s.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "leftRotate"));
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player);
        core.rootScene.addChild(player.func_d[player.func_d.length - 1]);
      }
      this.x = 330;
      this.y = 30;
    });

    player.rightRotate.addEventListener("touchend", function(e) {
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height) {
        this.moveBlock(block_list);
        block_list.push(new Block(stack_frame.x + 8, block_list.length * 20 + 15, "rightRotate"));
        register_block_eventListener(block_list[block_list.length - 1], block_list, player);
        core.rootScene.addChild(block_list[block_list.length - 1]);
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "rightRotate"));
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1]);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "rightRotate"));
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player);
        core.rootScene.addChild(player.func_c[player.func_c.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "rightRotate"));
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player);
        core.rootScene.addChild(player.func_s[player.func_s.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "rightRotate"));
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player);
        core.rootScene.addChild(player.func_d[player.func_d.length - 1]);
      }
      this.x = 330;
      this.y = 50;
    });

    player.funch.addEventListener("touchend", function(e) {
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height) {
        this.moveBlock(block_list);
        block_list.push(new Block(stack_frame.x + 8, block_list.length * 20 + 15, "function_h"));
        block_list[block_list.length - 1].expandFuncBlock(player.func_h_arg.length);
        register_block_eventListener(block_list[block_list.length - 1], block_list, player);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "function_h"));
        player.func_h[player.func_h.length - 1].expandFuncBlock(player.func_h_arg.length);
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1]);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1].label);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "function_h"));
        player.func_c[player.func_c.length - 1].expandFuncBlock(player.func_h_arg.length);
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player);
        core.rootScene.addChild(player.func_c[player.func_c.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "function_h"));
        player.func_s[player.func_s.length - 1].expandFuncBlock(player.func_h_arg.length);
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player);
        core.rootScene.addChild(player.func_s[player.func_s.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "function_h"));
        player.func_d[player.func_d.length - 1].expandFuncBlock(player.func_h_arg.length);
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player);
        core.rootScene.addChild(player.func_d[player.func_d.length - 1]);
      }
      this.x = 330;
      this.y = 70;
      this.label.x = this.x;
      this.label.y = this.y;
    });

    player.funcc.addEventListener("touchend", function(e) {
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height) {
        this.moveBlock(block_list);
        block_list.push(new Block(stack_frame.x + 8, block_list.length * 20 + 15, "function_c"));
        block_list[block_list.length - 1].expandFuncBlock(player.func_c_arg.length);
        register_block_eventListener(block_list[block_list.length - 1], block_list, player);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "function_c"));
        player.func_h[player.func_h.length - 1].expandFuncBlock(player.func_c_arg.length);
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1]);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1].label);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "function_c"));
        player.func_c[player.func_c.length - 1].expandFuncBlock(player.func_c_arg.length);
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player);
        core.rootScene.addChild(player.func_c[player.func_c.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "function_c"));
        player.func_s[player.func_s.length - 1].expandFuncBlock(player.func_c_arg.length);
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player);
        core.rootScene.addChild(player.func_s[player.func_s.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "function_c"));
        player.func_d[player.func_d.length - 1].expandFuncBlock(player.func_c_arg.length);
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player);
        core.rootScene.addChild(player.func_d[player.func_d.length - 1]);
      }
      this.x = 330;
      this.y = 90;
      this.label.x = this.x;
      this.label.y = this.y;
    });

    player.funcs.addEventListener("touchend", function(e) {
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height) {
        this.moveBlock(block_list);
        block_list.push(new Block(stack_frame.x + 8, block_list.length * 20 + 15, "function_s"));
        block_list[block_list.length - 1].expandFuncBlock(player.func_s_arg.length);
        register_block_eventListener(block_list[block_list.length - 1], block_list, player);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "function_s"));
        player.func_h[player.func_h.length - 1].expandFuncBlock(player.func_s_arg.length);
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1]);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1].label);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "function_s"));
        player.func_c[player.func_c.length - 1].expandFuncBlock(player.func_s_arg.length);
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player);
        core.rootScene.addChild(player.func_c[player.func_c.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "function_s"));
        player.func_s[player.func_s.length - 1].expandFuncBlock(player.func_s_arg.length);
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player);
        core.rootScene.addChild(player.func_s[player.func_s.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "function_s"));
        player.func_d[player.func_d.length - 1].expandFuncBlock(player.func_s_arg.length);
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player);
        core.rootScene.addChild(player.func_d[player.func_d.length - 1]);
      }
      this.x = 330;
      this.y = 110;
      this.label.x = this.x;
      this.label.y = this.y;
    });

    player.funcd.addEventListener("touchend", function(e) {
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height) {
        this.moveBlock(block_list);
        block_list.push(new Block(stack_frame.x + 8, block_list.length * 20 + 15, "function_d"));
        block_list[block_list.length - 1].expandFuncBlock(player.func_d_arg.length);
        register_block_eventListener(block_list[block_list.length - 1], block_list, player);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(block_list[block_list.length - 1].label);
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "function_d"));
        player.func_h[player.func_h.length - 1].expandFuncBlock(player.func_d_arg.length);
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1]);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1].label);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "function_d"));
        player.func_c[player.func_c.length - 1].expandFuncBlock(player.func_d_arg.length);
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player);
        core.rootScene.addChild(player.func_c[player.func_c.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "function_d"));
        player.func_s[player.func_s.length - 1].expandFuncBlock(player.func_d_arg.length);
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player);
        core.rootScene.addChild(player.func_s[player.func_s.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "function_d"));
        player.func_d[player.func_d.length - 1].expandFuncBlock(player.func_d_arg.length);
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player);
        core.rootScene.addChild(player.func_d[player.func_d.length - 1]);
      }
      this.x = 330;
      this.y = 130;
      this.label.x = this.x;
      this.label.y = this.y;
    });

    player.arg1.addEventListener("touchend", function(e) {
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "arg1"));
        player.func_h[player.func_h.length - 1].func_name = "h";
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player);
        player.arg_check(player.func_h_arg, "arg1");
        core.rootScene.addChild(player.func_h[player.func_h.length - 1]);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "arg1"));
        player.func_c[player.func_c.length - 1].func_name = "c";
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player);
        player.arg_check(player.func_c_arg, "arg1");
        core.rootScene.addChild(player.func_c[player.func_c.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "arg1"));
        player.func_s[player.func_s.length - 1].func_name = "s";
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player);
        player.arg_check(player.func_s_arg, "arg1");
        core.rootScene.addChild(player.func_s[player.func_s.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "arg1"));
        player.func_d[player.func_d.length - 1].func_name = "d";
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player);
        player.arg_check(player.func_d_arg, "arg1");
        core.rootScene.addChild(player.func_d[player.func_d.length - 1]);
      }
      this.x = 330;
      this.y = 150;
    });

    player.arg2.addEventListener("touchend", function(e) {
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "arg2"));
        player.func_h[player.func_h.length - 1].func_name = "h";
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player);
        player.arg_check(player.func_h_arg, "arg2");
        core.rootScene.addChild(player.func_h[player.func_h.length - 1]);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "arg2"));
        player.func_c[player.func_c.length - 1].func_name = "c";
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player);
        player.arg_check(player.func_c_arg, "arg2");
        core.rootScene.addChild(player.func_c[player.func_c.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "arg2"));
        player.func_s[player.func_s.length - 1].func_name = "s";
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player);
        player.arg_check(player.func_c_arg, "arg2");
        core.rootScene.addChild(player.func_s[player.func_s.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "arg2"));
        player.func_d[player.func_d.length - 1].func_name = "d";
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player);
        player.arg_check(player.func_d_arg, "arg2");
        core.rootScene.addChild(player.func_d[player.func_d.length - 1]);
      }
      this.x = 330;
      this.y = 170;
    });

    player.arg3.addEventListener("touchend", function(e) {
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "arg3"));
        player.func_h[player.func_h.length - 1].func_name = "h";
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player);
        player.arg_check(player.func_h_arg, "arg3");
        core.rootScene.addChild(player.func_h[player.func_h.length - 1]);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "arg3"));
        player.func_c[player.func_c.length - 1].func_name = "c";
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player);
        player.arg_check(player.func_c_arg, "arg3");
        core.rootScene.addChild(player.func_c[player.func_c.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "arg3"));
        player.func_s[player.func_s.length - 1].func_name = "s";
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player);
        player.arg_check(player.func_s_arg, "arg3");
        core.rootScene.addChild(player.func_s[player.func_s.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "arg3"));
        player.func_d[player.func_d.length - 1].func_name = "d";
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player);
        player.arg_check(player.func_d_arg, "arg3");
        core.rootScene.addChild(player.func_d[player.func_d.length - 1]);
      }
      this.x = 330;
      this.y = 190;
    });

    player.forStart.addEventListener("touchend", function(e) {
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height) {
        this.moveBlock(block_list);
        block_list.push(new Block(stack_frame.x + 8, block_list.length * 20 + 15, "forStart"));
        block_list[block_list.length - 1].loop_cnt = this.loop_cnt;
        var label = addLabel(block_list[block_list.length - 1], String(block_list[block_list.length - 1].loop_cnt));
        register_forBlock_eventListener(block_list[block_list.length - 1], block_list, player, label);
        core.rootScene.addChild(block_list[block_list.length - 1]);
        core.rootScene.addChild(label);
        register_loopCounter_eventListener(block_list[block_list.length - 1], label);
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "forStart"));
        player.func_h[player.func_h.length - 1].loop_cnt = this.loop_cnt;
        var label = addLabel(player.func_h[player.func_h.length - 1], String(player.func_h[player.func_h.length - 1].loop_cnt));
        register_forBlock_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player, label);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1]);
        core.rootScene.addChild(label);
        register_loopCounter_eventListener(player.func_h[player.func_h.length - 1], label);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "forStart"));
        player.func_c[player.func_c.length - 1].loop_cnt = this.loop_cnt;
        var label = addLabel(player.func_c[player.func_c.length - 1], String(player.func_c[player.func_c.length - 1].loop_cnt));
        register_forBlock_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player, label);
        core.rootScene.addChild(player.func_c[player.func_c.length - 1]);
        core.rootScene.addChild(label);
        register_loopCounter_eventListener(player.func_c[player.func_c.length - 1], label);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "forStart"));
        player.func_s[player.func_s.length - 1].loop_cnt = this.loop_cnt;
        var label = addLabel(player.func_s[player.func_s.length - 1], String(player.func_s[player.func_s.length - 1].loop_cnt));
        register_forBlock_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player, label);
        core.rootScene.addChild(player.func_s[player.func_s.length -1]);
        core.rootScene.addChild(label);
        register_loopCounter_eventListener(player.func_s[player.func_c.length - 1], label);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "forStart"));
        player.func_d[player.func_d.length - 1].loop_cnt = this.loop_cnt;
        var label = addLabel(player.func_d[player.func_d.length - 1], String(player.func_d[player.func_d.length - 1].loop_cnt));
        register_forBlock_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player, label);
        core.rootScene.addChild(player.func_d[player.func_d.length - 1]);
        core.rootScene.addChild(label);
        register_loopCounter_eventListener(player.func_d[player.func_d.length - 1], label);
      }
      this.x = 330;
      this.y = 150;
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
      if (e.x > stack_frame.x && e.x < stack_frame.x + stack_frame.width && e.y > stack_frame.y && e.y < stack_frame.y + stack_frame.height 
        && this.checkForStart(block_list)) {
        this.moveBlock(block_list);
        block_list.push(new Block(stack_frame.x + 8, block_list.length * 20 + 15, "forEnd"));
        register_block_eventListener(block_list[block_list.length - 1], block_list, player);
        core.rootScene.addChild(block_list[block_list.length - 1]);
      }
      if (e.x > funch_frame.x && e.x < funch_frame.x + funch_frame.width && e.y > funch_frame.y && e.y < funch_frame.y + funch_frame.height
        && this.checkForStart(player.func_h)) {
        this.moveBlock(player.func_h);
        player.func_h.push(new Block(funch_frame.x + 8, player.func_h.length * 20 + 15, "forEnd"));
        register_block_eventListener(player.func_h[player.func_h.length - 1], player.func_h, player);
        core.rootScene.addChild(player.func_h[player.func_h.length - 1]);
      }
      if (e.x > funcc_frame.x && e.x < funcc_frame.x + funcc_frame.width && e.y > funcc_frame.y && e.y < funcc_frame.y + funcc_frame.height
        && this.checkForStart(player.func_c)) {
        this.moveBlock(player.func_c);
        player.func_c.push(new Block(funcc_frame.x + 8, player.func_c.length * 20 + 15, "forEnd"));
        register_block_eventListener(player.func_c[player.func_c.length - 1], player.func_c, player);
        core.rootScene.addChild(player.func_c[player.func_c.length - 1]);
      }
      if (e.x > funcs_frame.x && e.x < funcs_frame.x + funcs_frame.width && e.y > funcs_frame.y && e.y < funcs_frame.y + funcs_frame.height
        && this.checkForStart(player.func_s)) {
        this.moveBlock(player.func_s);
        player.func_s.push(new Block(funcs_frame.x + 8, player.func_s.length * 20 + 15, "forEnd"));
        register_block_eventListener(player.func_s[player.func_s.length - 1], player.func_s, player);
        core.rootScene.addChild(player.func_s[player.func_s.length -1]);
      }
      if (e.x > funcd_frame.x && e.x < funcd_frame.x + funcd_frame.width && e.y > funcd_frame.y && e.y < funcd_frame.y + funcd_frame.height
        && this.checkForStart(player.func_d)) {
        this.moveBlock(player.func_d);
        player.func_d.push(new Block(funcd_frame.x + 8, player.func_d.length * 20 + 15, "forEnd"));
        register_block_eventListener(player.func_d[player.func_d.length - 1], player.func_d, player);
        core.rootScene.addChild(player.func_d[player.func_d.length - 1]);
      }
      this.x = 330;
      this.y = 170;
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
