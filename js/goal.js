
var Goal = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, map) {
    enchant.Sprite.call(this, 16, 16);
    this.image = core.assets["../img/goal.png"];
    this.x = x;
    this.y = y;  
  }
})