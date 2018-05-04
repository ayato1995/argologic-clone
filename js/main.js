enchant();

window.onload = function() {
  core = new Core(320, 320);
  core.fps = 60;
  core.preload("../img/chara5.png", "../img/map0.gif", "../img/goal.png");

  core.onload = function() {
    /* map initialize */
    var backgroundMap = new Map(16, 16);
    backgroundMap.image = core.assets["../img/map0.gif"];
    backgroundMap.loadData(stage_map1_0, stage_map1_1);
    backgroundMap.collisionData = stage_map1_col;

    /* goal initialize */
    var goal = new Goal(240, 144, backgroundMap);

    /* player initialize */
    var player = new Player(56, 132, backgroundMap);

    core.rootScene.addChild(backgroundMap);
    core.rootScene.addChild(goal);
    core.rootScene.addChild(player);

    player.addEventListener("enterframe", function(e) {
      toMove(core, player, backgroundMap);
      // console.log(player.x + "   " + player.y);
    });

    player.addEventListener("touchmove", function(e) {
      toButtonMove(e, player);
    });

    core.rootScene.addEventListener("enterframe", function(e) {
      if (player.intersect(goal)) {
        console.log("");
        core.replaceScene(core.field())
      }
    });

  }

  core.field = function() {
    var scene = new Scene();
    scene.backgroundColor = "yellow";
    console.log(scene.backgroundColor);

    return scene;
  }

  core.start();
};