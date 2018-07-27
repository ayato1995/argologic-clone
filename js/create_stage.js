createStage = function(stageId) {    
    var stage = new Scene();
    stage.id = stageId;
    stage.clearFlag = true;
    stage.selectFlag = false;
    stage.frames = new Array();
    stage.log = "!!!!!!!!!! GAME START !!!!!!!!!!";
    stage.log += "\n";
    stage.log += "========= stage " + stage.id + " =========";
    stage.log += "\n";

    stage.map = null;
    var map_img = core.assets["../img/map0.gif"];
    if (stageId == 1) {
      stage.map = addMap1(map_img);
    } else if (stageId == 2) {
      stage.map = addMap2(map_img);
    } else if (stageId == 3) {
      stage.map = addMap3(map_img);
    }

    /* goal initialize */
    var goal = new Goal(stage.map.goalX, stage.map.goalY, core.assets["../img/goal.png"]);

    /* player initialize */
    stage.player = new Player(stage.map.initializeX, stage.map.initializeY, stage.map.direction);

    /* frame initialize */
    var stack_frame = new Frame(370, 31, "stack");
    var h_frame = new Frame(400, 31, "heart");
    var h_label = new Sprite(16, 16);
    h_label.image = core.assets["../img/heart.png"];
    h_label.x = h_frame.x + 4;
    h_label.y = 10;
    var c_frame = new Frame(430, 31, "clover");
    var c_label = new Sprite(16, 16);
    c_label.image = core.assets["../img/clover.png"];
    c_label.x = c_frame.x + 4;
    c_label.y = 10;
    var s_frame = new Frame(460, 31, "spade");
    var s_label = new Sprite(16, 16);
    s_label.image = core.assets["../img/spade.png"];
    s_label.x = s_frame.x + 4;
    s_label.y = 10;
    var d_frame = new Frame(490, 31, "diamond");
    var d_label = new Sprite(16, 16);
    d_label.image = core.assets["../img/diamond.png"];
    d_label.x = d_frame.x + 4;
    d_label.y = 10;

    stage.frames.push(stack_frame);
    stage.frames.push(h_frame);
    stage.frames.push(c_frame);
    stage.frames.push(s_frame);
    stage.frames.push(d_frame);

    stage.play = new Play(330, 300);
    stage.select = new Select (330, 280);
    stage.exe_copy = new Copy(stage.frames[0].x + 4, stage.frames[0].y + stage.frames[0].height + 10);
    stage.h_copy = new Copy(stage.frames[1].x + 4, stage.frames[1].y + stage.frames[1].height + 10);
    stage.c_copy = new Copy(stage.frames[2].x + 4, stage.frames[2].y + stage.frames[2].height + 10);
    stage.s_copy = new Copy(stage.frames[3].x + 4, stage.frames[3].y + stage.frames[3].height + 10);
    stage.d_copy = new Copy(stage.frames[4].x + 4, stage.frames[4].y + stage.frames[4].height + 10);

    stage.addChild(stage.map);
    stage.addChild(stage.frames[0]);
    stage.addChild(h_label);
    stage.addChild(stage.frames[1]);
    stage.addChild(c_label);
    stage.addChild(stage.frames[2]);
    stage.addChild(s_label);
    stage.addChild(stage.frames[3]);
    stage.addChild(d_label);
    stage.addChild(stage.frames[4]);
    stage.addChild(goal);
    stage.player.push_block_stage(stage);
    stage.addChild(stage.play);
    stage.addChild(stage.exe_copy);
    stage.addChild(stage.h_copy);
    stage.addChild(stage.c_copy);
    stage.addChild(stage.s_copy);
    stage.addChild(stage.d_copy);
    stage.addChild(stage.select);

    stage.play.register_play_eventListener(stage.player, stage, stage.map, goal);
    stage.select.register_eventListener(stage, stage.frames);
    stage.exe_copy.register_eventListener(stage.player, stage.frames[0].blocks, stage.frames[0], stage);
    stage.h_copy.register_eventListener(stage.player, stage.frames[1].blocks, stage.frames[1], stage);
    stage.c_copy.register_eventListener(stage.player, stage.frames[2].blocks, stage.frames[2], stage);
    stage.s_copy.register_eventListener(stage.player, stage.frames[3].blocks, stage.frames[3], stage);
    stage.d_copy.register_eventListener(stage.player, stage.frames[4].blocks, stage.frames[4], stage);

    stage.player.set_block_eventListener(stage.frames, stage, stage.player);
    
    return stage;
}

initialize_stage = function(stage) {
	stage.play.reset_block_stack();
	stage.clearFlag = true;
    stage.selectFlag = false;
  	stage.player.x = stage.map.initializeX;
  	stage.player.y = stage.map.initializeY;
  	stage.player.frame = stage.player.set_frame(stage.map.direction);
  	stage.player.opacity = 100;
    stage.log = "========= stage " + stage.id + " =========";
}