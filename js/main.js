enchant();

window.onload = function() {
  core = new Core(480, 320);
  core.fps = 60;
  core.preload("../img/chara5.png", "../img/map0.gif", "../img/goal.png");

  core.onload = function() {
    /* map initialize */
    var backgroundMap = new Map(16, 16);
    backgroundMap.image = core.assets["../img/map0.gif"];
    backgroundMap.loadData(stage_map1_0, stage_map1_1);
    backgroundMap.collisionData = stage_map1_col;
    //block_list = [];

    /* goal initialize */
    var goal = new Goal(240, 144, backgroundMap);

    /* player initialize */
    var player = new Player(56, 132, backgroundMap);

    /* block initialize */
    var up = new Block(330, 10, "up");

    core.rootScene.addChild(backgroundMap);
    core.rootScene.addChild(goal);
    core.rootScene.addChild(player);
    core.rootScene.addChild(up);

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

    core.rootScene.addEventListener("enterframe", function(e) {
      if (player.intersect(goal)) {
        core.replaceScene(core.field())
      }
    });

    up.addEventListener("touchstart", function(e) {
      var up2 = new Block(400, 10, "up");
      core.rootScene.addChild(up2);
    });
  }

  core.field = function() {
    var scene = new Scene();
    scene.backgroundColor = "yellow";

    return scene;
  }

  core.start();
  //core.debug();
};