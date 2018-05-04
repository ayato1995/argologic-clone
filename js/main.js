enchant();

window.onload = function() {
  core = new Core(320, 320);
  core.fps = 60;
  core.preload("../img/chara5.png", "../img/map0.gif");

  core.onload = function() {
    /* map initialize */
    var backgroundMap = new Map(16, 16);
    backgroundMap.image = core.assets["../img/map0.gif"];
    backgroundMap.loadData(stage_map1_0, stage_map1_1);
    backgroundMap.collisionData = stage_map1_col;

    /* player initialize */
    var player = new Player(56, 132, backgroundMap);
    core.rootScene.addChild(backgroundMap);
    core.rootScene.addChild(player);

    player.addEventListener("enterframe", function(e) {
      toMove(core, player, backgroundMap);
    });

    player.addEventListener("touchmove", function(e) {
      toButtonMove(e, player);
    });

    core.rootScene.addEventListener("enterframe", function(e) {
      if (player.x > 80) {
        core.replaceScene(core.field())
        console.log(core);
      }
    });
  }

  core.field = function() {
    var scene = new Scene();
    scene.backgroundColor = "red";
    console.log(scene.backgroundColor);

    return scene;
  }

  core.start();
};