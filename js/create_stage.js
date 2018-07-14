createStage = function(stageId) {    
    var stage = new Scene();
    stage.id = stageId;
    stage.clearFlag = true;
    stage.selectFlag = false;

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
    player.push_block_stage(stage);
    stage.addChild(play);
    stage.addChild(exe_copy);
    stage.addChild(h_copy);
    stage.addChild(c_copy);
    stage.addChild(s_copy);
    stage.addChild(d_copy);
    stage.addChild(select);

    play.register_play_eventListener(player, stage, map, goal);
    select.register_eventListener(stage, stack_frame, h_frame, c_frame, s_frame, d_frame);
    exe_copy.register_eventListener(player, stack_frame.blocks, stack_frame, stage);
    h_copy.register_eventListener(player, h_frame.blocks, h_frame, stage);
    c_copy.register_eventListener(player, c_frame.blocks, c_frame, stage);
    s_copy.register_eventListener(player, s_frame.blocks, s_frame, stage);
    d_copy.register_eventListener(player, d_frame.blocks, d_frame, stage);

    player.set_block_eventListener(stack_frame, h_frame, c_frame, s_frame, d_frame, stage, player);
    
    return stage;
}
