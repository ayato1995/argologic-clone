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
    core.register_replay_eventListener(game_set_image, core.stageId, clear);
    scene.addChild(game_set_image);
    return scene;
  }

  core.register_replay_eventListener = function(img, id, flag) {
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

  titleScene = function() {
  	var scene = new Scene();
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
    var stack_frame = new Frame(370, 31, "stack");
    var h_frame = new Frame(412, 31, "heart");
    var h_label = new Sprite(16, 16);
    h_label.image = core.assets["../img/heart.png"];
    h_label.x = h_frame.x + 8;
    h_label.y = 10;
    var c_frame = new Frame(452, 31, "clover");
    var c_label = new Sprite(16, 16);
    c_label.image = core.assets["../img/clover.png"];
    c_label.x = c_frame.x + 8;
    c_label.y = 10;
    var s_frame = new Frame(494, 31, "spade");
    var s_label = new Sprite(16, 16);
    s_label.image = core.assets["../img/spade.png"];
    s_label.x = s_frame.x + 8;
    s_label.y = 10;
    var d_frame = new Frame(536, 31, "diamond");
    var d_label = new Sprite(16, 16);
    d_label.image = core.assets["../img/diamond.png"];
    d_label.x = d_frame.x + 8;
    d_label.y = 10;

    var play = new Play(330, 300);
    var select = new Select (330, 280);
    var exe_copy = new Copy(stack_frame.x + 8, stack_frame.y + stack_frame.height + 10);
    var h_copy = new Copy(h_frame.x + 8, h_frame.y + h_frame.height + 10);
    var c_copy = new Copy(c_frame.x + 8, c_frame.y + c_frame.height + 10);
    var s_copy = new Copy(s_frame.x + 8, s_frame.y + s_frame.height + 10);
    var d_copy = new Copy(d_frame.x + 8, d_frame.y + d_frame.height + 10);
    
    var stage = new Scene();
    stage.id = stageId;
    stage.clearFlag = true;
    stage.selectFlag = false;

    stage.addChild(map);
    stage.addChild(stack_frame);
    stage.addChild(h_label);
    stage.addChild(h_frame);
    stage.addChild(c_label);
    stage.addChild(c_frame);
    stage.addChild(s_label);
    stage.addChild(s_frame);
    stage.addChild(d_label);
    stage.addChild(d_frame);
    stage.addChild(goal);
    stage.addChild(player);
    player.push_block_stage(stage);
    stage.addChild(play);
    stage.addChild(exe_copy);
    stage.addChild(h_copy);
    stage.addChild(c_copy);
    stage.addChild(s_copy);
    stage.addChild(d_copy);
    stage.addChild(select);

    console.log(exe_copy.register_eventListener);
    play.register_play_eventListener(player, stage, map, goal);
    select.register_eventListener(stage, stack_frame, h_frame, c_frame, s_frame, d_frame);
    exe_copy.register_eventListener(player, player.block_list, stack_frame, stage);
    h_copy.register_eventListener(player, player.func_h.func, h_frame, stage);
    c_copy.register_eventListener(player, player.func_c.func, c_frame, stage);
    s_copy.register_eventListener(player, player.func_s.func, s_frame, stage);
    d_copy.register_eventListener(player, player.func_d.func, d_frame, stage);

    player.up.register_set_eventListener(player.block_list, stack_frame, stage, player);
    player.up.register_set_eventListener(player.func_h.func, h_frame, stage, player);
    player.up.register_set_eventListener(player.func_c.func, c_frame, stage, player);
    player.up.register_set_eventListener(player.func_s.func, s_frame, stage, player);
    player.up.register_set_eventListener(player.func_d.func, d_frame, stage, player);

    player.left_rotate.register_set_eventListener(player.block_list, stack_frame, stage, player);
    player.left_rotate.register_set_eventListener(player.func_h.func, h_frame, stage, player);
    player.left_rotate.register_set_eventListener(player.func_c.func, c_frame, stage, player);
    player.left_rotate.register_set_eventListener(player.func_s.func, s_frame, stage, player);
    player.left_rotate.register_set_eventListener(player.func_d.func, d_frame, stage, player);

    player.right_rotate.register_set_eventListener(player.block_list, stack_frame, stage, player);
    player.right_rotate.register_set_eventListener(player.func_h.func, h_frame, stage, player);
    player.right_rotate.register_set_eventListener(player.func_c.func, c_frame, stage, player);
    player.right_rotate.register_set_eventListener(player.func_s.func, s_frame, stage, player);
    player.right_rotate.register_set_eventListener(player.func_d.func, d_frame, stage, player);

    player.func_h.register_set_eventListener(player.block_list, stack_frame, stage, player);
    player.func_h.register_set_eventListener(player.func_h.func, h_frame, stage, player);
    player.func_h.register_set_eventListener(player.func_c.func, c_frame, stage, player);
    player.func_h.register_set_eventListener(player.func_s.func, s_frame, stage, player);
    player.func_h.register_set_eventListener(player.func_d.func, d_frame, stage, player);

    player.func_c.register_set_eventListener(player.block_list, stack_frame, stage, player);
    player.func_c.register_set_eventListener(player.func_h.func, h_frame, stage, player);
    player.func_c.register_set_eventListener(player.func_c.func, c_frame, stage, player);
    player.func_c.register_set_eventListener(player.func_s.func, s_frame, stage, player);
    player.func_c.register_set_eventListener(player.func_d.func, d_frame, stage, player);

    player.func_s.register_set_eventListener(player.block_list, stack_frame, stage, player);
    player.func_s.register_set_eventListener(player.func_h.func, h_frame, stage, player);
    player.func_s.register_set_eventListener(player.func_c.func, c_frame, stage, player);
    player.func_s.register_set_eventListener(player.func_s.func, s_frame, stage, player);
    player.func_s.register_set_eventListener(player.func_d.func, d_frame, stage, player);

    player.func_d.register_set_eventListener(player.block_list, stack_frame, stage, player);
    player.func_d.register_set_eventListener(player.func_h.func, h_frame, stage, player);
    player.func_d.register_set_eventListener(player.func_c.func, c_frame, stage, player);
    player.func_d.register_set_eventListener(player.func_s.func, s_frame, stage, player);
    player.func_d.register_set_eventListener(player.func_d.func, d_frame, stage, player);

    player.arg1.register_set_eventListener(player.func_h.func, h_frame, stage, player);
    player.arg1.register_set_eventListener(player.func_c.func, c_frame, stage, player);
    player.arg1.register_set_eventListener(player.func_s.func, s_frame, stage, player);
    player.arg1.register_set_eventListener(player.func_d.func, d_frame, stage, player);

    player.arg2.register_set_eventListener(player.func_h.func, h_frame, stage, player);
    player.arg2.register_set_eventListener(player.func_c.func, c_frame, stage, player);
    player.arg2.register_set_eventListener(player.func_s.func, s_frame, stage, player);
    player.arg2.register_set_eventListener(player.func_d.func, d_frame, stage, player);

    player.arg2.register_set_eventListener(player.func_h.func, h_frame, stage, player);
    player.arg2.register_set_eventListener(player.func_c.func, c_frame, stage, player);
    player.arg2.register_set_eventListener(player.func_s.func, s_frame, stage, player);
    player.arg2.register_set_eventListener(player.func_d.func, d_frame, stage, player);

    player.loop_start.register_set_eventListener(player.block_list, stack_frame, stage, player);
    player.loop_start.register_set_eventListener(player.func_h.func, h_frame, stage, player);
    player.loop_start.register_set_eventListener(player.func_c.func, c_frame, stage, player);
    player.loop_start.register_set_eventListener(player.func_s.func, s_frame, stage, player);
    player.loop_start.register_set_eventListener(player.func_d.func, d_frame, stage, player);

    player.loop_end.register_set_eventListener(player.block_list, stack_frame, stage, player);
    player.loop_end.register_set_eventListener(player.func_h.func, h_frame, stage, player);
    player.loop_end.register_set_eventListener(player.func_c.func, c_frame, stage, player);
    player.loop_end.register_set_eventListener(player.func_s.func, s_frame, stage, player);
    player.loop_end.register_set_eventListener(player.func_d.func, d_frame, stage, player);

    return stage;
  }

  core.start();
  // core.debug();
};
