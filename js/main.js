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
    block_list = [];

    /* goal initialize */
    var goal = new Goal(240, 144, backgroundMap);

    /* player initialize */
    var player = new Player(56, 132, backgroundMap);

    /* block initialize */
    var up = new Block(330, 10, "up");
    var down = new Block(330, 25, "down");
    var left = new Block(330, 40, "left");
    var right = new Block(330, 55, "right");

    core.rootScene.addChild(backgroundMap);
    core.rootScene.addChild(goal);
    core.rootScene.addChild(player);
    core.rootScene.addChild(up);
    core.rootScene.addChild(down);
    core.rootScene.addChild(left);
    core.rootScene.addChild(right);

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
      block_list.push(new Block(400, 10 * block_list.length, "up"));
      core.rootScene.addChild(block_list[block_list.length - 1]);
    });

    down.addEventListener("touchstart", function(e) {
      block_list.push(new Block(400, 10 * block_list.length, "down"));
      core.rootScene.addChild(block_list[block_list.length -1]);
    });

    left.addEventListener("touchstart", function(e) {
      block_list.push(new Block(400, 10 * block_list.length, "left"));
      core.rootScene.addChild(block_list[block_list.length - 1]);
    });

    right.addEventListener("touchstart", function(e) {
      block_list.push(new Block(400, block_list.length * 10, "right"));
      core.rootScene.addChild(block_list[block_list.length - 1]);
    });

    core.rootScene.addEventListener("enterframe", function() {
      for (var i = 0; i < block_list.length; i++) {
        block_list[i].addEventListener("touchstart", function(e) {
          this.remove(core);
          block_list.splice(i, 1);
        });
      }
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