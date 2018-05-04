
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

var Player = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, map) {
    enchant.Sprite.call(this, 32, 32);
    this.image = core.assets["../img/chara5.png"];
    this.frame = 27;
    this.x = x;
    this.y = y;  
  }
})