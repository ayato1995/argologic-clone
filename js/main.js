enchant();

function toMove(core, player, map) {
  if (core.input.left) {
    player.x -= 4;
    if (map.hitTest(player.x + 8, player.y)) player.x += 4;
    player.frame = 9;
  }
  if (core.input.right) {
    player.x += 4;
    if (map.hitTest(player.x + 20, player.y)) player.x -= 4;
    player.frame = 18;
  }
  if (core.input.up) {
    player.y -= 4;
    if (map.hitTest(player.x + 8, player.y)) player.y += 4;
    player.frame = 27;
  }
  if (core.input.down) {
    player.y += 4;
    if (map.hitTest(player.x + 8, player.y + 8)) player.y -= 4;
    player.frame = 0;
  }
}

function toButtonMove(e, player) {
  player.x = e.x - player.width / 2;
  player.y = e.y - player.height / 2;
}

window.onload = function() {
  core = new Core(320, 320);
  core.fps = 60;
  core.preload("../img/chara5.png", "../img/map0.gif");

  core.onload = function() {
    var player = new Sprite(32, 32);
    player.image = core.assets["../img/chara5.png"];
    player.x = 56;
    player.y = 132;

    var backgroundMap = new Map(16, 16);
    backgroundMap.image = core.assets["../img/map0.gif"];
    backgroundMap.loadData(stage_map1_0, stage_map1_1);
    backgroundMap.collisionData = stage_map1_col;
    console.log(backgroundMap.image);

    core.rootScene.addChild(backgroundMap);
    core.rootScene.addChild(player);

    player.addEventListener("enterframe", function(e) {
      toMove(core, player, backgroundMap);
      // console.log(player.x + "    " + player.y);
    });

    player.addEventListener("touchmove", function(e) {
      toButtonMove(e, player);
    });

  }

  core.start();
};