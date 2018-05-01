enchant();

function toMove(core, player) {
  if (core.input.left) {
    player.x -= 4;
    player.frame = 9;
    player.tick++;
  }
  if (core.input.right) {
    player.x += 4;
    player.frame = 18;
    player.tick++;
  }
  if (core.input.up) {
    player.y -= 4;
    player.frame = 27;
    player.tick++;
  }
  if (core.input.down) {
    player.y += 4;
    player.frame = 0;
    player.tick++;
  }
}

function toButtonMove(e, player) {
  player.x = e.x - player.width / 2;
  player.y = e.y - player.height / 2;
}

window.onload = function() {
  core = new Core(320, 320);
  core.fps = 60;
  core.preload("../img/chara5.png");

  core.onload = function() {
    var player = new Sprite(32, 32);
    player.image = core.assets["../img/chara5.png"];
    player.x = 320 / 2;
    player.y = 320 / 2;
    core.rootScene.addChild(player);

    player.addEventListener("enterframe", function(e) {
      toMove(core, player);
    });

    player.addEventListener("touchmove", function(e) {
      toButtonMove(e, player);
    });

  }

  core.start();
};