createStage = function(stageId) {    
    var stage = new Scene();
    stage.id = stageId;
    stage.play_flag = false;
    stage.clearFlag = true;
    stage.selectFlag = false;
    stage.frames = new Array();
    stage.log = "GAME START";
    stage.log += "\n";
    stage.log += "stage" + stage.id;
    stage.log += "\n";

    stage.map = null;
    var map_img = core.assets["../img/map0.gif"];
    if (stageId == 1) {
      // stage.map = addMap1(map_img);
      stage.map = addMap5(map_img);
    } else if (stageId == 2) {
      // stage.map = addMap2(map_img);
      stage.map = addMap1(map_img);
    } else if (stageId == 3) {
      // stage.map = addMap3(map_img);
      stage.map = addMap2(map_img);
    } else if (stageId == 4) {
      // stage.map = addMap4(map_img);
      stage.map = addMap6(map_img);
    } else if (stageId == 5) {
      // stage.map = addMap5(map_img);
      stage.map = addMap7(map_img);
    } else if (stageId == 6) {
      // stage.map = addMap6(map_img);
      stage.map = addMap4(map_img);
    } else if (stageId == 7) {
      // stage.map = addMap7(map_img);
      stage.map = addMap3(map_img);
    }

    /* goal initialize */
    stage.goal = new Goal(stage.map.goalX, stage.map.goalY, core.assets["../img/goal.png"]);

    /* player initialize */
    stage.player = new Player(stage.map.initializeX, stage.map.initializeY, stage.map.direction);

    /* frame initialize */
    var stack_frame = new Frame(370, 31, "stack");
    var h_frame = new Frame(400, 31, "heart");
    var c_frame = new Frame(430, 31, "clover");
    var s_frame = new Frame(460, 31, "spade");
    var d_frame = new Frame(490, 31, "diamond");

    stage.frames.push(stack_frame);
    stage.frames.push(h_frame);
    stage.frames.push(c_frame);
    stage.frames.push(s_frame);
    stage.frames.push(d_frame);

    stage.play = new Play(330, 300);
    stage.select = new Select (330, 280);

    stage.addChild(stage.map);
    stage.addChild(stage.frames[0]);
    stage.addChild(stage.frames[1]);
    stage.addChild(stage.frames[2]);
    stage.addChild(stage.frames[3]);
    stage.addChild(stage.frames[4]);
    for (var i = 0; i < stage.frames.length; i++) {
        stage.frames[i].push_label_btn_stage(stage);
    }
    stage.addChild(stage.goal);
    stage.addChild(stage.player);
    stage.player.push_block_stage(stage);
    stage.addChild(stage.play);
    stage.addChild(stage.select);

    stage.play.register_play_eventListener(stage.player, stage, stage.map, stage.goal);
    stage.select.register_eventListener(stage, stage.frames);
    for (var i = 0; i < stage.frames.length; i++) {
        stage.frames[i].copy_btn.register_eventListener(stage.player, stage.frames[i].blocks, stage.frames[i], stage);
    }

    stage.player.set_block_eventListener(stage.frames, stage, stage.player);
    
    return stage;
}

initialize_stage = function(stage) {
    core.height = 320;
	stage.play.reset_block_stack();
    stage.play_flag = false;
    for (var i = 0; i < stage.frames.length; i++) {
        stage.frames[i].push_btn_stage(stage);
        stage.frames[i].reset_frame();
    }
    for (var i = 0; i < stage.play.exec_frames.length; i++) {
        stage.removeChild(stage.play.exec_frames[i]);
        stage.removeChild(stage.play.exec_frames[i].label);
        for (var j = 0; j < stage.play.exec_frames[i].blocks.length; j++) {
            stage.play.exec_frames[i].blocks[j].remove_stage_block(stage);
        }
        stage.play.exec_frames[i].blocks.length = 0;
    }
    stage.play.exec_frames.length = 0;
    stage.addChild(stage.play);
    stage.addChild(stage.select);
	stage.clearFlag = true;
    stage.selectFlag = false;
    stage.player.push_block_stage(stage);
  	stage.player.x = stage.map.initializeX;
  	stage.player.y = stage.map.initializeY;
  	stage.player.frame = stage.player.set_frame(stage.map.direction);
  	stage.player.opacity = 100;
    stage.log = "stage" + stage.id + "\n";
}